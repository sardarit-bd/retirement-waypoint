'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { profileApi } from '../services/profile.api';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export const QUERY_KEY_LINKED_ACCOUNTS = 'linked-accounts';

export function useProfile() {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_PROFILE],
    queryFn: profileApi.getProfile,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLinkedAccounts() {
  return useQuery({
    queryKey: [QUERY_KEY_LINKED_ACCOUNTS],
    queryFn: async () => {
      const { data } = await authClient.listAccounts();
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || 'Failed to update password');
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
}

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.updateProfileImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      toast.success('Profile image updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile image');
    },
  });
}

export function useRemoveProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.removeProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });
      toast.success('Profile image removed successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove profile image');
    },
  });
}