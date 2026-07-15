'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, CalendarDays } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const StatCard = ({ icon: Icon, label, value, className = '' }) => (
  <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className={`text-2xl font-bold tracking-tight ${className}`}>{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-primary/5">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatSkeleton = () => (
  <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
    </CardContent>
  </Card>
);

export const AssessmentParticipantsStats = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>
    );
  }

  const stats = data || {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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