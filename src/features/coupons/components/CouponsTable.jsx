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
      <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                  Code
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap hidden sm:table-cell">
                  Type
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap text-center">
                  Discount
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap text-center hidden md:table-cell">
                  Usage
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap hidden lg:table-cell">
                  Expires
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap text-center">
                  Status
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap hidden xl:table-cell">
                  Created
                </TableHead>
                <TableHead className="text-[#1B2B4B]/60 font-semibold text-[10px] sm:text-xs md:text-sm whitespace-nowrap text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => {
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
                    <TableCell className="py-2 sm:py-3 md:py-4">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold text-[#C9A84C]">
                          {coupon.code}
                        </span>
                        {coupon.name && (
                          <span className="text-[8px] sm:text-[10px] md:text-xs text-[#1B2B4B]/60 truncate max-w-[60px] sm:max-w-[80px] md:max-w-[120px]">
                            {coupon.name}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell className="py-2 sm:py-3 md:py-4 hidden sm:table-cell">
                      <Badge
                        variant="outline"
                        className="border-[#1B2B4B]/10 text-[#1B2B4B]/70 text-[8px] sm:text-[10px] md:text-xs whitespace-nowrap"
                      >
                        {coupon.type === 'PERCENTAGE' ? 'Percent' : 'Fixed'}
                      </Badge>
                    </TableCell>

                    {/* Discount */}
                    <TableCell className="py-2 sm:py-3 md:py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-[#1B2B4B] text-[10px] sm:text-xs md:text-sm">
                          {getDiscountDisplay(coupon)}
                        </span>
                        {coupon.maximumDiscountAmount && coupon.type === 'PERCENTAGE' && (
                          <span className="text-[7px] sm:text-[8px] md:text-[10px] text-[#1B2B4B]/40">
                            Max {formatCurrency(coupon.maximumDiscountAmount)}
                          </span>
                        )}
                        {coupon.minimumOrderAmount > 0 && (
                          <span className="text-[7px] sm:text-[8px] md:text-[10px] text-[#1B2B4B]/40">
                            Min {formatCurrency(coupon.minimumOrderAmount)}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Usage */}
                    <TableCell className="py-2 sm:py-3 md:py-4 text-center hidden md:table-cell">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] sm:text-xs md:text-sm font-medium text-[#1B2B4B]">
                          {coupon.usedCount}
                          {coupon.usageLimit !== null && ` / ${coupon.usageLimit}`}
                        </span>
                        {coupon.usageLimit === null && (
                          <span className="text-[7px] sm:text-[8px] md:text-[10px] text-[#1B2B4B]/40">Unlimited</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Expires */}
                    <TableCell className="py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span className="text-[9px] sm:text-[10px] md:text-sm text-[#1B2B4B]/70 whitespace-nowrap">
                          {formatDate(coupon.expiresAt)}
                        </span>
                        {isExpired && (
                          <span className="text-[7px] sm:text-[8px] md:text-[10px] text-red-500">Expired</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-2 sm:py-3 md:py-4 text-center">
                      <CouponStatusBadge coupon={coupon} />
                    </TableCell>

                    {/* Created */}
                    <TableCell className="py-2 sm:py-3 md:py-4 hidden xl:table-cell">
                      <span className="text-[9px] sm:text-[10px] md:text-sm text-[#1B2B4B]/60 whitespace-nowrap">
                        {formatDate(coupon.createdAt)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-2 sm:py-3 md:py-4 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                        >
                          <Link href={`/admin/coupons/${coupon._id}`}>
                            <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#1B2B4B]/60" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full p-0 hover:bg-[#F8F5EF]"
                        >
                          <Link href={`/admin/coupons/${coupon._id}/edit`}>
                            <Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#1B2B4B]/60" />
                          </Link>
                        </Button>

                        {canActivate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction('activate', coupon)}
                            disabled={activateCoupon.isPending}
                            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full p-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                          </Button>
                        )}

                        {canDeactivate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction('deactivate', coupon)}
                            disabled={deactivateCoupon.isPending}
                            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full p-0 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 cursor-pointer"
                          >
                            <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction('delete', coupon)}
                          disabled={deleteCoupon.isPending}
                          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full p-0 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
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
        <DialogContent className="max-w-[95vw] sm:max-w-md rounded-2xl sm:rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader>
              <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-11 sm:w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#C9A84C]/10">
                {actionDialog.type === 'activate' && <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-emerald-500" />}
                {actionDialog.type === 'deactivate' && <XCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-yellow-500" />}
                {actionDialog.type === 'delete' && <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-red-500" />}
              </div>
              <DialogTitle className="text-center text-base sm:text-lg md:text-xl font-bold text-[#1B2B4B]">
                {actionDialog.type === 'activate' && 'Activate Coupon'}
                {actionDialog.type === 'deactivate' && 'Deactivate Coupon'}
                {actionDialog.type === 'delete' && 'Delete Coupon'}
              </DialogTitle>
              <DialogDescription className="text-center text-xs sm:text-sm md:text-base text-[#1B2B4B]/60">
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
                    <span className="text-xs text-red-500/70">This action cannot be undone.</span>
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 sm:mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-center">
              <Button
                variant="outline"
                onClick={() => setActionDialog({ isOpen: false, type: null, couponId: null, couponCode: '' })}
                className="rounded-full border-[#1B2B4B]/15 px-4 sm:px-6 text-sm sm:text-base text-[#1B2B4B] hover:bg-[#F8F5EF] hover:border-[#C9A84C]/30"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                className={cn(
                  'rounded-full px-4 sm:px-6 text-sm sm:text-base text-white',
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
    <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(8)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-2.5 sm:h-3 md:h-4 w-10 sm:w-12 md:w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(8)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-3.5 sm:h-4 md:h-6 w-12 sm:w-14 md:w-20 bg-gray-200 rounded animate-pulse" />
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
    <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-6 sm:p-8 md:p-12 text-center">
      <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-11 sm:w-11 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <Ticket className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
      </div>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#1B2B4B]">No coupons found</h2>
      <p className="mx-auto mt-1 sm:mt-2 max-w-md text-xs sm:text-sm text-[#1B2B4B]/60">
        Try adjusting your search or filters to find the right coupons.
      </p>
    </div>
  );
}