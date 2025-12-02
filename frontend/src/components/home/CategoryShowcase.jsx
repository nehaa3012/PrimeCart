import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import { ArrowRight } from 'lucide-react';

function CategoryShowcase() {
    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Explore our wide range of products across multiple categories
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.slug}`}
                            className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 text-center">
                                {/* Icon */}
                                <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    {category.icon}
                                </div>

                                {/* Category Name */}
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {category.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {category.description}
                                </p>

                                {/* Arrow Icon */}
                                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-sm font-medium">Explore</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategoryShowcase;
