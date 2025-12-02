import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

function CustomerReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews = [
        {
            id: 1,
            name: 'Sarah M.',
            rating: 5,
            comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
            verified: true,
        },
        {
            id: 2,
            name: 'Alex K.',
            rating: 5,
            comment: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
            verified: true,
        },
        {
            id: 3,
            name: 'James L.',
            rating: 5,
            comment: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
            verified: true,
        },
        {
            id: 4,
            name: 'Emily R.',
            rating: 5,
            comment: "The customer service is outstanding! They helped me find the perfect outfit for my event. The quality of the products is exceptional and the delivery was super fast.",
            verified: true,
        },
    ];

    // Auto-rotate reviews
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [reviews.length]);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        OUR HAPPY CUSTOMERS
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        See what our customers are saying about us
                    </p>
                </div>

                {/* Reviews Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevReview}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        aria-label="Previous review"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextReview}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                        aria-label="Next review"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Reviews Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
                                        {/* Rating Stars */}
                                        <div className="flex items-center gap-1 mb-4">
                                            {[...Array(review.rating)].map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className="w-6 h-6 text-yellow-400 fill-yellow-400"
                                                />
                                            ))}
                                        </div>

                                        {/* Customer Name & Badge */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {review.name}
                                            </h3>
                                            {review.verified && (
                                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                                                    ✓ Verified Purchase
                                                </span>
                                            )}
                                        </div>

                                        {/* Review Comment */}
                                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-blue-600 dark:bg-blue-400 w-8'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                                aria-label={`Go to review ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CustomerReviews;
