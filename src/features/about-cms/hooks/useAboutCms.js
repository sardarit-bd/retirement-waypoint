import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { aboutCmsApi } from '../api/about-cms.api';

export const ABOUT_CMS_QUERY_KEYS = {
  PUBLIC: ['about-cms', 'public'],
  ADMIN: ['about-cms', 'admin'],
};

// Hook for Public About Page
export function useAboutCms() {
  return useQuery({
    queryKey: ABOUT_CMS_QUERY_KEYS.PUBLIC,
    queryFn: aboutCmsApi.getAboutCms,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

// Hook for Admin CMS Editor
export function useAboutCmsAdmin() {
  return useQuery({
    queryKey: ABOUT_CMS_QUERY_KEYS.ADMIN,
    queryFn: aboutCmsApi.getAboutCmsAdmin,
    staleTime: 0,
    retry: 1,
  });
}

// Hook to Update About CMS
export function useUpdateAboutCms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aboutCmsApi.updateAboutCms,
    onSuccess: (data) => {
      queryClient.setQueryData(ABOUT_CMS_QUERY_KEYS.ADMIN, data);
      queryClient.setQueryData(ABOUT_CMS_QUERY_KEYS.PUBLIC, data);
      queryClient.invalidateQueries({ queryKey: ['about-cms'] });
      toast.success('About page CMS updated successfully!');
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to update About page CMS';
      toast.error(message);
    },
  });
}
