'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/query-client';
import { dashboardApi } from '../services/dashboard.api';

export function useAdminDashboard() {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.ADMIN],
    queryFn: () => dashboardApi.getAdminDashboardData(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDashboard(options = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.STATS],
    queryFn: () => dashboardApi.getDashboardData(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.STATS],
    queryFn: () => dashboardApi.getStats(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecentBooks(limit = 4) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.RECENT_BOOKS],
    queryFn: () => dashboardApi.getRecentBooks(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRecentOrders(limit = 3) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.RECENT_ORDERS],
    queryFn: () => dashboardApi.getRecentOrders(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActivityTimeline(limit = 5) {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.ACTIVITY],
    queryFn: () => dashboardApi.getActivityTimeline(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAssessmentProgress() {
  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.ASSESSMENT_PROGRESS],
    queryFn: () => dashboardApi.getAssessmentProgress(),
    staleTime: 5 * 60 * 1000,
  });
}
