'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, BookOpen, Calendar, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDownloadBook } from '../hooks/useMyBooks';

export function MyBookCard({ book, index }) {
  const [imageError, setImageError] = useState(false);
  const { mutate: downloadBook, isPending: isDownloading } = useDownloadBook();

  const coverImage = imageError
    ? '/images/placeholder-book.jpg'
    : book.coverImage || '/images/placeholder-book.jpg';

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    downloadBook(book.bookId);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="w-full max-w-[300px]"
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-white/40 bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,16,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Cover Image - Portrait aspect ratio with object-cover */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-[#F8F5EF] to-[#ECE7DC]">
          {/* Subtle Decorative Gradient */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#C9A84C]/15 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#1B2B4B]/15 blur-xl" />
          </div>

          {/* Book Cover Image */}
          <div className="relative h-full w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105">
            <Image
              src={coverImage}
              alt={book.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, 300px"
              priority={index < 3}
            />
            {/* Subtle Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-30" />
          </div>

          {/* Status Badge - Top Left */}
          <div className="absolute left-3 top-3 z-20">
            <Badge className="gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-md backdrop-blur-sm">
              <CheckCircle className="h-3 w-3" />
              Purchased
            </Badge>
          </div>

          {/* Quick Action - Download Icon (Top Right) */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            title="Download PDF"
            className="absolute right-3 top-3 z-20 rounded-full bg-white/80 p-2 text-[#04103A] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <Download className={cn(
              'h-4 w-4',
              isDownloading && 'animate-pulse text-[#C9A84C]'
            )} />
          </button>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col justify-between p-4 space-y-3">
          <div className="space-y-2">
            {/* Title & Author */}
            <div>
              <h3 className="line-clamp-1 text-[16px] font-bold leading-snug text-[#1B2B4B] group-hover:text-[#C9A84C] transition-colors" title={book.title}>
                {book.title}
              </h3>
              <p className="mt-0.5 text-[13px] font-medium text-[#1B2B4B]/60 line-clamp-1">
                {book.authorName}
              </p>
            </div>

            {/* Description */}
            {book.description && (
              <p className="line-clamp-2 text-[12px] leading-relaxed text-[#1B2B4B]/70">
                {book.description}
              </p>
            )}
          </div>

          <div className="space-y-2.5 pt-1">
            {/* Meta Row - Page Count & Price */}
            <div className="flex items-center justify-between border-t border-[#1B2B4B]/8 pt-2.5 text-xs text-[#1B2B4B]/55">
              {book.pageCount ? (
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#C9A84C]" />
                  {book.pageCount} pages
                </span>
              ) : <span />}
              <span className="font-semibold text-[#1B2B4B]">
                ${book.price}
              </span>
            </div>

            {/* Purchase Date */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#1B2B4B]/45">
              <Calendar className="h-3 w-3" />
              <span>Added {formatDate(book.purchasedAt)}</span>
              {book.orderNumber && (
                <>
                  <span className="mx-0.5">·</span>
                  <span>#{book.orderNumber}</span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="pt-1">
              <Button
                asChild
                className="w-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 py-2 text-[13px] font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 transition-all hover:shadow-[#C9A84C]/35 hover:scale-[1.02] active:scale-[0.98]"
                size="sm"
              >
                <Link href={`/dashboard/my-books/${book.bookId}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Now
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}