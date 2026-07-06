'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CreateAssessmentPage() {
  const router = useRouter();

  return (
    <div className="py-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/assessments')}
          className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Assessments
        </Button>
        <h1 className="mt-4 text-3xl font-bold text-[#1B2B4B]">Create Assessment</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Create a new retirement readiness assessment</p>
      </div>

      {/* Assessment creation UI will be added here */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-12 text-center shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <p className="text-[#1B2B4B]/60">Assessment creation form coming soon...</p>
      </div>
    </div>
  );
}