'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function OrderSummaryCard({ order }) {
  const router = useRouter();
  const hasDiscount = order.discountAmount > 0;
  const hasTax = order.taxAmount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[#1B2B4B]/60">Subtotal</span>
          <span className="font-medium text-[#1B2B4B]">
            ${order.subtotal.toFixed(2)}
          </span>
        </div>

        {hasDiscount && (
          <div className="flex items-center justify-between">
            <span className="text-[#1B2B4B]/60">Discount</span>
            <span className="font-medium text-emerald-600">
              -${order.discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        {hasTax && (
          <div className="flex items-center justify-between">
            <span className="text-[#1B2B4B]/60">Tax</span>
            <span className="font-medium text-[#1B2B4B]">
              ${order.taxAmount.toFixed(2)}
            </span>
          </div>
        )}

        <Separator className="bg-[#1B2B4B]/5" />

        <div className="flex items-center justify-between pt-1">
          <span className="font-semibold text-[#1B2B4B]">Total</span>
          <span className="text-2xl font-bold text-[#C9A84C]">
            ${order.totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}