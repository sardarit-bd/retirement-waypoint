'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  TrendingUp,
  TrendingDown,
  MinusIcon,
  Award,
  Calendar,
  BookOpen,
  User,
  Mail,
  BarChart3,
  Target,
  Eye,
} from 'lucide-react';
import {
  useAssessmentParticipantHistory,
  useAssessmentParticipant,
} from '../hooks/useAssessmentParticipants';
import { AssessmentDetailContent } from './AssessmentDetailContent';
import { formatDate } from '@/lib/date-utils';

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};

const getResultBadgeColor = (color) => color || '#534AB7';

const TrendBadge = ({ direction, change }) => {
  if (direction === 'improved') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
        <TrendingUp className="h-3.5 w-3.5" />
        +{change}
      </span>
    );
  }
  if (direction === 'declined') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-600">
        <TrendingDown className="h-3.5 w-3.5" />
        {change}
      </span>
    );
  }
  if (change !== null && change !== undefined) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
        <MinusIcon className="h-3.5 w-3.5" />
        0
      </span>
    );
  }
  return null;
};

const SummaryCard = ({ icon: Icon, label, value, className = '' }) => (
  <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-gray-100 bg-white p-3 sm:p-4 min-w-0">
    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A84C]/10">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#C9A84C]" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate">{label}</p>
      <p className={`text-xs sm:text-sm font-bold truncate ${className}`}>{value}</p>
    </div>
  </div>
);

