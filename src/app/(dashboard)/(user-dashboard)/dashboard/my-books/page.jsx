'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MyBookFilters } from '@/features/my-books/components/MyBookFilters';
import { MyBookGrid } from '@/features/my-books/components/MyBookGrid';
import { MyBookPagination } from '@/features/my-books/components/MyBookPagination';
import { useMyBooks } from '@/features/my-books/hooks/useMyBooks';
import { useSession } from '@/hooks/useSession';


export default function MyBooksPage() {
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('purchasedAt_desc');
  const [page, setPage] = useState(1);
  const limit = 9;

  // Redirect if not authenticated
  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push('/auth');
    }
  }, [session, isSessionLoading, router]);

  // Parse sort options
  const [sortField, sortOrder] = sortBy.split('_');

  const { data, isLoading, error, refetch } = useMyBooks({
    page,
    limit,
    search: searchQuery || undefined,
    sortBy: sortField,
    sortOrder,
  });

  const books = data?.data || [];
  const meta = data?.meta;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page when searching
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1); // Reset to first page when sorting
  };

  if (isSessionLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Section */}
      <MyBookFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalBooks={meta?.total}
        isLoading={isLoading}
      />

      {/* Book Grid */}
      <MyBookGrid
        books={books}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <MyBookPagination meta={meta} onPageChange={handlePageChange} />
      )}
    </div>
  );
}