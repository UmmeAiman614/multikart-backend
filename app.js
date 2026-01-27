import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

// DB
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
const app = express();

// Connect MongoDB
connectDB();

// CORS config (frontend allowed)
app.use(
  cors({
    origin: [
      "https://multikart-ecommerce-xgu2.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", testimonialRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminDashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Jewelry Backend Running 🔥");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});
export default app;
