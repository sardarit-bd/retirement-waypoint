'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, AlertCircle, TrendingUp, TrendingDown, MinusIcon } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';
import { AssessmentParticipantsHistoryDrawer } from './AssessmentParticipantsHistoryDrawer';

const getResultColor = (color) => color || '#534AB7';

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};

const ScoreChangeBadge = ({ direction, change }) => {
  if (direction === 'improved') {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
        <TrendingUp className="h-3 w-3" />
        +{Math.abs(change)}
      </span>
    );
  }
  if (direction === 'declined') {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-red-500">
        <TrendingDown className="h-3 w-3" />
        -{Math.abs(change)}
      </span>
    );
  }
  if (change !== null && change !== undefined) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-gray-400">
        <MinusIcon className="h-3 w-3" />
        0
      </span>
    );
  }
  return <span className="text-xs text-gray-300">—</span>;
};

const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-3 border-b">
        <Skeleton className="h-5 w-20 sm:w-32" />
        <Skeleton className="h-5 w-24 sm:w-40" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-12 sm:w-16" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16 sm:w-24" />
        <Skeleton className="h-5 w-16 sm:w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="p-4 rounded-full bg-gray-50 mb-4">
      <AlertCircle className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">No Participants Found</h3>
    <p className="text-sm text-gray-500 max-w-sm">
      No one has completed any assessments yet. Check back later for participant data.
    </p>
  </div>
);

export const AssessmentParticipantsTable = ({
  data,
  meta: metaProp,
  isLoading,
  error,
}) => {
  const [historyEmail, setHistoryEmail] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  let submissions = [];
  let meta = metaProp || {};

  if (data) {
    if (Array.isArray(data.data)) {
      submissions = data.data;
      meta = data.meta || {};
    }
    else if (data.data && Array.isArray(data.data.data)) {
      submissions = data.data.data;
      meta = data.data.meta || {};
    }
    else if (Array.isArray(data)) {
      submissions = data;
    }
    else if (data.data && data.data.submissions && Array.isArray(data.data.submissions)) {
      submissions = data.data.submissions;
      meta = data.data.pagination || data.meta || {};
    }
    else if (data.submissions && Array.isArray(data.submissions)) {
      submissions = data.submissions;
      meta = data.pagination || data.meta || {};
    }
  }

  const handleViewHistory = (email) => {
    setHistoryEmail(email);
    setDrawerOpen(true);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 rounded-full bg-red-50 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Error Loading Data</h3>
        <p className="text-sm text-gray-500">{error.message || 'Failed to load participants'}</p>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Participant</TableHead>
                <TableHead className="hidden sm:table-cell whitespace-nowrap">Email</TableHead>
                <TableHead className="whitespace-nowrap text-center">Attempts</TableHead>
                <TableHead className="whitespace-nowrap text-center">Latest Score</TableHead>
                <TableHead className="hidden md:table-cell whitespace-nowrap">Assessment Type</TableHead>
                <TableHead className="hidden md:table-cell whitespace-nowrap">Result</TableHead>
                <TableHead className="hidden lg:table-cell whitespace-nowrap text-center">Trend</TableHead>
                <TableHead className="hidden xl:table-cell whitespace-nowrap">Latest Date</TableHead>
                <TableHead className="hidden sm:table-cell whitespace-nowrap text-center">Status</TableHead>
                <TableHead className="whitespace-nowrap text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission._id || submission.latestSubmissionId}>
                  <TableCell className="font-medium whitespace-nowrap max-w-[120px] sm:max-w-none">
                    <span className="truncate block" title={submission.participant?.name || '—'}>
                      {submission.participant?.name || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell whitespace-nowrap max-w-[150px]">
                    <a
                      href={`mailto:${submission.participant?.email}`}
                      className="text-primary hover:underline truncate block"
                      title={submission.participant?.email || '—'}
                    >
                      {submission.participant?.email || '—'}
                    </a>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    <Badge variant="secondary" className="font-mono text-xs">
                      {submission.totalAttempts || 1}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    <span className={`font-bold ${getScoreColor(submission.latestScore || 0)}`}>
                      {submission.latestScore?.toFixed(0) || 0}%
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell whitespace-nowrap max-w-[140px]">
                    <span className="truncate block" title={submission.latestAssessmentType || submission.assessmentType || submission.latestAssessmentSlug || '—'}>
                      {submission.latestAssessmentType || submission.assessmentType || submission.latestAssessmentSlug || '—'}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell whitespace-nowrap max-w-[120px]">
                    {submission.latestResultRange?.title ? (
                      <Badge
                        className="text-white border-0 whitespace-nowrap text-xs px-2"
                        style={{ backgroundColor: getResultColor(submission.latestResultRange?.color) }}
                      >
                        <span className="truncate block max-w-[100px]" title={submission.latestResultRange.title}>
                          {submission.latestResultRange.title}
                        </span>
                      </Badge>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-center whitespace-nowrap">
                    <ScoreChangeBadge direction={submission.scoreChangeDirection} change={submission.scoreChange} />
                  </TableCell>
                  <TableCell className="hidden xl:table-cell whitespace-nowrap text-sm text-gray-500">
                    {submission.latestCompletedAt ? formatDate(submission.latestCompletedAt) : '—'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-center whitespace-nowrap">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap">
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 sm:px-3 cursor-pointer"
                      onClick={() => handleViewHistory(submission.participant?.email)}
                    >
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="border-t px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            Showing {submissions.length} of {meta.total || submissions.length || 0} participants
          </span>
          <span>
            Page {meta.page || 1} of {meta.pages || 1}
          </span>
        </div>
      </div>

      <AssessmentParticipantsHistoryDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        email={historyEmail}
      />
    </>
  );
};
