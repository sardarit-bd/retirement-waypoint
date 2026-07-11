'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { usePublicAssessments } from '@/features/assessment/admin/hooks/useAssessmentQueries';
import { useLandingContent } from '@/features/assessment/hooks/useAssessmentLanding';

const AssessmentPage = () => {
  // Load landing content from backend
  const { 
    data: landingResponse, 
    isLoading: isLandingLoading, 
    error: landingError 
  } = useLandingContent();

  // Load assessments from backend
  const { 
    data: assessmentsResponse, 
    isLoading: isAssessmentsLoading, 
    error: assessmentsError 
  } = usePublicAssessments();

  const landing = landingResponse?.data || {};
  const assessments = assessmentsResponse?.data || [];

  const isLoading = isLandingLoading || isAssessmentsLoading;
  const error = landingError || assessmentsError;

  // Loading State
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#C9A84C] animate-spin" />
          <p className="text-white/70 text-lg">Loading assessments...</p>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Failed to load assessments</p>
          <p className="text-white/50 text-sm">{error.message || 'Please try again later.'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-60">
      <div className="mx-auto max-w-6xl text-center">
        {/* Hero Section - 100% Backend Driven */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">
          {landing.badge || 'Retirement Waypoint'}
        </p>

        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          {landing.title || 'Choose Your Assessment'}
        </h1>

        <p className="mx-auto mb-4 max-w-2xl text-white/70">
          {landing.subtitle || 'Select the assessment that best matches your current retirement stage.'}
        </p>

        <p className="mx-auto mb-12 max-w-4xl text-base leading-relaxed text-white/70">
          {landing.description || 
            'Each assessment draws on psychological research and includes reflection ' +
            'questions that will be analyzed alongside the assessment items to ' +
            'provide a complete and transparent measure of your current retirement ' +
            'readiness and overall status.'
          }
        </p>

        {/* Assessment Cards */}
        {assessments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No assessments available at this time.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {assessments.map((assessment) => (
              <Link
                key={assessment.slug}
                href={`/assessment/${assessment.slug}`}
                className="cursor-pointer rounded-3xl border border-white/10 bg-white/10 p-7 text-left shadow-xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15"
              >
                <h2 className="mb-3 text-2xl font-bold text-white capitalize">
                  {assessment.slug || 
                   assessment.hero?.title || 
                   assessment.slug}
                </h2>

                <p className="mb-6 text-white/65">
                  {assessment.hero?.subtitle || 
                   assessment.introduction?.subtitle || ''}
                </p>

                <span className="font-semibold text-[#C9A84C]">
                  Start Assessment →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AssessmentPage;