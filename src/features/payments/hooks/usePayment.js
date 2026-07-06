import { useMutation } from '@tanstack/react-query';
import { paymentApi } from '../api/payment.api';
import toast from 'react-hot-toast';

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: (orderId) => paymentApi.createCheckoutSession(orderId),
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to create payment session'
      );
    },
  });
}

export function useRetryPayment() {
  return useMutation({
    mutationFn: (orderId) => paymentApi.retryPayment(orderId),
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to retry payment'
      );
    },
  });
}