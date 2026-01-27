// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getFeaturedProducts,
  getSaleProducts,
  updateProduct,
  deleteProduct,
  updateStockAfterPurchase
} from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; // Import your multer config
const router = express.Router();

// ADMIN


// ADMIN Routes with Image Support
// ✅ Route update: single ki jagah array use kiya he
router.post("/product/add", authMiddleware, adminMiddleware, upload.array("images", 5), createProduct);
router.put("/product/update/:id", authMiddleware, adminMiddleware, upload.array("images", 5), updateProduct);
router.delete("/product/delete/:id", authMiddleware, adminMiddleware, deleteProduct);
router.post("/product/update-stock", updateStockAfterPurchase);

// USER + ADMIN
router.get("/product/all", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.get("/product/featured/all", getFeaturedProducts);
router.get("/product/sale/all", getSaleProducts);

export default router;
