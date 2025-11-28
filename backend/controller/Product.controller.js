import Product from "../models/Product.model.js";

// create product controller
export const createProductController = async (req, res) => {
    try {
        const product = await Product.create(
            {
                ...req.body,
                createdBy: req.user._id,
            }
        );
        res.status(201).json({
            success: true,
            product,
        });
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error,
        });
    }
};

// get all products controller
export const getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get products",
            error,
        });
    }
};

// get single product controller
export const getSingleProductController = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            success: true,
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get product",
            error,
        });
    }
};

// update product controller
export const updateProductController = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedBy: req.user._id,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            success: true,
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error,
        });
    }
};

// delete product controller
export const deleteProductController = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error,
        });
    }
};

