import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight } from 'lucide-react';
import CartContext from '../../context/CartContext';

function CartSummary() {
  const { cart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    // Simple promo code logic (can be enhanced)
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(subtotal * 0.2);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button
            onClick={handleApplyPromo}
            className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Apply
          </button>
        </div>
        {discount > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
            ✓ Promo code applied!
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Discount</span>
            <span className="font-medium">-₹{discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Delivery Fee</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {deliveryFee === 0 ? (
              <span className="text-green-600 dark:text-green-400">Free</span>
            ) : (
              `₹${deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>

        {subtotal < 500 && subtotal > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
            Add ₹{(500 - subtotal).toFixed(2)} more for free delivery!
          </p>
        )}

        <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

        <div className="flex justify-between text-lg font-bold">
          <span className="text-gray-900 dark:text-white">Total</span>
          <span className="text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
      >
        <span>Go to Checkout</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <span>🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-1">
            <span>📦</span>
            <span>Free Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
