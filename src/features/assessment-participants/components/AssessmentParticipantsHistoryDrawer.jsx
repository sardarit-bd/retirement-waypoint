'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, MinusIcon, Award, Calendar, BookOpen } from 'lucide-react';
import { useAssessmentParticipantHistory } from '../hooks/useAssessmentParticipants';
import { formatDate } from '@/lib/date-utils';

const ScoreChangeBadge = ({ direction, change }) => {
  if (direction === 'improved') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-600">
        <TrendingUp className="h-3 w-3" />
        Improved +{change}
      </span>
    );
  }
  if (direction === 'declined') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-semibold text-red-600">
        <TrendingDown className="h-3 w-3" />
        Declined {change}
      </span>
    );
  }
  if (change !== null && change !== undefined) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
        <MinusIcon className="h-3 w-3" />
        No change
      </span>
    );
  }
  return null;
};

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};

const getResultBadgeColor = (color) => {
  return color || '#534AB7';
};

export const AssessmentParticipantsHistoryDrawer = ({ open, onOpenChange, email }) => {
  const { data, isLoading } = useAssessmentParticipantHistory(email);

  const history = data?.history || [];
  const participant = data?.participant || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <SheetHeader className="p-6 pb-4 border-b border-gray-100">
          <SheetTitle className="text-lg text-[#1B2B4B]">Assessment History</SheetTitle>
          {participant.name && (
            <SheetDescription className="text-sm text-gray-500">
              {participant.name}{participant.email ? ` · ${participant.email}` : ''}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="overflow-y-auto flex-1 p-6 pt-4 space-y-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 rounded-full bg-gray-50 mb-3">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No assessment history found.</p>
            </div>
          ) : (
            history.map((entry, index) => {
              const attemptLabel = index === 0 ? 'Latest Attempt' : index === history.length - 1 ? 'First Attempt' : `Attempt ${history.length - index}`;
              const assessmentTitle = entry.assessmentId?.hero?.title || entry.assessmentId?.title || entry.assessmentSlug || 'Assessment';

              return (
                <div
                  key={entry._id}
                  className="rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-sm"
                >
                  {/* Attempt Label + Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {attemptLabel}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {entry.completedAt ? formatDate(entry.completedAt) : '—'}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className={`text-3xl font-bold ${getScoreColor(entry.overallScore || 0)}`}>
                      {entry.overallScore?.toFixed(0) || 0}%
                    </span>
                    <ScoreChangeBadge direction={entry.scoreChangeDirection} change={entry.scoreChange} />
                  </div>

                  {/* Assessment & Result */}
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{assessmentTitle}</span>
                    <span className="text-gray-300">·</span>
                    <Award className="h-3.5 w-3.5 shrink-0" />
                    {entry.resultRange?.title ? (
                      <Badge
                        className="text-white border-0 text-[11px] px-2 py-0.5"
                        style={{ backgroundColor: getResultBadgeColor(entry.resultRange?.color) }}
                      >
                        {entry.resultRange.title}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>

                  {/* Divider between attempts */}
                  {index < history.length - 1 && (
                    <div className="mt-4 border-t border-dashed border-gray-100" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
