import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Query keys for better cache management
export const QUERY_KEYS = {
  // User
  USER: 'user',
  USER_PROFILE: 'user-profile',

  // Books
  BOOKS: 'books',
  BOOK: (id) => ['book', id],
  PUBLIC_BOOKS: 'public-books',
  FEATURED_BOOKS: 'featured-books',

  // Orders
  ORDERS: {
    ALL: 'orders',
    MY_ORDERS: 'my-orders',
    DETAILS: (id) => ['order', id],
    FILTERED: (params) => ['orders', params],
    MY_FILTERED: (params) => ['my-orders', params],
  },

  // Purchases
  PURCHASES: {
    ALL: 'purchases',
    DETAILS: (id) => ['purchase', id],
    MY_PURCHASES: 'my-purchases',
    CHECK: (bookId) => ['purchase-check', bookId],
    WITH_BOOKS: 'purchases-with-books',
  },

  // My Books
  MY_BOOKS: {
    ALL: 'my-books',
    DETAILS: (bookId) => ['my-book', bookId],
    FILTERED: (params) => ['my-books', params],
  },

  // Invoices
  INVOICES: {
    ALL: 'invoices',
    DETAILS: (id) => ['invoice', id],
    MY_INVOICES: 'my-invoices',
  },

  // Reviews
  REVIEWS: {
    ALL: 'reviews',
    DETAILS: (id) => ['review', id],
    MY_REVIEWS: 'my-reviews',
    BOOK_REVIEWS: (bookId) => ['book-reviews', bookId],
    SUMMARY: (bookId) => ['review-summary', bookId],
    FILTERED: (params) => ['reviews', params],
  },

  // Assessments
  ASSESSMENTS: {
    ALL: 'assessments',
    DETAILS: (id) => ['assessment', id],
    MY_ASSESSMENTS: 'my-assessments',
    FILTERED: (params) => ['assessments', params],
  },

  // Refunds (internal only - not exposed in UI)
  REFUNDS: {
    ALL: 'refunds',
    DETAILS: (id) => ['refund', id],
    MY_REFUNDS: 'my-refunds',
  },

  // Coupons
  COUPONS: {
    ALL: 'coupons',
    DETAILS: (id) => ['coupon', id],
    VALIDATE: (code) => ['coupon-validate', code],
    FILTERED: (params) => ['coupons', params],
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: 'analytics-dashboard',
    ORDERS: 'analytics-orders',
    REVENUE: 'analytics-revenue',
    BOOKS: 'analytics-books',
    USERS: 'analytics-users',
  },

  // Users (admin)
  USERS: {
    ALL: 'users',
    DETAILS: (id) => ['user-admin', id],
    FILTERED: (params) => ['users', params],
  },

  // Dashboard
  DASHBOARD: {
    STATS: 'dashboard-stats',
    RECENT_BOOKS: 'recent-books',
    RECENT_ORDERS: 'recent-orders',
    ACTIVITY: 'dashboard-activity',
    ASSESSMENT_PROGRESS: 'assessment-progress',
  },

  // Download Logs (admin)
  DOWNLOAD_LOGS: {
    ALL: 'download-logs',
    FILTERED: (params) => ['download-logs', params],
    STATS: 'download-stats',
  },

  // Payment
  PAYMENT: {
    SESSION: 'payment-session',
    STATUS: 'payment-status',
  },
};

// Helper function to invalidate related queries
export const INVALIDATION_KEYS = {
  // Invalidate all order-related queries
  ORDERS: () => ({
    queryKey: [QUERY_KEYS.ORDERS.ALL],
    refetchType: 'active',
  }),

  // Invalidate a specific order
  ORDER: (id) => ({
    queryKey: QUERY_KEYS.ORDERS.DETAILS(id),
    refetchType: 'active',
  }),

  // Invalidate all my orders
  MY_ORDERS: () => ({
    queryKey: [QUERY_KEYS.ORDERS.MY_ORDERS],
    refetchType: 'active',
  }),

  // Invalidate purchase checks
  PURCHASE_CHECK: (bookId) => ({
    queryKey: QUERY_KEYS.PURCHASES.CHECK(bookId),
    refetchType: 'active',
  }),

  // Invalidate my books
  MY_BOOKS: () => ({
    queryKey: [QUERY_KEYS.MY_BOOKS.ALL],
    refetchType: 'active',
  }),

  // Invalidate all reviews for a book
  BOOK_REVIEWS: (bookId) => ({
    queryKey: QUERY_KEYS.REVIEWS.BOOK_REVIEWS(bookId),
    refetchType: 'active',
  }),
};