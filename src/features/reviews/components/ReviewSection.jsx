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
import { ReviewCard } from "./ReviewCard";
import { MyReviewSection } from "./MyReviewSection";

export const ReviewSection = ({ bookId }) => {
  const { session } = useSession();
  const isLoggedIn = !!session?.user;

  // Queries
  const { data: reviewsData, isLoading: reviewsLoading } = useBookReviews(bookId);
  const { data: summaryData, isLoading: summaryLoading } = useReviewSummary(bookId);
  const { data: myReviewData, isLoading: myReviewLoading } = useMyReview(bookId);

  // Mutations
  const createReview = useCreateReview(bookId);
  const updateReview = useUpdateReview(bookId);
  const deleteReview = useDeleteReview(bookId);

  const reviews = reviewsData?.data || reviewsData || [];
  const summary = summaryData?.data || summaryData;
  const myReview = myReviewData?.data || myReviewData;

  const hasReviews = reviews.length > 0 || summary?.totalReviews > 0;

  // If no reviews, show empty state
  if (!hasReviews && !isLoggedIn) {
    return (
      <section id="reviews" className="space-y-8">
        <h2 className="text-2xl font-bold text-[#1B2B4B]">Customer Reviews</h2>
        <div className="bg-white rounded-2xl p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] text-center">
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
    <section id="reviews" className="space-y-8">
      <h2 className="text-2xl font-bold text-[#1B2B4B]">Customer Reviews</h2>

      {/* Review Summary - Show if there are reviews */}
      {hasReviews && (
        <ReviewSummary summary={summary} loading={summaryLoading} />
      )}

      {/* My Review Section - Only show for logged in users */}
      {isLoggedIn && (
        <MyReviewSection
          myReview={myReview}
          isPurchased={!!myReview} // Temporary: if user has review, they purchased
          isLoggedIn={isLoggedIn}
          onCreateReview={createReview.mutate}
          onUpdateReview={updateReview.mutate}
          onDeleteReview={deleteReview.mutate}
          isSubmitting={createReview.isPending || updateReview.isPending}
        />
      )}

      {/* Review List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 shadow-[0_10px_40px_rgba(0,0,0,0.08)] text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-[#1B2B4B]">No reviews yet</h3>
          <p className="text-[#1B2B4B]/60 mt-2">
            Be the first verified reader to review this book.
          </p>
        </div>
      )}
    </section>
  );
};

const ReviewCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] animate-pulse">
    <div className="flex items-start justify-between">
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
      <div className="h-4 w-24 bg-gray-200 rounded" />
    </div>
    <div className="h-4 w-3/4 bg-gray-200 rounded mt-3" />
    <div className="h-4 w-full bg-gray-200 rounded mt-2" />
    <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
  </div>
);