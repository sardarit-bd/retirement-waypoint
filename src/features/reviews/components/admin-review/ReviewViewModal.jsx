'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  User,
  BookOpen,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function ReviewViewModal({ isOpen, onClose, review }) {
  if (!review) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < rating
                ? 'fill-[#F59E0B] text-[#F59E0B]'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>
    );
  };

  const userName = review.user?.name || 'Anonymous User';
  const userInitial = getInitials(userName);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 rounded-t-3xl border-b border-[#1B2B4B]/5 bg-white/80 backdrop-blur-xl p-6">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#1B2B4B]">
                Review Details
              </DialogTitle>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-[#F8F5EF] transition-colors"
              >
                <X className="h-5 w-5 text-[#1B2B4B]/60" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={review.user?.image} />
                <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-lg font-semibold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-[#1B2B4B]">{userName}</p>
                <p className="text-sm text-[#1B2B4B]/60">{review.user?.email || 'No email'}</p>
              </div>
              {review.isVerifiedPurchase && (
                <Badge className="ml-auto bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Verified Purchase
                </Badge>
              )}
            </div>

            {/* Book Info */}
            <div className="rounded-2xl bg-[#F8F5EF] p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md shadow-md">
                  {review.book?.coverImage ? (
                    <Image
                      src={review.book.coverImage}
                      alt={review.book.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#1B2B4B]/10 text-[#1B2B4B]/30">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#1B2B4B]">{review.book?.title || 'Unknown Book'}</p>
                  <p className="text-sm text-[#1B2B4B]/60">by {review.book?.authorName || 'Unknown Author'}</p>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#1B2B4B]">{review.rating}</span>
                  {renderStars(review.rating)}
                </div>
                <Badge
                  className={cn(
                    'border px-3 py-1 text-xs font-medium',
                    !review.isApproved
                      ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  )}
                >
                  {review.isApproved ? 'Approved' : 'Pending'}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1B2B4B]">{review.title}</h3>
                <p className="mt-2 text-[#1B2B4B]/80 leading-relaxed whitespace-pre-wrap">
                  {review.comment}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#F8F5EF] p-4">
              <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                <Calendar className="h-4 w-4" />
                <span>Created: {formatDate(review.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                <Clock className="h-4 w-4" />
                <span>Updated: {formatDate(review.updatedAt)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}