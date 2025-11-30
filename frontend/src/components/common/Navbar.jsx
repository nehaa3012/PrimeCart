import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Orders", path: "/orders" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                            PrimeCart
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative font-medium text-sm transition-colors duration-300 ${isActive(link.path)
                                        ? "text-blue-600"
                                        : "text-gray-600 hover:text-blue-600"
                                    }`}
                            >
                                {link.name}
                                <span
                                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 ${isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link to="/profile" className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
                            <User className="w-5 h-5" />
                        </Link>
                        <Link to="/cart" className="relative text-gray-500 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm animate-bounce">
                                0
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none transition-colors duration-300"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out origin-top ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive(link.path)
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-gray-100 my-2 pt-2 space-y-2">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                        >
                            Cart (0)
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;