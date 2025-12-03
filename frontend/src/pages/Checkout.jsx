import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Banknote, MapPin, Mail, Phone, User, FileText } from 'lucide-react';
import CartContext from '../context/CartContext';
import toast from 'react-hot-toast';

function Checkout() {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    paymentMethod: 'cod',
    orderNotes: '',
  });

  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    // Simulate order placement
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

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
          <Link
            to="/cart"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cart
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium">Checkout</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your order by filling in the details below
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delivery Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.fullName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                        placeholder="1234567890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.address
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.city
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.state
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                      placeholder="Maharashtra"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>

                  {/* Postal Code */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.postalCode
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all`}
                      placeholder="400001"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <label className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600"
                    />
                    <Banknote className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pay when you receive
                      </p>
                    </div>
                  </label>

                  {/* Credit/Debit Card */}
                  <label className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600"
                    />
                    <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </label>

                  {/* UPI */}
                  <label className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600"
                    />
                    <Wallet className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">UPI</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Google Pay, PhonePe, Paytm
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Order Notes (Optional)
                  </h2>
                </div>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Any special instructions for delivery..."
                ></textarea>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Products */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <img
                        src={item.image?.[0]?.secure_url || '/placeholder-product.jpg'}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          ₹{((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
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
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tax (5%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ₹{tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-gray-900 dark:text-white">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Place Order
                </button>

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;