"use client";

import { Star, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ReviewItem = ({ review }) => {
  const { rating, title, comment, createdAt, isVerifiedPurchase, user } = review;

  const formattedDate = createdAt
    ? format(new Date(createdAt), 'dd MMM yyyy')
    : '';

  // Get user initials
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const displayName = user?.name || 'Verified Reader';
  const initials = getInitials(displayName);
  const avatarImage = user?.avatar || user?.profileImage || null;

  return (
    <div className="py-6 first:pt-0 last:pb-0 border-b border-[#1B2B4B]/10 last:border-0">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10">
            {avatarImage ? (
              <AvatarImage src={avatarImage} alt={displayName} />
            ) : null}
            <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] font-medium text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          {/* Top Row: Name, Verified Badge, Date */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#1B2B4B]">
              {displayName}
            </span>
            {isVerifiedPurchase && (
              <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <CheckCircle className="h-3 w-3" />
                Verified Purchase
              </span>
            )}
            <span className="text-xs text-[#1B2B4B]/40 ml-auto">
              {formattedDate}
            </span>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1">
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

          {/* Title */}
          {title && (
            <h4 className="font-semibold text-[#1B2B4B] mt-2">
              {title}
            </h4>
          )}

          {/* Comment */}
          <p className="text-[#1B2B4B]/70 text-sm mt-1 leading-relaxed">
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
};