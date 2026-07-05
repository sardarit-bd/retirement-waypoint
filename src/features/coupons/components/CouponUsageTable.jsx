'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Hash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { OrderPagination } from '@/features/orders/components/OrderPagination';

export function CouponUsageTable({ usages, meta, isLoading, onPageChange }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  if (isLoading) {
    return <CouponUsageSkeleton />;
  }

  if (!usages || usages.length === 0) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-8 text-center">
        <Users className="mx-auto h-8 w-8 text-[#1B2B4B]/20" />
        <p className="mt-2 text-sm text-[#1B2B4B]/60">No usage history available</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
              <TableHead className="text-[#1B2B4B]/60 font-semibold">User</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Order</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-right">Discount</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Date Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usages.map((usage, index) => (
              <TableRow
                key={usage._id}
                className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
              >
                <TableCell>
                  <span className="text-sm text-[#1B2B4B]">
                    {usage.userId || 'Unknown User'}
                  </span>
                </TableCell>
                <TableCell>
                  {usage.orderId ? (
                    <Link
                      href={`/admin/orders/${usage.orderId._id}`}
                      className="text-sm font-mono text-[#C9A84C] hover:underline"
                    >
                      #{usage.orderId.orderNumber || 'N/A'}
                    </Link>
                  ) : (
                    <span className="text-sm text-[#1B2B4B]/60">N/A</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-emerald-600">
                    {formatCurrency(usage.discountAmount)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-[#1B2B4B]/60">
                    {formatDate(usage.usedAt)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="p-4 border-t border-[#1B2B4B]/5">
          <OrderPagination meta={meta} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}

function CouponUsageSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(4)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(4)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}