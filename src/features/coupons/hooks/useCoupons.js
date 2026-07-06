'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponApi } from '../api/coupon.api';
import toast from 'react-hot-toast';

export const couponKeys = {
  all: ['coupons'],
  admin: ['coupons', 'admin'],
  adminList: (params) => ['coupons', 'admin', params],
  adminDetail: (id) => ['coupons', 'admin', id],
  adminUsage: (id, params) => ['coupons', 'admin', id, 'usage', params],
};

// Admin: Get all coupons
export function useAdminCoupons(params = {}) {
  return useQuery({
    queryKey: couponKeys.adminList(params),
    queryFn: () => couponApi.adminGetAllCoupons(params),
    staleTime: 2 * 60 * 1000,
  });
}

// Admin: Get single coupon
export function useAdminCoupon(couponId) {
  return useQuery({
    queryKey: couponKeys.adminDetail(couponId),
    queryFn: () => couponApi.adminGetCoupon(couponId),
    enabled: !!couponId,
    staleTime: 2 * 60 * 1000,
  });
}

// Admin: Get coupon usage
export function useAdminCouponUsage(couponId, params = {}) {
  return useQuery({
    queryKey: couponKeys.adminUsage(couponId, params),
    queryFn: () => couponApi.adminGetCouponUsage(couponId, params),
    enabled: !!couponId,
    staleTime: 2 * 60 * 1000,
  });
}

// Admin: Create coupon
export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => couponApi.adminCreateCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.adminList() });
      toast.success('Coupon created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
    },
  });
}

// Admin: Update coupon
export function useUpdateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ couponId, data }) => couponApi.adminUpdateCoupon(couponId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.adminList() });
      queryClient.invalidateQueries({ queryKey: couponKeys.adminDetail(variables.couponId) });
      toast.success('Coupon updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update coupon');
    },
  });
}

// Admin: Activate coupon
export function useActivateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponId) => couponApi.adminActivateCoupon(couponId),
    onSuccess: (_, couponId) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.adminList() });
      queryClient.invalidateQueries({ queryKey: couponKeys.adminDetail(couponId) });
      toast.success('Coupon activated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to activate coupon');
    },
  });
}

// Admin: Deactivate coupon
export function useDeactivateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponId) => couponApi.adminDeactivateCoupon(couponId),
    onSuccess: (_, couponId) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.adminList() });
      queryClient.invalidateQueries({ queryKey: couponKeys.adminDetail(couponId) });
      toast.success('Coupon deactivated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to deactivate coupon');
    },
  });
}

// Admin: Delete coupon
export function useDeleteCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponId) => couponApi.adminDeleteCoupon(couponId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.adminList() });
      toast.success('Coupon deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete coupon');
    },
  });
}

// Public: Validate coupon
export function useValidateCoupon() {
  return useMutation({
    mutationFn: ({ code, subtotal }) => couponApi.validateCoupon(code, subtotal),
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Invalid coupon code');
    },
  });
}