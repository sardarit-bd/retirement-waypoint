'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import toast from 'react-hot-toast';

// Fetch my books
export function useMyBooks(params = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_BOOKS, params],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.MY_BOOKS.ALL, { params });
      return response.data;
    },
  });
}

// Fetch single my book
export function useMyBook(bookId) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_BOOK, bookId],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.MY_BOOKS.SINGLE(bookId));
      return response.data.data;
    },
    enabled: !!bookId,
  });
}

// Download book
export function useDownloadBook() {
  return useMutation({
    mutationFn: async (bookId) => {
      const response = await api.get(API_ENDPOINTS.MY_BOOKS.DOWNLOAD(bookId));
      return response.data.data;
    },
    onSuccess: (data) => {
      if (data?.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
        toast.success('Download started');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to download book');
    },
  });
}