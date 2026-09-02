import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const coachingCmsApi = {
  // Public - Get active Coaching CMS content
  getCoachingCms: async () => {
    const res = await api.get(API_ENDPOINTS.COACHING_CMS.PUBLIC);
    return res.data;
  },

  // Admin - Get Coaching CMS content
  getCoachingCmsAdmin: async () => {
    const res = await api.get(API_ENDPOINTS.COACHING_CMS.ADMIN);
    return res.data;
  },

  // Admin - Update Coaching CMS content
  updateCoachingCms: async ({ id, data }) => {
    const res = await api.patch(API_ENDPOINTS.COACHING_CMS.UPDATE(id), data);
    return res.data;
  },
};
