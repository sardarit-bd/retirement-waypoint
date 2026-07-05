'use client';

import { useParams, useRouter } from 'next/navigation';
import { 
  useAdminAssessmentPage, 
  useUpdateAssessmentPage,
  useAdminAssessmentTypes 
} from '@/features/assessment/hooks/useAssessment';
import { AssessmentPageForm } from '@/features/assessment/components/AssessmentPageForm';
import { Button } from '@/components/ui/button';

export default function EditAssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id;

  const { data, isLoading, error } = useAdminAssessmentPage(pageId);
  const { data: typesData, isLoading: typesLoading } = useAdminAssessmentTypes({
    limit: 100,
    isPublished: 'true',
  });
  const { mutate, isPending } = useUpdateAssessmentPage();

  const assessmentTypes = typesData?.data || [];
  const page = data?.data;

  const handleSubmit = (formData) => {
    mutate(
      { pageId, data: formData },
      {
        onSuccess: () => {
          router.push('/admin/assessments');
        },
      }
    );
  };

  if (isLoading || typesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading assessment...</div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="max-w-3xl mx-auto py-6">
        <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="text-red-500">Failed to load assessment</p>
          <Button
            onClick={() => router.push('/admin/assessments')}
            className="mt-4 rounded-full bg-[#C9A84C] px-6 text-[#1B2B4B] hover:bg-[#D6B45A]"
          >
            Back to Assessments
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Edit Assessment</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Update assessment details</p>
      </div>
      <AssessmentPageForm
        initialData={page}
        isEdit={true}
        assessmentTypes={assessmentTypes}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}