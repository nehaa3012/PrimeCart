import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Title must be at most 100 characters"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    image: [ {
        public_id: String,
        secure_url: String,
    }],
    category: {
        type: String,
        required: true,
        index: true, 
    },
    brand: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    } 
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
