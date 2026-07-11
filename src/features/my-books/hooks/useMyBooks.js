'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { myBooksApi } from '../services/myBooks.api';
import toast from 'react-hot-toast';

export function useMyBooks(params = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_BOOKS, params],
    queryFn: () => myBooksApi.getMyBooks(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyBook(bookId) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_BOOK, bookId],
    queryFn: () => myBooksApi.getMyBook(bookId),
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDownloadBook() {
  return useMutation({
    mutationFn: myBooksApi.downloadBook,
    onSuccess: (data) => {
      if (data?.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
        toast.success('Download started!');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to download book');
    },
  });
}

/**
 * Get read URL for a purchased book
 */
export const useGetReadUrl = (bookId) => {
  return useQuery({
    queryKey: ['my-book-read', bookId],
    queryFn: () => getReadUrl(bookId),
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};