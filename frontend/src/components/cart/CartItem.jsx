import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import CartContext from '../../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Ensure price and quantity are valid numbers
  const price = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1;

  const handleIncrement = () => {
    updateQuantity(item._id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(item._id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item._id);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="flex gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={item.image?.[0]?.secure_url || '/placeholder-product.jpg'}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-1">
                {item.category || 'General'}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={handleDecrement}
                  className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-1.5 rounded-md hover:bg-white dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  ₹{(price * quantity).toFixed(2)}
                </p>
                {quantity > 1 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ₹{price.toFixed(2)} each
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;