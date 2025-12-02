import React from 'react';
import { Link } from 'react-router-dom';
import { STYLE_CATEGORIES } from '../../utils/constants';

function BrowseByStyle() {
    // Style category images from Unsplash
    const styleImages = {
        casual: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop',
        formal: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop',
        party: 'https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=600&h=800&fit=crop',
        gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop',
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        BROWSE BY DRESS STYLE
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Find your perfect style for any occasion
                    </p>
                </div>

                {/* Style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STYLE_CATEGORIES.map((style) => (
                        <Link
                            key={style.id}
                            to={`/products?style=${style.id}`}
                            className="group relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                        >
                            {/* Background Image */}
                            <img
                                src={styleImages[style.id]}
                                alt={style.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <h3 className="text-3xl font-bold text-white mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                                    {style.name}
                                </h3>
                                <p className="text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    {style.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BrowseByStyle;
