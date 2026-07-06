'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OrderDetailsErrorState({ error, refetch }) {
  const message = typeof error === 'string' 
    ? error 
    : error?.response?.data?.message || error?.message || 'Failed to load order details';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border-red-500/20 bg-red-500/5 backdrop-blur-xl p-12 text-center shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="mx-auto mb-4 rounded-full bg-red-500/10 p-4 w-fit">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-red-500 mb-2">
        Unable to Load Order
      </h3>
      
      <p className="max-w-md mx-auto text-[#1B2B4B]/60 mb-6">
        {message}
      </p>
      
      <Button
        onClick={() => refetch()}
        className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-8 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </motion.div>
  );
}