'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useAssessmentAnalytics } from '@/features/assessment/hooks/useAssessment';
import { AdminAssessmentAnalytics } from '@/features/assessment/components/AdminAssessmentAnalytics';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';

export default function AdminAssessmentAnalyticsPage() {
  const { data, isLoading, error, refetch } = useAssessmentAnalytics();

  if (error) {
    return (
      <div className="py-6">
        <DashboardErrorState error={error} refetch={refetch} />
      </div>
    );
  }

  const analytics = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
            <BarChart3 className="h-4 w-4" />
            Assessment Analytics
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-[#1B2B4B]">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#1B2B4B]/60">
            Overview of assessment performance and user engagement
          </p>
        </div>
      </div>

      {/* Analytics Content */}
      <AdminAssessmentAnalytics analytics={analytics} isLoading={isLoading} />
    </motion.div>
  );
}