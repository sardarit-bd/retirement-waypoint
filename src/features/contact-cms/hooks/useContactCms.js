import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { contactCmsApi } from '../api/contact-cms.api';

export const CONTACT_CMS_QUERY_KEYS = {
  PUBLIC: ['contact-cms', 'public'],
  ADMIN: ['contact-cms', 'admin'],
};

// Hook for Public Contact Page
export function useContactCms() {
  return useQuery({
    queryKey: CONTACT_CMS_QUERY_KEYS.PUBLIC,
    queryFn: contactCmsApi.getContactCms,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

// Hook for Admin CMS Editor
export function useContactCmsAdmin() {
  return useQuery({
    queryKey: CONTACT_CMS_QUERY_KEYS.ADMIN,
    queryFn: contactCmsApi.getContactCmsAdmin,
    staleTime: 0,
    retry: 1,
  });
}

// Hook to Update Contact CMS
export function useUpdateContactCms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: contactCmsApi.updateContactCms,
    onSuccess: (data) => {
      queryClient.setQueryData(CONTACT_CMS_QUERY_KEYS.ADMIN, data);
      queryClient.setQueryData(CONTACT_CMS_QUERY_KEYS.PUBLIC, data);
      queryClient.invalidateQueries({ queryKey: ['contact-cms'] });
      toast.success('Contact page CMS updated successfully!');
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to update Contact page CMS';
      toast.error(message);
    },
  });
}
