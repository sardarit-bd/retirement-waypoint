'use client';

import { AdminAssessmentIntroduction } from '@/features/assessment/components/AdminAssessmentIntroduction';
import { useParams, useRouter } from 'next/navigation';

export default function AssessmentIntroductionPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params.id;

  const handleBeginAssessment = () => {
    router.push(`/admin/assessments/${assessmentId}/builder`);
  };

  return <AdminAssessmentIntroduction onBegin={handleBeginAssessment} />;
}