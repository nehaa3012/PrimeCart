import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';

function Newsletter() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Successfully subscribed to newsletter! 🎉');
            setEmail('');
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                            <Mail className="w-8 h-8 text-white" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            STAY UPTO DATE ABOUT OUR LATEST OFFERS
                        </h2>

                        <p className="text-blue-100 text-lg mb-8">
                            Subscribe to our newsletter and get 20% off your first order!
                        </p>

                        {/* Email Form */}
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        'Subscribing...'
                                    ) : (
                                        <>
                                            Subscribe
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Privacy Note */}
                        <p className="text-blue-100 text-sm mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
