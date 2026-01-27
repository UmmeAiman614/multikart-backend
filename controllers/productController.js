import Product from "../models/Product.js";


// ✅ 1. Naya Function: Stock Subtract karne ke liye (Order success par call hoga)
export const updateStockAfterPurchase = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // $inc operator - quantity ko minus karega
    product.stock -= quantity;
    await product.save();

    res.json({ message: "Stock updated successfully", remainingStock: product.stock });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Product (Admin) - With Delete Images Logic
export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Boolean conversion
    if (updates.isFeatured !== undefined) {
      updates.isFeatured = updates.isFeatured === 'true' || updates.isFeatured === true;
    }
    if (updates.isOnSale !== undefined) {
      updates.isOnSale = updates.isOnSale === 'true' || updates.isOnSale === true;
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // --- DELETE IMAGES LOGIC ---
    // Agar admin ne koi purani images delete ki hain (Frontend se deletedImages ka array aayega)
    if (req.body.deletedImages) {
      const imagesToRemove = JSON.parse(req.body.deletedImages);
      product.images = product.images.filter(img => !imagesToRemove.includes(img));
    }

    // --- ADD NEW IMAGES ---
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      product.images = [...product.images, ...newImages]; // Purani mein nayi add hongi
    }

    // Baqi data update karein
    Object.keys(updates).forEach((key) => {
      if (key !== 'images' && key !== 'deletedImages') {
        product[key] = updates[key];
      }
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create Product (Admin)
export const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
      isOnSale: req.body.isOnSale === 'true' || req.body.isOnSale === true,
    };

    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(file => file.path);
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
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
