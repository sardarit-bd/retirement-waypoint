import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { coachingCmsApi } from '../api/coaching-cms.api';

export const COACHING_CMS_QUERY_KEYS = {
  PUBLIC: ['coaching-cms', 'public'],
  ADMIN: ['coaching-cms', 'admin'],
};

// Hook for Public Coaching Page
export function useCoachingCms() {
  return useQuery({
    queryKey: COACHING_CMS_QUERY_KEYS.PUBLIC,
    queryFn: coachingCmsApi.getCoachingCms,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

// Hook for Admin CMS Editor
export function useCoachingCmsAdmin() {
  return useQuery({
    queryKey: COACHING_CMS_QUERY_KEYS.ADMIN,
    queryFn: coachingCmsApi.getCoachingCmsAdmin,
    staleTime: 0,
    retry: 1,
  });
}

// Hook to Update Coaching CMS
export function useUpdateCoachingCms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coachingCmsApi.updateCoachingCms,
    onSuccess: (data) => {
      queryClient.setQueryData(COACHING_CMS_QUERY_KEYS.ADMIN, data);
      queryClient.setQueryData(COACHING_CMS_QUERY_KEYS.PUBLIC, data);
      queryClient.invalidateQueries({ queryKey: ['coaching-cms'] });
      toast.success('Coaching page CMS updated successfully!');
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to update Coaching page CMS';
      toast.error(message);
    },
  });
}
