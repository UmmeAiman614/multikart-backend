// routes/testimonialRoutes.js
import express from "express";
import {
  createTestimonial,
  getAllTestimonials,
  getActiveTestimonials,
  updateTestimonial,
  deleteTestimonial
} from "../controllers/testimonialController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ADMIN
router.post("/testimonial/add", authMiddleware, adminMiddleware, createTestimonial);
router.put("/testimonial/update/:id", authMiddleware, adminMiddleware, updateTestimonial);
router.delete("/testimonial/delete/:id", authMiddleware, adminMiddleware, deleteTestimonial);

// USER + ADMIN
router.get("/testimonial/all", getAllTestimonials);
router.get("/testimonial/active", getActiveTestimonials);

export default router;
