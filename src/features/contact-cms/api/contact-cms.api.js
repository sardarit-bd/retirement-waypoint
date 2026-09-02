import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const contactCmsApi = {
  // Public - Get active Contact CMS content
  getContactCms: async () => {
    const res = await api.get(API_ENDPOINTS.CONTACT_CMS.PUBLIC);
    return res.data;
  },

  // Admin - Get Contact CMS content
  getContactCmsAdmin: async () => {
    const res = await api.get(API_ENDPOINTS.CONTACT_CMS.ADMIN);
    return res.data;
  },

  // Admin - Update Contact CMS content
  updateContactCms: async ({ id, data }) => {
    const res = await api.patch(API_ENDPOINTS.CONTACT_CMS.UPDATE(id), data);
    return res.data;
  },
};
