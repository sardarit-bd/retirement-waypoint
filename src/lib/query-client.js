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
  ORDERS: 'orders',
  ORDER: (id) => ['order', id],
  MY_ORDERS: 'my-orders',
  
  // Purchases
  PURCHASES: 'purchases',
  PURCHASE: (id) => ['purchase', id],
  PURCHASE_CHECK: (bookId) => ['purchase-check', bookId],
  
  // My Books
  MY_BOOKS: 'my-books',
  MY_BOOK: (bookId) => ['my-book', bookId],
  
  // Invoices
  INVOICES: 'invoices',
  INVOICE: (id) => ['invoice', id],
  
  // Reviews
  REVIEWS: 'reviews',
  REVIEW: (id) => ['review', id],
  MY_REVIEWS: 'my-reviews',
  BOOK_REVIEWS: (bookId) => ['book-reviews', bookId],
  REVIEW_SUMMARY: (bookId) => ['review-summary', bookId],
  
  // Assessments
  ASSESSMENTS: 'assessments',
  ASSESSMENT: (id) => ['assessment', id],
  MY_ASSESSMENTS: 'my-assessments',
  
  // Refunds
  REFUNDS: 'refunds',
  REFUND: (id) => ['refund', id],
  MY_REFUNDS: 'my-refunds',
  
  // Coupons
  COUPONS: 'coupons',
  COUPON: (id) => ['coupon', id],
  
  // Analytics
  ANALYTICS_DASHBOARD: 'analytics-dashboard',
  ANALYTICS_ORDERS: 'analytics-orders',
  ANALYTICS_REVENUE: 'analytics-revenue',
  
  // Users (admin)
  USERS: 'users',
  USER_ADMIN: (id) => ['user-admin', id],
};