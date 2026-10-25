"use client";

import { useState } from "react";
import { Star, AlertCircle } from "lucide-react";
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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = "Please select a rating of at least 1 star.";
    }
    if (!comment.trim()) {
      newErrors.comment = "Please write a review comment.";
    } else if (comment.trim().length > 2000) {
      newErrors.comment = "Comment cannot exceed 2000 characters.";
    }
    if (title.trim().length > 150) {
      newErrors.title = "Title cannot exceed 150 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ rating, title: title.trim(), comment: comment.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-[#1B2B4B]">
          Rating <span className="text-red-500">*</span>
        </Label>
        <div className="flex gap-1 mt-1.5" role="group" aria-label="Rating selection">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                setRating(star);
                if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
              }}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
              aria-pressed={rating === star}
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
        {errors.rating && (
          <p
            id="review-rating-error"
            role="alert"
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>{errors.rating}</span>
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="review-title" className="text-sm font-medium text-[#1B2B4B]">
          Review Title (Optional)
        </Label>
        <Input
          id="review-title"
          name="title"
          maxLength={150}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder="Summarize your experience"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "review-title-error" : undefined}
          className={`mt-1.5 ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {errors.title && (
          <p
            id="review-title-error"
            role="alert"
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>{errors.title}</span>
          </p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center">
          <Label htmlFor="review-comment" className="text-sm font-medium text-[#1B2B4B]">
            Review <span className="text-red-500">*</span>
          </Label>
          <span className="text-xs text-[#1B2B4B]/50">{comment.trim().length}/2000 max</span>
        </div>
        <Textarea
          id="review-comment"
          name="comment"
          required
          maxLength={2000}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (errors.comment) setErrors((prev) => ({ ...prev, comment: undefined }));
          }}
          placeholder="What did you think about this book?"
          rows={4}
          aria-required="true"
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? "review-comment-error" : undefined}
          className={`mt-1.5 ${errors.comment ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {errors.comment && (
          <p
            id="review-comment-error"
            role="alert"
            className="text-xs text-red-500 mt-1 flex items-center gap-1"
          >
            <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>{errors.comment}</span>
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
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