'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { ordersApi } from '../services/orders.api';

export function useOrderDetails(orderId) {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: () => ordersApi.getOrderDetails(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}