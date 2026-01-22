// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/profile", authMiddleware, getProfile);

export default router;
