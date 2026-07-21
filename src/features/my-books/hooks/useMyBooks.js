'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { myBooksApi, getReadUrl } from '../services/myBooks.api';
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
    onSuccess: async (data) => {
      if (!data?.downloadUrl) return;

      try {
        const response = await fetch(data.downloadUrl);
        if (!response.ok) throw new Error('Download failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = data.fileName || 'book.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        toast.success('Download started!');
      } catch (err) {
        toast.error('Failed to download book');
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
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};