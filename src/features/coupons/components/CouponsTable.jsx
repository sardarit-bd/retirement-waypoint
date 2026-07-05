// features/coupons/components/CouponsTable.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Pencil,
  CheckCircle,
  XCircle,
  Trash2,
  Ticket,
  Calendar,
  Users,
  DollarSign,
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
import { Badge } from '@/components/ui/badge';
import { CouponStatusBadge } from './CouponStatusBadge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useActivateCoupon, useDeactivateCoupon, useDeleteCoupon } from '../hooks/useCoupons';
import { cn } from '@/lib/utils';

export function CouponsTable({ coupons, isLoading }) {
  const [actionDialog, setActionDialog] = useState({
    isOpen: false,
    type: null,
    couponId: null,
    couponCode: '',
  });

  const activateCoupon = useActivateCoupon();
  const deactivateCoupon = useDeactivateCoupon();
  const deleteCoupon = useDeleteCoupon();

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

  const getDiscountDisplay = (coupon) => {
    if (coupon.type === 'PERCENTAGE') {
      return `${coupon.value}%`;
    }
    return formatCurrency(coupon.value);
  };

  const handleAction = (type, coupon) => {
    setActionDialog({
      isOpen: true,
      type,
      couponId: coupon._id,
      couponCode: coupon.code,
    });
  };

  const handleConfirmAction = () => {
    const { type, couponId } = actionDialog;
    if (type === 'activate') {
      activateCoupon.mutate(couponId);
    } else if (type === 'deactivate') {
      deactivateCoupon.mutate(couponId);
    } else if (type === 'delete') {
      deleteCoupon.mutate(couponId);
    }
    setActionDialog({ isOpen: false, type: null, couponId: null, couponCode: '' });
  };

  if (isLoading) {
    return <CouponsTableSkeleton />;
  }

  if (!coupons || coupons.length === 0) {
    return <CouponsEmptyState />;
  }

  return (
    <>
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Code</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Type</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Discount</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Usage</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Expires</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Status</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold">Created</TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon, index) => {
                const isActive = coupon.isActive;
                const isExpired = coupon.isExpired;
                const isExhausted = coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit;
                const canActivate = !isActive && !isExpired && !isExhausted;
                const canDeactivate = isActive && !isExpired && !isExhausted;

                return (
                  <TableRow
                    key={coupon._id}
                    className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
                  >
                    {/* Code */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-bold text-[#C9A84C]">
                          {coupon.code}
                        </span>
                        {coupon.name && (
                          <span className="text-xs text-[#1B2B4B]/60">{coupon.name}</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-[#1B2B4B]/10 text-[#1B2B4B]/70"
                      >
                        {coupon.type === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                      </Badge>
                    </TableCell>

                    {/* Discount */}
                    <TableCell className="text-center">
                      <span className="font-semibold text-[#1B2B4B]">
                        {getDiscountDisplay(coupon)}
                      </span>
                      {coupon.maximumDiscountAmount && coupon.type === 'PERCENTAGE' && (
                        <span className="block text-xs text-[#1B2B4B]/40">
                          Max {formatCurrency(coupon.maximumDiscountAmount)}
                        </span>
                      )}
                      {coupon.minimumOrderAmount > 0 && (
                        <span className="block text-xs text-[#1B2B4B]/40">
                          Min. {formatCurrency(coupon.minimumOrderAmount)}
                        </span>
                      )}
                    </TableCell>

                    {/* Usage */}
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-[#1B2B4B]">
                          {coupon.usedCount}
                          {coupon.usageLimit !== null && ` / ${coupon.usageLimit}`}
                        </span>
                        {coupon.usageLimit === null && (
                          <span className="text-xs text-[#1B2B4B]/40">Unlimited</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Expires */}
                    <TableCell>
                      <span className="text-sm text-[#1B2B4B]/70">
                        {formatDate(coupon.expiresAt)}
                      </span>
                      {isExpired && (
                        <span className="block text-xs text-red-500">Expired</span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      <CouponStatusBadge coupon={coupon} />
                    </TableCell>

                    {/* Created */}
                    <TableCell>
                      <span className="text-sm text-[#1B2B4B]/60">
                        {formatDate(coupon.createdAt)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                        >
                          <Link href={`/admin/coupons/${coupon._id}`}>
                            <Eye className="h-4 w-4 text-[#1B2B4B]/60" />
                          </Link>
                        </Button>

                        {/* Edit */}
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                        >
                          <Link href={`/admin/coupons/${coupon._id}/edit`}>
                            <Pencil className="h-4 w-4 text-[#1B2B4B]/60" />
                          </Link>
                        </Button>

                        {/* Activate */}
                        {canActivate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction('activate', coupon)}
                            disabled={activateCoupon.isPending}
                            className="h-8 w-8 rounded-full p-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Deactivate */}
                        {canDeactivate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction('deactivate', coupon)}
                            disabled={deactivateCoupon.isPending}
                            className="h-8 w-8 rounded-full p-0 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction('delete', coupon)}
                          disabled={deleteCoupon.isPending}
                          className="h-8 w-8 rounded-full p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Action Confirmation Dialog */}
      <Dialog
        open={actionDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setActionDialog({ isOpen: false, type: null, couponId: null, couponCode: '' });
          }
        }}
      >
        <DialogContent className="max-w-md rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10">
                {actionDialog.type === 'activate' && <CheckCircle className="h-7 w-7 text-emerald-500" />}
                {actionDialog.type === 'deactivate' && <XCircle className="h-7 w-7 text-yellow-500" />}
                {actionDialog.type === 'delete' && <Trash2 className="h-7 w-7 text-red-500" />}
              </div>
              <DialogTitle className="text-center text-xl font-bold text-[#1B2B4B]">
                {actionDialog.type === 'activate' && 'Activate Coupon'}
                {actionDialog.type === 'deactivate' && 'Deactivate Coupon'}
                {actionDialog.type === 'delete' && 'Delete Coupon'}
              </DialogTitle>
              <DialogDescription className="text-center text-[#1B2B4B]/60">
                {actionDialog.type === 'activate' && (
                  <>Are you sure you want to activate coupon <strong>{actionDialog.couponCode}</strong>?</>
                )}
                {actionDialog.type === 'deactivate' && (
                  <>Are you sure you want to deactivate coupon <strong>{actionDialog.couponCode}</strong>?</>
                )}
                {actionDialog.type === 'delete' && (
                  <>
                    Are you sure you want to delete coupon <strong>{actionDialog.couponCode}</strong>?
                    <br />
                    <span className="text-sm text-red-500/70">This action cannot be undone.</span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                variant="outline"
                onClick={() => setActionDialog({ isOpen: false, type: null, couponId: null, couponCode: '' })}
                className="rounded-full border-[#1B2B4B]/15 px-6 text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                className={cn(
                  'rounded-full px-6 text-white',
                  actionDialog.type === 'activate' && 'bg-emerald-500 hover:bg-emerald-600',
                  actionDialog.type === 'deactivate' && 'bg-yellow-500 hover:bg-yellow-600',
                  actionDialog.type === 'delete' && 'bg-red-500 hover:bg-red-600'
                )}
              >
                {actionDialog.type === 'activate' && 'Activate'}
                {actionDialog.type === 'deactivate' && 'Deactivate'}
                {actionDialog.type === 'delete' && 'Delete'}
              </Button>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Skeleton Component
function CouponsTableSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(8)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(8)].map((_, j) => (
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
function CouponsEmptyState() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <Ticket className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-[#1B2B4B]">No coupons found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        Try adjusting your search or filters to find the right coupons.
      </p>
    </div>
  );
}