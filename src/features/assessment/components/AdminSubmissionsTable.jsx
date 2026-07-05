'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye,
  Calendar,
  User,
  FileText,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { OrderStatusBadge } from '@/features/orders/components/OrderStatusBadge';

export function AdminSubmissionsTable({ submissions, isLoading }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
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
    return <AdminSubmissionsSkeleton />;
  }

  if (!submissions || submissions.length === 0) {
    return <AdminSubmissionsEmptyState />;
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5 hover:bg-transparent">
              <TableHead className="text-[#1B2B4B]/60 font-semibold">User</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Assessment</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-center">Score</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Result</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold">Completed</TableHead>
              <TableHead className="text-[#1B2B4B]/60 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission, index) => {
              const userName = submission.userId?.name || 'Unknown User';
              const userInitial = getInitials(userName);
              const score = submission.overallScore || 0;
              const resultTitle = submission.resultId?.title || 'No Result';
              const assessmentTitle = submission.assessmentPageId?.title || 'Unknown Assessment';

              return (
                <TableRow
                  key={submission._id}
                  className="border-b border-[#1B2B4B]/5 hover:bg-[#F8F5EF]/50 transition-colors"
                >
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-xs">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#1B2B4B]">
                          {userName}
                        </span>
                        <span className="text-xs text-[#1B2B4B]/40 truncate max-w-[120px]">
                          {submission.userId?.email || 'No email'}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Assessment */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#1B2B4B]">
                        {assessmentTitle}
                      </span>
                      <span className="text-xs text-[#1B2B4B]/40">
                        {submission.recommendations?.length || 0} recommendations
                      </span>
                    </div>
                  </TableCell>

                  {/* Score */}
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className={cn('text-xl font-bold', getScoreColor(score))}>
                        {score}%
                      </span>
                      <Badge className={cn('text-[10px] border', getScoreBadge(score))}>
                        {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work'}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Result */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: submission.resultId?.color || '#C9A84C' }}
                      />
                      <span className="text-sm text-[#1B2B4B]">{resultTitle}</span>
                    </div>
                  </TableCell>

                  {/* Completed */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(submission.completedAt)}</span>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-full px-3 text-[#1B2B4B] hover:bg-[#F8F5EF]"
                    >
                      <Link href={`/admin/assessments/submissions/${submission._id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Skeleton Component
function AdminSubmissionsSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#1B2B4B]/5">
              {[...Array(6)].map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-[#1B2B4B]/5">
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Empty State Component
function AdminSubmissionsEmptyState() {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)] p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
        <FileText className="h-7 w-7" />
      </div>
      <h2 className="text-xl font-semibold text-[#1B2B4B]">No submissions found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        Users haven&apos;t submitted any assessments yet. Submissions will appear here once users complete assessments.
      </p>
    </div>
  );
}