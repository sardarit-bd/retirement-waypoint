'use client';

import { motion } from 'framer-motion';
import { Ticket, Award } from 'lucide-react';

export function CouponCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="rounded-3xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/5 to-[#D6B45A]/5 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-[#C9A84C]/10 p-2">
          <Ticket className="h-5 w-5 text-[#C9A84C]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1B2B4B]">Coupon Applied</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-[#C9A84C]/10 px-3 py-1 font-mono text-sm font-medium text-[#C9A84C]">
              {order.couponCode}
            </span>
            <span className="text-sm font-semibold text-emerald-600">
              -${order.discountAmount.toFixed(2)}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#1B2B4B]/60">
            {order.discountPercentage || ''}% discount applied
          </p>
        </div>
      </div>
    </motion.div>
  );
}