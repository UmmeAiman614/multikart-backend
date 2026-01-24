// models/Order.js
import mongoose from "mongoose";

// models/Order.js mein ye fields add karein
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  shippingDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    orderNote: String
  },
  notifications: [
  {
    message: String,
    date: { type: Date, default: Date.now },
    status: String
  }
],
  totalAmount: { type: Number, required: true },
  shippingFee: { type: Number, default: 0 },
  paymentMethod: { type: String, default: "Cash On Delivery" },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  orderStatus: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
