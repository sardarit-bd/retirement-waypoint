'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Package,
  User,
  Mail,
  Calendar,
  DollarSign,
  CreditCard,
  ChevronDown,
  ChevronUp,
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
import { AdminOrdersTableSkeleton } from './AdminOrdersTableSkeleton';
import { AdminOrdersEmptyState } from './AdminOrdersEmptyState';

export function AdminOrdersTable({ orders, isLoading }) {
  const [expandedMobile, setExpandedMobile] = useState({});

  const toggleMobileExpand = (orderId) => {
    setExpandedMobile((prev) => ({
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
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
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
            {orders.map((order) => {
              const userName = order.user?.name || `User ${order.userId?.slice(0, 8)}`;
              const userInitial = getInitials(userName);

              return (
                <TableRow
                  key={order._id}
                  className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
                >
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

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-xs">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-[#1B2B4B] truncate max-w-[120px]">
                          {userName}
                        </span>
                        <span className="text-xs text-[#1B2B4B]/40 truncate max-w-[120px]">
                          {order.user?.email || 'No email'}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-0.5 max-w-[200px]">
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <span key={idx} className="text-sm text-[#1B2B4B]/70 truncate">
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

                  <TableCell className="text-center">
                    <OrderStatusBadge status={order.paymentStatus} type="payment" />
                  </TableCell>

                  <TableCell className="text-center">
                    <OrderStatusBadge status={order.orderStatus} type="order" />
                  </TableCell>

                  <TableCell>
                    <span className="text-sm text-[#1B2B4B]/60 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </span>
                  </TableCell>

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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View - Visible only on mobile/tablet */}
      <div className="lg:hidden divide-y divide-[#1B2B4B]/5">
        {orders.map((order) => {
          const userName = order.user?.name || `User ${order.userId?.slice(0, 8)}`;
          const userInitial = getInitials(userName);
          const isExpanded = expandedMobile[order._id];

          return (
            <div key={order._id} className="p-4 space-y-3">
              {/* Header Row */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#1B2B4B]">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-[#1B2B4B]/40">
                      {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#1B2B4B]/40 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMobileExpand(order._id)}
                  className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF] shrink-0"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-[#1B2B4B]/40" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#1B2B4B]/40" />
                  )}
                </Button>
              </div>

              {/* Always Visible Info */}
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-[10px]">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-[#1B2B4B] truncate">
                    {userName}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <OrderStatusBadge status={order.paymentStatus} type="payment" />
                  <OrderStatusBadge status={order.orderStatus} type="order" />
                </div>
                <span className="font-bold text-[#1B2B4B]">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 pt-3 border-t border-[#1B2B4B]/5"
                >
                  {/* Books */}
                  <div>
                    <p className="text-xs font-medium text-[#1B2B4B]/60 mb-1">Books</p>
                    <div className="space-y-1">
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="block text-sm text-[#1B2B4B]/70">
                          {item.bookTitle}
                        </span>
                      ))}
                      {order.items?.length > 3 && (
                        <span className="text-xs text-[#1B2B4B]/40">
                          +{order.items.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Customer Email */}
                  <div>
                    <p className="text-xs font-medium text-[#1B2B4B]/60 mb-1">Contact</p>
                    <p className="text-sm text-[#1B2B4B]/70 truncate">
                      {order.user?.email || 'No email'}
                    </p>
                  </div>

                  {/* Discount if any */}
                  {order.discountAmount > 0 && (
                    <div>
                      <p className="text-xs font-medium text-[#1B2B4B]/60 mb-1">Discount</p>
                      <p className="text-sm text-emerald-500">
                        -{formatCurrency(order.discountAmount)}
                      </p>
                    </div>
                  )}

                  {/* View Button */}
                  <Button
                    asChild
                    className="w-full rounded-full bg-[#C9A84C] text-[#1B2B4B] font-semibold hover:bg-[#D6B45A]"
                    size="sm"
                  >
                    <Link href={`/admin/orders/${order._id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Order
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
