'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderEmptyState } from './OrderEmptyState';
import { OrderSkeleton } from './OrderSkeleton';

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="hidden sm:block">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl bg-[#F8F5EF]/60 p-4"
            >
              <div className="h-5 w-24 rounded bg-[#1B2B4B]/10" />
              <div className="h-5 w-20 rounded bg-[#1B2B4B]/10" />
              <div className="h-5 w-32 rounded bg-[#1B2B4B]/10" />
              <div className="h-5 w-10 rounded bg-[#1B2B4B]/10" />
              <div className="h-5 w-16 rounded bg-[#1B2B4B]/10" />
              <div className="h-6 w-20 rounded-full bg-[#1B2B4B]/10" />
              <div className="h-6 w-20 rounded-full bg-[#1B2B4B]/10" />
              <div className="h-9 w-28 rounded-full bg-[#1B2B4B]/10" />
            </div>
          ))}
        </div>
      </div>
      <div className="sm:hidden">
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function sumQuantities(items) {
  if (!items?.length) return 0;
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

function itemsLabel(items) {
  if (!items?.length) return '—';
  const totalQty = sumQuantities(items);
  if (items.length === 1) {
    const title = items[0].bookTitle || 'Book';
    return totalQty > 1 ? `${title} x${totalQty}` : title;
  }
  return `${items.length} items${totalQty > items.length ? ` (${totalQty} qty)` : ''}`;
}

export function OrdersTable({ orders, isLoading, error, refetch }) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">
        <p className="text-red-500">Failed to load orders</p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-full bg-[#C9A84C] px-6 py-2 text-sm font-semibold text-[#04103A] hover:bg-[#D6B45A] transition-colors cursor-pointer"
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
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-hidden rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1B2B4B]/5 bg-[#F8F5EF]/80">
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Order
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Date
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Book(s)
                </th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Qty
                </th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Total
                </th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Payment
                </th>
                <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Status
                </th>
                <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1B2B4B]/5">
              {orders.map((order, i) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="group transition-colors hover:bg-[#F8F5EF]/40"
                >
                  <td className="px-4 py-4">
                    <span className="font-mono text-sm font-semibold text-[#1B2B4B]">
                      #{order.orderNumber}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#1B2B4B]/60">{formatDate(order.createdAt)}</span>
                  </td>
                  <td className="px-4 py-4 max-w-[200px]">
                    <span className="text-sm text-[#1B2B4B] truncate block">
                      {itemsLabel(order.items)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm text-[#1B2B4B]/60">{sumQuantities(order.items)}</span>
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <span className="text-sm font-bold text-[#1B2B4B]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <OrderStatusBadge status={order.paymentStatus} type="payment" />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <OrderStatusBadge status={order.orderStatus} type="order" />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-4 text-[#04103A] text-xs font-semibold shadow-sm shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30"
                    >
                      <Link href={`/dashboard/orders/${order._id}`}>
                        View
                        <ExternalLink className="ml-1.5 h-3 w-3" />
                      </Link>
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {orders.map((order, i) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 shadow-[0_10px_30px_rgba(4,16,58,0.06)]"
          >
            {/* Row 1: Order number + amount */}
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono text-sm font-bold text-[#1B2B4B]">
                #{order.orderNumber}
              </span>
              <span className="text-base font-bold text-[#C9A84C]">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>

            {/* Row 2: Badges */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <OrderStatusBadge status={order.paymentStatus} type="payment" />
              <OrderStatusBadge status={order.orderStatus} type="order" />
            </div>

            {/* Row 3: Items + Date */}
            <div className="flex items-center gap-3 text-xs text-[#1B2B4B]/50 mb-3">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {itemsLabel(order.items)}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(order.createdAt)}
              </span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] text-xs font-semibold shadow-sm shadow-[#C9A84C]/20"
              >
                <Link href={`/dashboard/orders/${order._id}`}>
                  View Details
                </Link>
              </Button>
              {order.invoiceId && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] text-xs hover:bg-[#F8F5EF]"
                >
                  <Link href={`/dashboard/invoices/${order.invoiceId}`}>
                    Invoice
                  </Link>
                </Button>
              )}
              {!order.invoiceId && (
                <div />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
