// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
  updateUserAdmin,
  getUserById
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// USER
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/profile", authMiddleware, getProfile);
router.put("/auth/profile/update", authMiddleware, upload.single("image"), updateProfile);
router.get("/auth/all-users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/auth/user/:id", authMiddleware, adminMiddleware, deleteUser);
router.put("/auth/user/update/:id", authMiddleware, adminMiddleware, updateUserAdmin);
router.get("/auth/user/:id", authMiddleware, adminMiddleware, getUserById);

export default router;
