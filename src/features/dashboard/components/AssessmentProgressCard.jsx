'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AssessmentProgressCard({ assessment }) {
  const score = assessment?.score || 0;
  const progress = assessment?.progress || 0;
  const hasAssessment = assessment?.hasAssessment || false;

  // Calculate stroke dasharray for progress ring
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
            <Link href="/dashboard/assessments">
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
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
        <h2 className="text-lg font-semibold text-[#1B2B4B]">Assessment Progress</h2>
      </div>

      <div className="flex flex-col items-center">
        {/* Progress Ring */}
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90">
            {/* Background circle */}
            <circle
              className="text-[#1B2B4B]/10"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="64"
              cy="64"
            />
            {/* Progress circle */}
            <circle
              className="text-[#C9A84C] transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="64"
              cy="64"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-[#1B2B4B]">{progress}%</span>
            <span className="text-xs text-[#1B2B4B]/60">Complete</span>
          </div>
        </div>

        {/* Score */}
        <div className="mt-4 text-center">
          <p className="text-sm text-[#1B2B4B]/60">Retirement Readiness Score</p>
          <p className="text-2xl font-bold text-[#C9A84C]">{score}/100</p>
        </div>

        {/* Button */}
        <Button
          asChild
          className="mt-4 w-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
        >
          <Link href="/dashboard/assessments">
            Continue Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}