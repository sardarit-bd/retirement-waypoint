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

  console.log("Review Item: ", review)
  const userName = user?.name || "Anonymous User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="py-2">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <ReviewAvatar
            name={userName}
            image={user?.image}
            initial={userInitial}
          />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1B2B4B]">{userName}</span>
              {isVerifiedPurchase && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Verified Purchase</span>
                </div>
              )}
            </div>

            {/* Stars */}
            <div className="flex mt-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
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
        <span className="text-sm text-[#1B2B4B]/50 whitespace-nowrap">
          {formattedDate}
        </span>
      </div>

      {/* Content */}
      <div className="mt-2 ml-12">
        {title && (
          <h4 className="font-semibold text-[#1B2B4B] text-base">{title}</h4>
        )}
        <p className="text-[#1B2B4B]/80 text-sm leading-relaxed mt-1">
          {comment}
        </p>
      </div>
    </div>
  );
};
