import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { APP_CONFIG, BRANDS } from '../../utils/constants';

function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                New Season Collection
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                            <span className="text-gray-900 dark:text-white">FIND CLOTHES</span>
                            <br />
                            <span className="text-gray-900 dark:text-white">THAT MATCHES</span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                YOUR STYLE
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                            Browse through our diverse range of meticulously crafted garments, designed
                            to bring out your individuality and cater to your sense of style.
                        </p>

                        {/* CTA Button */}
                        <Link
                            to="/products"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            Shop Now
                        </Link>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {APP_CONFIG.STATS.BRANDS}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    International Brands
                                </p>
                            </div>
                            <div className="h-12 w-px bg-gray-200 dark:bg-gray-700" />
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {APP_CONFIG.STATS.PRODUCTS}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    High-Quality Products
                                </p>
                            </div>
                            <div className="h-12 w-px bg-gray-200 dark:bg-gray-700" />
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {APP_CONFIG.STATS.CUSTOMERS}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Happy Customers
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="relative lg:block hidden">
                        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
                                alt="Fashion Model"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                            <span className="text-2xl">✨</span>
                        </div>
                    </div>
                </div>

                {/* Brand Logos */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
                        {BRANDS.slice(0, 5).map((brand) => (
                            <div
                                key={brand}
                                className="text-2xl font-bold text-gray-900 dark:text-white hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
