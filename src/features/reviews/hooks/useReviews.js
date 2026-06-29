import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { reviewApi } from '../api/review.api';
import toast from 'react-hot-toast';

export const reviewKeys = {
  all: ['reviews'],
  book: (bookId) => ['reviews', 'book', bookId],
  bookInfinite: (bookId) => ['reviews', 'book', bookId, 'infinite'],
  summary: (bookId) => ['reviews', 'summary', bookId],
  myReview: (bookId) => ['reviews', 'my', bookId],
};

export function useBookReviewsInfinite(bookId, limit = 5) {
  return useInfiniteQuery({
    queryKey: reviewKeys.bookInfinite(bookId),
    queryFn: ({ pageParam = 1 }) => 
      reviewApi.getBookReviews(bookId, { page: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      const { pagination } = lastPage;
      if (pagination?.hasNextPage) {
        return pagination.page + 1;
      }
      return undefined;
    },
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialPageParam: 1,
  });
}

export function useBookReviews(bookId, options = {}) {
  return useQuery({
    queryKey: reviewKeys.book(bookId),
    queryFn: () => reviewApi.getBookReviews(bookId, options),
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useReviewSummary(bookId) {
  return useQuery({
    queryKey: reviewKeys.summary(bookId),
    queryFn: () => reviewApi.getReviewSummary(bookId),
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyReview(bookId) {
  return useQuery({
    queryKey: reviewKeys.myReview(bookId),
    queryFn: () => reviewApi.getMyReview(bookId),
    enabled: !!bookId,
    staleTime: 2 * 60 * 1000,
    retry: false,
  });
}

export function useCreateReview(bookId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => reviewApi.createReview(data),
    onSuccess: () => {
      toast.success('Review submitted successfully! It will be visible after approval.');
      queryClient.invalidateQueries({ queryKey: reviewKeys.myReview(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.summary(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.book(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.bookInfinite(bookId) });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    },
  });
}

export function useUpdateReview(bookId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, data }) => reviewApi.updateReview(reviewId, data),
    onSuccess: () => {
      toast.success('Review updated successfully! It will be reviewed again.');
      queryClient.invalidateQueries({ queryKey: reviewKeys.myReview(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.summary(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.book(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.bookInfinite(bookId) });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update review');
    },
  });
}

export function useDeleteReview(bookId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => reviewApi.deleteReview(reviewId),
    onSuccess: () => {
      toast.success('Review deleted successfully');
      queryClient.invalidateQueries({ queryKey: reviewKeys.myReview(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.summary(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.book(bookId) });
      queryClient.invalidateQueries({ queryKey: reviewKeys.bookInfinite(bookId) });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    },
  });
}