'use client';

import { motion } from 'framer-motion';
import { OrderCard } from './OrderCard';
import { OrderEmptyState } from './OrderEmptyState';
import { OrderSkeleton } from './OrderSkeleton';

export function OrderGrid({ orders, isLoading, error, refetch }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <OrderSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8 text-center">
        <p className="text-red-500">Failed to load orders</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <OrderEmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {orders.map((order, index) => (
        <OrderCard key={order._id} order={order} index={index} />
      ))}
    </motion.div>
  );
}