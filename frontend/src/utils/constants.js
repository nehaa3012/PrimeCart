// Product Categories
export const CATEGORIES = [
    {
        id: 'electronics',
        name: 'Electronics',
        slug: 'electronics',
        icon: '📱',
        description: 'Latest gadgets and tech',
    },
    {
        id: 'clothing',
        name: 'Clothing',
        slug: 'clothing',
        icon: '👕',
        description: 'Fashion for everyone',
    },
    {
        id: 'footwear',
        name: 'Footwear',
        slug: 'footwear',
        icon: '👟',
        description: 'Shoes and sneakers',
    },
    {
        id: 'makeup',
        name: 'Makeup & Beauty',
        slug: 'makeup',
        icon: '💄',
        description: 'Beauty essentials',
    },
    {
        id: 'grocery',
        name: 'Grocery',
        slug: 'grocery',
        icon: '🛒',
        description: 'Fresh and organic',
    },
    {
        id: 'accessories',
        name: 'Accessories',
        slug: 'accessories',
        icon: '👜',
        description: 'Complete your look',
    },
    {
        id: 'home',
        name: 'Home & Living',
        slug: 'home',
        icon: '🏠',
        description: 'Comfort and style',
    },
    {
        id: 'sports',
        name: 'Sports & Fitness',
        slug: 'sports',
        icon: '⚽',
        description: 'Stay active',
    },
];

// Browse by Style Categories
export const STYLE_CATEGORIES = [
    {
        id: 'casual',
        name: 'Casual',
        description: 'Everyday comfort',
    },
    {
        id: 'formal',
        name: 'Formal',
        description: 'Professional attire',
    },
    {
        id: 'party',
        name: 'Party',
        description: 'Stand out in style',
    },
    {
        id: 'gym',
        name: 'Gym',
        description: 'Active wear',
    },
];

// Featured Brands
export const BRANDS = [
    'VERSACE',
    'ZARA',
    'GUCCI',
    'PRADA',
    'Calvin Klein',
    'Nike',
    'Adidas',
    'H&M',
];

// API Endpoints
export const API_ENDPOINTS = {
    PRODUCTS: {
        ALL: '/products/all',
        SINGLE: (id) => `/products/${id}`,
        CREATE: '/products/create',
        UPDATE: (id) => `/products/${id}`,
        DELETE: (id) => `/products/${id}`,
    },
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
    },
    ORDERS: {
        ALL: '/orders/all',
        SINGLE: (id) => `/orders/${id}`,
        CREATE: '/orders/create',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/update',
    },
};

// App Configuration
export const APP_CONFIG = {
    NAME: 'PrimeCart',
    TAGLINE: 'Find Clothes That Matches Your Style',
    STATS: {
        BRANDS: '200+',
        PRODUCTS: '2,000+',
        CUSTOMERS: '30,000+',
    },
};
