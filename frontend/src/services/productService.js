import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Product Service - Handles all product-related API calls
 */

// Get all products
export const getAllProducts = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.ALL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Get single product by ID
export const getProductById = async (id) => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.SINGLE(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

// Get products by category
export const getProductsByCategory = async (category) => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.ALL);
        const products = response.data.products || [];

        if (!category || category === 'all') {
            return { success: true, products };
        }

        const filtered = products.filter(
            (product) => product.category?.toLowerCase() === category.toLowerCase()
        );

        return { success: true, products: filtered, count: filtered.length };
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

// Get new arrivals (latest products)
export const getNewArrivals = async (limit = 8) => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.ALL);
        const products = response.data.products || [];

        // Sort by creation date (newest first)
        const sorted = products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);

        return { success: true, products: sorted, count: sorted.length };
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        throw error;
    }
};

// Get top selling products (by rating)
export const getTopSelling = async (limit = 8) => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.ALL);
        const products = response.data.products || [];

        // Sort by rating (highest first)
        const sorted = products
            .filter((product) => product.rating > 0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);

        return { success: true, products: sorted, count: sorted.length };
    } catch (error) {
        console.error('Error fetching top selling products:', error);
        throw error;
    }
};

// Search products
export const searchProducts = async (query) => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.ALL);
        const products = response.data.products || [];

        const filtered = products.filter((product) =>
            product.title?.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase()) ||
            product.category?.toLowerCase().includes(query.toLowerCase())
        );

        return { success: true, products: filtered, count: filtered.length };
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

export default {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getNewArrivals,
    getTopSelling,
    searchProducts,
};
