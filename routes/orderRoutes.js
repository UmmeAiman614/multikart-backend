// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders
} from "../controllers/orderController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// USER
router.post("/order/create", authMiddleware, createOrder);
router.get("/order/my-orders", authMiddleware, getUserOrders);

// ADMIN
router.get("/order/all", authMiddleware, adminMiddleware, getAllOrders);

export default router;
