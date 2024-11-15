'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

// Create the context
const CartContext = createContext(undefined);

// Define the initial cart state
const initialState = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalPrice: () => 0,
  clearCart: () => {},
};

// Create the provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        toast.error('Item already in cart');
        return prevItems;
      }
      toast.success('Added to cart!');
      return [...prevItems, product];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Removed from cart');
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.success('Cart cleared');
  }, []);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Create the hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}


