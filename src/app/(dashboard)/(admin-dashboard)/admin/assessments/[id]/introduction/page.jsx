'use client';

import { useParams, useRouter } from 'next/navigation';
import { AdminAssessmentIntroduction } from '@/features/assessment/admin/components/AdminAssessmentIntroduction';

export default function AssessmentIntroductionPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params.id;

  const handleBegin = () => {
    router.push(`/admin/assessments/${assessmentId}/builder`);
  };

  return <AdminAssessmentIntroduction assessmentId={assessmentId} onBegin={handleBegin} />;
}