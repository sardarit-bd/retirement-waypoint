'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { homeCmsApi } from '../api/home-cms.api';
import toast from 'react-hot-toast';

export const homeCmsKeys = {
  all: ['home-cms'],
  public: ['home-cms', 'public'],
  admin: ['home-cms', 'admin'],
};

/**
 * Hook to fetch public home page CMS content
 */
export function useHomeCms() {
  return useQuery({
    queryKey: homeCmsKeys.public,
    queryFn: () => homeCmsApi.getHomeCms(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch admin home page CMS content
 */
export function useHomeCmsAdmin() {
  return useQuery({
    queryKey: homeCmsKeys.admin,
    queryFn: () => homeCmsApi.getHomeCmsAdmin(),
    staleTime: 1 * 60 * 1000,
  });
}

/**
 * Hook to update home page CMS content (admin)
 */
export function useUpdateHomeCms() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => homeCmsApi.updateHomeCms(id, data),
    onSuccess: () => {
      toast.success('Home page content updated successfully!');
      queryClient.invalidateQueries({ queryKey: homeCmsKeys.all });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to update Home Page content';
      toast.error(message);
    },
  });
}
