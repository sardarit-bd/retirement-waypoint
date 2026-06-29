"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useBookReviewsInfinite } from "../hooks/useReviews";
import { ReviewCard } from "./ReviewCard";
import { ReviewSummary } from "./ReviewSummary";
import { Button } from "@/components/ui/button";

export const ReviewModal = ({ bookId, onClose }) => {
  const loadMoreRef = useRef(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useBookReviewsInfinite(bookId);

  // Flatten all reviews from all pages
  const allReviews = data?.pages?.flatMap(page => page.data || page.reviews || []) || [];
  const totalReviews = data?.pages?.[0]?.pagination?.total || 0;
  const summary = data?.pages?.[0]?.summary || null;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center py-12">
        <p className="text-[#1B2B4B]/60">
          {error?.message || "Failed to load reviews"}
        </p>
      </div>
    );
  }

  if (allReviews.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-[#1B2B4B]">No reviews yet</h3>
        <p className="text-[#1B2B4B]/60 mt-2">
          Be the first verified reader to review this book.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-1">
      {/* Review Summary */}
      {summary && (
        <div className="mb-6">
          <ReviewSummary summary={summary} loading={false} />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {allReviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="py-6 flex justify-center">
        {isFetchingNextPage && (
          <Loader2 className="h-6 w-6 animate-spin text-[#C9A84C]" />
        )}
        {!hasNextPage && allReviews.length > 0 && (
          <p className="text-sm text-[#1B2B4B]/40">
            — End of reviews —
          </p>
        )}
      </div>

      {/* Load More Button (Fallback) */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="text-center pb-4">
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className="border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1B2B4B]"
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};