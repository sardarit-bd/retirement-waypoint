'use client';

import { cn } from '@/lib/utils';
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '../types/orders.types';

export function OrderStatusBadge({ status, type = 'order' }) {
  const statusMap = type === 'order' ? ORDER_STATUS_LABELS : PAYMENT_STATUS_LABELS;
  const statusConfig = statusMap[status] || { label: status, color: 'text-slate-500', bg: 'bg-slate-500/10' };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        statusConfig.bg,
        statusConfig.color
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusConfig.label}
    </span>
  );
}