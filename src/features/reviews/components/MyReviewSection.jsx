"use client";

import { useState, useEffect } from "react";
import { Star, Pencil, Trash2, X, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
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
  hasPurchased = false,
  myReview,
  isLoading,
  onReviewUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(myReview?.rating || 0);
  const [title, setTitle] = useState(myReview?.title || "");
  const [description, setDescription] = useState(myReview?.comment || "");
  const [hoveredRating, setHoveredRating] = useState(0);

  // Sync state when myReview changes
  useEffect(() => {
    if (myReview) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRating(myReview.rating || 0);
      setTitle(myReview.title || "");
      setDescription(myReview.comment || "");
    }
  }, [myReview]);

  const createReview = useCreateReview(bookId);
  const updateReview = useUpdateReview(bookId);
  const deleteReview = useDeleteReview(bookId);

  const hasReview = !!myReview;
  const isPending =
    myReview &&
    (myReview.status === "PENDING" ||
      (!myReview.isApproved && myReview.status !== "REJECTED"));
  const isApproved =
    myReview &&
    (myReview.status === "APPROVED" || myReview.isApproved);
  const isRejected = myReview && myReview.status === "REJECTED";

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
        setIsEditing(false);
      }
      onReviewUpdate?.();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your review?")) return;

    try {
      await deleteReview.mutateAsync(myReview._id);
      setIsEditing(false);
      onReviewUpdate?.();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleCancel = () => {
    if (hasReview) {
      setRating(myReview.rating || 0);
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
      <div className="py-2 animate-pulse">
        <div className="h-5 sm:h-6 w-32 sm:w-48 bg-gray-200 rounded" />
        <div className="mt-2 sm:mt-3 h-16 sm:h-20 bg-gray-200 rounded" />
      </div>
    );
  }

  // 1. If user has review and is NOT editing, show review card with status
  if (hasReview && !isEditing) {
    return (
      <div>
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#1B2B4B]/10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-[#1B2B4B]">
                  Your Review
                </span>

                {/* Verified Buyer Badge */}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Verified Buyer</span>
                </span>

                {/* Status Badges */}
                {isPending && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                    <Clock className="h-3 w-3 text-amber-600" />
                    <span>Your review is pending moderation.</span>
                  </span>
                )}

                {isRejected && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200/80 px-2.5 py-0.5 rounded-full">
                    <span>Needs Revision</span>
                  </span>
                )}

                {/* Star Rating */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${star <= myReview.rating
                          ? "fill-[#C9A84C] text-[#C9A84C]"
                          : "fill-gray-200 text-gray-200"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {myReview.title && (
                <h4 className="font-semibold text-[#1B2B4B] text-sm sm:text-base">
                  {myReview.title}
                </h4>
              )}
              <p className="text-[#1B2B4B]/70 text-sm leading-relaxed">{myReview.comment}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 px-2.5 text-xs text-[#1B2B4B] border-[#1B2B4B]/20 hover:bg-[#F8F5EF] cursor-pointer"
              >
                <Pencil className="h-3.5 w-3.5 mr-1" />
                <span>Edit Review</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-8 px-2 text-red-500/70 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                disabled={deleteReview.isPending}
                title="Delete review"
              >
                {deleteReview.isPending ? (
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. If user has NOT reviewed, check if they are a verified purchaser
  if (!hasReview && !isEditing) {
    // If NOT purchased: hide "Write a Review" button completely
    if (!hasPurchased) {
      return null;
    }

    // If purchased: Show "Write a Review" CTA
    return (
      <div>
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#FDFBF7] to-white border border-[#C9A84C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#C9A84C]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
                Verified Buyer
              </span>
            </div>
            <h4 className="font-semibold text-[#1B2B4B] text-base">
              Share your thoughts on this book
            </h4>
            <p className="text-sm text-[#1B2B4B]/70">
              As a verified reader, your review helps others on their retirement journey.
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] font-semibold whitespace-nowrap cursor-pointer px-5"
          >
            Write a Review
          </Button>
        </div>
      </div>
    );
  }

  // 3. Review Create / Edit Form (only accessible if hasPurchased or editing existing review)
  if (isEditing) {
    return (
      <div>
        <div className="p-4 sm:p-6 rounded-xl bg-white border border-[#1B2B4B]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-[#1B2B4B]">
                {hasReview ? "Edit Your Review" : "Write a Verified Review"}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>Verified Buyer</span>
              </span>
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="text-[#1B2B4B]/40 hover:text-[#1B2B4B] p-1 rounded cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Star Rating Selector */}
          <div>
            <label className="block text-xs font-medium text-[#1B2B4B]/70 mb-1.5">
              Overall Rating *
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none p-0.5 cursor-pointer"
                >
                  <Star
                    className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${star <= (hoveredRating || rating)
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "fill-gray-200 text-gray-200 hover:fill-[#C9A84C]/60"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Title Input */}
          <div>
            <label className="block text-xs font-medium text-[#1B2B4B]/70 mb-1.5">
              Review Title (Optional)
            </label>
            <Input
              placeholder="Summarize your review in a headline..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              className="border-[#1B2B4B]/20 focus:border-[#C9A84C] text-sm"
            />
          </div>

          {/* Review Description Textarea */}
          <div>
            <label className="block text-xs font-medium text-[#1B2B4B]/70 mb-1.5">
              Your Review *
            </label>
            <Textarea
              placeholder="What did you like or dislike? What should other readers know?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={2000}
              className="min-h-[100px] border-[#1B2B4B]/20 focus:border-[#C9A84C] text-sm leading-relaxed"
            />
          </div>

          {/* Moderation note */}
          <div className="flex items-center gap-1.5 text-xs text-[#1B2B4B]/60">
            <Clock className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
            <span>Reviews undergo admin moderation before being displayed publicly.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={createReview.isPending || updateReview.isPending}
              className="cursor-pointer bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] font-semibold text-xs sm:text-sm px-5"
              size="sm"
            >
              {createReview.isPending || updateReview.isPending ? (
                <>
                  <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#1B2B4B] border-t-transparent" />
                  Submitting...
                </>
              ) : hasReview ? (
                "Update Review"
              ) : (
                "Submit Review"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              size="sm"
              className="cursor-pointer text-[#1B2B4B]/60 hover:text-[#1B2B4B] text-xs sm:text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};