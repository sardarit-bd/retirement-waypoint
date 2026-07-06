import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const dashboardApi = {
  // Get admin dashboard data
  getAdminDashboardData: async () => {
    const [
      overview,
      revenue,
      orders,
      books,
      reviews,
      recentOrders,
    ] = await Promise.all([
      api.get(API_ENDPOINTS.ANALYTICS.OVERVIEW),
      api.get(API_ENDPOINTS.ANALYTICS.REVENUE, { params: { period: 'daily' } }),
      api.get(API_ENDPOINTS.ANALYTICS.ORDERS),
      api.get(API_ENDPOINTS.ANALYTICS.BOOKS, { params: { limit: 5 } }),
      api.get(API_ENDPOINTS.ANALYTICS.REVIEWS),
      api.get(API_ENDPOINTS.ORDERS.ALL, {
        params: {
          page: 1,
          limit: 5,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        },
      }),
    ]);

    return {
      overview: overview.data.data,
      revenue: revenue.data.data,
      orders: orders.data.data,
      books: books.data.data,
      reviews: reviews.data.data,
      recentOrders: recentOrders.data.data,
    };
  },

  // Get dashboard data
  getDashboardData: async () => {
    const response = await api.get('/api/dashboard');
    return response.data.data;
  },

  // Get dashboard stats
  getStats: async () => {
    const response = await api.get('/api/dashboard/stats');
    return response.data.data;
  },

  // Get recent books
  getRecentBooks: async (limit = 4) => {
    const response = await api.get('/api/dashboard/recent-books', { params: { limit } });
    return response.data.data;
  },

  // Get recent orders
  getRecentOrders: async (limit = 3) => {
    const response = await api.get('/api/dashboard/recent-orders', { params: { limit } });
    return response.data.data;
  },

  // Get activity timeline
  getActivityTimeline: async (limit = 5) => {
    const response = await api.get('/api/dashboard/activities', { params: { limit } });
    return response.data.data;
  },

  // Get assessment progress
  getAssessmentProgress: async () => {
    const response = await api.get('/api/dashboard/assessment-progress');
    return response.data.data;
  },
};
