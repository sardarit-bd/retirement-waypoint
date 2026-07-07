'use client';

import { ActivityTimelineCard } from '@/features/dashboard/components/ActivityTimelineCard';
import { AssessmentProgressCard } from '@/features/dashboard/components/AssessmentProgressCard';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';
import { DashboardSkeleton } from '@/features/dashboard/components/DashboardSkeleton';
import { QuickActionsCard } from '@/features/dashboard/components/QuickActionsCard';
import { RecentBooksCard } from '@/features/dashboard/components/RecentBooksCard';
import { RecentOrdersCard } from '@/features/dashboard/components/RecentOrdersCard';
import { RecommendationsCard } from '@/features/dashboard/components/RecommendationsCard';
import { StatsGrid } from '@/features/dashboard/components/StatsGrid';
import { WelcomeCard } from '@/features/dashboard/components/WelcomeCard';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { useSession } from '@/hooks/useSession';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { session, isLoading: isSessionLoading } = useSession();
  const { data, isLoading, error, refetch } = useDashboard({
    enabled: !!session,
  });

  if (isSessionLoading || isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <DashboardErrorState error={error} refetch={refetch} />;
  }

  const {
    stats,
    recentBooks = [],
    recentOrders = [],
    activities = [],
    assessment,
    recommendations = [],
  } = data || {};

  const userName = session?.user?.firstName || session?.user?.name || 'there';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <WelcomeCard userName={userName} />

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Books */}
          <RecentBooksCard books={recentBooks} />

          {/* Recent Orders */}
          <RecentOrdersCard orders={recentOrders} />

          {/* Activity Timeline */}
          <ActivityTimelineCard activities={activities} />
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Assessment Progress */}
          <AssessmentProgressCard assessment={assessment} />

          {/* Quick Actions */}
          <QuickActionsCard />

          {/* Recommendations */}
          <RecommendationsCard recommendations={recommendations} />
        </div>
      </div>
    </motion.div>
  );
}
