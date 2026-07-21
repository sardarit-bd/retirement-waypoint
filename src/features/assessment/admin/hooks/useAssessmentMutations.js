import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// import {
//   updateAssessment,
//   createAssessment,
//   deleteAssessment,
//   restoreAssessment,
//   duplicateAssessment,
//   publishAssessment,
//   archiveAssessment,
// } from '../api/assessment.api';
import { ASSESSMENT_QUERY_KEYS } from './useAssessmentQueries';
import { archiveAssessment, createAssessment, deleteAssessment, duplicateAssessment, publishAssessment, restoreAssessment, updateAssessment } from '../../api/assessment.api';

// ============================
// UPDATE ASSESSMENT MUTATION
// ============================
export const useUpdateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAssessment(id, data),
    onSuccess: (response, { id, slug }) => {
      toast.success('Assessment updated successfully');

      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminById(id) });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminBySlug(slug) });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.public });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to update assessment');
      console.error('Update assessment error:', error);
    },
  });
};

// ============================
// CREATE ASSESSMENT MUTATION
// ============================
export const useCreateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createAssessment(data),
    onSuccess: (response) => {
      toast.success('Assessment created successfully');

      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to create assessment');
      console.error('Create assessment error:', error);
    },
  });
};

// ============================
// DELETE ASSESSMENT MUTATION
// ============================
export const useDeleteAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAssessment(id),
    onSuccess: (response, id) => {
      toast.success('Assessment deleted successfully');

      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminById(id) });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminDeleted });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to delete assessment');
      console.error('Delete assessment error:', error);
    },
  });
};

// ============================
// RESTORE ASSESSMENT MUTATION
// ============================
export const useRestoreAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => restoreAssessment(id),
    onSuccess: (response, id) => {
      toast.success('Assessment restored successfully');

      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminById(id) });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminDeleted });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to restore assessment');
      console.error('Restore assessment error:', error);
    },
  });
};

// ============================
// DUPLICATE ASSESSMENT MUTATION
// ============================
export const useDuplicateAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => duplicateAssessment(id),
    onSuccess: (response) => {
      toast.success('Assessment duplicated successfully');

      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to duplicate assessment');
      console.error('Duplicate assessment error:', error);
    },
  });
};

// ============================
// PUBLISH ASSESSMENT MUTATION
// ============================
export const usePublishAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => publishAssessment(id),
    onSuccess: (response, id) => {
      toast.success('Assessment published successfully');

      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminById(id) });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.public });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to publish assessment');
      console.error('Publish assessment error:', error);
    },
  });
};

// ============================
// ARCHIVE ASSESSMENT MUTATION
// ============================
export const useArchiveAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => archiveAssessment(id),
    onSuccess: (response, id) => {
      toast.success('Assessment archived successfully');

      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.admin });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminById(id) });
      queryClient.invalidateQueries({ queryKey: ASSESSMENT_QUERY_KEYS.adminStats });

      return response;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to archive assessment');
      console.error('Archive assessment error:', error);
    },
  });
};