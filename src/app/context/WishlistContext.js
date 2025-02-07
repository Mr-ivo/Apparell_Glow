"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      // Check if product already exists in wishlist
      const exists = prevItems.some(item => item._id === product._id);
      if (!exists) {
        // If product doesn't exist, add it to wishlist
        return [...prevItems, product];
      }
      // If product exists, return unchanged array
      return prevItems;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item._id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
