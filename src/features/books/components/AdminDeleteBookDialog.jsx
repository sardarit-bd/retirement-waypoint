'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function AdminDeleteBookDialog({
  isOpen,
  onClose,
  bookTitle,
  onConfirm,
  isDeleting = false,
}) {
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
              <AlertTriangle className="h-7 w-7 text-red-500" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-[#1B2B4B]">
              Delete Book
            </DialogTitle>
            <DialogDescription className="text-center text-[#1B2B4B]/60">
              Are you sure you want to delete &ldquo;{bookTitle}&rdquo;? This action can be undone later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
              className="rounded-full border-[#1B2B4B]/15 px-6 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isDeleting}
              className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 disabled:opacity-70"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Book'
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}