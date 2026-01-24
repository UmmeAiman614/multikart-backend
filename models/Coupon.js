import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true }, // Percentage (e.g., 10 for 10%)
  expiry: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("Coupon", couponSchema);