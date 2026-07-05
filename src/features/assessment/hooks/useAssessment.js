"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assessmentApi } from "../api/assessment.api";
import toast from "react-hot-toast";

export const assessmentKeys = {
  all: ["assessments"],
  types: ["assessments", "types"],
  typesList: (params) => ["assessments", "types", params],
  typesDetail: (id) => ["assessments", "types", id],
  pages: ["assessments", "pages"],
  pagesList: (params) => ["assessments", "pages", params],
  pagesDetail: (id) => ["assessments", "pages", id],
  sections: ["assessments", "sections"],
  sectionsList: (params) => ["assessments", "sections", params],
  sectionsDetail: (id) => ["assessments", "sections", id],
  questions: ["assessments", "questions"],
  questionsList: (params) => ["assessments", "questions", params],
  questionsDetail: (id) => ["assessments", "questions", id],
  options: ["assessments", "options"],
  optionsList: (questionId) => ["assessments", "options", questionId],
  optionsDetail: (id) => ["assessments", "options", id],
  submissions: ["assessments", "submissions"],
  submissionsList: (params) => ["assessments", "submissions", params],
  submissionsDetail: (id) => ["assessments", "submissions", id],
  public: ["assessments", "public"],
  publicDetail: (slug) => ["assessments", "public", slug],
  publicResult: (submissionId) => [
    "assessments",
    "public",
    "result",
    submissionId,
  ],
  resultRanges: ["assessments", "result-ranges"],
  resultRangesList: (params) => ["assessments", "result-ranges", params],
  resultRangesDetail: (id) => ["assessments", "result-ranges", id],
  recommendations: ["assessments", "recommendations"],
  recommendationsList: (resultRangeId) => [
    "assessments",
    "recommendations",
    resultRangeId,
  ],
};

// ==================== ADMIN: ASSESSMENT TYPES ====================

export function useAdminAssessmentTypes(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.typesList(params),
    queryFn: () => assessmentApi.adminGetTypes(params),
    staleTime: 5 * 60 * 1000,
    // Add these options for better handling
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useAdminAssessmentType(typeId) {
  return useQuery({
    queryKey: assessmentKeys.typesDetail(typeId),
    queryFn: () => assessmentApi.adminGetType(typeId),
    enabled: !!typeId,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== ADMIN: ASSESSMENT PAGES ====================

export function useAdminAssessmentPages(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.pagesList(params),
    queryFn: () => assessmentApi.adminGetPages(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminAssessmentPage(pageId) {
  return useQuery({
    queryKey: assessmentKeys.pagesDetail(pageId),
    queryFn: () => assessmentApi.adminGetPage(pageId),
    enabled: !!pageId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateAssessmentPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.adminCreatePage(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.pagesList() });
      toast.success("Assessment created successfully!");
      return data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create assessment",
      );
    },
  });
}

export function useUpdateAssessmentPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pageId, data }) =>
      assessmentApi.adminUpdatePage(pageId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.pagesList() });
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.pagesDetail(variables.pageId),
      });
      toast.success("Assessment page updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update assessment page",
      );
    },
  });
}

export function useDeleteAssessmentPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pageId) => assessmentApi.adminDeletePage(pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.pagesList() });
      toast.success("Assessment page deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete assessment page",
      );
    },
  });
}

// ==================== PUBLIC ====================

export function usePublicAssessment(slug) {
  return useQuery({
    queryKey: assessmentKeys.publicDetail(slug),
    queryFn: () => assessmentApi.getPublicAssessment(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function usePublicAssessmentResult(submissionId) {
  return useQuery({
    queryKey: assessmentKeys.publicResult(submissionId),
    queryFn: () => assessmentApi.getPublicAssessmentResult(submissionId),
    enabled: !!submissionId,
    staleTime: 10 * 60 * 1000,
  });
}

// ==================== USER ====================

export function useSubmitAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.submitAssessment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.submissionsList(),
      });
      toast.success("Assessment submitted successfully!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to submit assessment",
      );
    },
  });
}

export function useUserSubmissions(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.submissionsList(params),
    queryFn: () => assessmentApi.getUserSubmissions(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserSubmission(submissionId) {
  return useQuery({
    queryKey: assessmentKeys.submissionsDetail(submissionId),
    queryFn: () => assessmentApi.getSubmission(submissionId),
    enabled: !!submissionId,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== SECTIONS ====================

export function useAdminAssessmentSections(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.sectionsList(params),
    queryFn: () => assessmentApi.adminGetSections(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminAssessmentSection(sectionId) {
  return useQuery({
    queryKey: assessmentKeys.sectionsDetail(sectionId),
    queryFn: () => assessmentApi.adminGetSection(sectionId),
    enabled: !!sectionId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.adminCreateSection(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.sectionsList({
          assessmentPageId: variables.assessmentPageId,
        }),
      });
      toast.success("Section created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create section");
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, data }) =>
      assessmentApi.adminUpdateSection(sectionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.sectionsList(),
      });
      toast.success("Section updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update section");
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId) => assessmentApi.adminDeleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.sectionsList(),
      });
      toast.success("Section deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete section");
    },
  });
}

