'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProfileErrorState({ error, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8 text-center"
    >
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-red-500/10 p-3 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-[#1B2B4B]">Failed to Load Profile</h3>
        <p className="mt-1 text-sm text-[#1B2B4B]/60">
          {error?.message || 'Something went wrong loading your profile'}
        </p>
        <Button
          onClick={onRetry}
          className="mt-6 rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors"
        >
          Try Again
        </Button>
      </div>
    </motion.div>
  );
}