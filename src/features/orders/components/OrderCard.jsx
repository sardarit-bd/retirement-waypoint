'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, FileText, Receipt, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderItemList } from './OrderItemList';
import { OrderSummaryCard } from './OrderSummaryCard';

export function OrderCard({ order, index }) {
  const formatDate = (date) => {
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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full overflow-hidden rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-[#C9A84C]" />
                <span className="text-sm font-mono font-medium text-[#1B2B4B]">
                  #{order.orderNumber}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-[#1B2B4B]/50">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <OrderStatusBadge status={order.orderStatus} type="order" />
              <OrderStatusBadge status={order.paymentStatus} type="payment" />
            </div>
          </div>

          {/* Items */}
          <OrderItemList items={order.items} />

          {/* Summary */}
          <OrderSummaryCard order={order} />

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1B2B4B]/5">
            <Button
              asChild
              size="sm"
              className="flex-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/dashboard/orders/${order._id}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>
            
            {order.invoiceId && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                <Link href={`/dashboard/invoices/${order.invoiceId}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Invoice
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Full Width */}
          <div className="flex flex-col gap-2 sm:hidden">
            {order.invoiceId && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                <Link href={`/dashboard/invoices/${order.invoiceId}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Download Invoice
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}