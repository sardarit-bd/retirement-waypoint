"use client";

import { Star, ShieldCheck } from "lucide-react";
import { ReviewAvatar } from "./ReviewAvatar";

export const ReviewItem = ({ review }) => {
  const {
    user,
    rating,
    title,
    comment,
    createdAt,
    isVerifiedPurchase = false,
  } = review;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const userName = user?.name || "Anonymous User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="py-2 sm:py-3">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Avatar */}
          <ReviewAvatar
            name={userName}
            image={user?.image}
            initial={userInitial}
          />

          <div>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <span className="font-semibold text-[#1B2B4B] text-sm sm:text-base">
                {userName}
              </span>
              {isVerifiedPurchase && (
                <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-green-600">
                  <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span>Verified Purchase</span>
                </div>
              )}
            </div>

            {/* Stars */}
            <div className="flex mt-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                    star <= rating
                      ? "fill-[#C9A84C] text-[#C9A84C]"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Date - Right aligned */}
        <span className="text-xs sm:text-sm text-[#1B2B4B]/50 whitespace-nowrap">
          {formattedDate}
        </span>
      </div>

      {/* Content */}
      <div className="mt-2 ml-0 sm:ml-12">
        {title && (
          <h4 className="font-semibold text-[#1B2B4B] text-sm sm:text-base">
            {title}
          </h4>
        )}
        <p className="text-[#1B2B4B]/80 text-xs sm:text-sm leading-relaxed mt-1">
          {comment}
        </p>
      </div>
    </div>
  );
};