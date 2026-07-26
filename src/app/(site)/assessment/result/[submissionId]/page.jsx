'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { useSession } from '@/hooks/useSession';
import ResultsPage from '@/components/assessment/ResultsPage';
import { getSubmissionById } from '@/features/assessment/api/assessment.api';
import { useEffect } from 'react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        backdropColor: 'transparent',
        color: '#94a3b8',
        font: { size: 10 },
      },
      grid: { color: 'rgba(255,255,255,0.12)' },
      angleLines: { color: 'rgba(255,255,255,0.12)' },
      pointLabels: {
        color: '#ffffff',
        font: { size: 11 },
      },
    },
  },
};

const AssessmentResultPage = () => {
  const params = useParams();
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();
  const submissionId = params.submissionId;

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push('/auth');
    }
  }, [session, isSessionLoading, router]);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['submission', submissionId],
    queryFn: () => getSubmissionById(submissionId),
    enabled: !!submissionId && !!session,
  });

  if (isSessionLoading || isLoading) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-[#C9A84C] animate-spin" />
          <p className="text-white/70 text-lg">Loading result...</p>
        </div>
      </section>
    );
  }

  if (error || !response?.data) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Result not found</p>
          <p className="text-white/50 text-sm">
            {error?.message || 'The assessment result could not be loaded.'}
          </p>
          <Link
            href="/dashboard"
            className="inline-block mt-4 text-[#C9A84C] hover:text-[#D6B45A] transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </section>
    );
  }

  const submission = response.data;
  const assessment = submission.assessmentId || {};
  const domains = assessment.domains || [];

  // Build submissionResult from the stored submission data
  const submissionResult = {
    overallScore: submission.overallScore,
    domainScores: submission.domainScores,
    resultRange: submission.resultRange,
    recommendations: submission.recommendations,
  };

  // Build chart data from domainScores percentages
  const chartData = {
    labels: domains.map((item) => item.label),
    datasets: [
      {
        data: submission.domainScores.map((ds) => ds.percentage || 0),
        backgroundColor: `${assessment.accent || '#C9A84C'}22`,
        borderColor: assessment.accent || '#C9A84C',
        borderWidth: 2,
        pointBackgroundColor: submission.domainScores.map((ds) => {
          const domain = domains.find((d) => d.key === ds.domainKey || d.id === ds.domainId);
          return domain?.color || '#C9A84C';
        }),
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  // Simple getDomainScore for the fallback (shouldn't be needed since we have domainScores)
  const getDomainScore = () => 0;

  return (
    <ResultsPage
      user={submission.participant || { name: 'User', email: '' }}
      assessment={assessment}
      domains={domains}
      submissionResult={submissionResult}
      previousSubmission={submission.previousSubmission || null}
      overallScore={submission.overallScore}
      getDomainScore={getDomainScore}
      chartData={chartData}
      chartOptions={chartOptions}
      onStartOver={() => router.push('/assessment')}
    />
  );
};

export default AssessmentResultPage;
