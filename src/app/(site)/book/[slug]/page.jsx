"use client";

import { useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBook } from "@/features/books/hooks/useBook";
import { BookDetailsSkeleton } from "@/components/book/details/BookDetailsSkeleton";
import { BookDetailsContent } from "@/components/book/BookDetailsContent";

const emptySubscribe = () => () => {};

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Get slug safely
  const slug = params?.slug || null;

  // Always call useBook at the top level, even if not mounted
  const { book, loading, error } = useBook(slug);

  // Handle case where component is not mounted yet
  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookDetailsSkeleton />
      </main>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookDetailsSkeleton />
      </main>
    );
  }

  // Handle error or no book
  if (error || !book) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] py-32 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-[#1B2B4B]">Book Not Found</h1>
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

  // Render book details
  return <BookDetailsContent book={book} />;
}