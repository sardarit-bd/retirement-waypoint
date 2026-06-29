"use client";

import { BookCard } from "./Book-Card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { BookSkeleton } from "./Book-Skeleton";
import { BookEmpty } from "./Book-Empty";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="px-4 text-sm text-[#1B2B4B]">
        Page {page} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="cursor-pointer"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const BookStore = ({ 
  books, 
  loading,
  pagination,
  onPageChange,
}) => {
  if (loading && books.length === 0) {
    return (
      <section id="book-store" className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BookSkeleton count={8} />
        </div>
      </section>
    );
  }

  if (!loading && books.length === 0) {
    return (
      <section id="book-store" className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BookEmpty />
        </div>
      </section>
    );
  }

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
              {pagination?.total && ` (${pagination.total} total)`}
            </p>
          </div>
          <Button
            variant="ghost"
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {loading && (
          <div className="mt-8">
            <BookSkeleton count={4} />
          </div>
        )}

        {pagination && onPageChange && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
};