import api from '../utils/api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Order Service - Handles all order-related API calls
 */

// Create a new order
export const createOrder = async (orderData) => {
    try {
        const response = await api.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Get all orders for the current user
export const getUserOrders = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.ORDERS.ALL);
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

// Get single order by ID
export const getOrderById = async (id) => {
    try {
        const response = await api.get(API_ENDPOINTS.ORDERS.SINGLE(id));
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};

export default {
    createOrder,
    getUserOrders,
    getOrderById,
};
