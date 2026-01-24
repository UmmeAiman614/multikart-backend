// controllers/categoryController.js
import Category from "../models/Category.js";

// ✅ Create Category (ADMIN)
// ✅ Create Category (ADMIN)
// ✅ Create Category (ADMIN)
export const createCategory = async (req, res) => {
  try {
    console.log("--- CREATE CATEGORY ATTEMPT ---");
    console.log("Body Data:", req.body); // Check if catName, slug are here
    console.log("File Data:", req.file); // Check if Multer caught the image

    const categoryData = {
      catName: req.body.catName,
      slug: req.body.slug,
      displayOrder: req.body.displayOrder,
      image: req.file ? req.file.path : "" // Cloudinary URL
    };

    const category = await Category.create(categoryData);
    console.log("Category Created Successfully:", category);
    res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Category (ADMIN)
export const updateCategory = async (req, res) => {
  try {
    console.log("--- UPDATE CATEGORY ATTEMPT ---");
    console.log("Target ID:", req.params.id);
    console.log("Updates Body:", req.body);
    console.log("New File:", req.file);

    const updates = { ...req.body };
    
    if (req.file) {
      updates.image = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    
    if (!category) {
      console.log("Category not found for ID:", req.params.id);
      return res.status(404).json({ message: "Category not found" });
    }

    console.log("Update Success:", category);
    res.json(category);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Categories (USER + ADMIN)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Category By ID (USER + ADMIN)
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Delete Category (ADMIN)
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
