'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import toast from 'react-hot-toast';

// Fetch my orders
export function useMyOrders(params = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_ORDERS, params],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ORDERS.MY_ORDERS, { params });
      return response.data;
    },
  });
}

// Fetch single order
export function useOrder(orderId) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.ORDERS.SINGLE(orderId));
      return response.data.data;
    },
    enabled: !!orderId,
  });
}

// Create order
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(API_ENDPOINTS.ORDERS.ALL, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_ORDERS] });
      toast.success('Order created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create order');
    },
  });
}