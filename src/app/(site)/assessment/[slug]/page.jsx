'use client';

import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import AssessmentForm from '@/components/assessment/AssessmentForm';
import { usePublicAssessment } from '@/features/assessment/admin/hooks/useAssessmentQueries';

const AssessmentDetailPage = () => {
  const params = useParams();
  const slug = params.slug;

  const { data: response, isLoading, error } = usePublicAssessment(slug);
  const assessment = response?.data || null;

  // Loading State
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#C9A84C] animate-spin" />
          <p className="text-white/70 text-lg">Loading assessment...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (error || !assessment) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Assessment not found</p>
          <p className="text-white/50 text-sm">
            {error?.message || 'The assessment you are looking for does not exist.'}
          </p>
          <Link
            href="/assessment"
            className="inline-block mt-4 text-[#C9A84C] hover:text-[#D6B45A] transition-colors"
          >
            ← Back to all assessments
          </Link>
        </div>
      </section>
    );
  }

  return <AssessmentForm assessment={assessment} />;
};

export default AssessmentDetailPage;