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
      whileHover={{ y: -4 }}
      className="h-auto"
    >
      <Card className="group overflow-hidden rounded-[28px] border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]">
        {/* Cover Image - Fixed height, centered */}
        <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8F5EF] to-white md:h-[260px]">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#C9A84C]/5 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#1B2B4B]/5 blur-2xl" />
          </div>

          {/* Book Cover */}
          <div className="relative z-10 h-full w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl">
            <Image
              src={coverImage}
              alt={book.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="140px"
              priority={index < 3}
            />
            {/* Subtle Cover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
          </div>

          {/* Status Badge - Top Left */}
          <div className="absolute left-4 top-4 z-20">
            <Badge className="gap-1.5 rounded-full border-emerald-500/30 bg-emerald-500/90 px-3 py-1.5 text-[10px] font-medium text-white shadow-lg backdrop-blur-sm">
              <CheckCircle className="h-3 w-3" />
              Purchased
            </Badge>
          </div>

          {/* Quick Action - Download Icon (subtle) */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/20 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/30 hover:scale-110"
          >
            <Download className={cn(
              'h-4 w-4 text-white/90',
              isDownloading && 'animate-pulse'
            )} />
          </motion.button>
        </div>

        {/* Content */}
        <CardContent className="space-y-2.5 p-4">
          {/* Title & Author */}
          <div>
            <h3 className="line-clamp-1 text-[17px] font-bold leading-tight text-[#1B2B4B] group-hover:text-[#C9A84C] transition-colors">
              {book.title}
            </h3>
            <p className="text-[13px] text-[#1B2B4B]/60">
              {book.authorName}
            </p>
          </div>

          {/* Description */}
          {book.description && (
            <p className="line-clamp-2 text-[13px] leading-relaxed text-[#1B2B4B]/70">
              {book.description}
            </p>
          )}

          {/* Meta Row - Page Count & Price */}
          <div className="flex items-center gap-4 text-xs text-[#1B2B4B]/50">
            {book.pageCount && (
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {book.pageCount} pages
              </span>
            )}
            <span className="font-semibold text-[#1B2B4B]">
              ${book.price}
            </span>
          </div>

          {/* Purchase Date */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#1B2B4B]/40">
            <Calendar className="h-3 w-3" />
            <span>Added {formatDate(book.purchasedAt)}</span>
            {book.orderNumber && (
              <>
                <span className="mx-1">·</span>
                <span>Order #{book.orderNumber}</span>
              </>
            )}
          </div>

          {/* Actions - Desktop */}
          <div className="flex items-center gap-2 pt-1.5">
            <Button
              asChild
              className="flex-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 py-2 text-[13px] font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 transition-all hover:shadow-[#C9A84C]/30 hover:scale-[1.02] active:scale-[0.98]"
              size="sm"
            >
              <Link href={`/dashboard/my-books/${book.bookId}`}>
                <BookOpen className="mr-2 h-4 w-4" />
                Read Now
              </Link>
            </Button>
          </div>

          {/* Mobile Full Width Actions */}
          <div className="flex flex-col gap-2 pt-1 sm:hidden">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              className="w-full rounded-full border-[#1B2B4B]/15 text-[13px] text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              size="sm"
            >
              <Download className={cn('mr-2 h-4 w-4', isDownloading && 'animate-pulse')} />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}