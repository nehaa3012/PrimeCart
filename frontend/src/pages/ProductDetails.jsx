import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield, ArrowLeft, Minus, Plus, Share2, Heart } from 'lucide-react';
import productService from '../services/productService';
import CartContext from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';
import toast from 'react-hot-toast';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const data = await productService.getProductById(id);
      setProduct(data.product);

      // Fetch related products
      if (data.product?.category) {
        const related = await productService.getProductsByCategory(data.product.category);
        setRelatedProducts(related.products.filter(p => p._id !== id).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <button
            onClick={() => navigate('/products')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Products
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
              <img
                src={product.image || '/placeholder-product.jpg'}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Thumbnails (Mock data if multiple images not available) */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx
                      ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900/30'
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  <img src={img || '/placeholder-product.jpg'} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating || 0)
                            ? 'fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                  In Stock
                </span>
              </div>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price?.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through mb-1">
                    ₹{product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-red-500 font-bold mb-1">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Actions */}
              <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 font-bold py-4 rounded-xl hover:border-gray-900 dark:hover:border-white transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-4">
                  <button className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Heart className="w-4 h-4" /> Add to Wishlist
                  </button>
                  <button className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" /> Share Product
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Free Delivery</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">For orders over ₹500</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/10 rounded-xl">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">1 Year Warranty</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Standard warranty included</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;