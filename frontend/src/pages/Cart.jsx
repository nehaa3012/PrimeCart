import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import CartContext from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium">Cart</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {cart.length === 0
              ? 'Your cart is empty'
              : `${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="relative mb-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 dark:text-gray-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🛒
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
            </Link>
          </div>
        ) : (
          /* Cart Items and Summary */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>

              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;