"use client";

import { Star, ShieldCheck } from "lucide-react";
import { RatingDistribution } from "./RatingDistribution";

export const ReviewSummary = ({ summary, totalReviews }) => {
  if (!summary) return null;

  const { averageRating = 0, ratingBreakdown: ratingDistribution = {} } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
      {/* Left Column - Rating Overview */}
      <div className="flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B2B4B]">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-2xl sm:text-3xl text-[#1B2B4B]/40">/ 5</span>
        </div>

        <div className="flex mt-1 sm:mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 sm:h-6 sm:w-6 ${
                star <= Math.round(averageRating)
                  ? "fill-[#C9A84C] text-[#C9A84C]"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>

        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#1B2B4B]/60">
          Based on {totalReviews.toLocaleString()} reviews
        </p>

        <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#1B2B4B]/60">
          <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          <span>All reviews are from verified purchases</span>
        </div>
      </div>

      {/* Right Column - Rating Distribution */}
      <div>
        <RatingDistribution distribution={ratingDistribution} totalReviews={totalReviews} />
      </div>
    </div>
  );
};