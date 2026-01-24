// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// USER
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/profile", authMiddleware, getProfile);
router.put("/auth/profile/update", authMiddleware, upload.single("image"), updateProfile);

export default router;
