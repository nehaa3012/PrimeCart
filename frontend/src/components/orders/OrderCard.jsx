import React from 'react';
import { Package, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

function OrderCard({ order }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'processing':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'cancelled':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return <CheckCircle className="w-4 h-4" />;
            case 'processing':
                return <Clock className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <Package className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                            Order #{order._id?.slice(-8).toUpperCase()}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹{order.totalAmount?.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Order Items Preview */}
            <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                {order.items?.map((item, index) => (
                    <div key={index} className="relative flex-shrink-0">
                        <img
                            src={item.product?.image?.[0]?.secure_url || '/placeholder-product.jpg'}
                            alt={item.product?.title}
                            className="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 dark:bg-gray-600 text-white text-xs flex items-center justify-center rounded-full border-2 border-white dark:border-gray-800">
                            {item.quantity}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.items?.length} {order.items?.length === 1 ? 'item' : 'items'}
                </p>
                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default OrderCard;
