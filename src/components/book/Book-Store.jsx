"use client";

import { BookCard } from "./Book-Card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const BookStore = ({ books, onAddToCart, cartItems }) => {
  const isInCart = (bookId) => {
    return cartItems.some((item) => item.id === bookId);
  };

  return (
    <section id="book-store" className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold text-[#1B2B4B]">
              Explore Books
            </h2>
            <p className="mt-1 text-sm text-[#1B2B4B]/60">
              Showing {books.length} items
            </p>
          </div>
          <Button
            variant="ghost"
            // onClick={handlePopupOpen}
            className="group w-full cursor-pointer rounded-full bg-[#C9A84C] px-6 py-4 font-semibold text-sm! text-[#04103A] shadow-xl transition-all duration-300 hover:bg-[#04103A] hover:text-white hover:shadow-2xl sm:w-auto md:text-lg"
            asChild
          >
            <Link
              href="/assessment"
              className="flex items-center justify-center"
            >
              <span>Take Assessment</span>

              <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>

        {books.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl bg-white text-center">
            <p className="text-lg text-muted-foreground">No books found.</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={onAddToCart}
                isInCart={isInCart(book.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
