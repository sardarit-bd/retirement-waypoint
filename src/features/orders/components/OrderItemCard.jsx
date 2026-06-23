'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OrderItemCard({ item, index, orderId, isAccessible = false }) {
  const [imageError, setImageError] = useState(false);
  const coverImage = imageError ? null : item.bookCoverImage;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col gap-4 rounded-2xl bg-[#F8F5EF] p-4 transition-all hover:bg-[#F8F5EF]/80 sm:flex-row sm:items-center"
    >
      {/* Book Cover */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md shadow-md">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={item.bookTitle}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1B2B4B]/10">
            <span className="text-2xl font-bold text-[#1B2B4B]/30">
              {item.bookTitle?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1B2B4B] truncate">
          {item.bookTitle}
        </h3>
        <p className="text-sm text-[#1B2B4B]/60">
          {item.authorName || 'Unknown Author'}
        </p>
        <div className="mt-1 flex items-center gap-4 text-sm">
          <span className="text-[#1B2B4B]/50">Qty: 1</span>
          <span className="font-semibold text-[#C9A84C]">
            ${item.bookPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 sm:flex-col lg:flex-row">
        {isAccessible ? (
          <>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/dashboard/my-books/${item.bookId}`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Read Book
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
            >
              <Link href={`/dashboard/my-books/${item.bookId}/download`}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Link>
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            disabled
            className="rounded-full bg-[#1B2B4B]/10 px-4 text-[#1B2B4B]/40 cursor-not-allowed"
          >
            <Lock className="mr-2 h-4 w-4" />
            Locked
          </Button>
        )}
      </div>
    </motion.div>
  );
}