'use client';

import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  CreditCard, 
  CheckCircle, 
  FileText,
  Clock,
  XCircle,
  Ban,
  Check 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTimelineEvents } from '@/features/orders/constants/order.constants';

const TIMELINE_ICONS = {
  ORDER_CREATED: ShoppingBag,
  PAYMENT_COMPLETED: CreditCard,
  PAYMENT_PENDING: Clock,
  PAYMENT_FAILED: XCircle,
  ORDER_CANCELLED: Ban,
  PURCHASE_ACTIVATED: CheckCircle,
  INVOICE_GENERATED: FileText,
};

const TIMELINE_LABELS = {
  ORDER_CREATED: 'Order Created',
  PAYMENT_COMPLETED: 'Payment Completed',
  PAYMENT_PENDING: 'Payment Pending',
  PAYMENT_FAILED: 'Payment Failed',
  ORDER_CANCELLED: 'Order Cancelled',
  PURCHASE_ACTIVATED: 'Purchase Activated',
  INVOICE_GENERATED: 'Invoice Generated',
};

export function TimelineCard({ order, purchases, invoice }) {
  const events = getTimelineEvents(order, purchases, invoice);

  const formatDate = (date) => {
    if (!date) return 'Pending';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">Timeline</h2>

      <div className="space-y-0">
        {events.map((event, index) => {
          const Icon = TIMELINE_ICONS[event.type];
          const isLast = index === events.length - 1;
          const isCompleted = event.completed;
          const isPending = !isCompleted && event.type === 'PAYMENT_PENDING';
          const isFailed = !isCompleted && event.type === 'PAYMENT_FAILED';
          
          const iconColor = isCompleted ? 'text-[#C9A84C]' : 
                           isFailed ? 'text-red-500' : 
                           'text-[#1B2B4B]/30';

          return (
            <div key={event.id} className="relative flex gap-4">
              {/* Line */}
              {!isLast && (
                <div className={cn(
                  "absolute left-5 top-10 h-full w-0.5",
                  isCompleted ? "bg-[#C9A84C]/20" : "bg-[#1B2B4B]/10"
                )} />
              )}

              {/* Icon */}
              <div className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                isCompleted ? "bg-[#C9A84C]/10" : 
                isFailed ? "bg-red-500/10" :
                "bg-[#1B2B4B]/5"
              )}>
                {Icon && <Icon className={cn("h-5 w-5", iconColor)} />}
                {isCompleted && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-emerald-500 p-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                {isPending && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 p-0.5">
                    <Clock className="h-3 w-3 text-white" />
                  </div>
                )}
                {isFailed && (
                  <div className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5">
                    <XCircle className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className={cn(
                    "font-medium",
                    isCompleted ? "text-[#1B2B4B]" : 
                    isFailed ? "text-red-500" :
                    "text-[#1B2B4B]/50"
                  )}>
                    {TIMELINE_LABELS[event.type]}
                  </p>
                  <p className={cn(
                    "text-sm",
                    isCompleted ? "text-[#1B2B4B]/60" : 
                    isFailed ? "text-red-500/60" :
                    "text-[#1B2B4B]/30"
                  )}>
                    {formatDate(event.date)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}