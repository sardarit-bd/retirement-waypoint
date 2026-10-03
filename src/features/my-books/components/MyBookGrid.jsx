'use client';

import { motion } from 'framer-motion';
import { MyBookSkeleton } from './MyBookSkeleton';
import { MyBookEmptyState } from './MyBookEmptyState';
import { MyBookCard } from './MyBookCard';

export function MyBookGrid({ books, isLoading, error, refetch }) {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-full max-w-[300px] flex justify-center">
            <MyBookSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8 text-center">
        <p className="text-red-500 font-medium">Failed to load your books</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return <MyBookEmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap justify-center gap-6"
    >
      {books.map((book, index) => (
        <div
          key={book.bookId}
          className="w-full sm:w-[280px] md:w-[290px] max-w-[300px] flex justify-center"
        >
          <MyBookCard book={book} index={index} />
        </div>
      ))}
    </motion.div>
  );
}