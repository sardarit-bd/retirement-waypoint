"use client";

import { MessageCircle } from "lucide-react";

export const ReviewEmpty = ({ message = "No reviews yet" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <MessageCircle className="h-12 w-12 text-[#1B2B4B]/20" />
      <p className="mt-4 text-[#1B2B4B]/60">{message}</p>
      <p className="text-sm text-[#1B2B4B]/40">
        Be the first to share your thoughts
      </p>
    </div>
  );
};