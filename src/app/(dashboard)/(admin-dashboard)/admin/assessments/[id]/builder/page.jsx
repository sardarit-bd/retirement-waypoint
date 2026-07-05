/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useAdminAssessmentPage,
  useAdminAssessmentSections,
  useUpdateAssessmentPage,
} from '@/features/assessment/hooks/useAssessment';
import { BuilderSidebar } from '@/features/assessment/components/BuilderSidebar';
import { BasicInfoStep } from '@/features/assessment/components/builder/BasicInfoStep';
import { SectionsStep } from '@/features/assessment/components/builder/SectionsStep';
import { QuestionsStep } from '@/features/assessment/components/builder/QuestionsStep';
import { ResultRangesStep } from '@/features/assessment/components/builder/ResultRangesStep';
import { RecommendationsStep } from '@/features/assessment/components/builder/RecommendationsStep';
import { useAdminAssessmentTypes } from '@/features/assessment/hooks/useAssessment';

const STEPS = ['basic', 'sections', 'questions', 'ranges', 'recommendations', 'preview'];

export default function AssessmentBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id;

  const [currentStep, setCurrentStep] = useState('basic');
  const [completedSteps, setCompletedSteps] = useState([]);

  const { data: pageData, isLoading: pageLoading } = useAdminAssessmentPage(pageId);
  const { data: sectionsData, isLoading: sectionsLoading } = useAdminAssessmentSections({
    assessmentPageId: pageId,
    isActive: 'true',
  });
  const { data: typesData } = useAdminAssessmentTypes({ limit: 100 });

  const updatePage = useUpdateAssessmentPage();
  const page = pageData?.data;
  const sections = sectionsData?.data || [];

  // Load assessment type name
  const assessmentType = typesData?.data?.find(
    (t) => t._id === page?.assessmentTypeId
  );

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleUpdatePage = (data) => {
    updatePage.mutate({ pageId, data });
  };

  const handleNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  // Mark step as completed when data is loaded
  useEffect(() => {
    if (page && !completedSteps.includes('basic')) {
      setCompletedSteps((prev) => [...prev, 'basic']);
    }
  }, [page]);

  // Mark sections step as completed when sections exist
  useEffect(() => {
    if (sections.length > 0 && !completedSteps.includes('sections')) {
      setCompletedSteps((prev) => [...prev, 'sections']);
    }
  }, [sections]);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading assessment...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
        <p className="text-red-500">Assessment not found</p>
        <Button
          onClick={() => router.push('/admin/assessments')}
          className="mt-4 rounded-full bg-[#C9A84C] px-6 text-[#1B2B4B] hover:bg-[#D6B45A]"
        >
          Back to Assessments
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/assessments')}
          className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#1B2B4B]">{page.title}</h1>
          <p className="text-sm text-[#1B2B4B]/60">
            {assessmentType?.name || 'Uncategorized'} • {page.isPublished ? 'Published' : 'Draft'}
          </p>
        </div>
      </div>

      {/* Builder Layout */}
      <div className="flex gap-8">
        <BuilderSidebar
          currentStep={currentStep}
          onStepChange={handleStepChange}
          completedSteps={completedSteps}
        />

        <div className="flex-1 min-w-0">
          <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            {currentStep === 'basic' && (
              <BasicInfoStep
                page={page}
                onUpdate={handleUpdatePage}
                onNext={handleNext}
              />
            )}

            {currentStep === 'sections' && (
              <SectionsStep
                pageId={pageId}
                sections={sections}
                isLoading={sectionsLoading}
              />
            )}

            {currentStep === 'questions' && (
              <QuestionsStep
                pageId={pageId}
                sections={sections}
                isLoading={sectionsLoading}
              />
            )}

            {currentStep === 'ranges' && (
              <ResultRangesStep pageId={pageId} />
            )}

            {currentStep === 'recommendations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1B2B4B]">Recommendations</h2>
                  <p className="text-sm text-[#1B2B4B]/60">
                    Manage recommendations for each result range
                  </p>
                </div>
                {/* Recommendations are managed inside each result range */}
                <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/30 p-6 text-center">
                  <p className="text-[#1B2B4B]/60">
                    Expand a result range above to manage its recommendations.
                  </p>
                  <p className="text-sm text-[#1B2B4B]/40 mt-1">
                    Go to <strong>Result Ranges</strong> step and expand any range to see recommendations.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 'preview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1B2B4B]">Preview</h2>
                <p className="text-sm text-[#1B2B4B]/60">Coming soon...</p>
                <div className="rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF]/30 p-8 text-center">
                  <p className="text-[#1B2B4B]/60">Assessment preview will be available here.</p>
                  <p className="text-sm text-[#1B2B4B]/40 mt-1">
                    You will be able to see how the assessment looks to users.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {currentStep !== 'basic' && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                className="rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF]"
              >
                Previous
              </Button>
              <span className="text-sm text-[#1B2B4B]/40">
                Step {STEPS.indexOf(currentStep) + 1} of {STEPS.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}