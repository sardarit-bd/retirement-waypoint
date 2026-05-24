"use client";

import { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import { BookHero } from "@/components/book/Book-Hero";
import { BookFilters } from "@/components/book/Book-Filters";
import { BookStore } from "@/components/book/Book-Store";
import { BookReviews } from "@/components/book/Book-Reviews";
import { books as allBooks } from "@/data/books";
import { BookCTA } from "@/components/book/Book-Cta";

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("retirement_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    console.error("Failed to parse cart");
    return [];
  }
}

const emptySubscribe = () => () => {};

export default function BookPage() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return null;
  }

  return <BookPageContent />;
}

function BookPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Books");
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem("retirement_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredBooks = useMemo(() => {
    let filtered = allBooks;

    if (activeCategory !== "All Books") {
      filtered = filtered.filter(
        (book) => book.category === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  const addToCart = (book) => {
    if (!book.stock) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Placeholder for checkout
  const handleCheckout = () => {
    alert("Checkout will be available after payment integration.");
  };

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <BookHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
      <BookFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <BookStore
        books={filteredBooks}
        onAddToCart={addToCart}
        cartItems={cartItems}
      />
      <BookReviews />
      <BookCTA />
    </main>
  );
}