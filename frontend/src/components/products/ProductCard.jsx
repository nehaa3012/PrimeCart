import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import toast from 'react-hot-toast';

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate discount percentage
  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const finalPrice = product.discountPrice || product.price;

  // Get first image or use placeholder
  const productImage = product.image?.[0]?.secure_url || 'https://via.placeholder.com/300x400?text=No+Image';

  const handleAddToCart = (e) => {
    e.preventDefault();
    toast.success(`${product.title} added to cart!`);
    // TODO: Implement actual cart functionality
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    toast('Quick view coming soon!');
  };

  return (
    <Link
      to={`/product-details/${product._id}`}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-700">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-3 right-3 z-10 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Out of Stock
          </div>
        )}

        {/* Product Image */}
        <img
          src={productImage}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={handleWishlist}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-red-500 hover:text-white'
              }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleQuickView}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${index < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {product.rating ? product.rating.toFixed(1) : '0.0'}/5
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${finalPrice.toFixed(2)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {product.brand}
          </p>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;