'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { newsletterSubscribersApi } from '../api/newsletter-subscribers.api';

export const newsletterSubscribersKeys = {
  all: ['newsletter-subscribers'],
  list: (params) => ['newsletter-subscribers', 'list', params],
  stats: ['newsletter-subscribers', 'stats'],
  detail: (id) => ['newsletter-subscribers', 'detail', id],
};

// Get subscribers with search/filter/pagination
export function useNewsletterSubscribers(params = {}) {
  return useQuery({
    queryKey: newsletterSubscribersKeys.list(params),
    queryFn: async () => {
      const response = await newsletterSubscribersApi.getSubscribers(params);
      return {
        subscribers: response.data?.data || [],
        meta: response.data?.meta || {},
      };
    },
    staleTime: 60 * 1000,
    keepPreviousData: true,
  });
}

// Get subscriber stats
export function useNewsletterSubscriberStats() {
  return useQuery({
    queryKey: newsletterSubscribersKeys.stats,
    queryFn: async () => {
      const response = await newsletterSubscribersApi.getStats();
      return response.data?.data || {};
    },
    staleTime: 60 * 1000,
  });
}

// Get a single subscriber by ID
export function useNewsletterSubscriber(id) {
  return useQuery({
    queryKey: newsletterSubscribersKeys.detail(id),
    queryFn: async () => {
      const response = await newsletterSubscribersApi.getSubscriberById(id);
      return response.data?.data || null;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

// Update subscriber status
export function useUpdateSubscriberStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) =>
      newsletterSubscribersApi.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: newsletterSubscribersKeys.all });
      queryClient.invalidateQueries({
        queryKey: newsletterSubscribersKeys.detail(variables.id),
      });
      toast.success('Subscriber status updated successfully', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status', {
        duration: 5000,
        position: 'top-right',
      });
    },
  });
}

// Delete subscriber
export function useDeleteSubscriber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => newsletterSubscribersApi.deleteSubscriber(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: newsletterSubscribersKeys.all });
      toast.success('Subscriber deleted successfully', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete subscriber', {
        duration: 5000,
        position: 'top-right',
      });
    },
  });
}

// Export subscribers — triggers a browser file download
export function useExportSubscribers() {
  return useMutation({
    mutationFn: async ({ format, search, status }) => {
      const response = await newsletterSubscribersApi.exportSubscribers({
        format,
        search: search || undefined,
        status: status || undefined,
      });
      return { blob: response.data, format };
    },
    onSuccess: ({ blob, format }) => {
      const extension = format === 'excel' ? 'xlsx' : 'csv';
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `newsletter-subscribers-${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Export downloaded successfully', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: () => {
      toast.error('Failed to export subscribers', {
        duration: 5000,
        position: 'top-right',
      });
    },
  });
}