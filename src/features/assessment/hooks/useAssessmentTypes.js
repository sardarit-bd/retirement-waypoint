'use client';

import { useQuery } from '@tanstack/react-query';
import { assessmentApi } from '../api/assessment.api';
import { assessmentKeys } from './useAssessment';

export function useAssessmentTypes(params = {}) {
  return useQuery({
    queryKey: ['assessment-types', params],
    queryFn: async () => {
      const response = await assessmentApi.adminGetTypes(params);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}