'use client';

import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

const getResultColor = (color) => {
  return color || '#534AB7';
};

const ResultBadge = ({ title, color }) => (
  <Badge
    className="text-white border-0 whitespace-nowrap"
    style={{ backgroundColor: getResultColor(color) }}
  >
    {title}
  </Badge>
);

const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-3 border-b">
        <Skeleton className="h-5 w-20 sm:w-32" />
        <Skeleton className="h-5 w-24 sm:w-40" />
        <Skeleton className="h-5 w-16 sm:w-24" />
        <Skeleton className="h-5 w-12 sm:w-16" />
        <Skeleton className="h-5 w-16 sm:w-20" />
        <Skeleton className="h-5 w-16 sm:w-24" />
        <Skeleton className="h-8 w-12 sm:w-16" />
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
  isLoading,
  error,
}) => {
  let submissions = [];
  let meta = {};

  console.log("ParticipantsTable:", data);

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
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Participant</TableHead>
              <TableHead className="hidden sm:table-cell whitespace-nowrap">Email</TableHead>
              <TableHead className="hidden md:table-cell whitespace-nowrap">Assessment</TableHead>
              <TableHead className="whitespace-nowrap text-center">Score</TableHead>
              <TableHead className="hidden lg:table-cell whitespace-nowrap">Result</TableHead>
              <TableHead className="hidden xl:table-cell whitespace-nowrap">Date</TableHead>
              <TableHead className="hidden sm:table-cell whitespace-nowrap text-center">Status</TableHead>
              <TableHead className="whitespace-nowrap text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission._id || submission.id}>
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
                <TableCell className="hidden md:table-cell whitespace-nowrap max-w-[120px]">
                  <span className="truncate block" title={submission.assessmentSlug || '—'}>
                    {submission.assessmentSlug || '—'}
                  </span>
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <span className="font-semibold">
                    {submission.overallScore?.toFixed(0) || 0}%
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell whitespace-nowrap">
                  <ResultBadge
                    title={submission.resultRange?.title || '—'}
                    color={submission.resultRange?.color}
                  />
                </TableCell>
                <TableCell className="hidden xl:table-cell whitespace-nowrap">
                  {submission.completedAt ? formatDate(submission.completedAt) : '—'}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-center whitespace-nowrap">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Link href={`/admin/assessment-participants/${submission._id || submission.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3">
                      <Eye className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                  </Link>
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
  );
};