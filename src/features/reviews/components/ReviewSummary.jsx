// src/features/reviews/components/ReviewSummary.jsx
"use client";

import { Star, CheckCircle } from "lucide-react";

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

  const ratingLevels = [
    { stars: 5, label: '5 Star', count: distribution[5] || 0 },
    { stars: 4, label: '4 Star', count: distribution[4] || 0 },
    { stars: 3, label: '3 Star', count: distribution[3] || 0 },
    { stars: 2, label: '2 Star', count: distribution[2] || 0 },
    { stars: 1, label: '1 Star', count: distribution[1] || 0 },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Side - Average Rating */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#1B2B4B]">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-lg text-[#1B2B4B]/50">/ 5</span>
          </div>
          
          <div className="flex items-center gap-1 mt-1">
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
          
          <p className="text-sm text-[#1B2B4B]/50 mt-1">
            Based on {totalReviews.toLocaleString()} reviews
          </p>
          
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#1B2B4B]/50">
            <CheckCircle className="h-3.5 w-3.5 text-[#C9A84C]" />
            <span>All reviews are from verified purchases</span>
          </div>
        </div>

        {/* Right Side - Rating Distribution */}
        <div className="flex flex-col justify-center space-y-1.5">
          {ratingLevels.map(({ stars, label, count }) => {
            const percentage = getPercentage(count);
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1B2B4B]/70 min-w-[50px]">
                  {label}
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F59E0B] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-[#1B2B4B]/60 min-w-[30px] text-right">
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
  <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] animate-pulse">
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <div className="h-10 w-20 bg-gray-200 rounded" />
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-4 w-32 bg-gray-200 rounded mt-2" />
        <div className="h-4 w-48 bg-gray-200 rounded mt-2" />
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-4 w-12 bg-gray-200 rounded" />
            <div className="flex-1 h-2 bg-gray-200 rounded" />
            <div className="h-4 w-8 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);