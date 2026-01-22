// routes/categoryRoutes.js
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

const router = express.Router();

// ADMIN
router.post("/category/add", authMiddleware, adminMiddleware, createCategory);
router.put("/category/update/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/category/delete/:id", authMiddleware, adminMiddleware, deleteCategory);

// USER + ADMIN
router.get("/category/all", getAllCategories);
router.get("/category/:id", getCategoryById);

export default router;
