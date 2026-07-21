import { useQuery } from '@tanstack/react-query';
import { AssessmentParticipantsAPI } from '../api/assessment-participants.api';

export const ASSESSMENT_PARTICIPANTS_QUERY_KEYS = {
  all: ['assessment-participants'],
  list: (params) => ['assessment-participants', 'list', params],
  stats: ['assessment-participants', 'stats'],
  detail: (id) => ['assessment-participants', 'detail', id],
};

export const useAssessmentParticipants = (params) => {
  return useQuery({
    queryKey: ASSESSMENT_PARTICIPANTS_QUERY_KEYS.list(params),
    queryFn: async () => {
      const response = await AssessmentParticipantsAPI.getParticipants(params);
      return {
        submissions: response.data?.data || [],
        meta: response.data?.meta || {},
        filters: response.data?.filters || {},
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

export const useAssessmentParticipantStats = () => {
  return useQuery({
    queryKey: ASSESSMENT_PARTICIPANTS_QUERY_KEYS.stats,
    queryFn: async () => {
      const response = await AssessmentParticipantsAPI.getStats();
      return response.data?.data || {};
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssessmentParticipant = (id) => {
  return useQuery({
    queryKey: ASSESSMENT_PARTICIPANTS_QUERY_KEYS.detail(id),
    queryFn: async () => {
      const response = await AssessmentParticipantsAPI.getParticipantById(id);
      return response.data?.data || null;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};