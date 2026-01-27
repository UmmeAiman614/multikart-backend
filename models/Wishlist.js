import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Ensure aapke Product model ka naam "Product" hi ho
    },
  ],
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);