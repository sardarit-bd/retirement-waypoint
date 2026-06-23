'use client';

import { motion } from 'framer-motion';
import { OrderItemCard } from './OrderItemCard';
import { Lock } from 'lucide-react';

export function OrderItemsSection({ items, orderId, isAccessible = false }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <p className="text-[#1B2B4B]/60">No items in this order</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[#1B2B4B]">
          Purchased Items
        </h2>
        {!isAccessible && (
          <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-500">
            <Lock className="h-3 w-3" />
            Locked
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <OrderItemCard 
            key={item.bookId} 
            item={item} 
            index={index}
            orderId={orderId}
            isAccessible={isAccessible}
          />
        ))}
      </div>
    </motion.div>
  );
}