'use client';

import { useParams } from 'next/navigation';
import { useAdminSubmission } from '@/features/assessment/hooks/useAssessment';
import { AdminSubmissionDetails } from '@/features/assessment/components/AdminSubmissionDetails';

export default function AdminSubmissionDetailsPage() {
  const params = useParams();
  const submissionId = params.id;

  const { data, isLoading, error } = useAdminSubmission(submissionId);

  if (error) {
    return (
      <div className="py-6">
        <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
          <p className="text-red-500">Failed to load submission details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <AdminSubmissionDetails submission={data?.data} isLoading={isLoading} />
    </div>
  );
}