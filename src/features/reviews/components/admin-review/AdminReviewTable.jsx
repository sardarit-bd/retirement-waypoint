'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ReviewViewModal } from './ReviewViewModal';
import { ApproveReviewDialog } from './ApproveReviewDialog';
import { RejectReviewDialog } from './RejectReviewDialog';

export function AdminReviewTable({
  reviews,
  isLoading,
  onApprove,
  onReject,
  onDelete,
  isApproving,
  isRejecting,
  isDeleting,
}) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const handleView = (review) => {
    setSelectedReview(review);
    setViewModalOpen(true);
  };

  const handleApprove = (review) => {
    setSelectedReview(review);
    setApproveDialogOpen(true);
  };

  const handleReject = (review) => {
    setSelectedReview(review);
    setRejectDialogOpen(true);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-3 w-3 sm:h-4 sm:w-4',
              i < rating
                ? 'fill-[#F59E0B] text-[#F59E0B]'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <AdminReviewTableSkeleton />;
  }

  if (!reviews || reviews.length === 0) {
    return <AdminReviewEmptyState />;
  }

  return (
    <>
      <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm">User</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm hidden sm:table-cell">Book</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm text-center">Rating</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm hidden md:table-cell">Review</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm text-center hidden lg:table-cell">Verified</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm text-center">Status</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm hidden lg:table-cell">Date</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-xs sm:text-sm text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review, index) => {
                const isPending = !review.isApproved;
                const userName = review.user?.name || 'Anonymous';
                const userInitial = getInitials(userName);

                return (
                  <motion.tr
                    key={review._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
                  >
                    {/* User */}
                    <TableCell>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                          <AvatarImage src={review.user?.image} />
                          <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-[10px] sm:text-xs">
                            {userInitial}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs sm:text-sm font-medium text-[#1B2B4B] truncate max-w-[60px] sm:max-w-[100px]">
                          {userName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Book */}
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="relative h-8 w-6 sm:h-10 sm:w-8 shrink-0 overflow-hidden rounded-md bg-[#F8F5EF]">
                          {review.book?.coverImage ? (
                            <Image
                              src={review.book.coverImage}
                              alt={review.book.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[6px] sm:text-[8px] font-bold text-[#1B2B4B]/30">
                              {review.book?.title?.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-[#1B2B4B] truncate max-w-[60px] sm:max-w-[120px]">
                          {review.book?.title || 'Unknown Book'}
                        </span>
                      </div>
                    </TableCell>

                    {/* Rating */}
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs sm:text-sm font-bold text-[#1B2B4B]">{review.rating}</span>
                        {renderStars(review.rating)}
                      </div>
                    </TableCell>

                    {/* Review */}
                    <TableCell className="hidden md:table-cell">
                      <div className="max-w-[120px] sm:max-w-[200px]">
                        <p className="text-xs sm:text-sm font-medium text-[#1B2B4B] truncate">
                          {review.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#1B2B4B]/60 truncate">
                          {review.comment}
                        </p>
                      </div>
                    </TableCell>

                    {/* Verified */}
                    <TableCell className="text-center hidden lg:table-cell">
                      {review.isVerifiedPurchase ? (
                        <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-[10px] sm:text-xs text-[#1B2B4B]/30">—</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      <Badge
                        className={cn(
                          'border px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium',
                          isPending
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        )}
                      >
                        {isPending ? 'Pending' : 'Approved'}
                      </Badge>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-[10px] sm:text-sm text-[#1B2B4B]/60 whitespace-nowrap">
                        {formatDate(review.createdAt)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        {/* View */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(review)}
                          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0 hover:bg-[#F8F5EF] cursor-pointer"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-[#1B2B4B]/60" />
                        </Button>

                        {/* Approve - Only for pending */}
                        {isPending && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApprove(review)}
                            disabled={isApproving}
                            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        )}

                        {/* Reject - Only for pending */}
                        {isPending && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReject(review)}
                            disabled={isRejecting}
                            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                          >
                            <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        )}

                        {/* Delete - For all reviews */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(review._id)}
                          disabled={isDeleting}
                          className="h-6 w-6 sm:h-8 sm:w-8 rounded-full p-0 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modals and Dialogs */}
      <ReviewViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        review={selectedReview}
      />

      <ApproveReviewDialog
        isOpen={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
        review={selectedReview}
        onConfirm={() => {
          if (selectedReview) {
            onApprove(selectedReview._id);
            setApproveDialogOpen(false);
          }
        }}
        isApproving={isApproving}
      />

      <RejectReviewDialog
        isOpen={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        review={selectedReview}
        onConfirm={() => {
          if (selectedReview) {
            onReject(selectedReview._id);
            setRejectDialogOpen(false);
          }
        }}
        isRejecting={isRejecting}
      />
    </>
  );
}

// Skeleton Component
function AdminReviewTableSkeleton() {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(8)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(8)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-4 sm:h-6 w-14 sm:w-20 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Empty State Component
function AdminReviewEmptyState() {
  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-8 sm:p-12 text-center">
      <div className="mx-auto mb-3 sm:mb-4 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <Star className="h-5 w-5 sm:h-7 sm:w-7" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-[#1B2B4B]">No reviews found</h2>
      <p className="mx-auto mt-1 sm:mt-2 max-w-md text-xs sm:text-sm text-[#1B2B4B]/60">
        Try adjusting your search or filters to find the right reviews.
      </p>
    </div>
  );
}