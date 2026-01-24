import express from "express";
const router = express.Router();
import { 
  createReview, 
  getProductReviews, 
  getAllReviewsAdmin, 
  updateReviewStatus,
  deleteReview 
} from "../controllers/reviewController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

// Public Routes
router.post("/", createReview);
router.get("/product/:productId", getProductReviews);

// Admin Routes (Inhein aap apne verifyAdmin middleware se protect karein)
router.get("/all",authMiddleware, adminMiddleware, getAllReviewsAdmin);
router.put("/approve/:id", authMiddleware, adminMiddleware, updateReviewStatus);
router.delete("/:id", authMiddleware, adminMiddleware, deleteReview);

export default router;