
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

// ============================
// PUBLIC API
// ============================

/**
 * Get landing content (public)
 */
export const getLandingContent = async () => {
  const response = await api.get(API_ENDPOINTS.ASSESSMENT_LANDING.PUBLIC);
  return response.data;
};

// ============================
// ADMIN API
// ============================

/**
 * Get landing content (admin)
 */
export const getLandingContentAdmin = async () => {
  const response = await api.get(API_ENDPOINTS.ASSESSMENT_LANDING.ADMIN);
  return response.data;
};

/**
 * Update landing content (admin)
 */
export const updateLandingContent = async (id, data) => {
  const response = await api.patch(
    API_ENDPOINTS.ASSESSMENT_LANDING.UPDATE(id),
    data
  );
  return response.data;
};