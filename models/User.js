import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  // IS LINE KO ADD KIYA HAI
  image: { 
    type: String, 
    default: "" 
  }, 
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
}, { 
  // Ye automatically createdAt aur updatedAt fields add kar dega
  timestamps: true 
});

// Password hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return; 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error(error);
  }
});

export default mongoose.model("User", userSchema);