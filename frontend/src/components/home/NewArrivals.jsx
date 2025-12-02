import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { getNewArrivals } from '../../services/productService';

function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNewArrivals();
    }, []);

    const fetchNewArrivals = async () => {
        try {
            setLoading(true);
            const response = await getNewArrivals(8);
            setProducts(response.products || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching new arrivals:', err);
            // Don't show error if it's just empty products
            setProducts([]);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            NEW ARRIVALS
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Check out our latest products
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
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                        View All Products
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NewArrivals;
