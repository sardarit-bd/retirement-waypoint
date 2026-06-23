'use client';

import { motion } from 'framer-motion';
import { Ban, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CancelledOrderCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border-red-500/20 bg-gradient-to-br from-red-500/5 to-red-500/10 backdrop-blur-xl p-8 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="rounded-full bg-red-500/10 p-4">
          <Ban className="h-12 w-12 text-red-500" />
        </div>
        
        <h3 className="text-2xl font-bold text-[#1B2B4B]">
          Order Cancelled
        </h3>
        
        <p className="max-w-md text-[#1B2B4B]/60">
          This order has been cancelled. If you have any questions, please contact our support team.
        </p>
        
        <div className="mt-2 flex flex-wrap gap-3 justify-center">
          <Button
            asChild
            className="rounded-full bg-[#1B2B4B] px-8 text-white font-semibold hover:bg-[#1B2B4B]/90 transition-all"
          >
            <Link href="/dashboard/orders">
              <HelpCircle className="mr-2 h-4 w-4" />
              View All Orders
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}