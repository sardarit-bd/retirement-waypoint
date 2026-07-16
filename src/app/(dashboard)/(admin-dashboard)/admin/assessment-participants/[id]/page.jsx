'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, User, Mail, Calendar, Award, BookOpen, Target, Sparkles } from 'lucide-react';
import { useAssessmentParticipant } from '@/features/assessment-participants';
import { formatDate } from '@/lib/date-utils';

const DetailSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-8 w-48" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const DetailSection = ({ title, children, className = '' }) => (
  <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className={className}>
      {children}
    </CardContent>
  </Card>
);

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-3 py-2 border-b last:border-0">
    {Icon && (
      <div className="p-1.5 rounded-md bg-primary/5 mt-0.5">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-medium break-words">{value || '—'}</p>
    </div>
  </div>
);

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export default function AssessmentParticipantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { data, isLoading, error } = useAssessmentParticipant(id);
  const submission = data;

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-red-50 mb-4">
            <Target className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Participant Not Found</h3>
          <p className="text-sm text-gray-500">
            {error?.message || 'The participant you are looking for does not exist.'}
          </p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const p = submission.participant || {};
  const domainScores = submission.domainScores || [];
  const answers = submission.answers || [];
  const reflections = submission.reflections || [];
  const recommendations = submission.recommendations || [];

  // Build a questionId -> { text, options } lookup from the populated assessment's domains
  const questionInfoById = {};
  const assessmentDomains = submission.assessmentId?.domains || [];
  assessmentDomains.forEach((domain) => {
    (domain.questions || []).forEach((question) => {
      questionInfoById[question.id] = {
        text: question.text,
        options: question.options || [],
      };
    });
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="h-9 px-3 border border-gray-200 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 ml-auto">
          Completed
        </Badge>
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Participant Details</h1>

      {/* Participant Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Participant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow label="Name" value={p.name} icon={User} />
            <InfoRow label="Email" value={p.email} icon={Mail} />
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow
              label="Assessment"
              value={submission.assessmentSlug || '—'}
              icon={BookOpen}
            />
            <InfoRow
              label="Submitted"
              value={submission.completedAt ? formatDate(submission.completedAt) : '—'}
              icon={Calendar}
            />
          </CardContent>
        </Card>
      </div>

      {/* Score & Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className={`text-4xl font-bold ${getScoreColor(submission.overallScore || 0)}`}>
                {submission.overallScore?.toFixed(0) || 0}%
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${submission.overallScore >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${submission.overallScore || 0}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary text-red-500" />
              Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: submission.resultRange?.color || '#534AB7' }}
            >
              <p className="font-semibold text-lg">{submission.resultRange?.title || '—'}</p>
              <p className="text-sm opacity-90 mt-1">{submission.resultRange?.description || '—'}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Scores */}
      {domainScores.length > 0 && (
        <DetailSection title="Domain Scores">
          <div className="space-y-3">
            {domainScores.map((domain) => (
              <div key={domain.domainId} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{domain.domainLabel}</span>
                  <span className="text-gray-500">{domain.score} / {domain.maxScore}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${domain.percentage || 0}%`,
                      backgroundColor: submission.resultRange?.color || '#534AB7',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <DetailSection title="Recommendations">
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-primary/5">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm">{rec.text}</p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}

      {/* Question Answers */}
      {answers.length > 0 && (
        <DetailSection title="Question Answers">
          <div className="space-y-4">
            {answers.map((answer, index) => {
              const info = questionInfoById[answer.questionId];
              const selectedOption = info?.options?.find(
                (opt) => opt.value === answer.value
              );
              return (
                <div key={index} className="py-2 border-b last:border-0">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-[15px] font-bold text-gray-700">
                      {index + 1}. {info?.text || 'Question text unavailable'}
                    </p>
                    <span className="text-sm font-medium whitespace-nowrap text-gray-500">
                      Score: {answer.score} / {answer.value}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium mt-1">
                    Answer: <span className="text-[#10B981]">{selectedOption?.label || `Score ${answer.value}`}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </DetailSection>
      )}

      {/* Reflections */}
      {reflections.length > 0 && (
        <DetailSection title="Reflection Answers">
          <div className="space-y-4">
            {reflections.map((reflection, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm font-medium text-gray-700">{reflection.question}</p>
                <p className="text-sm text-primary font-medium mt-1">
                    Answer: <span className="text-[#10B981]">{reflection.answer || 'No answer provided'}</span>
                  </p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}
    </div>
  );
}