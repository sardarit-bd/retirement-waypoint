'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const cardClass = 'rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

export function AdminAssessmentAnalytics({ analytics, isLoading }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-[#C9A84C]';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (score >= 60) return 'bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20';
    if (score >= 40) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-red-500/10 text-red-600 border-red-500/20';
  };

  if (isLoading) {
    return <AdminAssessmentAnalyticsSkeleton />;
  }

  if (!analytics) {
    return <AdminAssessmentAnalyticsEmpty />;
  }

  const {
    totalSubmissions = 0,
    completedSubmissions = 0,
    averageScore = 0,
    scoreDistribution = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 },
    submissions = [],
  } = analytics;

  const completionRate = totalSubmissions > 0 
    ? Math.round((completedSubmissions / totalSubmissions) * 100) 
    : 0;

  // Calculate distribution percentages
  const distributionTotal = Object.values(scoreDistribution).reduce((a, b) => a + b, 0);
  const getDistributionPercentage = (count) => {
    if (distributionTotal === 0) return 0;
    return Math.round((count / distributionTotal) * 100);
  };

  const distributionColors = {
    '0-20': 'bg-red-500',
    '21-40': 'bg-orange-500',
    '41-60': 'bg-yellow-500',
    '61-80': 'bg-[#C9A84C]',
    '81-100': 'bg-emerald-500',
  };

  const distributionLabels = {
    '0-20': '0-20%',
    '21-40': '21-40%',
    '41-60': '41-60%',
    '61-80': '61-80%',
    '81-100': '81-100%',
  };

  // Stats cards
  const stats = [
    {
      label: 'Total Submissions',
      value: totalSubmissions,
      icon: FileText,
      color: 'text-[#C9A84C]',
      bg: 'bg-[#C9A84C]/10',
    },
    {
      label: 'Completed',
      value: completedSubmissions,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Average Score',
      value: `${Math.round(averageScore)}%`,
      icon: Award,
      color: getScoreColor(averageScore),
      bg: 'bg-[#C9A84C]/10',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: completionRate >= 70 ? 'text-emerald-500' : completionRate >= 40 ? 'text-[#C9A84C]' : 'text-red-500',
      bg: 'bg-[#C9A84C]/10',
    },
  ];

  // Recent submissions (latest 5)
  const recentSubmissions = submissions.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`${cardClass} p-6 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1B2B4B]/60">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-[#1B2B4B]">{stat.value}</p>
                </div>
                <div className={`rounded-full ${stat.bg} p-3 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Score Distribution */}
        <div className={`${cardClass} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1B2B4B]">Score Distribution</h3>
            <BarChart3 className="h-5 w-5 text-[#C9A84C]" />
          </div>

          {distributionTotal === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-sm text-[#1B2B4B]/60">No data available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(scoreDistribution).map(([range, count]) => {
                const percentage = getDistributionPercentage(count);
                return (
                  <div key={range}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[#1B2B4B]/70">{distributionLabels[range]}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#1B2B4B]">{count}</span>
                        <span className="text-xs text-[#1B2B4B]/40">{percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#F8F5EF] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${distributionColors[range]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div className={`${cardClass} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1B2B4B]">Recent Submissions</h3>
            <Clock className="h-5 w-5 text-[#C9A84C]" />
          </div>

          {recentSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-sm text-[#1B2B4B]/60">No recent submissions</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <motion.div
                  key={submission._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-xl bg-[#F8F5EF] p-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1B2B4B] truncate">
                        {submission.userId?.name || 'Unknown User'}
                      </span>
                      <Badge className={cn('text-[10px] border', getScoreBadge(submission.overallScore || 0))}>
                        {submission.overallScore || 0}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#1B2B4B]/40">
                      <span>{submission.assessmentPageId?.title || 'Unknown Assessment'}</span>
                      <span>•</span>
                      <span>{formatDate(submission.completedAt)}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: submission.resultId?.color || '#C9A84C',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary Row */}
      <div className={`${cardClass} p-6`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="text-sm text-[#1B2B4B]/60">Total Assessments</p>
            <p className="mt-1 text-2xl font-bold text-[#1B2B4B]">
              {submissions.length > 0 
                ? new Set(submissions.map(s => s.assessmentPageId?._id)).size 
                : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#1B2B4B]/60">Unique Users</p>
            <p className="mt-1 text-2xl font-bold text-[#1B2B4B]">
              {submissions.length > 0 
                ? new Set(submissions.map(s => s.userId?._id || s.userId)).size 
                : 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#1B2B4B]/60">Average Score</p>
            <p className={cn('mt-1 text-2xl font-bold', getScoreColor(averageScore))}>
              {Math.round(averageScore)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-[#1B2B4B]/60">Completion Rate</p>
            <p className={cn('mt-1 text-2xl font-bold', completionRate >= 70 ? 'text-emerald-500' : completionRate >= 40 ? 'text-[#C9A84C]' : 'text-red-500')}>
              {completionRate}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Component
function AdminAssessmentAnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`${cardClass} p-6 animate-pulse`}>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-11 w-11 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={`${cardClass} p-6 animate-pulse`}>
            <div className="flex items-center justify-between mb-6">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-5 bg-gray-200 rounded" />
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, j) => (
                <div key={j}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-12 bg-gray-200 rounded" />
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Skeleton */}
      <div className={`${cardClass} p-6 animate-pulse`}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="h-4 w-24 mx-auto bg-gray-200 rounded" />
              <div className="h-8 w-16 mx-auto bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function AdminAssessmentAnalyticsEmpty() {
  return (
    <div className={`${cardClass} p-12 text-center`}>
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <BarChart3 className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-[#1B2B4B]">No Analytics Data</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        Analytics will appear once users start submitting assessments.
      </p>
    </div>
  );
}