'use client';

import { useParams } from 'next/navigation';
import { useAssessmentBuilder } from '@/features/assessment/admin/hooks/useAssessmentBuilder';
import { AdminAssessmentDomain } from '@/features/assessment/admin/components/AdminAssessmentDomain';

export default function AssessmentBuilderPage() {
  const params = useParams();
  const assessmentId = params.id;

  const {
    assessment,
    currentDomain,
    currentDomainIndex,
    totalDomains,
    isEditing,
    isSaving,
    isLoading,
    error,
    startEditing,
    saveEditing,
    cancelEditing,
    goToDomain,
    nextDomain,
    previousDomain,
    updateDomain,
    deleteDomain,
    duplicateDomain,
    moveDomain,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    moveQuestion,
    updateReflection,
  } = useAssessmentBuilder(assessmentId);

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin" />
          <p className="text-white/70 text-lg">Loading domains...</p>
        </div>
      </section>
    );
  }

  if (error || !assessment) {
    return (
      <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="text-red-400 text-lg">Failed to load assessment</p>
          <p className="text-white/50 text-sm mt-2">{error?.message || 'Assessment not found.'}</p>
        </div>
      </section>
    );
  }

  return (
    <AdminAssessmentDomain
      assessmentId={assessmentId}
      domain={currentDomain}
      domainIndex={currentDomainIndex}
      totalDomains={totalDomains}
      isEditing={isEditing}
      isSaving={isSaving}
      onUpdateDomain={updateDomain}
      onDeleteDomain={deleteDomain}
      onDuplicateDomain={duplicateDomain}
      onMoveDomain={moveDomain}
      onAddQuestion={addQuestion}
      onUpdateQuestion={updateQuestion}
      onDeleteQuestion={deleteQuestion}
      onDuplicateQuestion={duplicateQuestion}
      onMoveQuestion={moveQuestion}
      onUpdateReflection={updateReflection}
      onNext={nextDomain}
      onPrevious={previousDomain}
      onStartEditing={startEditing}
      onSaveEditing={saveEditing}
      onCancelEditing={cancelEditing}
    />
  );
}