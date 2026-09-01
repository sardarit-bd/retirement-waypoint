import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const aboutCmsApi = {
  // Public - Get active About CMS content
  getAboutCms: async () => {
    const res = await api.get(API_ENDPOINTS.ABOUT_CMS.PUBLIC);
    return res.data;
  },

  // Admin - Get About CMS content
  getAboutCmsAdmin: async () => {
    const res = await api.get(API_ENDPOINTS.ABOUT_CMS.ADMIN);
    return res.data;
  },

  // Admin - Update About CMS content
  updateAboutCms: async ({ id, data }) => {
    const res = await api.patch(API_ENDPOINTS.ABOUT_CMS.UPDATE(id), data);
    return res.data;
  },
};
