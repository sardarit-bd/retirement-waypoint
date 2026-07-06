'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/lib/query-client';
import { bookApi } from '../api/book.api';

export function useAdminBooks(params = {}) {
    return useQuery({
        queryKey: [QUERY_KEYS.BOOKS, 'admin', params],
        queryFn: () => bookApi.getAdminBooks(params),
        staleTime: 5 * 60 * 1000,
    });
}

export function usePublishBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookId) => bookApi.publishBook(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] });
            toast.success('Book published successfully');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to publish book');
        },
    });
}

export function useArchiveBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookId) => bookApi.archiveBook(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] });
            toast.success('Book archived successfully');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to archive book');
        },
    });
}
// features/books/hooks/useAdminBooks.js - Add these hooks

export function useCreateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData) => bookApi.createBook(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS, 'admin'] });
            toast.success('Book created successfully');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to create book');
        },
    });
}

export function useUpdateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ bookId, formData }) => bookApi.updateBook(bookId, formData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS, 'admin'] });
            queryClient.invalidateQueries({ queryKey: ['book', variables.bookId] });
            toast.success('Book updated successfully');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to update book');
        },
    });
}

export function useDeleteBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bookId) => bookApi.deleteBook(bookId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS, 'admin'] });
            toast.success('Book deleted successfully');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || 'Failed to delete book');
        },
    });
}

export function useAdminBook(bookId) {
    return useQuery({
        queryKey: ['book', bookId],
        queryFn: () => bookApi.getAdminBook(bookId),
        enabled: !!bookId,
        staleTime: 5 * 60 * 1000,
    });
}