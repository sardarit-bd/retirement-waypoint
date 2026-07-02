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

export function useBookReviews(bookId, page = 1, limit = 5, options = {}) {
  return useQuery({
    queryKey: [...reviewKeys.book(bookId), page, limit],
    queryFn: () => reviewApi.getBookReviews(bookId, { page, limit, ...options }),
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

export function useMyReview(bookId, enabled = true) {
  return useQuery({
    queryKey: reviewKeys.myReview(bookId),
    queryFn: () => reviewApi.getMyReview(bookId),
    enabled: !!bookId && enabled, // Only run when bookId exists AND enabled is true
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

// Admin: Get all reviews
export function useAdminReviews(params = {}) {
  return useQuery({
    queryKey: ['admin-reviews', params],
    queryFn: () => reviewApi.adminGetAllReviews(params),
    staleTime: 2 * 60 * 1000,
  });
}

// Admin: Get single review
export function useAdminReview(reviewId) {
  return useQuery({
    queryKey: ['admin-review', reviewId],
    queryFn: () => reviewApi.getReview(reviewId),
    enabled: !!reviewId,
    staleTime: 2 * 60 * 1000,
  });
}

// Admin: Approve review
export function useAdminApproveReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => reviewApi.adminApproveReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['admin-review'] });
      toast.success('Review approved successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to approve review');
    },
  });
}

// Admin: Reject review
export function useAdminRejectReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => reviewApi.adminRejectReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['admin-review'] });
      toast.success('Review rejected successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject review');
    },
  });
}

// Admin: Delete review
export function useAdminDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId) => reviewApi.adminDeleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['admin-review'] });
      toast.success('Review deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    },
  });
}