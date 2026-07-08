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
    isEditing,
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
    totalDomains,
  } = useAssessmentBuilder();

  return (
    <AdminAssessmentDomain
      domain={currentDomain}
      domainIndex={currentDomainIndex}
      totalDomains={totalDomains}
      isEditing={isEditing}
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