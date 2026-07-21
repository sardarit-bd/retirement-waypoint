import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminAssessmentById, getAdminAssessmentBySlug, getAdminAssessments, getAdminAssessmentStats, getAdminDeletedAssessments, getPublicAssessmentBySlug, getPublicAssessments } from '../../api/assessment.api';
// import {
//   getPublicAssessments,
//   getPublicAssessmentBySlug,
//   getAdminAssessments,
//   getAdminAssessmentById,
//   getAdminAssessmentBySlug,
//   getAdminAssessmentStats,
//   getAdminDeletedAssessments,
// } from '../api/assessment.api';

// ============================
// QUERY KEYS
// ============================
export const ASSESSMENT_QUERY_KEYS = {
    public: ['assessments', 'public'],
    publicSlug: (slug) => ['assessments', 'public', slug],
    admin: ['assessments', 'admin'],
    adminById: (id) => ['assessments', 'admin', id],
    adminBySlug: (slug) => ['assessments', 'admin', slug],
    adminStats: ['assessments', 'admin', 'stats'],
    adminDeleted: ['assessments', 'admin', 'deleted'],
};

// ============================
// PUBLIC HOOKS
// ============================

/**
 * Get all published assessments (public)
 */
export const usePublicAssessments = (params = {}) => {
    return useQuery({
        queryKey: [...ASSESSMENT_QUERY_KEYS.public, params],
        queryFn: () => getPublicAssessments(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Get published assessment by slug (public)
 */
export const usePublicAssessment = (slug) => {
    return useQuery({
        queryKey: ASSESSMENT_QUERY_KEYS.publicSlug(slug),
        queryFn: () => getPublicAssessmentBySlug(slug),
        enabled: !!slug,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// ============================
// ADMIN HOOKS
// ============================

/**
 * Get all assessments (admin)
 */
export const useAdminAssessments = (params = {}) => {
    return useQuery({
        queryKey: [...ASSESSMENT_QUERY_KEYS.admin, params],
        queryFn: () => getAdminAssessments(params),
        staleTime: 30 * 1000, // 30 seconds
    });
};

/**
 * Get assessment by ID (admin)
 */
export const useAdminAssessmentById = (id, includeDeleted = false) => {
    return useQuery({
        queryKey: ASSESSMENT_QUERY_KEYS.adminById(id),
        queryFn: () => getAdminAssessmentById(id, includeDeleted),
        enabled: !!id,
        staleTime: 30 * 1000,
    });
};

/**
 * Get assessment by slug (admin)
 */
export const useAdminAssessmentBySlug = (slug, includeDeleted = false) => {
    return useQuery({
        queryKey: ASSESSMENT_QUERY_KEYS.adminBySlug(slug),
        queryFn: () => getAdminAssessmentBySlug(slug, includeDeleted),
        enabled: !!slug,
        staleTime: 30 * 1000,
    });
};

/**
 * Get assessment stats (admin)
 */
export const useAdminAssessmentStats = () => {
    return useQuery({
        queryKey: ASSESSMENT_QUERY_KEYS.adminStats,
        queryFn: () => getAdminAssessmentStats(),
        staleTime: 60 * 1000, // 1 minute
    });
};

/**
 * Get soft deleted assessments (admin)
 */
export const useAdminDeletedAssessments = (params = {}) => {
    return useQuery({
        queryKey: [...ASSESSMENT_QUERY_KEYS.adminDeleted, params],
        queryFn: () => getAdminDeletedAssessments(params),
        staleTime: 30 * 1000,
    });
};