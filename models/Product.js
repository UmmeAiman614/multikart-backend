// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  discountPercent: { type: Number },
  images: [{ type: String }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  isFeatured: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
