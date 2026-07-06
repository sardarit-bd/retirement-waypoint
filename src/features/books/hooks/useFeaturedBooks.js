import { useState, useEffect } from 'react';
import { bookApi } from '../api/book.api';
import axios from 'axios';

export function useFeaturedBooks(limit = 4) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await bookApi.getFeaturedBooks(limit);
        setBooks(response.data || response || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch featured books');
        } else {
          setError('An unexpected error occurred');
        }
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [limit]);

  return { books, loading, error };
}