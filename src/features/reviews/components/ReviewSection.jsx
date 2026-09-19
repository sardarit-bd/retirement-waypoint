"use client";

import { useState } from "react";
import {
  useBookReviews,
  useReviewSummary,
  useMyReview,
} from "../hooks/useReviews";
import { useCheckPurchase } from "@/features/purchases/hooks/usePurchase";
import { ReviewSummary } from "./ReviewSummary";
import { ReviewList } from "./ReviewList";
import { ReviewPagination } from "./ReviewPagination";
import { ReviewSkeleton } from "./ReviewSkeleton";
import { MyReviewSection } from "./MyReviewSection";
import { useSession } from "@/hooks/useSession";

export const ReviewSection = ({ bookId, showReviewForm = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  // Check purchase status for authenticated non-admin users
  const {
    data: purchaseData,
    isLoading: purchaseLoading,
  } = useCheckPurchase(bookId, isAuthenticated && !isAdmin);

  const hasPurchased = purchaseData?.hasPurchased || false;

  // Fetch review summary
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useReviewSummary(bookId);

  // Fetch reviews with pagination
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useBookReviews(bookId, currentPage, limit);

  // Fetch user's review ONLY when authenticated
  const { 
    data: myReviewData, 
    isLoading: myReviewLoading,
    refetch: refetchMyReview,
  } = useMyReview(bookId, isAuthenticated);

  // Get current page data
  const reviews = reviewsData?.data || [];
  const pagination = reviewsData?.meta || {
    page: 1,
    totalPages: 1,
    totalItems: 0,
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const reviewElement = document.getElementById("reviews-section");
    if (reviewElement) {
      reviewElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle review update from MyReviewSection
  const handleReviewUpdate = () => {
    refetchReviews();
    refetchSummary();
    if (isAuthenticated) {
      refetchMyReview();
    }
  };

  if (summaryLoading || reviewsLoading) {
    return (
      <div id="reviews-section" className="py-6 sm:py-8">
        <ReviewSkeleton />
      </div>
    );
  }

  if (summaryError || reviewsError) {
    return (
      <div id="reviews-section" className="py-6 sm:py-8">
        <div className="text-center text-gray-500 text-sm sm:text-base">
          <p>Unable to load reviews. Please try again later.</p>
        </div>
      </div>
    );
  }

  const summary = summaryData?.data || summaryData;
  const totalReviews = summary?.totalReviews || 0;

  // Don't show review section if there are no reviews and no summary
  if (totalReviews === 0 && !summaryData) {
    return null;
  }

  // Only surface review actions if user is authenticated AND (is a verified buyer or already has a review)
  const shouldRenderMyReview =
    isAuthenticated &&
    showReviewForm &&
    (hasPurchased || !!myReviewData?.data);

  return (
    <div id="reviews-section" className="py-6 sm:py-8">
      {/* Customer Reviews Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#1B2B4B] mb-4 sm:mb-6">
        Customer Reviews
      </h2>

      {/* Review Summary */}
      <ReviewSummary summary={summary} totalReviews={totalReviews} />

      {/* My Review Section (only for verified buyers or existing reviews) */}
      {shouldRenderMyReview && (
        <div className="pt-5 sm:pt-6 border-t border-[#1B2B4B]/10 mt-5 sm:mt-6">
          <MyReviewSection
            bookId={bookId}
            hasPurchased={hasPurchased}
            myReview={myReviewData?.data || null}
            isLoading={myReviewLoading || purchaseLoading}
            onReviewUpdate={handleReviewUpdate}
          />
        </div>
      )}

      {/* Thin Divider before reviews list */}
      <div className="border-t border-[#1B2B4B]/10 my-6 sm:my-8" />

      {/* Review List */}
      {reviews.length > 0 ? (
        <>
          <ReviewList reviews={reviews} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <ReviewPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
          <p>No reviews yet.</p>
        </div>
      )}
    </div>
  );
};