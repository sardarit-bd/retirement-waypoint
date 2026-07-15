import { useState, useEffect, useCallback } from "react";
import { bookApi } from "../api/book.api";
import axios from "axios";

export function useBook(slug) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBook = useCallback(async () => {
    if (!slug) {
      setBook(null);
      setLoading(false);
      setError("Book slug is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await bookApi.getPublicBookBySlug(slug);
      setBook(data.data);
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError("Book not found");
        } else {
          setError(err.response?.data?.message || "Failed to fetch book");
        }
      } else {
        setError("An unexpected error occurred");
      }
      setBook(null);
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return {
    book,
    loading,
    error,
    refetch: fetchBook,
  };
}

export function useLatestBooks(limit = 4) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatestBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookApi.getPublicBooks({
        limit,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
      });
      setBooks(response.data ?? []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch latest books");
      } else {
        setError("An unexpected error occurred");
      }
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLatestBooks();
  }, [fetchLatestBooks]);

  return {
    data: { data: books },
    isLoading: loading,
    error,
    refetch: fetchLatestBooks,
  };
}