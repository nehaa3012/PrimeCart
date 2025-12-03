import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add product to cart
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);

            if (existingItem) {
                toast.success('Quantity updated in cart');
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                toast.success('Added to cart');
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
        toast.success('Removed from cart');
    };

    // Update product quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
        toast.success('Cart cleared');
    };

    // Get cart total with validation
    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    // Get cart item count with validation
    const getCartCount = () => {
        return cart.reduce((count, item) => {
            const quantity = Number(item.quantity) || 0;
            return count + quantity;
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;