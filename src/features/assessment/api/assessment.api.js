import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';


// ============================
// PUBLIC API - Queries
// ============================

/**
 * Get all published assessments (public)
 */
export const getPublicAssessments = async (params = {}) => {
  const { page = 1, limit = 10 } = params;
  const response = await api.get(API_ENDPOINTS.ASSESSMENT_ADMIN.PUBLIC, {
    params: { page, limit },
  });
  return response.data;
};

/**
 * Get published assessment by slug (public)
 */
export const getPublicAssessmentBySlug = async (slug) => {
  const response = await api.get(
    API_ENDPOINTS.ASSESSMENT_ADMIN.PUBLIC_SLUG(slug)
  );
  return response.data;
};

// ============================
// PUBLIC API - Mutations
// ============================

/**
 * Submit assessment answers (public)
 * POST /api/assessments/:slug/submit
 */
export const submitAssessment = async (slug, data) => {
  const response = await api.post(
    `${API_ENDPOINTS.ASSESSMENTS.SUBMIT}/${slug}/submit`,
    data
  );
  return response.data;
};

// ============================
// ADMIN API - Queries
// ============================

/**
 * Get all assessments (admin)
 */
export const getAdminAssessments = async (params = {}) => {
  const { page = 1, limit = 10, status, search, includeDeleted = false } = params;
  const response = await api.get(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN, {
    params: { page, limit, status, search, includeDeleted },
  });
  return response.data;
};

/**
 * Get assessment by ID (admin)
 */
export const getAdminAssessmentById = async (id, includeDeleted = false) => {
  const response = await api.get(
    API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_BY_ID(id),
    { params: { includeDeleted } }
  );
  return response.data;
};

/**
 * Get assessment by slug (admin)
 */
export const getAdminAssessmentBySlug = async (slug, includeDeleted = false) => {
  const response = await api.get(
    API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_BY_SLUG(slug),
    { params: { includeDeleted } }
  );
  return response.data;
};

/**
 * Get assessment stats (admin)
 */
export const getAdminAssessmentStats = async () => {
  const response = await api.get(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_STATS);
  return response.data;
};

/**
 * Get soft deleted assessments (admin)
 */
export const getAdminDeletedAssessments = async (params = {}) => {
  const { page = 1, limit = 10 } = params;
  const response = await api.get(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_DELETED, {
    params: { page, limit },
  });
  return response.data;
};

// ============================
// ADMIN API - Mutations
// ============================

/**
 * Update assessment (admin)
 */
export const updateAssessment = async (id, data) => {
  const response = await api.patch(
    API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_BY_ID(id),
    data
  );
  return response.data;
};

/**
 * Create assessment (admin)
 */
export const createAssessment = async (data) => {
  const response = await api.post(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN, data);
  return response.data;
};

/**
 * Soft delete assessment (admin)
 */
export const deleteAssessment = async (id) => {
  const response = await api.delete(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_BY_ID(id));
  return response.data;
};

/**
 * Restore soft deleted assessment (admin)
 */
export const restoreAssessment = async (id) => {
  const response = await api.patch(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_RESTORE(id));
  return response.data;
};

/**
 * Duplicate assessment (admin)
 */
export const duplicateAssessment = async (id) => {
  const response = await api.post(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_DUPLICATE(id));
  return response.data;
};

/**
 * Publish assessment (admin)
 */
export const publishAssessment = async (id) => {
  const response = await api.patch(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_PUBLISH(id));
  return response.data;
};

/**
 * Archive assessment (admin)
 */
export const archiveAssessment = async (id) => {
  const response = await api.patch(API_ENDPOINTS.ASSESSMENT_ADMIN.ADMIN_ARCHIVE(id));
  return response.data;
};