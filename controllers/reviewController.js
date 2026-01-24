import Review from "../models/Review.js";

// 1. Submit a Review (Public)
export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ message: "Review submitted! Waiting for approval.", review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Get Approved Reviews for a Product (Public)
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      product: req.params.productId, 
      isApproved: true 
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Admin: Get All Reviews
export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find().populate("product", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Admin: Update Approval Status
export const updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id, 
      { isApproved: req.body.isApproved }, 
      { new: true }
    );
    res.json({ message: "Review status updated", review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. Admin: Delete Review
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};