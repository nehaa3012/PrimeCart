import Review from "../models/Review.model.js";
import Product from "../models/Product.model.js";

export const addReview = async (req, res) => {
    const review = await Review.create({
        user: req.user._id,
        product: req.params.productId,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    await Product.findByIdAndUpdate(req.params.productId, {
        $push: { reviews: review._id },
    });

    res.status(201).json({
        success: true,
        review,
    });
}