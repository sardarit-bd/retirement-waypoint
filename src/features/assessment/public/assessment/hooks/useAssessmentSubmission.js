import { submitAssessment } from '@/features/assessment/api/assessment.api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

/**
 * Submit assessment answers
 */
export const useAssessmentSubmission = () => {
  return useMutation({
    mutationFn: ({ slug, data }) => submitAssessment(slug, data),
    onSuccess: (response) => {
      toast.success('Assessment submitted successfully!');
      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to submit assessment');
      console.error('Submission error:', error);
    },
  });
};