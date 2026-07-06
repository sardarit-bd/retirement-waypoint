import { useQuery } from '@tanstack/react-query';
import { purchaseApi } from '../api/purchase.api';

export const purchaseKeys = {
  all: ['purchases'],
  my: ['purchases', 'my'],
  myDetails: ['purchases', 'my', 'details'],
  check: (bookId) => ['purchases', 'check', bookId],
  book: (bookId) => ['purchases', 'book', bookId],
};

/**
 * Check if user has purchased a specific book
 */
export function useCheckPurchase(bookId, enabled = true) {
  return useQuery({
    queryKey: purchaseKeys.check(bookId),
    queryFn: () => purchaseApi.checkPurchase(bookId),
    enabled: !!bookId && enabled, // Only run when bookId exists AND enabled is true
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

/**
 * Get user's purchase for a specific book
 */
export function usePurchaseByBook(bookId, enabled = true) {
  return useQuery({
    queryKey: purchaseKeys.book(bookId),
    queryFn: () => purchaseApi.getPurchaseByBook(bookId),
    enabled: !!bookId && enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

/**
 * Get all user purchases with book details
 */
export function useMyPurchases(params = {}, enabled = true) {
  return useQuery({
    queryKey: [...purchaseKeys.myDetails, params],
    queryFn: () => purchaseApi.getMyPurchases(params),
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
  });
}