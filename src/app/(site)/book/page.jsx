"use client";

import { useState, useEffect } from "react";
import { useSyncExternalStore } from "react";
import { BookHero } from "@/components/book/Book-Hero";
import { BookStore } from "@/components/book/Book-Store";
import { BookReviews } from "@/components/book/Book-Reviews";
import { useBooks } from "@/features/books/hooks/useBooks";
import { useDebouncedSearch } from "@/features/books/hooks/useDebouncedSearch";
import { BookSkeleton } from "@/components/book/Book-Skeleton";
import { BookError } from "@/components/book/Book-Error";

const emptySubscribe = () => () => {};

export default function BookPage() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return null;
  }

  return <BookPageContent />;
}

function BookPageContent() {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [searchValue, setSearchValue, debouncedSearch] = useDebouncedSearch("", 500);
  
  useEffect(() => {
    setSearchValue(searchInput);
  }, [searchInput, setSearchValue]);

  const { books, pagination, loading, error, refetch } = useBooks({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch || undefined,
    sortBy: "publishedAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    refetch({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearch || undefined,
    });
  }, [debouncedSearch, currentPage, refetch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && books.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookHero
          searchQuery={searchInput}
          setSearchQuery={setSearchInput}
        />
        <BookSkeleton count={ITEMS_PER_PAGE} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#F8F5EF]">
        <BookHero
          searchQuery={searchInput}
          setSearchQuery={setSearchInput}
        />
        <BookError error={error} onRetry={() => refetch()} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <BookHero
        searchQuery={searchInput}
        setSearchQuery={setSearchInput}
      />
      <BookStore
        books={books}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
      <BookReviews />
    </main>
  );
}