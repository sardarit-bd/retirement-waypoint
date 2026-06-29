"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ReviewForm = ({ 
  onSubmit, 
  onCancel, 
  initialData = null,
  isSubmitting = false,
  isEditing = false,
}) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState(initialData?.title || "");
  const [comment, setComment] = useState(initialData?.comment || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    onSubmit({ rating, title, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-[#1B2B4B]">Rating</Label>
        <div className="flex gap-1 mt-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "fill-gray-200 text-gray-200"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
        {rating === 0 && (
          <p className="text-xs text-red-500 mt-1">Please select a rating</p>
        )}
      </div>

      <div>
        <Label htmlFor="review-title" className="text-sm font-medium text-[#1B2B4B]">
          Review Title
        </Label>
        <Input
          id="review-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label htmlFor="review-comment" className="text-sm font-medium text-[#1B2B4B]">
          Review
        </Label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think about this book?"
          rows={4}
          className="mt-1.5"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
        >
          {isSubmitting ? "Submitting..." : isEditing ? "Update Review" : "Submit Review"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};