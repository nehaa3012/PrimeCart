import Product from "../models/Product.model.js";
import { getFilesArray, validateFiles } from "../utils/Multer.js";
import { uploadtoCloudinary , deletefromCloudinary } from "../utils/Cloudinary.js";

// create product controller
export const createProductController = async (req, res) => {
    try {
        validateFiles(getFilesArray(req));
        const images = [];

        for (const file of getFilesArray(req)) {
            const uploadedImage = await uploadtoCloudinary(file.buffer, "products");
            images.push({
                public_id: uploadedImage.public_id,
                secure_url: uploadedImage.secure_url,
            });
        }
            const product = await Product.create(
            {
                ...req.body,
                images,
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
        const products = await Product.find().populate("createdBy");
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
        const product = await Product.findById(req.params.id).populate("createdBy");
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
        const files = getFilesArray(req);

        if (files.length > 0) {
            for(const image of product.images){
                await deletefromCloudinary(image.public_id);
            }
        }

        const newImages = [];

        for(const file of files){
            const uploadedImage = await uploadtoCloudinary(file.buffer, "products");
           
            newImages.push({
                public_id: uploadedImage.public_id,
                secure_url: uploadedImage.secure_url,
            });
        }

        req.body.images = newImages;

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
        for(const image of product.images){
            await deletefromCloudinary(image.public_id);
        }

        await product.deleteOne();

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

