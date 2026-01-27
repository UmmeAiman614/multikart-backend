import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardSummary = async (req, res) => {
  try {
    // 1. Basic Counts
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // 2. Total Revenue (Sum of all orders totalAmount)
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "paid" } }, // Sirf paid orders
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    // 3. Recent Orders (Latest 5 with Customer Name)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("totalAmount paymentStatus orderStatus createdAt shippingDetails")
      // Agar user model se naam chahiye to populate karein, warna shippingDetails se le lenge
      .populate("user", "name email"); 

    // 4. Best Sellers (Featured Products as a fallback since soldCount is missing)
    const bestSellers = await Product.find({ isFeatured: true })
      .limit(4)
      .select("name price images category sku");

    res.status(200).json({
      success: true,
      stats: {
        totalSalesCount: totalOrders,
        totalIncome: revenueData[0]?.total || 0,
        totalProducts,
        totalVisitors: totalUsers, 
        // Trend dummy data (Ya pichle mahine se calculate karein)
        trends: { sales: "+12%", income: "+8%", orders: "+5%", visitors: "+2%" }
      },
      recentOrders,
      bestSellers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};