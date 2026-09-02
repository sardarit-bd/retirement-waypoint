import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

// ============================
// PUBLIC API
// ============================

/**
 * Get public home CMS content
 */
export const getHomeCms = async () => {
  const response = await api.get(API_ENDPOINTS.HOME_CMS.PUBLIC);
  return response.data;
};

// ============================
// ADMIN API
// ============================

/**
 * Get home CMS content (admin)
 */
export const getHomeCmsAdmin = async () => {
  const response = await api.get(API_ENDPOINTS.HOME_CMS.ADMIN);
  return response.data;
};

/**
 * Update home CMS content (admin)
 */
export const updateHomeCms = async (id, data) => {
  const response = await api.patch(API_ENDPOINTS.HOME_CMS.UPDATE(id), data);
  return response.data;
};

export const homeCmsApi = {
  getHomeCms,
  getHomeCmsAdmin,
  updateHomeCms,
};

export default homeCmsApi;
