// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getFeaturedProducts,
  getSaleProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ADMIN
router.post("/product/add", authMiddleware, adminMiddleware, createProduct);
router.put("/product/update/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/product/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

// USER + ADMIN
router.get("/product/all", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.get("/product/featured/all", getFeaturedProducts);
router.get("/product/sale/all", getSaleProducts);

export default router;
