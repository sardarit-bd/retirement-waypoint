// features/assessment/components/AdminSubmissionDetails.jsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Award,
  FileText,
  CheckCircle,
  Target,
  Layers,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function AdminSubmissionDetails({ submission, isLoading }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
    return <AdminSubmissionDetailsSkeleton />;
  }

  if (!submission) {
    return <AdminSubmissionDetailsError />;
  }

  const userName = submission.userId?.name || 'Unknown User';
  const userInitial = getInitials(userName);
  const score = submission.overallScore || 0;
  const resultTitle = submission.resultId?.title || 'No Result';
  const assessmentTitle = submission.assessmentPageId?.title || 'Unknown Assessment';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group -ml-2 rounded-full px-3 py-2 text-[#1B2B4B] hover:bg-[#F8F5EF]"
            >
              <Link href="/admin/assessments/submissions">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium">Back to Submissions</span>
              </Link>
            </Button>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1B2B4B]">
                Submission Details
              </h1>
              <Badge className="bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20">
                #{submission._id?.slice(0, 8)}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-[#1B2B4B]/60">
              Assessment: {assessmentTitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={cn('text-3xl font-bold', getScoreColor(score))}>
                {score}%
              </div>
              <Badge className={cn('text-xs border', getScoreBadge(score))}>
                {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* User Information */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                User Information
              </h2>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={submission.userId?.image} />
                  <AvatarFallback className="bg-[#C9A84C]/20 text-[#1B2B4B] text-lg font-semibold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-[#1B2B4B]">{userName}</p>
                  <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{submission.userId?.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#1B2B4B]/60">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Completed: {formatDate(submission.completedAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results & Recommendations */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Results & Recommendations
              </h2>

              {/* Result */}
              <div className="rounded-2xl bg-[#F8F5EF] p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className="h-3 w-3 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: submission.resultId?.color || '#C9A84C' }}
                  />
                  <div>
                    <p className="font-semibold text-[#1B2B4B]">{resultTitle}</p>
                    {submission.resultId?.description && (
                      <p className="text-sm text-[#1B2B4B]/60 mt-1">
                        {submission.resultId.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              {submission.recommendations?.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#1B2B4B]">Recommendations</p>
                  {submission.recommendations.map((rec, index) => (
                    <div
                      key={rec._id || index}
                      className="rounded-xl border border-[#1B2B4B]/10 bg-white/50 p-4 hover:bg-white/80 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-[#C9A84C]/10 p-1.5 mt-0.5">
                          <Target className="h-4 w-4 text-[#C9A84C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-[#1B2B4B]">{rec.title}</p>
                            <Badge variant="outline" className="text-[10px]">
                              Priority {rec.priority}
                            </Badge>
                          </div>
                          {rec.description && (
                            <p className="text-sm text-[#1B2B4B]/60 mt-1">{rec.description}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 mt-2">
                            {rec.bookIds?.length > 0 && (
                              <span className="text-xs text-[#1B2B4B]/40 flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {rec.bookIds.length} book{rec.bookIds.length !== 1 ? 's' : ''}
                              </span>
                            )}
                            {rec.resourceLinks?.length > 0 && (
                              <span className="text-xs text-[#1B2B4B]/40 flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" />
                                {rec.resourceLinks.length} resource{rec.resourceLinks.length !== 1 ? 's' : ''}
                              </span>
                            )}
                            {rec.ctaText && rec.ctaLink && (
                              <a
                                href={rec.ctaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1"
                              >
                                {rec.ctaText}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-[#F8F5EF] p-4 text-center">
                  <p className="text-sm text-[#1B2B4B]/60">No recommendations available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Score Breakdown */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                Score Breakdown
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#1B2B4B]/60">Overall Score</span>
                  <span className={cn('text-xl font-bold', getScoreColor(score))}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-[#F8F5EF] rounded-full h-2">
                  <div
                    className="rounded-full h-2 transition-all duration-500"
                    style={{
                      width: `${score}%`,
                      backgroundColor: score >= 80 ? '#10b981' : score >= 60 ? '#C9A84C' : score >= 40 ? '#eab308' : '#ef4444',
                    }}
                  />
                </div>
                <div className="border-t border-[#1B2B4B]/5 pt-3 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#1B2B4B]/60">Status</span>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-[#1B2B4B]/60">Sections</span>
                    <span className="font-medium text-[#1B2B4B]">
                      {Object.keys(submission.sectionScores || {}).length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Scores */}
          {submission.sectionScores && Object.keys(submission.sectionScores).length > 0 && (
            <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
              <CardContent className="p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                  Section Scores
                </h2>
                <div className="space-y-3">
                  {Object.entries(submission.sectionScores).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#1B2B4B]/70 capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="font-medium text-[#1B2B4B]">{value}%</span>
                      </div>
                      <div className="w-full bg-[#F8F5EF] rounded-full h-1.5">
                        <div
                          className="rounded-full h-1.5 transition-all duration-500 bg-[#C9A84C]"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#1B2B4B]/60 mb-4">
                Metadata
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Submission ID</span>
                  <span className="font-mono text-[#1B2B4B] text-xs">
                    {submission._id?.slice(0, 12)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Assessment ID</span>
                  <span className="font-mono text-[#1B2B4B] text-xs">
                    {submission.assessmentPageId?._id?.slice(0, 12)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Completed</span>
                  <span className="text-[#1B2B4B]">{formatDate(submission.completedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Created</span>
                  <span className="text-[#1B2B4B]">{formatDate(submission.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Component
function AdminSubmissionDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="mt-3 h-5 w-32 bg-gray-200 rounded" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Error Component
function AdminSubmissionDetailsError() {
  return (
    <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
      <div className="mx-auto mb-4 w-fit rounded-full bg-red-500/10 p-4">
        <FileText className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold text-red-500">Submission Not Found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
        The submission you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
    </div>
  );
}