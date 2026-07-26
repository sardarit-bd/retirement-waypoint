'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Target } from 'lucide-react';
import { useAssessmentParticipant } from '@/features/assessment-participants';
import { AssessmentDetailContent } from '@/features/assessment-participants/components/AssessmentDetailContent';

const DetailSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-8 w-48" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export default function AssessmentParticipantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data, isLoading, error } = useAssessmentParticipant(id);
  const submission = data;

  if (isLoading) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="p-3 sm:p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-red-50 mb-4">
            <Target className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Participant Not Found</h3>
          <p className="text-sm text-gray-500">
            {error?.message || 'The participant you are looking for does not exist.'}
          </p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="h-9 px-3 border border-gray-200 cursor-pointer shrink-0"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 ml-auto shrink-0">
          Completed
        </Badge>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Participant Details</h1>

      <AssessmentDetailContent submission={submission} />
    </div>
  );
}