'use client';

import { motion } from 'framer-motion';
import { XCircle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function RejectReviewDialog({
  isOpen,
  onClose,
  review,
  onConfirm,
  isRejecting = false,
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
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
              <XCircle className="h-7 w-7 text-red-500" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-[#1B2B4B]">
              Reject Review
            </DialogTitle>
            <DialogDescription className="text-center text-[#1B2B4B]/60">
              Are you sure you want to reject this review from{' '}
              <span className="font-semibold text-[#1B2B4B]">
                {review.user?.name || 'Anonymous'}
              </span>
              ?
              <br />
              <span className="text-sm text-[#1B2B4B]/40">
                &ldquo;{review.title}&rdquo;
              </span>
              <br />
              <span className="text-sm text-red-500/70 mt-2 block">
                This action cannot be undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isRejecting}
              className="rounded-full border-[#1B2B4B]/15 px-6 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isRejecting}
              className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 disabled:opacity-70"
            >
              {isRejecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                'Reject Review'
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}