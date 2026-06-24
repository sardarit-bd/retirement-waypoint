'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from '@/features/orders/components/OrderStatusBadge';

export function RecentOrdersCard({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1B2B4B]">Recent Orders</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-[#1B2B4B]/60">Your purchases will appear here</p>
        </div>
      </motion.div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Recent Orders</h2>
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-1 text-sm text-[#C9A84C] hover:underline"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {orders.slice(0, 3).map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center justify-between rounded-2xl bg-[#F8F5EF] p-3 transition-all hover:bg-[#F8F5EF]/80"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-medium text-[#1B2B4B]">
                  #{order.orderNumber}
                </span>
                <div className="flex gap-1">
                  <OrderStatusBadge status={order.orderStatus} type="order" size="sm" />
                </div>
              </div>
              <div className="mt-1 flex items-center gap-3 text-xs text-[#1B2B4B]/50">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.createdAt)}
                </span>
                <span className="font-semibold text-[#C9A84C]">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 text-[#04103A] font-semibold shadow-sm shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/dashboard/orders/${order._id}`}>View</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}