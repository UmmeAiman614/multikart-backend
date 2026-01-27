import express from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Aapka auth middleware

const router = express.Router();

router.get("/my-wishlist", authMiddleware, getWishlist);
router.post("/toggle", authMiddleware, toggleWishlist);

export default router;