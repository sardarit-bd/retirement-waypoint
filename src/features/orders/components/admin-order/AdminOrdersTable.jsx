'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Calendar,
  DollarSign,
  CreditCard,
  Package,
  User,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { OrderStatusBadge } from '../OrderStatusBadge';

export function AdminOrdersTable({ orders, isLoading }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (orderId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  if (isLoading) {
    return <AdminOrdersTableSkeleton />;
  }

  if (!orders || orders.length === 0) {
    return <AdminOrdersEmptyState />;
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
              <TableHead className="text-[#1B2B4B]/60 font-semibold w-[50px]"></TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Order</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Customer</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Books</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-right">Total</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Payment</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Status</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Date</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              const isExpanded = expandedRows[order._id];
              const userName = order.user?.name || `User ${order.userId?.slice(0, 8)}`;
              const userInitial = getInitials(userName);

              return (
                <TableRow
                  key={order._id}
                  className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
                >
                  {/* Expand */}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(order._id)}
                      className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-[#1B2B4B]/40 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </Button>
                  </TableCell>

                  {/* Order Number */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-semibold text-[#1B2B4B]">
                        #{order.orderNumber}
                      </span>
                      <span className="text-xs text-[#1B2B4B]/40">
                        {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-xs">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#1B2B4B]">
                          {userName}
                        </span>
                        <span className="text-xs text-[#1B2B4B]/40 truncate max-w-[120px]">
                          {order.user?.email || 'No email'}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Books */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <span key={idx} className="text-sm text-[#1B2B4B]/70 truncate max-w-[150px]">
                          {item.bookTitle}
                        </span>
                      ))}
                      {order.items?.length > 2 && (
                        <span className="text-xs text-[#1B2B4B]/40">
                          +{order.items.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Total */}
                  <TableCell className="text-right">
                    <span className="font-bold text-[#1B2B4B]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                    {order.discountAmount > 0 && (
                      <span className="block text-xs text-emerald-500">
                        -{formatCurrency(order.discountAmount)} discount
                      </span>
                    )}
                  </TableCell>

                  {/* Payment Status */}
                  <TableCell className="text-center">
                    <OrderStatusBadge status={order.paymentStatus} type="payment" />
                  </TableCell>

                  {/* Order Status */}
                  <TableCell className="text-center">
                    <OrderStatusBadge status={order.orderStatus} type="order" />
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <span className="text-sm text-[#1B2B4B]/60 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                    >
                      <Link href={`/admin/orders/${order._id}`}>
                        <Eye className="h-4 w-4 text-[#1B2B4B]/60" />
                      </Link>
                    </Button>
                  </TableCell>

                  {/* Expanded Row - separate TableRow */}
                  {isExpanded && (
                    <TableRow className="bg-[#F8F5EF]/30 border-b border-[#1B2B4B]/5">
                      <TableCell colSpan={9} className="p-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {/* Customer Info */}
                          <div className="rounded-xl bg-white/80 p-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                              Customer
                            </h4>
                            <div className="mt-2 space-y-1">
                              <p className="flex items-center gap-2 text-sm text-[#1B2B4B]">
                                <User className="h-3.5 w-3.5 text-[#1B2B4B]/40" />
                                {userName}
                              </p>
                              <p className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                                <Mail className="h-3.5 w-3.5 text-[#1B2B4B]/40" />
                                {order.user?.email || 'No email'}
                              </p>
                              <p className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                                <Package className="h-3.5 w-3.5 text-[#1B2B4B]/40" />
                                ID: {order.userId?.slice(0, 12)}...
                              </p>
                            </div>
                          </div>

                          {/* Payment Info */}
                          <div className="rounded-xl bg-white/80 p-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                              Payment
                            </h4>
                            <div className="mt-2 space-y-1">
                              <p className="flex items-center gap-2 text-sm text-[#1B2B4B]">
                                <CreditCard className="h-3.5 w-3.5 text-[#1B2B4B]/40" />
                                {order.paymentMethod || 'Stripe'}
                              </p>
                              <p className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                                <DollarSign className="h-3.5 w-3.5 text-[#1B2B4B]/40" />
                                Subtotal: {formatCurrency(order.subtotal)}
                              </p>
                              {order.discountAmount > 0 && (
                                <p className="flex items-center gap-2 text-sm text-emerald-600">
                                  Discount: -{formatCurrency(order.discountAmount)}
                                </p>
                              )}
                              {order.couponCode && (
                                <p className="flex items-center gap-2 text-sm text-[#C9A84C]">
                                  Coupon: {order.couponCode}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Items Summary */}
                          <div className="rounded-xl bg-white/80 p-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1B2B4B]/50">
                              Items
                            </h4>
                            <div className="mt-2 space-y-1">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-[#1B2B4B] truncate max-w-[150px]">
                                    {item.bookTitle}
                                  </span>
                                  <span className="text-[#1B2B4B]/60">
                                    {formatCurrency(item.bookPrice)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Skeleton Component
function AdminOrdersTableSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(9)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(9)].map((_, j) => (
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

// Empty State Component
function AdminOrdersEmptyState() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <Package className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-[#1B2B4B]">No orders found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        Try adjusting your search or filters to find the right orders.
      </p>
    </div>
  );
}