export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    ME: '/api/auth/me',
    UPDATE_PROFILE: '/api/auth/me',
    UPDATE_PROFILE_IMAGE: '/api/auth/me/profile-image',
    REMOVE_PROFILE_IMAGE: '/api/auth/me/profile-image',
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
  // Books
  BOOKS: {
    ALL: '/api/books',
    PUBLIC: '/api/public/books',
    FEATURED: '/api/public/books/featured',
    SINGLE: (id) => `/api/books/${id}`,
    PUBLIC_SINGLE: (slug) => `/api/public/books/${slug}`,
    PUBLISH: (id) => `/api/books/${id}/publish`,
    ARCHIVE: (id) => `/api/books/${id}/archive`,
  },
  // Orders
  ORDERS: {
    ALL: '/api/orders',
    MY_ORDERS: '/api/orders/my-orders',
    SINGLE: (id) => `/api/orders/${id}`,
    UPDATE_ORDER_STATUS: (id) => `/api/orders/${id}/order-status`,
    UPDATE_PAYMENT_STATUS: (id) => `/api/orders/${id}/payment-status`,
  },
  // Purchases
  PURCHASES: {
    MY_PURCHASES: '/api/purchases/my-purchases',
    MY_PURCHASES_WITH_DETAILS: '/api/purchases/my-purchases-with-details',
    CHECK: (bookId) => `/api/purchases/check/${bookId}`,
    SINGLE: (id) => `/api/purchases/${id}`,
    SINGLE_WITH_DETAILS: (id) => `/api/purchases/${id}/with-details`,
  },
  // My Books
  MY_BOOKS: {
    ALL: '/api/my-books',
    SINGLE: (bookId) => `/api/my-books/${bookId}`,
    DOWNLOAD: (bookId) => `/api/my-books/${bookId}/download`,
  },
  // Invoices
  INVOICES: {
    MY_INVOICES: '/api/invoices/my-invoices',
    SINGLE: (id) => `/api/invoices/${id}`,
    BY_NUMBER: (number) => `/api/invoices/by-number/${number}`,
    DOWNLOAD: (id) => `/api/invoices/${id}/download`,
  },
  // Reviews
  REVIEWS: {
    ALL: '/api/reviews',
    MY_REVIEWS: '/api/reviews/my-reviews',
    SINGLE: (id) => `/api/reviews/${id}`,
    BOOK_REVIEWS: (bookId) => `/api/reviews/books/${bookId}/reviews`,
    BOOK_SUMMARY: (bookId) => `/api/reviews/books/${bookId}/reviews/summary`,
    ADMIN_ALL: '/api/reviews/admin/reviews',
    ADMIN_APPROVE: (id) => `/api/reviews/admin/reviews/${id}/approve`,
    ADMIN_REJECT: (id) => `/api/reviews/admin/reviews/${id}/reject`,
  },
  // Assessments - Public (User taking assessment)
  ASSESSMENTS: {
    SUBMIT: '/api/assessments',
    MY_ASSESSMENTS: '/api/assessments/my-assessments',
    SINGLE: (id) => `/api/assessments/${id}`,
    RESULTS: (id) => `/api/assessments/${id}/results`,
  },
  // Assessment Admin - Management (Admin)
  ASSESSMENT_ADMIN: {
    // Public routes (no auth required)
    PUBLIC: '/api/assessments/public',
    PUBLIC_SLUG: (slug) => `/api/assessments/public/${slug}`,

    // Admin routes (auth + admin role required)
    ADMIN: '/api/assessments',
    ADMIN_BY_ID: (id) => `/api/assessments/${id}`,
    ADMIN_BY_SLUG: (slug) => `/api/assessments/slug/${slug}`,
    ADMIN_STATS: '/api/assessments/stats',
    ADMIN_DELETED: '/api/assessments/deleted',
    ADMIN_DUPLICATE: (id) => `/api/assessments/${id}/duplicate`,
    ADMIN_PUBLISH: (id) => `/api/assessments/${id}/publish`,
    ADMIN_ARCHIVE: (id) => `/api/assessments/${id}/archive`,
    ADMIN_RESTORE: (id) => `/api/assessments/${id}/restore`,
  },
  // Assessment Landing
  ASSESSMENT_LANDING: {
    PUBLIC: '/api/assessment-landing',
    ADMIN: '/api/assessment-landing/admin',
    UPDATE: (id) => `/api/assessment-landing/admin/${id}`,
  },
  // Refunds
  REFUNDS: {
    ALL: '/api/refunds',
    MY_REFUNDS: '/api/refunds/my-refunds',
    SINGLE: (id) => `/api/refunds/${id}`,
    ADMIN_ALL: '/api/refunds/admin/refunds',
    ADMIN_SINGLE: (id) => `/api/refunds/admin/refunds/${id}`,
    ADMIN_APPROVE: (id) => `/api/refunds/admin/refunds/${id}/approve`,
    ADMIN_REJECT: (id) => `/api/refunds/admin/refunds/${id}/reject`,
  },
  // Coupons
  COUPONS: {
    VALIDATE: '/api/coupons/validate',
    ADMIN_ALL: '/api/coupons/admin/coupons',
    ADMIN_SINGLE: (id) => `/api/coupons/admin/coupons/${id}`,
    ADMIN_CREATE: '/api/coupons/admin/coupons',
    ADMIN_UPDATE: (id) => `/api/coupons/admin/coupons/${id}`,
    ADMIN_ACTIVATE: (id) => `/api/coupons/admin/coupons/${id}/activate`,
    ADMIN_DEACTIVATE: (id) => `/api/coupons/admin/coupons/${id}/deactivate`,
    ADMIN_USAGE: (id) => `/api/coupons/admin/coupons/${id}/usage`,
  },
  // Analytics
  ANALYTICS: {
    OVERVIEW: '/api/admin/analytics/overview',
    DASHBOARD: '/api/admin/analytics/dashboard',
    ORDERS: '/api/admin/analytics/orders',
    REVENUE: '/api/admin/analytics/revenue',
    BOOKS: '/api/admin/analytics/books',
    PURCHASES: '/api/admin/analytics/purchases',
    USERS: '/api/admin/analytics/users',
    DOWNLOADS: '/api/admin/analytics/downloads',
    REVIEWS: '/api/admin/analytics/reviews',
    COUPONS: '/api/admin/analytics/coupons',
  },
  // Users
  USERS: {
    ALL: '/api/auth/users',
    SINGLE: (id) => `/api/auth/users/${id}`,
    UPDATE_ROLE: (id) => `/api/auth/users/${id}/role`,
    DEACTIVATE: (id) => `/api/auth/users/${id}/deactivate`,
    ACTIVATE: (id) => `/api/auth/users/${id}/activate`,
  },
  // Upload
  UPLOAD: {
    SINGLE: '/api/upload/single',
    MULTIPLE: '/api/upload/multiple',
    PROFILE_IMAGE: '/api/upload/profile-image',
    BOOK_COVER: '/api/upload/book-cover',
    MY_FILES: '/api/upload/my-files',
    DELETE: (publicId) => `/api/upload/${publicId}`,
  },
  // Contact
  CONTACT: {
    SUBMIT: '/api/contact',
    ADMIN_ALL: '/api/admin/contact-messages',
    ADMIN_STATS: '/api/admin/contact-messages/stats',
    ADMIN_UNREAD_COUNT: '/api/admin/contact-messages/unread-count',
    ADMIN_SINGLE: (id) => `/api/admin/contact-messages/${id}`,
    ADMIN_UPDATE_STATUS: (id) => `/api/admin/contact-messages/${id}/status`,
  },
};