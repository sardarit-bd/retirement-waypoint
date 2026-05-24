"use client";

import { useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import { books as allBooks } from "@/data/books";
import { BookDetailsContent } from "@/components/book/details/BookDetailsContent";

const emptySubscribe = () => () => {};

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const bookId = params.id;

  if (!mounted) {
    return null;
  }
  
  const book = allBooks.find((b) => b.id === bookId);
  
  if (!bookId) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] py-32 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-[#1B2B4B]">Invalid Book ID</h1>
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
  
  if (!book) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] py-32 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-[#1B2B4B]">Book Not Found</h1>
          <p className="mt-2 text-[#1B2B4B]/60">
            Sorry, we couldn&apos;t find the book you&apos;re looking for.
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
  
  return <BookDetailsContent book={book} bookId={bookId} router={router} />;
}