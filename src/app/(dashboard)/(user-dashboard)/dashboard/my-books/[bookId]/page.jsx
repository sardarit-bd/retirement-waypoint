'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen, Calendar, FileText, Hash, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMyBook, useDownloadBook } from '@/features/my-books/hooks/useMyBooks';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';

export default function MyBookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();
  const bookId = params.bookId;
  const [imageError, setImageError] = useState(false);

  const { data: book, isLoading, error } = useMyBook(bookId);
  const { mutate: downloadBook, isPending: isDownloading } = useDownloadBook();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push('/auth');
    }
  }, [session, isSessionLoading, router]);

  const handleDownload = () => {
    if (book) {
      downloadBook(book.bookId);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading || isSessionLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8 text-center">
        <p className="text-red-500">Failed to load book details</p>
        <Button
          onClick={() => router.back()}
          className="mt-4 rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors"
        >
          Go Back
        </Button>
      </div>
    );
  }

  const coverImage = imageError
    ? '/images/placeholder-book.jpg'
    : book.coverImage || '/images/placeholder-book.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Top Navigation */}
      <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-[#1B2B4B]/70 hover:text-[#1B2B4B] hover:bg-white/60 rounded-full px-3 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Button>
        <span className="text-[#1B2B4B]/30">/</span>
        <span className="text-[#1B2B4B]/90 font-medium truncate max-w-[240px] sm:max-w-md">
          {book.title}
        </span>
      </div>

      {/* Main Details Grid */}
      <div className="grid gap-8 lg:grid-cols-[320px_1fr] items-start">
        {/* Cover Column with Premium Depth */}
        <div className="relative group max-w-[320px] mx-auto w-full">
          {/* Ambient Lighting Glow */}
          <div className="absolute -inset-1.5 rounded-[34px] bg-gradient-to-tr from-[#C9A84C]/25 via-transparent to-[#1B2B4B]/15 blur-xl opacity-70 transition duration-500 group-hover:opacity-100" />

          {/* Book Cover Frame */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#F8F5EF] to-[#EFEAE0] p-2.5 ring-1 ring-black/5 shadow-[0_25px_60px_-15px_rgba(4,16,58,0.25),0_10px_20px_rgba(201,168,76,0.1)]">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] shadow-inner">
              <Image
                src={coverImage}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={() => setImageError(true)}
                sizes="(max-width: 640px) 100vw, 320px"
                priority
              />
              {/* Soft Spine & Sheen Highlights */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/30 via-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Ownership Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-emerald-600/90 text-white border border-white/25 px-3 py-1 text-xs font-semibold backdrop-blur-md shadow-md">
                <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                Purchased Edition
              </Badge>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="space-y-6">
          {/* Header Typography */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              Digital Library
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B2B4B] tracking-tight leading-tight break-words">
              {book.title}
            </h1>
            <p className="text-base sm:text-lg text-[#1B2B4B]/70 font-medium">
              Written by <span className="text-[#1B2B4B] font-semibold">{book.authorName}</span>
            </p>
          </div>

          {/* Unified Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Pages Card */}
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-white/75 backdrop-blur-md p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#1B2B4B]/60 text-xs font-medium">
                <FileText className="h-4 w-4 text-[#C9A84C]" />
                <span>Length</span>
              </div>
              <p className="mt-1.5 text-base sm:text-lg font-bold text-[#1B2B4B]">
                {book.pageCount ? `${book.pageCount} Pages` : 'Complete'}
              </p>
            </div>

            {/* Price Card */}
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-white/75 backdrop-blur-md p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#1B2B4B]/60 text-xs font-medium">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Price</span>
              </div>
              <p className="mt-1.5 text-base sm:text-lg font-bold text-[#C9A84C]">
                ${book.price}
              </p>
            </div>

            {/* Order Number */}
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-white/75 backdrop-blur-md p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#1B2B4B]/60 text-xs font-medium">
                <Hash className="h-4 w-4 text-[#1B2B4B]/60" />
                <span>Order #</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#1B2B4B] truncate" title={book.orderNumber || 'Direct'}>
                {book.orderNumber ? book.orderNumber : 'Confirmed'}
              </p>
            </div>

            {/* Purchase Date */}
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-white/75 backdrop-blur-md p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-[#1B2B4B]/60 text-xs font-medium">
                <Calendar className="h-4 w-4 text-[#1B2B4B]/60" />
                <span>Acquired</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#1B2B4B] truncate">
                {formatDate(book.purchasedAt)}
              </p>
            </div>
          </div>

          {/* Book Description */}
          {book.description && (
            <div className="rounded-2xl border border-[#1B2B4B]/8 bg-white/60 backdrop-blur-md p-5 sm:p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B2B4B]/50 mb-2.5">
                Overview &amp; Synopsis
              </h3>
              <p className="text-[#1B2B4B]/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#1B2B4B]/10">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#C9A84C] via-[#D6B45A] to-[#C9A84C] px-8 py-6 text-base font-bold text-[#04103A] shadow-xl shadow-[#C9A84C]/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <Link href={`/dashboard/my-books/${book.bookId}/read`}>
                <BookOpen className="mr-2 h-5 w-5" />
                Read Online
              </Link>
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              className="rounded-full border-2 border-[#1B2B4B]/15 bg-white/80 hover:bg-white hover:border-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <Download className={cn('mr-2 h-5 w-5', isDownloading && 'animate-pulse text-[#C9A84C]')} />
              {isDownloading ? 'Preparing Download...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}