import express from "express";
const router = express.Router();
import { 
  createCoupon, 
  getAllCoupons, 
  applyCoupon, 
  getLatestCoupon
} from "../controllers/couponController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

// Public: User coupon apply karne ke liye
router.post("/apply", authMiddleware, applyCoupon);
router.get("/latest", authMiddleware, getLatestCoupon);

// Private: Sirf Admin naye coupon banane aur dekhne ke liye
router.post("/create", authMiddleware, adminMiddleware, createCoupon);
router.get("/all", authMiddleware, adminMiddleware, getAllCoupons);
export default router;