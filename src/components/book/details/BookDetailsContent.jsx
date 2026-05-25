"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle,
  BookOpen,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookCTA } from "../Book-Cta";
import { BookStore } from "../Book-Store";
import { BookReviews } from "../Book-Reviews";
import getSamplePreview from "./GetSamplePreview";
import { books as allBooks } from "@/data/books";


function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("retirement_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    console.error("Failed to load cart");
    return [];
  }
}

export function BookDetailsContent({ book, bookId, router }) {
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [cartItems, setCartItems] = useState(loadCartFromStorage);

  const cartLine = cartItems.find((item) => item.id === bookId);
  const isInCart = Boolean(cartLine);
  const quantity = cartLine?.quantity ?? 1;

  const addToCart = () => {
    if (!book.stock) return;

    let updatedCart;
    if (isInCart) {
      updatedCart = cartItems.map((item) =>
        item.id === book.id ? { ...item, quantity: quantity } : item
      );
    } else {
      updatedCart = [...cartItems, { ...book, quantity: quantity }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("retirement_cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    if (isInCart) {
      const updatedCart = cartItems.map((item) =>
        item.id === book.id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("retirement_cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = () => {
    const updatedCart = cartItems.filter((item) => item.id !== book.id);
    setCartItems(updatedCart);
    localStorage.setItem("retirement_cart", JSON.stringify(updatedCart));
  };

  const samplePreview = getSamplePreview(book.id, book.category, book.title);

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      {/* Back Button */}
      <div className="bg-[#1B2B4B] px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Button
            variant="ghost"
            className="mb-4 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Button>
        </div>
      </div>

      {/* Book Details Hero */}
      <section className="bg-[#1B2B4B] px-4 pb-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Book Cover */}
            <div className="relative">
              <div className="relative mx-auto h-96 w-64 overflow-hidden rounded-2xl shadow-2xl lg:mx-0">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {book.discount > 0 && (
                <Badge className="absolute -left-3 top-3 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#C9A84C] text-[11px] font-black text-[#1B2B4B] shadow-xl ring-4 ring-white">
                  {book.discount}%<span>OFF</span>
                </Badge>
              )}
            </div>

            {/* Book Info */}
            <div>
              <Badge className="mb-4 bg-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/30">
                {book.category}
              </Badge>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {book.title}
              </h1>
              <p className="mt-2 text-lg text-white/70">by {book.author}</p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(book.rating)
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "fill-white/20 text-white/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  {book.rating} out of 5 stars · {book.reviews.toLocaleString()} ratings
                </span>
              </div>

              {/* Price - USD */}
              <div className="mt-6 flex items-center gap-3">
                {book.oldPrice > book.price && (
                  <span className="text-xl text-white/40 line-through">
                    ${book.oldPrice}
                  </span>
                )}
                <span className="text-4xl font-black text-[#C9A84C]">
                  ${book.price}
                </span>
                {book.discount > 0 && (
                  <Badge className="bg-green-600 text-white">
                    Save {book.discount}%
                  </Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="mt-3 flex items-center gap-2">
                {book.stock ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">
                      In Stock · Ready to Ship
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-red-400">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-6 text-white/80">{book.description}</p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Dialog open={isSampleOpen} onOpenChange={setIsSampleOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Sample
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#1B2B4B]">
                        Sample Preview: {book.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div
                      className="prose prose-slate mt-4 max-w-none"
                      dangerouslySetInnerHTML={{ __html: samplePreview }}
                    />
                    <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsSampleOpen(false)}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
                        onClick={() => {
                          setIsSampleOpen(false);
                          addToCart();
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {!isInCart ? (
                  <Button
                    onClick={addToCart}
                    disabled={!book.stock}
                    className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] disabled:opacity-50"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(quantity - 1)}
                      className="border-[#C9A84C] text-[#C9A84C]"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center font-semibold text-white">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(quantity + 1)}
                      className="border-[#C9A84C] text-[#C9A84C]"
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={removeFromCart}
                      className="text-red-400 hover:bg-red-400/10 hover:text-red-300"
                    >
                      Remove
                    </Button>
                  </div>
                )}

                <Button variant="outline" className="border-white/20 text-white">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>

                <Button variant="ghost" className="text-white/60">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Delivery Info - USA Focused */}
              <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $50 (USA only)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section id="tabs-section" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1B2B4B]/5">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Product Details</TabsTrigger>
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
                    <h4 className="mt-4 text-lg font-semibold text-[#1B2B4B]">
                      What You&apos;ll Learn:
                    </h4>
                    <ul className="list-disc pl-5 text-[#1B2B4B]/80">
                      <li>How to create a retirement vision that goes beyond financial security</li>
                      <li>Strategies for finding purpose and meaning after work</li>
                      <li>Ways to maintain social connections and build new ones</li>
                      <li>Practical frameworks for phased retirement transitions</li>
                      <li>Tools to assess your readiness across multiple dimensions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card className="border-[#1B2B4B]/10">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-[#1B2B4B]">Format:</span>
                      <span className="text-[#1B2B4B]/80">Paperback, eBook</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-[#1B2B4B]">Publisher:</span>
                      <span className="text-[#1B2B4B]/80">Retirement Waypoint Press</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-[#1B2B4B]">Language:</span>
                      <span className="text-[#1B2B4B]/80">English</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-semibold text-[#1B2B4B]">Country:</span>
                      <span className="text-[#1B2B4B]/80">United States</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#1B2B4B]">ISBN:</span>
                      <span className="text-[#1B2B4B]/80">978-0-{book.id.split('-')[1]}-55555-5</span>
                    </div>
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
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold text-[#1B2B4B]">
            You May Also Like
          </h2>
          <BookStore
            books={allBooks
              .filter((b) => b.id !== book.id && b.category === book.category)
              .slice(0, 4)}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        </div>
      </section>

      <BookCTA />
    </main>
  );
}