import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  catName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String }, // Stores Cloudinary URL
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);