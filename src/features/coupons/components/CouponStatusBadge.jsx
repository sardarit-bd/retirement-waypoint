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
    sm: 'px-2 py-0.5 text-[10px]',
    default: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  const Icon = icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        color,
        sizeClasses[size] || sizeClasses.default
      )}
    >
      <Icon className={cn('h-3 w-3', size === 'sm' && 'h-2.5 w-2.5')} />
      {label}
    </span>
  );
}