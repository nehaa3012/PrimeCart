import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Users,
    ShoppingBag,
    Package,
    BarChart3,
    Trash2,
    Edit,
    Shield,
    Search,
    Plus,
    X,
    Loader2,
    ChevronDown,
    Eye
} from 'lucide-react';

function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ users: 0, orders: 0 });
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        brand: ''
    });
    const [productImages, setProductImages] = useState([]);

    const API_URL = 'http://localhost:8000/api';

    // Fetch dashboard stats
    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/stats`, {
                withCredentials: true
            });
            setStats(response.data.stats);
        } catch (error) {
            toast.error('Failed to fetch statistics');
        }
    };

    // Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/admin/users`, {
                withCredentials: true
            });
            setUsers(response.data.users);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all orders
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/admin/orders`, {
                withCredentials: true
            });
            setOrders(response.data.orders);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/products/all`);
            setProducts(response.data.products);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    // Update user role
    const updateUserRole = async (userId, newRole) => {
        try {
            await axios.put(`${API_URL}/admin/users/role/${userId}`,
                { role: newRole },
                { withCredentials: true }
            );
            toast.success('User role updated successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update user role');
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${API_URL}/admin/users/${userId}`, {
                withCredentials: true
            });
            toast.success('User deleted successfully');
            fetchUsers();
            setShowDeleteModal(false);
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/orders/${orderId}`,
                { status: newStatus },
                { withCredentials: true }
            );
            toast.success('Order status updated successfully');
            fetchOrders();
        } catch (error) {
            toast.error('Failed to update order status');
        }
    };

    // Delete order
    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`${API_URL}/orders/${orderId}`, {
                withCredentials: true
            });
            toast.success('Order deleted successfully');
            fetchOrders();
            setShowDeleteModal(false);
        } catch (error) {
            toast.error('Failed to delete order');
        }
    };

    // Create/Update product
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            Object.keys(productForm).forEach(key => {
                formData.append(key, productForm[key]);
            });

            productImages.forEach(image => {
                formData.append('images', image);
            });

            if (editingProduct) {
                await axios.put(`${API_URL}/products/${editingProduct._id}`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Product updated successfully');
            } else {
                await axios.post(`${API_URL}/products/create`, formData, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Product created successfully');
            }

            setShowProductModal(false);
            resetProductForm();
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`${API_URL}/products/${productId}`, {
                withCredentials: true
            });
            toast.success('Product deleted successfully');
            fetchProducts();
            setShowDeleteModal(false);
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const resetProductForm = () => {
        setProductForm({
            title: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            brand: ''
        });
        setProductImages([]);
        setEditingProduct(null);
    };

    const openEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            brand: product.brand || ''
        });
        setShowProductModal(true);
    };

    const confirmDelete = (type, id) => {
        setDeleteTarget({ type, id });
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (deleteTarget.type === 'user') deleteUser(deleteTarget.id);
        else if (deleteTarget.type === 'order') deleteOrder(deleteTarget.id);
        else if (deleteTarget.type === 'product') deleteProduct(deleteTarget.id);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
        else if (activeTab === 'orders') fetchOrders();
        else if (activeTab === 'products') fetchProducts();
    }, [activeTab]);

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'products', label: 'Products', icon: Package }
    ];

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredOrders = orders.filter(order =>
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage your e-commerce platform</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 bg-gray-800/50 p-2 rounded-2xl backdrop-blur-sm border border-gray-700">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <Users className="h-12 w-12 text-white/80" />
                                <div className="text-right">
                                    <p className="text-blue-100 text-sm font-medium">Total Users</p>
                                    <p className="text-4xl font-bold text-white">{stats.users}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <ShoppingBag className="h-12 w-12 text-white/80" />
                                <div className="text-right">
                                    <p className="text-cyan-100 text-sm font-medium">Total Orders</p>
                                    <p className="text-4xl font-bold text-white">{stats.orders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <Package className="h-12 w-12 text-white/80" />
                                <div className="text-right">
                                    <p className="text-purple-100 text-sm font-medium">Total Products</p>
                                    <p className="text-4xl font-bold text-white">{products.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <BarChart3 className="h-12 w-12 text-white/80" />
                                <div className="text-right">
                                    <p className="text-pink-100 text-sm font-medium">Revenue</p>
                                    <p className="text-4xl font-bold text-white">$0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {filteredUsers.map(user => (
                                            <tr key={user._id} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                                                        className="bg-gray-900 border border-gray-600 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="User">User</option>
                                                        <option value="Admin">Admin</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => confirmDelete('user', user._id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Items</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {filteredOrders.map(order => (
                                            <tr key={order._id} className="hover:bg-gray-700/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                                                    {order._id.slice(-8)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-300">{order.user?.name}</div>
                                                    <div className="text-xs text-gray-500">{order.user?.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {order.orderItems?.length || 0} items
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    ${order.totalPrice || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={order.orderStatus}
                                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                        className="bg-gray-900 border border-gray-600 text-gray-300 text-sm rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => confirmDelete('order', order._id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        resetProductForm();
                                        setShowProductModal(true);
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg shadow-blue-500/30"
                                >
                                    <Plus className="h-5 w-5" />
                                    Add Product
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <div key={product._id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
                                        <div className="aspect-square overflow-hidden bg-gray-900">
                                            {product.image?.[0]?.secure_url ? (
                                                <img
                                                    src={product.image[0].secure_url}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="h-16 w-16 text-gray-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-white mb-1 truncate">{product.title}</h3>
                                            <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xl font-bold text-blue-400">${product.price}</span>
                                                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditProduct(product)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => confirmDelete('product', product._id)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full">
                            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete this {deleteTarget?.type}? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Modal */}
                {showProductModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
                        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-2xl w-full my-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowProductModal(false);
                                        resetProductForm();
                                    }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleProductSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={productForm.title}
                                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                                        <input
                                            type="number"
                                            required
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                                        <input
                                            type="number"
                                            required
                                            value={productForm.stock}
                                            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                        <input
                                            type="text"
                                            required
                                            value={productForm.category}
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Brand</label>
                                        <input
                                            type="text"
                                            value={productForm.brand}
                                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Product Images</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => setProductImages(Array.from(e.target.files))}
                                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload up to 10 images</p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProductModal(false);
                                            resetProductForm();
                                        }}
                                        className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editingProduct ? 'Update Product' : 'Create Product'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;