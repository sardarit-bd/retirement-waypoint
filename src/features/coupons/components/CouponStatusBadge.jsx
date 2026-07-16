'use client';

import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export function CouponStatusBadge({ coupon, size = 'default' }) {
  if (!coupon) return null;

  const isActive = coupon.isActive;
  const isExpired = coupon.isExpired;
  const isExhausted = coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit;

  let status = 'active';
  let label = 'Active';
  let color = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
  let icon = CheckCircle;

  if (!isActive) {
    status = 'inactive';
    label = 'Inactive';
    color = 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    icon = XCircle;
  } else if (isExpired) {
    status = 'expired';
    label = 'Expired';
    color = 'text-red-500 bg-red-500/10 border-red-500/20';
    icon = XCircle;
  } else if (isExhausted) {
    status = 'exhausted';
    label = 'Exhausted';
    color = 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    icon = Clock;
  }

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[8px] sm:text-[10px]',
    default: 'px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-xs',
    lg: 'px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm',
  };

  const Icon = icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        color,
        sizeClasses[size] || sizeClasses.default
      )}
    >
      <Icon className={cn(
        'h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3',
        size === 'sm' && 'h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5'
      )} />
      {label}
    </span>
  );
}