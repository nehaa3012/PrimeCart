import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  TrendingUp,
  Zap,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-slide for hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: "Summer Collection 2024",
      subtitle: "Discover the Latest Trends",
      description: "Elevate your style with our exclusive summer collection",
      gradient: "from-purple-600 via-pink-600 to-red-500",
      image: "🌟"
    },
    {
      title: "Tech Gadgets Sale",
      subtitle: "Up to 50% Off",
      description: "Premium electronics at unbeatable prices",
      gradient: "from-blue-600 via-cyan-600 to-teal-500",
      image: "⚡"
    },
    {
      title: "Fashion Forward",
      subtitle: "New Arrivals",
      description: "Step into the future of fashion",
      gradient: "from-indigo-600 via-purple-600 to-pink-500",
      image: "✨"
    }
  ];

  const categories = [
    { name: "Electronics", icon: "💻", color: "from-blue-500 to-cyan-500", items: "2.5k+" },
    { name: "Fashion", icon: "👗", color: "from-pink-500 to-rose-500", items: "3.2k+" },
    { name: "Home & Living", icon: "🏠", color: "from-green-500 to-emerald-500", items: "1.8k+" },
    { name: "Sports", icon: "⚽", color: "from-orange-500 to-red-500", items: "1.2k+" },
    { name: "Beauty", icon: "💄", color: "from-purple-500 to-pink-500", items: "2.1k+" },
    { name: "Books", icon: "📚", color: "from-indigo-500 to-blue-500", items: "5k+" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 234,
      image: "🎧",
      badge: "Trending",
      discount: 25
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      originalPrice: 599.99,
      rating: 4.9,
      reviews: 456,
      image: "⌚",
      badge: "Hot",
      discount: 25
    },
    {
      id: 3,
      name: "Designer Backpack",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.7,
      reviews: 189,
      image: "🎒",
      badge: "New",
      discount: 31
    },
    {
      id: 4,
      name: "Portable Speaker",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 312,
      image: "🔊",
      badge: "Sale",
      discount: 25
    }
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "On orders over $50",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% protected",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "2-3 business days",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Guaranteed satisfaction",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      content: "Amazing quality and fast delivery! The products exceeded my expectations.",
      rating: 5,
      avatar: "👩"
    },
    {
      name: "Michael Chen",
      role: "Tech Lover",
      content: "Best online shopping experience. Great customer service and authentic products.",
      rating: 5,
      avatar: "👨"
    },
    {
      name: "Emma Davis",
      role: "Regular Customer",
      content: "I've been shopping here for years. Never disappointed with the quality!",
      rating: 5,
      avatar: "👱‍♀️"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden mt-16">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.gradient} relative overflow-hidden`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                  <div className={`text-white space-y-6 transform transition-all duration-1000 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">{slide.subtitle}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/90 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex gap-4 pt-4">
                      <Link
                        to="/products"
                        className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        Shop Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className={`text-9xl flex items-center justify-center transform transition-all duration-1000 ${index === currentSlide ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-45 opacity-0'
                    }`}>
                    <div className="animate-bounce">
                      {slide.image}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/20 backdrop-blur-md w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Explore our diverse collection</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10 text-center space-y-3">
                  <div className={`text-5xl transform transition-all duration-300 ${hoveredCategory === index ? 'scale-125 rotate-12' : 'scale-100'
                    }`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.items} items</p>
                </div>
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${category.color} transition-all duration-300 ${hoveredCategory === index ? 'w-full' : 'w-0'
                  }`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Handpicked items just for you</p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${product.badge === 'Trending' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      product.badge === 'Hot' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                        product.badge === 'New' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}>
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group/heart">
                  <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all duration-300" />
                </button>

                {/* Product Image */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      {product.discount}% OFF
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl">
                    <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-white/90 text-lg">Join thousands of satisfied shoppers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Exclusive Offers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Get the latest updates on new products and exclusive deals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">
                  Subscribe
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "15K+", label: "Products" },
              { number: "50+", label: "Categories" },
              { number: "99%", label: "Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;