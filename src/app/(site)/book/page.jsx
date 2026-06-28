"use client";

import { useState, useEffect } from "react";
import { useSyncExternalStore } from "react";
import { BookHero } from "@/components/book/Book-Hero";
import { BookStore } from "@/components/book/Book-Store";
import { BookReviews } from "@/components/book/Book-Reviews";
import { useBooks } from "@/features/books/hooks/useBooks";
import { useDebouncedSearch } from "@/features/books/hooks/useDebouncedSearch";
import { BookSkeleton } from "@/components/book/Book-Skeleton";
import { BookError } from "@/components/book/Book-Error";

const emptySubscribe = () => () => {};

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("retirement_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    console.error("Failed to parse cart");
    return [];
  }
}

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
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const ITEMS_PER_PAGE = 12;

  const [searchValue, setSearchValue, debouncedSearch] = useDebouncedSearch("", 500);
  
  useEffect(() => {
    setSearchValue(searchInput);
  }, [searchInput, setSearchValue]);

  const { books, pagination, loading, error, refetch } = useBooks({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    refetch({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearch || undefined,
    });
  }, [debouncedSearch, currentPage, refetch]);

  useEffect(() => {
    localStorage.setItem("retirement_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    if (book.status !== "PUBLISHED") return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book._id);
      if (existing) {
        return prev.map((item) =>
          item.id === book._id
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

  const handleCheckout = () => {
    alert("Checkout will be available after payment integration.");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && books.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookHero
          searchQuery={searchInput}
          setSearchQuery={setSearchInput}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
        />
        <BookSkeleton count={ITEMS_PER_PAGE} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookHero
          searchQuery={searchInput}
          setSearchQuery={setSearchInput}
          cartCount={cartCount}
          cartSubtotal={cartSubtotal}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
        />
        <BookError error={error} onRetry={() => refetch()} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <BookHero
        searchQuery={searchInput}
        setSearchQuery={setSearchInput}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
      <BookStore
        books={books}
        onAddToCart={addToCart}
        cartItems={cartItems}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      <BookReviews />
    </main>
  );
}