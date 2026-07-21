'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Package,
  FileText,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useUpdateOrderStatus, useUpdatePaymentStatus } from '../../hooks/useOrders';
import { OrderStatusBadge } from '../OrderStatusBadge';

export function AdminOrderDetailsContent({ order, isLoading }) {
  const [isOrderStatusLoading, setIsOrderStatusLoading] = useState(false);
  const [isPaymentStatusLoading, setIsPaymentStatusLoading] = useState(false);

  const updateOrderStatus = useUpdateOrderStatus();
  const updatePaymentStatus = useUpdatePaymentStatus();

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const handleOrderStatusChange = (newStatus) => {
    if (!order) return;
    setIsOrderStatusLoading(true);
    updateOrderStatus.mutate(
      { orderId: order._id, orderStatus: newStatus },
      {
        onSuccess: () => {
          setIsOrderStatusLoading(false);
        },
        onError: () => {
          setIsOrderStatusLoading(false);
        },
      }
    );
  };

  const handlePaymentStatusChange = (newStatus) => {
    if (!order) return;
    setIsPaymentStatusLoading(true);
    updatePaymentStatus.mutate(
      { orderId: order._id, paymentStatus: newStatus },
      {
        onSuccess: () => {
          setIsPaymentStatusLoading(false);
        },
        onError: () => {
          setIsPaymentStatusLoading(false);
        },
      }
    );
  };

  if (isLoading) {
    return <AdminOrderDetailsSkeleton />;
  }

  if (!order) {
    return <AdminOrderDetailsError />;
  }

  const hasInvoice = order.invoiceId || order.invoiceNumber;
  const hasCoupon = order.couponCode && order.discountAmount > 0;
  const isPending = order.paymentStatus === 'PENDING';
  const isPaid = order.paymentStatus === 'PAID';
  const isFailed = order.paymentStatus === 'FAILED';
  const isRefunded = order.paymentStatus === 'REFUNDED';
  const isCancelled = order.orderStatus === 'CANCELLED';
  const isCompleted = order.orderStatus === 'COMPLETED';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group -ml-2 rounded-full px-3 py-2 text-[#1B2B4B] hover:bg-[#F8F5EF]"
            >
              <Link href="/admin/orders">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium">Back to Orders</span>
              </Link>
            </Button>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1B2B4B]">
                Order #{order.orderNumber}
              </h1>
              <div className="flex gap-2 flex-wrap">
                <OrderStatusBadge status={order.orderStatus} type="order" />
                <OrderStatusBadge status={order.paymentStatus} type="payment" />
              </div>
            </div>
            <p className="mt-1 text-sm text-[#1B2B4B]/60">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            {hasInvoice && (
              <Button
                asChild
                className="rounded-full bg-[#C9A84C] px-6 text-[#1B2B4B] font-semibold hover:bg-[#D6B45A]"
              >
                <Link href={`/admin/invoices/${order.invoiceId}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Invoice
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Information */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Customer Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#1B2B4B]">
                  <User className="h-4 w-4 text-[#C9A84C]" />
                  <span className="font-medium">{order.user?.name || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1B2B4B]/60">
                  <Mail className="h-4 w-4 text-[#C9A84C]" />
                  <span>{order.user?.email || 'No email'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1B2B4B]/60">
                  <Receipt className="h-4 w-4 text-[#C9A84C]" />
                  <span className="text-xs font-mono">ID: {order.userId}</span>
                </div>
                <div className="flex items-center gap-2 text-[#1B2B4B]/60">
                  <Calendar className="h-4 w-4 text-[#C9A84C]" />
                  <span>Order placed: {formatDate(order.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchased Books */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Purchased Books
              </h2>
              <div className="space-y-3">
                {order.items?.map((item, index) => (
                  <motion.div
                    key={item.bookId || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-4 rounded-2xl bg-[#F8F5EF] p-4 transition-all hover:bg-[#F8F5EF]/80"
                  >
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md shadow-md">
                      {item.bookCoverImage ? (
                        <Image
                          src={item.bookCoverImage}
                          alt={item.bookTitle}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#1B2B4B]/10 text-[#1B2B4B]/30">
                          <Package className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1B2B4B] truncate">
                        {item.bookTitle}
                      </p>
                      <p className="text-sm text-[#1B2B4B]/60">
                        {item.authorName || 'Unknown Author'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#1B2B4B]">
                        {formatCurrency(item.bookPrice)}
                      </p>
                      <p className="text-xs text-[#1B2B4B]/40">Qty: 1</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">Timeline</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Package,
                    label: 'Order Created',
                    date: order.createdAt,
                    completed: true,
                  },
                  {
                    icon: isPaid ? CheckCircle : isFailed ? XCircle : Clock,
                    label: isPaid ? 'Payment Completed' : isFailed ? 'Payment Failed' : 'Payment Pending',
                    date: isPaid ? order.updatedAt : order.createdAt,
                    completed: isPaid,
                  },
                  {
                    icon: isCompleted ? CheckCircle : isCancelled ? XCircle : Clock,
                    label: isCompleted ? 'Order Completed' : isCancelled ? 'Order Cancelled' : 'Order Processing',
                    date: isCompleted || isCancelled ? order.updatedAt : order.createdAt,
                    completed: isCompleted,
                  },
                  ...(hasInvoice ? [{
                    icon: FileText,
                    label: 'Invoice Generated',
                    date: order.updatedAt,
                    completed: true,
                  }] : []),
                ].map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={cn(
                      'rounded-full p-2',
                      event.completed
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-[#1B2B4B]/5 text-[#1B2B4B]/30'
                    )}>
                      <event.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        'font-medium',
                        event.completed ? 'text-[#1B2B4B]' : 'text-[#1B2B4B]/50'
                      )}>
                        {event.label}
                      </p>
                      <p className="text-sm text-[#1B2B4B]/40">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Subtotal</span>
                  <span className="font-medium text-[#1B2B4B]">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>
                {hasCoupon && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Discount</span>
                    <span className="font-medium text-emerald-600">
                      -{formatCurrency(order.discountAmount)}
                    </span>
                  </div>
                )}
                {hasCoupon && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Coupon</span>
                    <span className="font-mono text-sm text-[#C9A84C]">
                      {order.couponCode}
                    </span>
                  </div>
                )}
                <div className="border-t border-[#1B2B4B]/5 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#1B2B4B]">Total</span>
                    <span className="text-2xl font-bold text-[#C9A84C]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                Payment Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Method</span>
                  <span className="font-medium text-[#1B2B4B]">
                    {order.paymentMethod || 'Stripe'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Status</span>
                  <OrderStatusBadge status={order.paymentStatus} type="payment" />
                </div>
                {order.stripePaymentIntentId && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Transaction ID</span>
                    <span className="text-xs font-mono text-[#1B2B4B] truncate max-w-[140px]">
                      {order.stripePaymentIntentId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Date</span>
                  <span className="text-sm text-[#1B2B4B]">
                    {formatDate(order.updatedAt)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                Status Management
              </h2>
              <div className="space-y-4">
                {/* Order Status */}
                <div>
                  <label className="text-sm font-medium text-[#1B2B4B]">Order Status</label>
                  <Select
                    value={order.orderStatus}
                    onValueChange={handleOrderStatusChange}
                    disabled={isLoading || isCancelled || isRefunded}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl border-[#1B2B4B]/10">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      <SelectItem value="REFUNDED">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="text-sm font-medium text-[#1B2B4B]">Payment Status</label>
                  <Select
                    value={order.paymentStatus}
                    onValueChange={handlePaymentStatusChange}
                    disabled={isLoading || isCancelled || isRefunded}
                  >
                    <SelectTrigger className="mt-1.5 rounded-xl border-[#1B2B4B]/10">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                      <SelectItem value="REFUNDED">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Info */}
                {isPending && (
                  <div className="rounded-xl bg-yellow-500/10 p-3 text-sm text-yellow-600">
                    <Clock className="mr-2 inline h-4 w-4" />
                    Waiting for customer payment
                  </div>
                )}
                {isFailed && (
                  <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
                    <XCircle className="mr-2 inline h-4 w-4" />
                    Payment failed. Customer can retry.
                  </div>
                )}
                {isPaid && !isCompleted && (
                  <div className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-600">
                    <CheckCircle className="mr-2 inline h-4 w-4" />
                    Payment received. Processing order.
                  </div>
                )}
                {isCompleted && (
                  <div className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-600">
                    <CheckCircle className="mr-2 inline h-4 w-4" />
                    Order completed successfully
                  </div>
                )}
                {isCancelled && (
                  <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
                    <XCircle className="mr-2 inline h-4 w-4" />
                    Order has been cancelled
                  </div>
                )}
                {isRefunded && (
                  <div className="rounded-xl bg-purple-500/10 p-3 text-sm text-purple-500">
                    <RefreshCw className="mr-2 inline h-4 w-4" />
                    Order has been refunded
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Invoice */}
          {hasInvoice && (
            <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
              <CardContent className="p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                  Invoice
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Number</span>
                    <span className="font-mono text-sm font-semibold text-[#1B2B4B]">
                      {order.invoiceNumber || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Status</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      Issued
                    </Badge>
                  </div>
                  <Button
                    asChild
                    className="w-full rounded-full border-[#1B2B4B]/15 bg-transparent text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
                    variant="outline"
                  >
                    <Link href={`/admin/invoices/${order.invoiceId}`}>
                      <Download className="mr-2 h-4 w-4" />
                      View Invoice
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Component
function AdminOrderDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Error Component
function AdminOrderDetailsError() {
  return (
    <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
      <div className="mx-auto mb-4 w-fit rounded-full bg-red-500/10 p-4">
        <XCircle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold text-red-500">Order Not Found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        The order you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
    </div>
  );
}