'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { contactMessagesApi } from '../api/contact-messages.api';

export const contactMessagesKeys = {
  all: ['contact-messages'],
  list: (params) => ['contact-messages', 'list', params],
  stats: ['contact-messages', 'stats'],
  unreadCount: ['contact-messages', 'unread-count'],
  detail: (id) => ['contact-messages', 'detail', id],
};

// Get messages with search/filter/pagination
export function useContactMessages(params = {}) {
  return useQuery({
    queryKey: contactMessagesKeys.list(params),
    queryFn: async () => {
      const response = await contactMessagesApi.getMessages(params);
      return {
        messages: response.data?.data || [],
        meta: response.data?.meta || {},
      };
    },
    staleTime: 60 * 1000,
    keepPreviousData: true,
  });
}

// Get message stats
export function useContactMessageStats() {
  return useQuery({
    queryKey: contactMessagesKeys.stats,
    queryFn: async () => {
      const response = await contactMessagesApi.getStats();
      return response.data?.data || {};
    },
    staleTime: 60 * 1000,
  });
}

// Get unread count (for dashboard summary card)
export function useContactMessagesUnreadCount() {
  return useQuery({
    queryKey: contactMessagesKeys.unreadCount,
    queryFn: async () => {
      const response = await contactMessagesApi.getUnreadCount();
      return response.data?.data || { unread: 0 };
    },
    staleTime: 60 * 1000,
  });
}

// Get a single message by ID
export function useContactMessage(id) {
  return useQuery({
    queryKey: contactMessagesKeys.detail(id),
    queryFn: async () => {
      const response = await contactMessagesApi.getMessageById(id);
      return response.data?.data || null;
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

// Update message status
export function useUpdateContactMessageStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => contactMessagesApi.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contactMessagesKeys.all });
      queryClient.invalidateQueries({ queryKey: contactMessagesKeys.detail(variables.id) });
      toast.success('Message status updated successfully', {
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

// Delete message
export function useDeleteContactMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => contactMessagesApi.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactMessagesKeys.all });
      toast.success('Message deleted successfully', {
        duration: 3000,
        position: 'top-right',
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete message', {
        duration: 5000,
        position: 'top-right',
      });
    },
  });
}