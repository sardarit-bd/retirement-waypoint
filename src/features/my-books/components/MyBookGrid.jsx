'use client';

import { motion } from 'framer-motion';
import { MyBookSkeleton } from './MyBookSkeleton';
import { MyBookEmptyState } from './MyBookEmptyState';
import { MyBookCard } from './MyBookCard';

export function MyBookGrid({ books, isLoading, error, refetch }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <MyBookSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8 text-center">
        <p className="text-red-500">Failed to load your books</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors"
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
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {books.map((book, index) => (
        <MyBookCard key={book.bookId} book={book} index={index} />
      ))}
    </motion.div>
  );
}