// src/components/book/details/BookDetailsContent.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, CheckCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCTA } from "../Book-Cta";
import { BookReviews } from "../Book-Reviews";
import { useFeaturedBooks } from "@/features/books/hooks/useFeaturedBooks";
import { BookCard } from "../Book-Card";

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
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const { books: featuredBooks, loading: featuredLoading } = useFeaturedBooks(4);

  const bookImage = imageError
    ? "https://placehold.co/400x600/1B2B4B/FFFFFF?text=Book+Cover"
    : book.image;

  const isInCart = cartItems.some((item) => item.id === book._id);
  const cartItem = cartItems.find((item) => item.id === book._id);

  useEffect(() => {
    localStorage.setItem("retirement_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = () => {
    if (!book.stock) return;

    let updatedCart;
    if (isInCart) {
      updatedCart = cartItems.map((item) =>
        item.id === book._id ? { ...item, quantity: quantity } : item
      );
    } else {
      updatedCart = [...cartItems, { ...book, quantity: quantity }];
    }

    setCartItems(updatedCart);
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    
    if (isInCart) {
      const updatedCart = cartItems.map((item) =>
        item.id === book._id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = () => {
    const updatedCart = cartItems.filter((item) => item.id !== book._id);
    setCartItems(updatedCart);
  };

  // Map featured books for display
  const mappedFeaturedBooks = featuredBooks.map((b) => ({
    _id: b._id,
    id: b._id,
    title: b.title,
    author: b.authorName,
    price: b.price,
    oldPrice: b.oldPrice || null,
    category: "Books",
    stock: b.status === "PUBLISHED",
    rating: 4.5,
    reviews: 100,
    image: b.coverImage,
    slug: b.slug,
    description: b.description,
    pageCount: b.pageCount,
    featured: b.featured,
    status: b.status,
  }));

  const handleAddToCart = () => {
    if (isInCart) {
      const updatedCart = cartItems.map((item) =>
        item.id === book._id ? { ...item, quantity: quantity } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...book, quantity: quantity }]);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
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
                {book.featured && (
                  <Badge className="absolute left-0 top-4 z-20 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#C9A84C] p-0 text-[11px] font-black leading-3 text-[#1B2B4B] shadow-xl ring-4 ring-white">
                    ★<span>FEATURED</span>
                  </Badge>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <Badge className="rounded-full bg-[#C9A84C]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1B2B4B]">
                {book.category || "Book"}
              </Badge>

              <h1 className="text-4xl font-bold text-[#1B2B4B] lg:text-5xl">
                {book.title}
              </h1>

              <p className="text-xl text-[#1B2B4B]/60">by {book.author}</p>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(book.rating || 4.5)
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "fill-[#E5E7EB] text-[#E5E7EB]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#1B2B4B]/50">
                  ({book.reviews?.toLocaleString() || 100} reviews)
                </span>
              </div>

              <div className="prose max-w-none text-[#1B2B4B]/80">
                <p>{book.description}</p>
              </div>

              {book.pageCount && (
                <p className="text-sm text-[#1B2B4B]/60">
                  {book.pageCount} pages
                </p>
              )}

              <div className="flex items-center gap-4">
                {book.oldPrice && (
                  <span className="text-2xl text-[#1B2B4B]/35 line-through">
                    $ {book.oldPrice}
                  </span>
                )}
                <span className="text-3xl font-black text-[#1B2B4B]">
                  $ {book.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {book.stock ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      In Stock
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-red-500">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(Math.max(1, quantity - 1))}
                    disabled={!book.stock}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={!book.stock}
                  >
                    +
                  </Button>
                </div>

                {!isInCart ? (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!book.stock}
                    className="flex-1 bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12 text-base font-bold"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    onClick={removeFromCart}
                    variant="destructive"
                    className="flex-1 h-12 text-base font-bold"
                  >
                    Remove from Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#1B2B4B]/5">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="border-[#1B2B4B]/10">
                <CardContent className="p-6">
                  <div className="prose prose-slate max-w-none">
                    <h3 className="text-xl font-semibold text-[#1B2B4B]">
                      About the Book
                    </h3>
                    <p className="text-[#1B2B4B]/80">{book.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <BookReviews />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Books Section */}
      {!featuredLoading && mappedFeaturedBooks.length > 0 && (
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-2xl font-bold text-[#1B2B4B]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mappedFeaturedBooks
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