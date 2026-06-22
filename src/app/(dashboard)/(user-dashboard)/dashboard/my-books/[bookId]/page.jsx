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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </Button>

      {/* Book Details */}
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Cover */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#F8F5EF] shadow-xl">
          <Image
            src={coverImage}
            alt={book.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-emerald-500/90 text-white border-0 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <CheckCircle className="mr-1 h-3 w-3" />
              Purchased
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1B2B4B]">{book.title}</h1>
            <p className="text-lg text-[#1B2B4B]/60">by {book.authorName}</p>
          </div>

          {book.description && (
            <p className="text-[#1B2B4B]/70 leading-relaxed">
              {book.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4">
              <p className="text-sm text-[#1B2B4B]/60">Pages</p>
              <p className="text-lg font-semibold text-[#1B2B4B]">{book.pageCount || 'N/A'}</p>
            </div>
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4">
              <p className="text-sm text-[#1B2B4B]/60">Price</p>
              <p className="text-lg font-semibold text-[#C9A84C]">${book.price}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#1B2B4B]/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Purchased: {formatDate(book.purchasedAt)}</span>
            </div>
            {book.orderNumber && (
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span>Order: {book.orderNumber}</span>
              </div>
            )}
            {book.invoiceNumber && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Invoice: {book.invoiceNumber}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-[#1B2B4B]/10">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-8 py-6 text-base font-semibold text-[#04103A] shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/dashboard/my-books/${book.bookId}/read`}>
                <BookOpen className="mr-2 h-5 w-5" />
                Read Book
              </Link>
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              variant="outline"
              className="rounded-full border-[#1B2B4B]/15 px-8 py-6 text-base font-semibold text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
            >
              <Download className={cn('mr-2 h-5 w-5', isDownloading && 'animate-pulse')} />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}