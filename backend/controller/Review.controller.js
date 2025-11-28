import Review from "../models/Review.model.js";

export const addReview = async (req, res) => {
    const review = await Review.create({
        user: req.user._id,
        product: req.params.productId,
        rating: req.body.rating,
        comment: req.body.comment,
    });
    res.status(201).json({
        success: true,
        review,
    });
}