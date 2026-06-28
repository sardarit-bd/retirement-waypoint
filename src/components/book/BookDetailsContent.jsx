"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useFeaturedBooks } from "@/features/books/hooks/useFeaturedBooks";
import { BookCard } from "./Book-Card";
import { BookCTA } from "./Book-Cta";


function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("retirement_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    console.error("Failed to load cart");
    return [];
  }
}

export const BookDetailsContent = ({ book }) => {
  const [imageError, setImageError] = useState(false);
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const { books: featuredBooks, loading: featuredLoading } = useFeaturedBooks(4);

  const bookImage = imageError
    ? "https://placehold.co/400x600/1B2B4B/FFFFFF?text=Book+Cover"
    : book.coverImage;

    console.log(book)
  const isPublished = book.status === "PUBLISHED";
  const isInCart = cartItems.some((item) => item.id === book._id);

  useEffect(() => {
    localStorage.setItem("retirement_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = () => {
    if (!isPublished) return;

    if (isInCart) {
      // If already in cart, don't add again (digital product)
      return;
    }

    const updatedCart = [...cartItems, { ...book, quantity: 1 }];
    setCartItems(updatedCart);
  };

  const removeFromCart = () => {
    const updatedCart = cartItems.filter((item) => item.id !== book._id);
    setCartItems(updatedCart);
  };

  // Format date if publishedAt exists
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

  const publishedDate = formatDate(book.publishedAt);

  return (
    <main id="book-details" className="min-h-screen bg-[#F8F5EF]">
      <div className="min-h-screen bg-[#F8F5EF]">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B] transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Book Cover */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="relative mx-auto h-[500px] w-[333px] overflow-hidden rounded-lg bg-[#F8F5EF] shadow-2xl">
                  <Image
                    src={bookImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 768px) 100vw, 333px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-[#1B2B4B] lg:text-5xl">
                {book.title}
              </h1>

              <p className="text-xl text-[#1B2B4B]/60">by {book.authorName}</p>

              <div className="prose max-w-none text-[#1B2B4B]/80">
                <p>{book.description}</p>
              </div>

              {/* Metadata */}
              <div className="space-y-2 text-sm text-[#1B2B4B]/60">
                {book.pageCount && (
                  <p>{book.pageCount} pages</p>
                )}
                {publishedDate && (
                  <p>Published: {publishedDate}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-[#1B2B4B]">
                  $ {book.price}
                </span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                {isPublished ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      Available for Purchase
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-red-500">
                    Unavailable
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="flex items-center gap-4">
                {!isInCart ? (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!isPublished}
                    className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12 text-base font-bold"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    onClick={removeFromCart}
                    variant="destructive"
                    className="w-full h-12 text-base font-bold"
                  >
                    Remove from Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      {!featuredLoading && featuredBooks.length > 0 && (
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-2xl font-bold text-[#1B2B4B]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBooks
                .filter((b) => b._id !== book._id)
                .slice(0, 4)
                .map((b) => (
                  <BookCard
                    key={b._id}
                    book={b}
                    onAddToCart={handleAddToCart}
                    isInCart={cartItems.some((item) => item.id === b._id)}
                  />
                ))}
            </div>
          </div>
        </section>
      )}

      <BookCTA />
    </main>
  );
};