/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext();

// Helper function to load cart from localStorage
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("retirement_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    console.error("Failed to load cart");
    return [];
  }
}

// Helper to save cart to localStorage
function saveCartToStorage(cart) {
  try {
    localStorage.setItem("retirement_cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const items = loadCartFromStorage();
    // Normalize cart items to use consistent id field
    const normalizedItems = items.map(item => ({
      id: item._id || item.id,
      title: item.title,
      price: item.price,
      coverImage: item.coverImage || item.image,
      quantity: item.quantity || 1,
      _id: item._id || item.id, // Keep for backward compatibility
    }));
    setCartItems(normalizedItems);
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, isInitialized]);

  // Add item to cart
  const addToCart = useCallback((book) => {
    if (book.status !== "PUBLISHED") return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === book._id);
      
      if (existingIndex >= 0) {
        // Item exists, increment quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      
      // New item
      return [
        ...prev,
        {
          id: book._id,
          _id: book._id,
          title: book.title,
          price: book.price,
          coverImage: book.coverImage,
          quantity: 1,
        },
      ];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
  }, []);

  // Update quantity of an item
  const updateQuantity = useCallback((bookId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Check if item is in cart
  const isInCart = useCallback((bookId) => {
    return cartItems.some((item) => item.id === bookId);
  }, [cartItems]);

  // Calculate cart count and subtotal with useMemo for performance
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    isInitialized,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}