import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getLandingContent,
  getLandingContentAdmin,
  updateLandingContent,
} from '../api/assessment-landing.api';

// ============================
// QUERY KEYS
// ============================
export const LANDING_QUERY_KEYS = {
  public: ['assessment-landing', 'public'],
  admin: ['assessment-landing', 'admin'],
};

// ============================
// PUBLIC HOOK
// ============================

/**
 * Get landing content (public)
 */
export const useLandingContent = () => {
  return useQuery({
    queryKey: LANDING_QUERY_KEYS.public,
    queryFn: () => getLandingContent(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ============================
// ADMIN HOOKS
// ============================

/**
 * Get landing content (admin)
 */
export const useLandingContentAdmin = () => {
  return useQuery({
    queryKey: LANDING_QUERY_KEYS.admin,
    queryFn: () => getLandingContentAdmin(),
    staleTime: 30 * 1000, // 30 seconds
  });
};

/**
 * Update landing content (admin)
 */
export const useUpdateLandingContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateLandingContent(id, data),
    onSuccess: (response) => {
      toast.success('Landing content updated successfully');

      // Invalidate both public and admin queries
      queryClient.invalidateQueries({ queryKey: LANDING_QUERY_KEYS.public });
      queryClient.invalidateQueries({ queryKey: LANDING_QUERY_KEYS.admin });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to update landing content');
      console.error('Update landing error:', error);
    },
  });
};