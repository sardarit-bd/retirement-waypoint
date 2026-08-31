import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { bookApi } from "../api/book.api";

export function useBooks(initialParams = {}, initialData = null) {
  const [books, setBooks] = useState(initialData?.books ?? []);
  const [pagination, setPagination] = useState(
    initialData?.pagination ?? {
      page: 1,
      limit: 20,
      total: initialData?.books?.length ?? 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  );

  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);
  const isFirstMount = useRef(true);

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
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (!initialData) {
        fetchBooks(initialParams);
      }
      return;
    }
  }, [fetchBooks, initialData, initialParams]);

  return {
    books,
    pagination,
    loading,
    error,
    refetch: fetchBooks,
  };
}