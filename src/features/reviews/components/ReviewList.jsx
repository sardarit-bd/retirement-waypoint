"use client";

import { ReviewItem } from "./ReviewItem";

export const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-0">
      {reviews.map((review, index) => (
        <div key={review._id}>
          <ReviewItem review={review} />
          {index < reviews.length - 1 && (
            <div className="border-t border-[#1B2B4B]/10 my-6" />
          )}
        </div>
      ))}
    </div>
  );
};