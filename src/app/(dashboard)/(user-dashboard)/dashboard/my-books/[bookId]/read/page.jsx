'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMyBook, useGetReadUrl } from '@/features/my-books/hooks/useMyBooks';
import { useSession } from '@/hooks/useSession';
import PDFViewer from '@/components/book/PDFViewer';

export default function ReadBookPage() {
  const params = useParams();
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();
  const bookId = params.bookId;

  const { data: book, isLoading: isBookLoading, error: bookError } = useMyBook(bookId);
  const { data: readData, isLoading: isReadUrlLoading, error: readError } = useGetReadUrl(bookId);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push('/auth');
    }
  }, [session, isSessionLoading, router]);

  const isLoading = isSessionLoading || isBookLoading || isReadUrlLoading;
  const error = bookError || readError;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#C9A84C] animate-spin" />
          <p className="text-[#1B2B4B]/60">Loading your book...</p>
        </div>
      </div>
    );
  }

  if (error || !book || !readData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <p className="text-red-500 text-lg">Failed to load book</p>
        <p className="text-[#1B2B4B]/60 text-sm">{error?.message || 'Book not found'}</p>
        <Button
          onClick={() => router.push('/dashboard/my-books')}
          className="rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Library
        </Button>
      </div>
    );
  }

  const pdfUrl = readData.pdfUrl;

  return (
    <div className="flex flex-col space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-1 shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/dashboard/my-books/${bookId}`)}
            className="gap-2 text-[#1B2B4B]/70 hover:text-[#1B2B4B] hover:bg-white/80 rounded-full border border-[#1B2B4B]/10 px-3.5 py-1.5 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Reader
          </Button>
          <div className="h-4 w-[1px] bg-[#1B2B4B]/15 hidden sm:block" />
          <div>
            <h1 className="text-lg font-bold text-[#1B2B4B] line-clamp-1">{book.title}</h1>
            <p className="text-xs text-[#1B2B4B]/60">by {book.authorName}</p>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="h-[calc(100vh-170px)] min-h-[500px] rounded-2xl overflow-hidden border border-[#1B2B4B]/10 bg-[#2A2B2E] shadow-xl">
        <PDFViewer
          pdfUrl={pdfUrl} 
          bookTitle={book.title}
          onError={() => {
            router.push(`/dashboard/my-books/${bookId}`);
          }}
        /> 
      </div>
    </div>
  );
}