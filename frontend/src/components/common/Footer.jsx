import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        shop: [
            { name: 'All Products', path: '/products' },
            { name: 'New Arrivals', path: '/products?filter=new' },
            { name: 'Best Sellers', path: '/products?filter=bestsellers' },
            { name: 'Sale', path: '/products?filter=sale' },
        ],
        customer: [
            { name: 'My Account', path: '/profile' },
            { name: 'Order History', path: '/orders' },
            { name: 'Shopping Cart', path: '/cart' },
            { name: 'Wishlist', path: '/wishlist' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Careers', path: '/careers' },
            { name: 'Blog', path: '/blog' },
        ],
        support: [
            { name: 'Help Center', path: '/help' },
            { name: 'Shipping Info', path: '/shipping' },
            { name: 'Returns', path: '/returns' },
            { name: 'Privacy Policy', path: '/privacy' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Github, href: '#', label: 'GitHub' },
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-2 group mb-4">
                            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                <ShoppingBag className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                                PrimeCart
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your premium destination for quality products. Shop with confidence and enjoy exceptional service.
                        </p>
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <a href="mailto:support@primecart.com" className="hover:text-blue-400 transition-colors">
                                    support@primecart.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>123 Commerce St, City, Country</span>
                            </div>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Customer</h3>
                        <ul className="space-y-3">
                            {footerLinks.customer.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <h3 className="text-white font-semibold text-lg mb-2">Subscribe to our newsletter</h3>
                            <p className="text-gray-400 text-sm">Get the latest updates on new products and upcoming sales</p>
                        </div>
                        <div className="flex gap-2 max-w-md mx-auto lg:mx-0">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-gray-400">
                            © {currentYear} PrimeCart. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>We accept:</span>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-gray-800 rounded text-gray-400">Visa</div>
                                <div className="px-2 py-1 bg-gray-800 rounded text-gray-400">Mastercard</div>
                                <div className="px-2 py-1 bg-gray-800 rounded text-gray-400">PayPal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;