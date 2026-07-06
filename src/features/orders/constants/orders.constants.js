export const ORDER_STATUS = {
  PENDING: { label: 'Pending', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  COMPLETED: { label: 'Completed', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-500/10' },
  REFUNDED: { label: 'Refunded', color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

export const PAYMENT_STATUS = {
  PENDING: { label: 'Pending', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  PAID: { label: 'Paid', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  FAILED: { label: 'Failed', color: 'text-red-500', bg: 'bg-red-500/10' },
  REFUNDED: { label: 'Refunded', color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

export const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'createdAt_asc', label: 'Oldest First' },
  { value: 'totalAmount_desc', label: 'Highest Amount' },
  { value: 'totalAmount_asc', label: 'Lowest Amount' },
  { value: 'orderNumber_asc', label: 'Order # A-Z' },
  { value: 'orderNumber_desc', label: 'Order # Z-A' },
];

export const STATUS_FILTERS = [
  { value: 'all', label: 'All Orders' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PAID', label: 'Paid' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'REFUNDED', label: 'Refunded' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

// Export all constants together
export const ORDER_CONSTANTS = {
  ORDER_STATUS,
  PAYMENT_STATUS,
  SORT_OPTIONS,
  STATUS_FILTERS,
};