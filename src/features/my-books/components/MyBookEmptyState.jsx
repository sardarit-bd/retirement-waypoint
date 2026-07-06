'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MyBookEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-12 text-center shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="rounded-full bg-[#C9A84C]/10 p-4 mb-4">
        <BookOpen className="h-12 w-12 text-[#C9A84C]" />
      </div>
      
      <h3 className="text-2xl font-bold text-[#1B2B4B] mb-2">
        No books in your library yet
      </h3>
      
      <p className="max-w-md text-[#1B2B4B]/60 mb-8">
        Start exploring our collection and purchase your first book to begin your retirement journey.
      </p>
      
      <Button
        asChild
        className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-8 py-6 text-base font-semibold text-[#04103A] shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
      >
        <Link href="/book">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Browse Books
        </Link>
      </Button>
    </motion.div>
  );
}