'use client';

import { useState, useEffect } from 'react';
import { BookHero } from './Book-Hero';
import { BookStore } from './Book-Store';
import { BookSkeleton } from './Book-Skeleton';
import { BookError } from './Book-Error';
import { useBooks } from '@/features/books/hooks/useBooks';
import { useDebouncedSearch } from '@/features/books/hooks/useDebouncedSearch';

export function BookStoreClient({ initialBooks = [], initialPagination = null }) {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [searchValue, setSearchValue, debouncedSearch] = useDebouncedSearch('', 500);

  useEffect(() => {
    setSearchValue(searchInput);
  }, [searchInput, setSearchValue]);

  const { books, pagination, loading, error, refetch } = useBooks(
    {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearch || undefined,
      sortBy: 'publishedAt',
      sortOrder: 'desc',
    },
    initialBooks.length > 0 ? { books: initialBooks, pagination: initialPagination } : null
  );

  // Trigger refetch only when user interacts (changes search or page)
  useEffect(() => {
    if (debouncedSearch || currentPage !== 1) {
      refetch({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: debouncedSearch || undefined,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
      });
    }
  }, [debouncedSearch, currentPage, refetch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && books.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookHero searchQuery={searchInput} setSearchQuery={setSearchInput} />
        <BookSkeleton count={2} />
      </main>
    );
  }

  if (error && books.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookHero searchQuery={searchInput} setSearchQuery={setSearchInput} />
        <BookError error={error} onRetry={() => refetch()} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <BookHero searchQuery={searchInput} setSearchQuery={setSearchInput} />
      <BookStore
        books={books}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
