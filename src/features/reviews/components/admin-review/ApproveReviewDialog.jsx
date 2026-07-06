'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ApproveReviewDialog({
  isOpen,
  onClose,
  review,
  onConfirm,
  isApproving = false,
}) {
  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle className="h-7 w-7 text-emerald-500" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-[#1B2B4B]">
              Approve Review
            </DialogTitle>
            <DialogDescription className="text-center text-[#1B2B4B]/60">
              Are you sure you want to approve this review from{' '}
              <span className="font-semibold text-[#1B2B4B]">
                {review.user?.name || 'Anonymous'}
              </span>
              ?
              <br />
              <span className="text-sm text-[#1B2B4B]/40">
                &ldquo;{review.title}&rdquo;
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isApproving}
              className="rounded-full border-[#1B2B4B]/15 px-6 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isApproving}
              className="rounded-full bg-emerald-500 px-6 text-white hover:bg-emerald-600 disabled:opacity-70"
            >
              {isApproving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Approving...
                </>
              ) : (
                'Approve Review'
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}