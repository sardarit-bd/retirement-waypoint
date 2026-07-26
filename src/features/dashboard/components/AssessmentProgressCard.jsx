'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardCheck, TrendingUp, TrendingDown, MinusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScoreChangeBadge = ({ direction, change }) => {
  if (direction === 'improved') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
        <TrendingUp className="h-3 w-3" />
        +{change}%
      </span>
    );
  }
  if (direction === 'declined') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-semibold text-red-400">
        <TrendingDown className="h-3 w-3" />
        {change}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-[#1B2B4B]/40">
      <MinusIcon className="h-3 w-3" />
      No change
    </span>
  );
};

export function AssessmentProgressCard({ assessment }) {
  const hasAssessment = assessment?.hasAssessment || false;
  const latestScore = assessment?.latestScore ?? null;
  const previousScore = assessment?.previousScore ?? null;
  const scoreChange = assessment?.scoreChange ?? null;
  const scoreChangeDirection = assessment?.scoreChangeDirection || null;
  const latestSubmissionId = assessment?.latestSubmissionId || null;
  const assessmentSlug = assessment?.assessmentSlug || null;

  if (!hasAssessment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-[#C9A84C]/10 p-2">
            <ClipboardCheck className="h-5 w-5 text-[#C9A84C]" />
          </div>
          <h2 className="text-lg font-semibold text-[#1B2B4B]">Assessment</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <p className="text-[#1B2B4B]/60">Take your first assessment</p>
          <Button
            asChild
            className="mt-4 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
          >
            <Link href="/assessment">
              Start Assessment
              <TrendingUp className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-3xl border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-full bg-[#C9A84C]/10 p-2">
          <ClipboardCheck className="h-5 w-5 text-[#C9A84C]" />
        </div>
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Assessment</h2>
      </div>

      <div className="flex flex-col items-center">
        {/* Latest Score */}
        <p className="text-5xl font-bold text-[#C9A84C]">{latestScore}%</p>
        <p className="text-sm text-[#1B2B4B]/60 mt-1">Latest Score</p>

        {/* Previous Score Comparison */}
        {previousScore !== null && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-[#1B2B4B]/50">
              Previous: <span className="font-semibold text-[#1B2B4B]/80">{previousScore}%</span>
            </span>
            <ScoreChangeBadge direction={scoreChangeDirection} change={scoreChange} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5 w-full">
          <Button
            asChild
            className="flex-1 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all text-sm"
          >
            <Link href={`/assessment/result/${latestSubmissionId}`}>
              View Result
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-full border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] text-sm"
          >
            <Link href={`/assessment/${assessmentSlug}`}>
              Retake Assessment
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}