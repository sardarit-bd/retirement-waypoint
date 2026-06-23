'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InvoiceCard({ order, isAccessible = true }) {
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
      transition={{ duration: 0.3, delay: 0.3 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-[#C9A84C]/10 p-2">
          <FileText className="h-5 w-5 text-[#C9A84C]" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#1B2B4B]">Invoice</p>
          <p className="text-sm text-[#1B2B4B]/60">
            #{order.invoiceNumber || 'N/A'}
          </p>
        </div>
        {!isAccessible && (
          <Lock className="h-4 w-4 text-[#1B2B4B]/30" />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-[#1B2B4B]/60">Created</span>
        <span className="text-[#1B2B4B]">
          {formatDate(order.invoiceCreatedAt || order.updatedAt)}
        </span>
      </div>

      {isAccessible ? (
        <Button
          asChild
          className="mt-4 w-full rounded-full border-[#1B2B4B]/15 bg-transparent text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
          variant="outline"
        >
          <Link href={`/dashboard/invoices/${order.invoiceId}`}>
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Link>
        </Button>
      ) : (
        <Button
          disabled
          className="mt-4 w-full rounded-full border-[#1B2B4B]/15 bg-transparent text-[#1B2B4B]/40 cursor-not-allowed"
          variant="outline"
        >
          <Lock className="mr-2 h-4 w-4" />
          Locked
        </Button>
      )}
    </motion.div>
  );
}