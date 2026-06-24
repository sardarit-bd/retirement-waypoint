'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecentBooksCard({ books }) {
  const [imageErrors, setImageErrors] = useState({});

  if (!books || books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B2B4B]">Recent Books</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <BookOpen className="h-12 w-12 text-[#1B2B4B]/20" />
          <p className="mt-3 text-[#1B2B4B]/60">Start your journey by exploring books</p>
          <Button
            asChild
            className="mt-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
          >
            <Link href="/book">Browse Books</Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Recent Books</h2>
        <Link
          href="/dashboard/my-books"
          className="flex items-center gap-1 text-sm text-[#C9A84C] hover:underline"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {books.slice(0, 4).map((book, index) => {
          const hasError = imageErrors[book.bookId || book._id];
          const coverImage = hasError ? null : book.coverImage;

          return (
            <motion.div
              key={book.bookId || book._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-4 rounded-2xl bg-[#F8F5EF] p-3 transition-all hover:bg-[#F8F5EF]/80"
            >
              {/* Cover */}
              <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md shadow-md">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    onError={() => {
                      setImageErrors((prev) => ({
                        ...prev,
                        [book.bookId || book._id]: true,
                      }));
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#1B2B4B]/10">
                    <span className="text-lg font-bold text-[#1B2B4B]/30">
                      {book.title?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-[#1B2B4B]">{book.title}</p>
                <p className="truncate text-sm text-[#1B2B4B]/60">{book.authorName}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-3 text-[#04103A] font-semibold shadow-sm shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
                >
                  <Link href={`/dashboard/my-books/${book.bookId || book._id}`}>
                    <BookOpen className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#1B2B4B]/15 px-3 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
                >
                  <Link href={`/dashboard/my-books/${book.bookId || book._id}/download`}>
                    <Download className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}