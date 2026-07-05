'use client';

import { useRouter } from 'next/navigation';
import { useCreateAssessmentPage, useAdminAssessmentTypes } from '@/features/assessment/hooks/useAssessment';
import { AssessmentPageForm } from '@/features/assessment/components/AssessmentPageForm';
import { Button } from '@/components/ui/button';

export default function CreateAssessmentPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateAssessmentPage();
  
  // Fetch assessment types with better error handling
  const { 
    data: typesData, 
    isLoading: typesLoading, 
    error: typesError,
    refetch: refetchTypes,
  } = useAdminAssessmentTypes({
    limit: 100,
    isPublished: 'true',
  });

  const assessmentTypes = typesData?.data || [];

  const handleSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        const pageId = response.data?._id || response.data?.data?._id;
        if (pageId) {
          router.push(`/admin/assessments/${pageId}/builder`);
        } else {
          router.push('/admin/assessments');
        }
      },
    });
  };

  // Show loading state
  if (typesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading assessment types...</div>
      </div>
    );
  }

  // Show error state
  if (typesError) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="text-red-500">Failed to load assessment types</p>
          <p className="text-sm text-[#1B2B4B]/60 mt-2">
            {typesError?.response?.data?.message || 'Please try again'}
          </p>
          <Button
            onClick={() => refetchTypes()}
            className="mt-4 rounded-full bg-[#C9A84C] px-6 text-[#1B2B4B] hover:bg-[#D6B45A]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Create New Assessment</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Create a new retirement readiness assessment</p>
      </div>
      <AssessmentPageForm
        assessmentTypes={assessmentTypes}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}