'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { ordersApi } from '../services/orders.api';
import toast from 'react-hot-toast';

export function useMyOrders(params = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_ORDERS, params],
    queryFn: () => ordersApi.getMyOrders(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllOrders(params = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS, params],
    queryFn: () => ordersApi.getAllOrders(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOrder(orderId) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: () => ordersApi.getOrder(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_ORDERS] });
      toast.success('Order status updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update order status');
    },
  });
}

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.updatePaymentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDERS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_ORDERS] });
      toast.success('Payment status updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update payment status');
    },
  });
}