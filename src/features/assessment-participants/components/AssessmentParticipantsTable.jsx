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
    className="text-white border-0"
    style={{ backgroundColor: getResultColor(color) }}
  >
    {title}
  </Badge>
);

const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-3 border-b">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-16" />
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
    // Check if data.data is an array (direct response)
    if (Array.isArray(data.data)) {
      submissions = data.data;
      meta = data.meta || {};
    } 
    // Check if data.data.data is an array (nested response)
    else if (data.data && Array.isArray(data.data.data)) {
      submissions = data.data.data;
      meta = data.data.meta || {};
    }
    // Check if data itself is an array
    else if (Array.isArray(data)) {
      submissions = data;
    }
    // Check if data has a data property that's an object with data array
    else if (data.data && data.data.submissions && Array.isArray(data.data.submissions)) {
      submissions = data.data.submissions;
      meta = data.data.pagination || data.meta || {};
    }
    // Check if data has submissions directly
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
              <TableHead className="whitespace-nowrap">Email</TableHead>
              <TableHead className="whitespace-nowrap">Assessment</TableHead>
              <TableHead className="whitespace-nowrap text-center">Score</TableHead>
              <TableHead className="whitespace-nowrap">Result</TableHead>
              <TableHead className="whitespace-nowrap">Date</TableHead>
              <TableHead className="whitespace-nowrap text-center">Status</TableHead>
              <TableHead className="whitespace-nowrap text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission._id || submission.id}>
                <TableCell className="font-medium whitespace-nowrap">
                  {submission.participant?.name || '—'}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <a
                    href={`mailto:${submission.participant?.email}`}
                    className="text-primary hover:underline"
                  >
                    {submission.participant?.email || '—'}
                  </a>
                </TableCell>
                <TableCell className="whitespace-nowrap capitalize">
                  {submission.assessmentSlug || '—'}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <span className="font-semibold">
                    {submission.overallScore?.toFixed(0) || 0}%
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <ResultBadge
                    title={submission.resultRange?.title || '—'}
                    color={submission.resultRange?.color}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {submission.completedAt ? formatDate(submission.completedAt) : '—'}
                </TableCell>
                <TableCell className="text-center whitespace-nowrap">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Link href={`/admin/assessment-participants/${submission._id || submission.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 px-3 cursor-pointer">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t px-4 py-3 text-sm text-gray-500 flex justify-between items-center">
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