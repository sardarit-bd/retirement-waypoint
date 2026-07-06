"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export const RatingDistribution = ({ distribution = {}, totalReviews = 0 }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [isAnimated, setIsAnimated] = useState(false);

  // Get counts for each rating
  const getCount = (rating) => distribution[rating] || 0;
  const getPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return (getCount(rating) / totalReviews) * 100;
  };

  useEffect(() => {
    // Animate progress bars on mount
    const timeout = setTimeout(() => {
      const percentages = {};
      for (let i = 5; i >= 1; i--) {
        percentages[i] = getPercentage(i);
      }
      setAnimatedValues(percentages);
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalReviews]);

  const starLabels = [
    { rating: 5, stars: "★★★★★", emptyStars: "" },
    { rating: 4, stars: "★★★★☆", emptyStars: "" },
    { rating: 3, stars: "★★★☆☆", emptyStars: "" },
    { rating: 2, stars: "★★☆☆☆", emptyStars: "" },
    { rating: 1, stars: "★☆☆☆☆", emptyStars: "" },
  ];

  return (
    <div className="space-y-2">
      {starLabels.map(({ rating, stars }) => {
        const count = getCount(rating);
        const percentage = getPercentage(rating);
        const animatedPercentage = isAnimated ? animatedValues[rating] || 0 : 0;

        return (
          <div key={rating} className="flex items-center gap-3">
            {/* Star Label */}
            <div className="flex items-center gap-1 min-w-[80px]">
              <span className="text-sm font-medium text-[#1B2B4B]">
                {rating} Star
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9A84C] rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${animatedPercentage}%`,
                  transition: isAnimated ? 'width 1s ease-out' : 'none'
                }}
              />
            </div>

            {/* Count */}
            <div className="min-w-[40px] text-right">
              <span className="text-sm text-[#1B2B4B]/70">
                {count.toLocaleString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};