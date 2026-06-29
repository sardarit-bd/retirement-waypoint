"use client";

import { useSession } from "@/hooks/useSession";
import {
  useBookReviews,
  useReviewSummary,
  useMyReview,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "../hooks/useReviews";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import { MyReviewSection } from "./MyReviewSection";

export const ReviewSection = ({ bookId }) => {
  const { session } = useSession();
  const isLoggedIn = !!session?.user;

  // Queries
  const { data: reviewsData, isLoading: reviewsLoading } = useBookReviews(bookId, { 
    page: 1, 
    limit: 5 
  });
  const { data: summaryData, isLoading: summaryLoading } = useReviewSummary(bookId);
  const { data: myReviewData, isLoading: myReviewLoading } = useMyReview(bookId);

  // Mutations
  const createReview = useCreateReview(bookId);
  const updateReview = useUpdateReview(bookId);
  const deleteReview = useDeleteReview(bookId);

  const reviews = reviewsData?.data || reviewsData?.reviews || [];
  const summary = summaryData?.data || summaryData;
  const myReview = myReviewData?.data || myReviewData;
  const totalReviews = reviewsData?.pagination?.total || summary?.totalReviews || 0;

  const hasReviews = reviews.length > 0 || totalReviews > 0;

  // If no reviews and user not logged in
  if (!hasReviews && !isLoggedIn) {
    return (
      <section id="reviews" className="space-y-6">
        <h2 className="text-2xl font-bold text-[#1B2B4B]">Customer Reviews</h2>
        <div className="bg-white rounded-2xl p-12 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-[#1B2B4B]">No reviews yet</h3>
          <p className="text-[#1B2B4B]/60 mt-2">
            Be the first verified reader to review this book.
          </p>
        </div>
      </section>
    );
  }

  const isLoading = reviewsLoading || summaryLoading || myReviewLoading;

  return (
    <section id="reviews" className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1B2B4B]">Customer Reviews</h2>

      {/* Review Summary */}
      {hasReviews && (
        <ReviewSummary summary={summary} loading={summaryLoading} />
      )}

      {/* Divider */}
      {hasReviews && (
        <div className="border-t border-[#1B2B4B]/10" />
      )}

      {/* My Review Section - Only show for logged in users */}
      {isLoggedIn && (
        <MyReviewSection
          myReview={myReview}
          isPurchased={!!myReview}
          isLoggedIn={isLoggedIn}
          onCreateReview={createReview.mutate}
          onUpdateReview={updateReview.mutate}
          onDeleteReview={deleteReview.mutate}
          isSubmitting={createReview.isPending || updateReview.isPending}
        />
      )}

      {/* Review List */}
      {hasReviews && (
        <ReviewList
          bookId={bookId}
          totalReviews={totalReviews}
        />
      )}
    </section>
  );
};