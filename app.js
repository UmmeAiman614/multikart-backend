import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

// Import DB connection
import connectDB from "./config/db.js";

// Import routes
// import testimonialRoutes from "./routes/testimonialRoutes.js";

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
// app.use("/api/testimonials", testimonialRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Jewelry Backend Running 🔥");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000} 🚀`);
});

export default app;
