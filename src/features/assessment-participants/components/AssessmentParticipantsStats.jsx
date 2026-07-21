'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, CalendarDays } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const StatCard = ({ icon: Icon, label, value, className = '' }) => (
  <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1 truncate">{label}</p>
          <p className={`text-xl sm:text-2xl font-bold tracking-tight truncate ${className}`}>{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-primary/5 shrink-0 ml-2">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatSkeleton = () => (
  <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 sm:h-4 w-16 sm:w-20" />
          <Skeleton className="h-6 sm:h-8 w-12 sm:w-16" />
        </div>
        <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg shrink-0" />
      </div>
    </CardContent>
  </Card>
);

export const AssessmentParticipantsStats = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(3)].map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  const stats = data || {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      <StatCard
        icon={Users}
        label="Total Participants"
        value={stats.total?.toLocaleString() ?? 0}
        className="text-primary"
      />
      <StatCard
        icon={Calendar}
        label="Today's Submissions"
        value={stats.today?.toLocaleString() ?? 0}
        className="text-emerald-600"
      />
      <StatCard
        icon={CalendarDays}
        label="This Month"
        value={stats.thisMonth?.toLocaleString() ?? 0}
        className="text-amber-600"
      />
    </div>
  );
};