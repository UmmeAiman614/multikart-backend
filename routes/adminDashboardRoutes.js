import express from "express";
import { getDashboardSummary } from "../controllers/adminController.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
// Yahan aap apna admin check middleware bhi laga sakte hain
// import { isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard-summary",authMiddleware, adminMiddleware, getDashboardSummary);

export default router;