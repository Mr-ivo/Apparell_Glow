'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); 

  const addToCart = useCallback((product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        toast.success('Increased quantity in cart!');
        return updatedItems;
      }

      toast.success('Added to cart!');
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success('Removed from cart');
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast.success('Cart cleared');
  }, []);

  const login = useCallback((userData) => {
    setUser(userData); 
    toast.success('Logged in successfully!');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast.success('Logged out successfully!');
  }, []);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    getTotalPrice,
    clearCart,
    user, 
    login, 
    logout, 
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
