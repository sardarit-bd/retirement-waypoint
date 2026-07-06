export const ORDER_STATUS_LABELS = {
  PENDING: { label: 'Pending', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  COMPLETED: { label: 'Completed', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-500/10' },
  REFUNDED: { label: 'Refunded', color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

export const PAYMENT_STATUS_LABELS = {
  PENDING: { label: 'Pending', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  PAID: { label: 'Paid', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  FAILED: { label: 'Failed', color: 'text-red-500', bg: 'bg-red-500/10' },
  REFUNDED: { label: 'Refunded', color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

export const TIMELINE_EVENTS = {
  ORDER_CREATED: 'ORDER_CREATED',
  PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
  PURCHASE_ACTIVATED: 'PURCHASE_ACTIVATED',
  INVOICE_GENERATED: 'INVOICE_GENERATED',
  // Future: REFUND_REQUESTED, REFUND_APPROVED - Keep hidden
};

export const TIMELINE_LABELS = {
  ORDER_CREATED: { label: 'Order Created', icon: 'ShoppingBag' },
  PAYMENT_COMPLETED: { label: 'Payment Completed', icon: 'CreditCard' },
  PURCHASE_ACTIVATED: { label: 'Purchase Activated', icon: 'CheckCircle' },
  INVOICE_GENERATED: { label: 'Invoice Generated', icon: 'FileText' },
};