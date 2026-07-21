import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const newsletterApi = {
  // Subscribe to the newsletter
  subscribe: async (data) => {
    const response = await api.post(API_ENDPOINTS.NEWSLETTER.SUBSCRIBE, data);
    return response.data;
  },
};