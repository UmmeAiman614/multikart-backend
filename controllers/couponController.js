// controllers/couponController.js
import Coupon from "../models/Coupon.js";

// 1. Naya Coupon Banane ke liye (Admin Only)
export const createCoupon = async (req, res) => {
  try {
    const { code, discount, expiry } = req.body;
    
    // Check karein ke kya saara data mil raha hai
    if(!code || !discount || !expiry) {
       return res.status(400).json({ message: "All fields are required" });
    }

    const newCoupon = new Coupon({ code, discount, expiry });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log("SERVER ERROR:", error); // Yeh aapke VS Code terminal mein error dikhayega
    res.status(500).json({ message: error.message });
  }
};
// 2. Saare Coupons dekhne ke liye
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid or expired coupon code" });
    }

    if (new Date() > coupon.expiry) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    res.json({ message: "Coupon applied!", discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getLatestCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ isActive: true })
      .sort({ createdAt: -1 }); // Sabse naya wala pehle
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
