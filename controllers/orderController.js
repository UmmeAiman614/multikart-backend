import Order from "../models/Order.js";
import Product from "../models/Product.js"; // Product model import karna zaroori hai

// Create Order (User side)
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // Items array nikalna

    // 1. Pehle check karein ke stock hai bhi ya nahi (Safety Check)
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Sorry, ${product.name} has only ${product.stock} items left.` });
      }
    }

    // 2. Order Create Karein
    const order = await Order.create({
      user: req.user.id,
      ...req.body,
      status: "Pending"
    });

    // 3. IMPORTANT: Stock kam karne ki logic
    // Har item ke liye loop chalayen aur product model mein stock minus karein
    const stockUpdates = items.map(item => {
      return Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } } // $inc aur minus (-) quantity stock kam kar deta hai
      );
    });

    // Saari updates aik sath run karein
    await Promise.all(stockUpdates);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Order Status (Admin Side) - IMPORTANT
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Notification message create karein
    let notificationMessage = "";
    if (status === "shipped") notificationMessage = "Your order has been handed over to the courier. 🚚";
    else if (status === "completed") notificationMessage = "Order delivered successfully. Thank you for shopping! ✅";
    else notificationMessage = `Your order status has been updated to ${status}.`;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        $push: {
          notifications: {
            message: notificationMessage,
            status: status,
            date: new Date()
          }
        }
      },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: `Order marked as ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    // Hum user ka name aur email bhi populate karenge taake table mein dikha saken
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product") // 👈 Yeh line zaroori hai description aur name ke liye
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Order Delete Function
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully from records" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