const DetailModal = ({ submissionId, open, onOpenChange }) => {
  const { data, isLoading } = useAssessmentParticipant(submissionId);
  const submission = data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!flex !flex-col w-[calc(100%-0.75rem)] sm:max-w-[90vw] max-w-[1200px] max-h-[90vh] p-0 gap-0 overflow-hidden rounded-xl"
        showCloseButton
      >
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-100 shrink-0">
          <DialogTitle className="text-base sm:text-lg text-[#1B2B4B]">Assessment Details</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-500">
            Full assessment report
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 pt-3 sm:pt-4 pb-8">
          {isLoading ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-40 w-full" />
            </div>
          ) : !submission ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-gray-500">Assessment data not found.</p>
            </div>
          ) : (
            <AssessmentDetailContent submission={submission} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const AssessmentParticipantsHistoryDrawer = ({ open, onOpenChange, email }) => {
  const { data, isLoading } = useAssessmentParticipantHistory(email);
  const [expandedId, setExpandedId] = useState(null);
  const [detailId, setDetailId] = useState(null);

  const history = data?.history || [];
  const participant = data?.participant || {};

  // Compute summary stats
  const totalAttempts = history.length;
  const scores = history.map((h) => h.overallScore || 0);
  const highestScore = scores.length ? Math.max(...scores) : 0;
  const lowestScore = scores.length ? Math.min(...scores) : 0;
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const latestEntry = history[0] || {};
  const overallTrendDirection = latestEntry.scoreChangeDirection;
  const overallTrendChange = latestEntry.scoreChange;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="!flex !flex-col w-[calc(100%-0.75rem)] sm:max-w-[900px] lg:max-w-[1000px] xl:max-w-[1100px] max-h-[85vh] p-0 gap-0 overflow-hidden rounded-xl"
          showCloseButton
        >
          <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-100 shrink-0">
            <DialogTitle className="text-base sm:text-lg text-[#1B2B4B]">Assessment History</DialogTitle>
            {participant.name && (
              <DialogDescription className="text-xs sm:text-sm text-gray-500">
                {participant.name}{participant.email ? ` · ${participant.email}` : ''}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 pt-3 sm:pt-4 pb-8">
            {isLoading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No History Found</h3>
                <p className="text-sm text-gray-500">This participant has no assessment submissions.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 shrink-0" />
                      <span className="font-medium truncate">{participant.name || '—'}</span>
                    </div>
                    <div className="hidden sm:block text-gray-300">·</div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 shrink-0" />
                      <a href={`mailto:${participant.email}`} className="hover:text-primary truncate">
                        {participant.email || '—'}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                    <SummaryCard icon={BarChart3} label="Total Attempts" value={totalAttempts} />
                    <SummaryCard icon={Award} label="Latest Score" value={`${latestEntry.overallScore?.toFixed(0) || 0}%`} className={getScoreColor(latestEntry.overallScore || 0)} />
                    <SummaryCard icon={Target} label="Highest Score" value={`${highestScore}%`} className="text-emerald-600" />
                    <SummaryCard icon={TrendingUp} label="Average Score" value={`${avgScore}%`} className={getScoreColor(avgScore)} />
                    <SummaryCard icon={TrendingDown} label="Lowest Score" value={`${lowestScore}%`} className="text-red-500" />
                    <SummaryCard icon={TrendingUp} label="Overall Trend" value={overallTrendDirection === 'improved' ? `Improved +${Math.abs(overallTrendChange)}` : overallTrendDirection === 'declined' ? `Declined ${overallTrendChange}` : overallTrendChange !== null && overallTrendChange !== undefined ? 'No change' : '—'} className={overallTrendDirection === 'improved' ? 'text-emerald-600' : overallTrendDirection === 'declined' ? 'text-red-500' : 'text-gray-500'} />
                  </div>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-700">Assessment Timeline</h4>
                  {history.map((entry, index) => {
                    const attemptNumber = history.length - index;
                    const attemptLabel = index === 0 ? 'Latest' : index === history.length - 1 ? 'First' : `Attempt #${attemptNumber}`;
                    const assessmentTitle = entry.assessmentId?.hero?.title || entry.assessmentId?.title || entry.assessmentSlug || 'Assessment';
                    const isExpanded = expandedId === entry._id;

                    return (
                      <div key={entry._id} className="rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-[10px] sm:text-xs font-mono shrink-0">#{attemptNumber}</Badge>
                                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 truncate">{attemptLabel}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                                <span className="truncate">{assessmentTitle}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(entry.overallScore || 0)}`}>{entry.overallScore?.toFixed(0) || 0}%</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 shrink-0" />
                              {entry.completedAt ? formatDate(entry.completedAt) : '—'}
                            </div>
                            {entry.resultRange?.title && (
                              <>
                                <span className="text-gray-300 hidden sm:inline">·</span>
                                <Badge className="text-white border-0 text-[10px] sm:text-[11px] px-2 py-0.5" style={{ backgroundColor: getResultBadgeColor(entry.resultRange?.color) }}>{entry.resultRange.title}</Badge>
                              </>
                            )}
                            <span className="text-gray-300">·</span>
                            <TrendBadge direction={entry.scoreChangeDirection} change={entry.scoreChange} />
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer w-full sm:w-auto" onClick={() => toggleExpand(entry._id)}>
                              <Eye className="h-3.5 w-3.5 mr-1 shrink-0" />
                              {isExpanded ? 'Hide Domain Scores' : 'View Domain Scores'}
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="h-8 text-xs cursor-pointer w-full sm:w-auto bg-[#C9A84C] hover:bg-[#D6B45A] text-[#04103A]"
                              onClick={() => setDetailId(entry._id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>

                        {isExpanded && entry.domainScores && entry.domainScores.length > 0 && (
                          <div className="border-t border-gray-100 px-4 sm:px-5 py-4 space-y-3 bg-gray-50/50 rounded-b-xl">
                            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">Domain Scores</p>
                            {entry.domainScores.map((ds) => (
                              <div key={ds.domainId || ds.domainKey} className="space-y-1">
                                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                                  <span className="font-medium text-gray-700 truncate">{ds.domainLabel || ds.domainKey || 'Domain'}</span>
                                  <span className={`font-semibold shrink-0 ml-2 ${getScoreColor(ds.percentage || 0)}`}>{ds.percentage?.toFixed(0) || 0}%</span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(ds.percentage || 0, 100)}%`, backgroundColor: getResultBadgeColor('#C9A84C') }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Nested Assessment Details Modal */}
      <DetailModal
        submissionId={detailId}
        open={!!detailId}
        onOpenChange={(val) => { if (!val) setDetailId(null); }}
      />
    </>
  );
};
