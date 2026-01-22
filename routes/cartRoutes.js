// routes/cartRoutes.js
import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
} from "../controllers/cartController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER
router.post("/cart/add", authMiddleware, addToCart);
router.get("/cart/view", authMiddleware, getCart);
router.delete("/cart/remove/:productId", authMiddleware, removeFromCart);
router.delete("/cart/clear", authMiddleware, clearCart);

export default router;
