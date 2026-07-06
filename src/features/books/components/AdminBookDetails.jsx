'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, FileText, DollarSign, BookOpen, CheckCircle, Archive, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const STATUS_COLORS = {
  DRAFT: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  PUBLISHED: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  ARCHIVED: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export function AdminBookDetails({ book, isLoading, error }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading book details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Button
          asChild
          variant="ghost"
          className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
        >
          <Link href="/admin/books">
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </Button>
        
        <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
          <div className="mx-auto mb-4 w-fit rounded-full bg-red-500/10 p-4">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-red-500">Unable to Load Book</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
            {error?.message || 'Book not found. It may have been deleted or the ID is invalid.'}
          </p>
          <Button
            asChild
            className="mt-6 rounded-full bg-[#C9A84C] px-6 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A]"
          >
            <Link href="/admin/books">
              Back to Books
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!book) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Button
          asChild
          variant="ghost"
          className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
        >
          <Link href="/admin/books">
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </Button>
        
        <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
          <div className="mx-auto mb-4 w-fit rounded-full bg-red-500/10 p-4">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-red-500">Book Not Found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
            This book doesn&apos;t exist or may have been deleted.
          </p>
          <Button
            asChild
            className="mt-6 rounded-full bg-[#C9A84C] px-6 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A]"
          >
            <Link href="/admin/books">
              Back to Books
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Button
        asChild
        variant="ghost"
        className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
      >
        <Link href="/admin/books">
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>
      </Button>

      {/* Book Details */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Cover */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#F8F5EF] shadow-xl">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#1B2B4B]/30">
              No Cover
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge className={STATUS_COLORS[book.status] || 'bg-gray-500/10 text-gray-500'}>
                {book.status}
              </Badge>
              {book.featured && (
                <Badge className="bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20">
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-[#1B2B4B]">{book.title}</h1>
            <p className="text-lg text-[#1B2B4B]/60">by {book.authorName}</p>
          </div>

          <p className="text-[#1B2B4B]/70 leading-relaxed">{book.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4">
              <p className="text-sm text-[#1B2B4B]/60">Price</p>
              <p className="text-lg font-semibold text-[#C9A84C]">${book.price}</p>
            </div>
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4">
              <p className="text-sm text-[#1B2B4B]/60">Pages</p>
              <p className="text-lg font-semibold text-[#1B2B4B]">{book.pageCount}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[#1B2B4B]/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(book.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated: {formatDate(book.updatedAt)}</span>
            </div>
            {book.publishedAt && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Published: {formatDate(book.publishedAt)}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1B2B4B]/10">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/admin/books/${book._id}/edit`}>Edit Book</Link>
            </Button>
            {book.status !== 'PUBLISHED' && (
              <Button
                className="rounded-full bg-emerald-500 px-6 text-white hover:bg-emerald-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Publish
              </Button>
            )}
            {book.status !== 'ARCHIVED' && book.status === 'PUBLISHED' && (
              <Button
                variant="outline"
                className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}