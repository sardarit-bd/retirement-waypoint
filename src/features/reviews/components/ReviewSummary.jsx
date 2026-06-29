"use client";

import { Star } from "lucide-react";

export const ReviewSummary = ({ summary, loading }) => {
  if (loading) {
    return <ReviewSummarySkeleton />;
  }

  if (!summary || summary.totalReviews === 0) {
    return null;
  }

  const { averageRating, totalReviews, distribution } = summary;

  const getPercentage = (count) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Average Rating */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-4xl font-bold text-[#1B2B4B]">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(averageRating)
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-[#1B2B4B]/60 mt-1">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars] || 0;
            const percentage = getPercentage(count);
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1B2B4B]/60 min-w-[20px]">
                  {stars}★
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-[#1B2B4B]/40 min-w-[30px] text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ReviewSummarySkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      <div className="text-center md:text-left">
        <div className="h-10 w-16 bg-gray-200 rounded mx-auto md:mx-0" />
        <div className="h-4 w-32 bg-gray-200 rounded mt-2 mx-auto md:mx-0" />
      </div>
      <div className="flex-1 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-8 bg-gray-200 rounded" />
            <div className="flex-1 h-2 bg-gray-200 rounded" />
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);