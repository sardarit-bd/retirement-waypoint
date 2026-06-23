'use client';

import { motion } from 'framer-motion';
import { CreditCard, Calendar, Hash } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';

export function PaymentInfoCard({ order }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
        Payment Information
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#1B2B4B]/60">Status</span>
          <OrderStatusBadge status={order.paymentStatus} type="payment" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#1B2B4B]/60">Method</span>
          <span className="text-sm font-medium text-[#1B2B4B]">
            {order.paymentMethod || 'Stripe'}
          </span>
        </div>

        {order.stripePaymentIntentId && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#1B2B4B]/60">Transaction ID</span>
            <span className="text-xs font-mono text-[#1B2B4B] truncate max-w-[140px]">
              {order.stripePaymentIntentId}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#1B2B4B]/5">
          <span className="text-sm text-[#1B2B4B]/60">Transaction Date</span>
          <span className="text-sm font-medium text-[#1B2B4B]">
            {formatDate(order.updatedAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}