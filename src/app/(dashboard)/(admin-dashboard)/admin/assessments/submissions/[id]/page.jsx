'use client';

import { useParams } from 'next/navigation';
import { AdminSubmissionDetails } from '@/features/assessment/admin/components/AdminSubmissionDetails';

export default function SubmissionDetailsPage() {
  const params = useParams();
  const submissionId = params.id;

  return <AdminSubmissionDetails submissionId={submissionId} />;
}