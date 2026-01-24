import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; // Import upload middleware

const router = express.Router();

// ADMIN ONLY (With Image Upload Support)
router.post(
  "/category/add", 
  authMiddleware, 
  adminMiddleware, 
  upload.single("image"), // This looks for the 'image' field in FormData
  createCategory
);

router.put(
  "/category/update/:id", 
  authMiddleware, 
  adminMiddleware, 
  upload.single("image"), 
  updateCategory
);

router.delete("/category/delete/:id", authMiddleware, adminMiddleware, deleteCategory);

// PUBLIC / USER
router.get("/category/all", getAllCategories);
router.get("/category/:id", getCategoryById);

export default router;