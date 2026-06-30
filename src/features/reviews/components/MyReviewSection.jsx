"use client";

import { useState } from "react";
import { Star, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "../hooks/useReviews";
import toast from "react-hot-toast";

export const MyReviewSection = ({
  bookId,
  myReview,
  isLoading,
  onReviewUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rating, setRating] = useState(myReview?.rating || 0);
  const [title, setTitle] = useState(myReview?.title || "");
  const [description, setDescription] = useState(myReview?.comment || "");
  const [hoveredRating, setHoveredRating] = useState(0);

  const createReview = useCreateReview(bookId);
  const updateReview = useUpdateReview(bookId);
  const deleteReview = useDeleteReview(bookId);

  const hasReview = !!myReview;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!description.trim()) {
      toast.error("Please write a review");
      return;
    }

    const data = {
      bookId,
      rating,
      title: title.trim(),
      comment: description.trim(),
    };

    try {
      if (hasReview) {
        await updateReview.mutateAsync({
          reviewId: myReview._id,
          data,
        });
        setIsEditing(false);
      } else {
        await createReview.mutateAsync(data);
        // Reset form after creation
        setRating(0);
        setTitle("");
        setDescription("");
        setIsEditing(false);
      }
      onReviewUpdate?.();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your review?")) return;

    try {
      await deleteReview.mutateAsync(myReview._id);
      setIsDeleting(false);
      onReviewUpdate?.();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleCancel = () => {
    if (hasReview) {
      setRating(myReview.rating);
      setTitle(myReview.title || "");
      setDescription(myReview.comment || "");
    } else {
      setRating(0);
      setTitle("");
      setDescription("");
    }
    setIsEditing(false);
    setHoveredRating(0);
  };

  if (isLoading) {
    return (
      <div className="py-4 border-t border-[#1B2B4B]/10 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="mt-3 h-20 bg-gray-200 rounded" />
      </div>
    );
  }

  // If user has a review and is not editing, show their review
  if (hasReview && !isEditing && !isDeleting) {
    return (
      <div className="py-4 border-t border-[#1B2B4B]/10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#1B2B4B]">
                Your Review
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= myReview.rating
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            {myReview.title && (
              <h4 className="font-semibold text-[#1B2B4B] text-sm mt-1">
                {myReview.title}
              </h4>
            )}
            <p className="text-[#1B2B4B]/70 text-sm mt-1">{myReview.comment}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="h-8 px-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B] cursor-pointer"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 px-2 text-red-500/60 hover:text-red-500 cursor-pointer"
              disabled={deleteReview.isPending}
            >
              {deleteReview.isPending ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show create/edit form
  if (isEditing || !hasReview) {
    return (
      <div className="py-4 border-t border-[#1B2B4B]/10">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#1B2B4B]">
                {hasReview ? "Edit Your Review" : "Write a Review"}
              </span>
              <button
                onClick={() => handleCancel()}
                className="text-sm text-[#1B2B4B]/40 hover:text-[#1B2B4B] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Star Rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 transition-colors cursor-pointer ${
                      star <= (hoveredRating || rating)
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "fill-gray-200 text-gray-200 hover:fill-[#C9A84C] hover:text-[#C9A84C]/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Title Input */}
            <Input
              placeholder="Review title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-[#1B2B4B]/20 focus:border-[#C9A84C]"
            />

            {/* Description Textarea */}
            <Textarea
              placeholder="Write your review..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] border-[#1B2B4B]/20 focus:border-[#C9A84C]"
            />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSubmit}
                disabled={createReview.isPending || updateReview.isPending}
                className="cursor-pointer bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] disabled:cursor-not-allowed"
                size="sm"
              >
                {createReview.isPending || updateReview.isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#1B2B4B] border-t-transparent" />
                    Submitting...
                  </>
                ) : hasReview ? (
                  "Update Review"
                ) : (
                  "Submit Review"
                )}
              </Button>

              <Button
                variant="ghost"
                onClick={handleCancel}
                size="sm"
                className="cursor-pointer text-[#1B2B4B]/60 hover:text-[#1B2B4B] disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
