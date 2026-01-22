// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      price: { type: Number }
    }
  ],
  totalAmount: { type: Number },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