// ==================== QUESTIONS ====================

export function useAdminAssessmentQuestions(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.questionsList(params),
    queryFn: () => assessmentApi.adminGetQuestions(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminAssessmentQuestion(questionId) {
  return useQuery({
    queryKey: assessmentKeys.questionsDetail(questionId),
    queryFn: () => assessmentApi.adminGetQuestion(questionId),
    enabled: !!questionId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.adminCreateQuestion(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.questionsList({
          sectionId: variables.sectionId,
        }),
      });
      toast.success("Question created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create question");
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, data }) =>
      assessmentApi.adminUpdateQuestion(questionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.questionsList(),
      });
      toast.success("Question updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update question");
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId) => assessmentApi.adminDeleteQuestion(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.questionsList(),
      });
      toast.success("Question deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete question");
    },
  });
}

// ==================== OPTIONS ====================

export function useQuestionOptions(questionId, options = {}) {
  return useQuery({
    queryKey: assessmentKeys.optionsList(questionId),
    queryFn: () => assessmentApi.adminGetOptions(questionId),
    enabled: !!questionId && options.enabled !== false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminAssessmentOption(optionId) {
  return useQuery({
    queryKey: assessmentKeys.optionsDetail(optionId),
    queryFn: () => assessmentApi.adminGetOption(optionId),
    enabled: !!optionId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.adminCreateOption(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.optionsList(variables.questionId),
      });
      toast.success("Option created successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create option");
    },
  });
}

export function useUpdateOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ optionId, data }) =>
      assessmentApi.adminUpdateOption(optionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.optionsList() });
      toast.success("Option updated successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update option");
    },
  });
}

export function useDeleteOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (optionId) => assessmentApi.adminDeleteOption(optionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.optionsList() });
      toast.success("Option deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete option");
    },
  });
}

// ==================== RESULT RANGES ====================

export function useAdminResultRanges(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.resultRangesList(params),
    queryFn: () => assessmentApi.adminGetResultRanges(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminResultRange(rangeId) {
  return useQuery({
    queryKey: assessmentKeys.resultRangesDetail(rangeId),
    queryFn: () => assessmentApi.adminGetResultRange(rangeId),
    enabled: !!rangeId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateResultRange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.adminCreateResultRange(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.resultRangesList({
          assessmentPageId: variables.assessmentPageId,
        }),
      });
      toast.success("Result range created successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create result range",
      );
    },
  });
}

export function useUpdateResultRange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rangeId, data }) =>
      assessmentApi.adminUpdateResultRange(rangeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.resultRangesList(),
      });
      toast.success("Result range updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update result range",
      );
    },
  });
}

export function useDeleteResultRange() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rangeId) => assessmentApi.adminDeleteResultRange(rangeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.resultRangesList(),
      });
      toast.success("Result range deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete result range",
      );
    },
  });
}

// ==================== RECOMMENDATIONS ====================

export function useRecommendations(resultRangeId) {
  return useQuery({
    queryKey: assessmentKeys.recommendationsList(resultRangeId),
    queryFn: () => assessmentApi.adminGetRecommendations(resultRangeId),
    enabled: !!resultRangeId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminRecommendation(recommendationId) {
  return useQuery({
    queryKey: assessmentKeys.recommendationsDetail(recommendationId),
    queryFn: () => assessmentApi.adminGetRecommendation(recommendationId),
    enabled: !!recommendationId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateRecommendation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => assessmentApi.adminCreateRecommendation(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.recommendationsList(variables.resultRangeId),
      });
      toast.success("Recommendation created successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create recommendation",
      );
    },
  });
}

export function useUpdateRecommendation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recommendationId, data }) =>
      assessmentApi.adminUpdateRecommendation(recommendationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.recommendationsList(),
      });
      toast.success("Recommendation updated successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update recommendation",
      );
    },
  });
}

export function useDeleteRecommendation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recommendationId) =>
      assessmentApi.adminDeleteRecommendation(recommendationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: assessmentKeys.recommendationsList(),
      });
      toast.success("Recommendation deleted successfully");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to delete recommendation",
      );
    },
  });
}

// ==================== SUBMISSIONS ====================

export function useAdminSubmissions(params = {}) {
  return useQuery({
    queryKey: assessmentKeys.submissionsList(["admin", params]),
    queryFn: () => assessmentApi.adminGetSubmissions(params),
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminSubmission(submissionId) {
  return useQuery({
    queryKey: assessmentKeys.submissionsDetail(["admin", submissionId]),
    queryFn: () => assessmentApi.adminGetSubmission(submissionId),
    enabled: !!submissionId,
    staleTime: 5 * 60 * 1000,
  });
}

// ==================== ANALYTICS ====================

export function useAssessmentAnalytics(params = {}) {
  return useQuery({
    queryKey: ["assessments", "analytics", params],
    queryFn: () => assessmentApi.adminGetAnalytics(params),
    staleTime: 2 * 60 * 1000,
  });
}
