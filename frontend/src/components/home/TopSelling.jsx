import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader, TrendingUp } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { getTopSelling } from '../../services/productService';

function TopSelling() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopSelling();
    }, []);

    const fetchTopSelling = async () => {
        try {
            setLoading(true);
            const response = await getTopSelling(8);
            setProducts(response.products || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching top selling:', err);
            // Don't show error if it's just empty products
            setProducts([]);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                                TOP SELLING
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Most popular products loved by customers
                        </p>
                    </div>
                    <Link
                        to="/products"
                        className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-300 font-medium"
                    >
                        View All
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400">No products available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {/* Mobile View All Button */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                        View All Products
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default TopSelling;
