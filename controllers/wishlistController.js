import Wishlist from "../models/Wishlist.js";

// 1. Get User Wishlist
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
    if (!wishlist) {
      return res.status(200).json({ products: [] });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Add or Remove Product (Toggle)
export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      // Agar wishlist nahi hai to nayi banao
      wishlist = new Wishlist({ user: req.user.id, products: [productId] });
    } else {
      // Check karo agar product pehle se hai to remove karo (Unlike), warna add karo (Like)
      const index = wishlist.products.indexOf(productId);
      if (index === -1) {
        wishlist.products.push(productId);
      } else {
        wishlist.products.splice(index, 1);
      }
    }

    await wishlist.save();
    res.status(200).json({ message: "Wishlist updated", wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};