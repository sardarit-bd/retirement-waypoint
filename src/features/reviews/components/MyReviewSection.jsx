"use client";

import { useState } from "react";
import { Star, Clock, Edit2, Trash2, AlertTriangle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReviewForm } from "./ReviewForm";
import Link from "next/link";

export const MyReviewSection = ({
  myReview,
  isPurchased,
  isLoggedIn,
  onCreateReview,
  onUpdateReview,
  onDeleteReview,
  isSubmitting,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Not logged in
  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] text-center">
        <p className="text-[#1B2B4B]/60">Login to purchase this book and write a review.</p>
        <Button className="mt-4 bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]">
          Sign In
        </Button>
      </div>
    );
  }

  // Logged in but not purchased and no review
  if (!isPurchased && !myReview) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 text-[#C9A84C] mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-[#1B2B4B]">Purchase this book to write a review</h3>
          <p className="text-sm text-[#1B2B4B]/60 mt-1">
            Only verified purchasers can share their experience.
          </p>
          <Link href="#buy-now">
            <Button className="mt-4 bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]">
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // No review yet - show form (only for purchased users)
  if (!myReview) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        <h3 className="text-lg font-semibold text-[#1B2B4B] mb-4">Write Your Review</h3>
        <ReviewForm onSubmit={onCreateReview} isSubmitting={isSubmitting} />
      </div>
    );
  }

  // Has review - show status
  const isPending = myReview.status === "PENDING";
  const isApproved = myReview.status === "APPROVED";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < myReview.rating
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <Badge
              className={isPending ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}
            >
              {isPending ? "Pending Approval" : "Approved"}
            </Badge>
          </div>
          {myReview.title && (
            <h4 className="font-semibold text-[#1B2B4B] mt-2">{myReview.title}</h4>
          )}
          <p className="text-[#1B2B4B]/70 text-sm mt-1">{myReview.comment}</p>
          {isPending && (
            <div className="mt-3 flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>Your review is pending approval. It will become visible after admin review.</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="text-[#1B2B4B]"
        >
          <Edit2 className="h-4 w-4 mr-1.5" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Delete
        </Button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="mt-4 pt-4 border-t">
          <div className="mb-3 p-3 bg-yellow-50 rounded-lg flex items-start gap-2 text-sm text-yellow-700">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>Editing your review will require administrator approval again.</span>
          </div>
          <ReviewForm
            initialData={myReview}
            onSubmit={(data) => onUpdateReview({ reviewId: myReview._id, data })}
            onCancel={() => setIsEditing(false)}
            isSubmitting={isSubmitting}
            isEditing
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your review? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteReview(myReview._id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};