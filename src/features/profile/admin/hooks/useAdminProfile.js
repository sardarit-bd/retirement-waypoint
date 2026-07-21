// features/profile/admin/hooks/useAdminProfile.js
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import toast from 'react-hot-toast';

// Fetch user profile
export function useAdminProfile() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: async () => {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      return response.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.patch(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
}

// Update profile image
export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.patch(API_ENDPOINTS.AUTH.UPDATE_PROFILE_IMAGE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      toast.success('Profile image updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile image');
    },
  });
}

// Remove profile image
export function useRemoveProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete(API_ENDPOINTS.AUTH.REMOVE_PROFILE_IMAGE);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      toast.success('Profile image removed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove profile image');
    },
  });
}

// Change password (uses Better Auth's built-in /api/auth/change-password endpoint)
export function useUpdatePassword() {
  return useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const response = await api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });
      return response.data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update password');
    },
  });
}