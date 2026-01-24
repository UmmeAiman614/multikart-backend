import Product from "../models/Product.js";


// ✅ Create Product (Admin)
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
      isOnSale: req.body.isOnSale === 'true' || req.body.isOnSale === true,
    };

    if (req.file) {
      productData.image = req.file.path;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Product (Admin)
// ✅ Update Product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Fix: Convert strings to booleans for the update as well
    if (updates.isFeatured !== undefined) {
      updates.isFeatured = updates.isFeatured === 'true' || updates.isFeatured === true;
    }
    if (updates.isOnSale !== undefined) {
      updates.isOnSale = updates.isOnSale === 'true' || updates.isOnSale === true;
    }

    if (req.file) {
      updates.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      { $set: updates }, 
      { new: true }
    );
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Featured Products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Sale Products
export const getSaleProducts = async (req, res) => {
  try {
    const products = await Product.find({ isOnSale: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
