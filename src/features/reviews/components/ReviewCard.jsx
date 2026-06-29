"use client";

import { Star, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export const ReviewCard = ({ review }) => {
  const { rating, title, comment, createdAt, isVerifiedPurchase } = review;

  const formattedDate = createdAt
    ? format(new Date(createdAt), 'MMMM d, yyyy')
    : '';

  // Mask user name for privacy (only show first letter)
  const displayName = review.user?.name
    ? review.user.name.charAt(0) + '***'
    : 'Verified Reader';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#1B2B4B]/5 hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-[#1B2B4B]">{displayName}</span>
            {isVerifiedPurchase && (
              <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <CheckCircle className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-[#1B2B4B]/40">{formattedDate}</span>
      </div>

      {title && (
        <h4 className="font-semibold text-[#1B2B4B] mt-3">{title}</h4>
      )}
      
      <p className="text-[#1B2B4B]/70 text-sm mt-2 leading-relaxed">
        {comment}
      </p>
    </div>
  );
};