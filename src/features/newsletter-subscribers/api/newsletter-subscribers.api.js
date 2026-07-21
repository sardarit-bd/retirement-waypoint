import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const newsletterSubscribersApi = {
  // Get subscribers with search/filter/pagination
  getSubscribers: (params) => {
    return api.get(API_ENDPOINTS.NEWSLETTER.ADMIN_ALL, { params });
  },

  // Get subscriber stats
  getStats: () => {
    return api.get(API_ENDPOINTS.NEWSLETTER.ADMIN_STATS);
  },

  // Get subscriber by ID
  getSubscriberById: (id) => {
    return api.get(API_ENDPOINTS.NEWSLETTER.ADMIN_SINGLE(id));
  },

  // Update subscriber status (activate / unsubscribe)
  updateStatus: (id, status) => {
    return api.patch(API_ENDPOINTS.NEWSLETTER.ADMIN_SINGLE(id), { status });
  },

  // Delete subscriber
  deleteSubscriber: (id) => {
    return api.delete(API_ENDPOINTS.NEWSLETTER.ADMIN_SINGLE(id));
  },

  // Export subscribers (CSV / Excel) — returns a raw blob for download
  exportSubscribers: (params) => {
    return api.get(API_ENDPOINTS.NEWSLETTER.ADMIN_EXPORT, {
      params,
      responseType: 'blob',
    });
  },
};