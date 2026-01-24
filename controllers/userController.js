import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save(); // This triggers the pre-save hook above

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};
// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    console.log("--- UPDATE PROFILE START ---");
    console.log("User ID from Token:", req.user?.id);
    console.log("Text Data (req.body):", req.body);
    console.log("File Data (req.file):", req.file); // If this is undefined, Multer is the problem

    const userId = req.user.id;
    
    // We only want to update fields that are actually sent
    const updates = {};
    if (req.body.name) updates.name = req.body.name;

    // Check if req.file exists (Cloudinary/Multer success)
    if (req.file) {
      console.log("Cloudinary URL found:", req.file.path);
      updates.image = req.file.path; 
    } else {
      console.log("No file detected in request.");
    }

    console.log("Final Update Object:", updates);

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { $set: updates }, 
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      console.log("User not found in Database for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User successfully updated in DB:", updatedUser.name);
    console.log("--- UPDATE PROFILE END ---");

    res.json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });

  } catch (error) {
    console.error("CRITICAL BACKEND ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};