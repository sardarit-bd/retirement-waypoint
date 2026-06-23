'use client';

import { motion } from 'framer-motion';
import { Star, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ReviewCard({ order }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <h3 className="text-lg font-semibold text-[#1B2B4B] mb-4">
        Rate Your Purchases
      </h3>
      
      <p className="text-sm text-[#1B2B4B]/60 mb-4">
        Share your feedback on the books you've purchased
      </p>
      
      <div className="flex flex-wrap gap-3">
        {order.items?.map((item) => (
          <Button
            key={item.bookId}
            asChild
            className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
          >
            <Link href={`/dashboard/reviews/new?bookId=${item.bookId}&orderId=${order._id}`}>
              <Star className="mr-2 h-4 w-4" />
              Rate {item.bookTitle}
            </Link>
          </Button>
        ))}
      </div>
    </motion.div>
  );
}