import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { bookApi } from "../api/book.api";

export function useBooks(initialParams = {}) {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await bookApi.getPublicBooks(params);

      setBooks(response.data ?? []);

      if (response.meta) {
        setPagination(response.meta);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch books");
      } else {
        setError("An unexpected error occurred");
      }

      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks(initialParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    books,
    pagination,
    loading,
    error,
    refetch: fetchBooks,
  };
}