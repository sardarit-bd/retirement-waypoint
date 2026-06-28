"use client";

import { useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBook } from "@/features/books/hooks/useBook";
import { BookDetailsContent } from "@/components/book/details/BookDetailsContent";
import { BookDetailsSkeleton } from "@/components/book/details/BookDetailsSkeleton";

const emptySubscribe = () => () => {};

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const slug = mounted ? params?.slug : null;

  const { book, loading, error } = useBook(slug);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookDetailsSkeleton />
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] py-32 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-[#1B2B4B]">
            Book Not Found
          </h1>

          <p className="mt-2 text-[#1B2B4B]/60">
            {error || "Sorry, we couldn't find the book you're looking for."}
          </p>

          <button
            className="mt-6 rounded-2xl bg-[#C9A84C] px-6 py-3 font-bold text-[#1B2B4B] hover:bg-[#D6B45A]"
            onClick={() => router.push("/book")}
          >
            Back to Store
          </button>
        </div>
      </main>
    );
  }

  const mappedBook = {
    _id: book._id,
    id: book._id,
    title: book.title,
    author: book.authorName,
    price: book.price,
    oldPrice: null,
    category: "Books",
    stock: book.status === "PUBLISHED",
    rating: 4.5,
    reviews: 100,
    image: book.coverImage,
    slug: book.slug,
    description: book.description,
    pageCount: book.pageCount,
    featured: book.featured,
    status: book.status,
  };

  return <BookDetailsContent book={mappedBook} />;
}