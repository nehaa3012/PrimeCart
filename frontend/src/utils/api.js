import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    toast.error('Unauthorized. Please login again.');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    toast.error('Access forbidden.');
                    break;
                case 404:
                    toast.error('Resource not found.');
                    break;
                case 500:
                    toast.error('Server error. Please try again later.');
                    break;
                default:
                    toast.error(data?.message || 'An error occurred.');
            }
        } else if (error.request) {
            // Request made but no response received
            toast.error('Network error. Please check your connection.');
        } else {
            // Something else happened
            toast.error('An unexpected error occurred.');
        }

        return Promise.reject(error);
    }
);

export default api;
