import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Calendar, Award, BookOpen, Target, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/date-utils';

const getScoreColor = (score) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};

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
      <div className="p-1.5 rounded-md bg-primary/5 mt-0.5 shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-medium break-words">{value || '—'}</p>
    </div>
  </div>
);

export const AssessmentDetailContent = ({ submission }) => {
  const p = submission?.participant || {};
  const domainScores = submission?.domainScores || [];
  const answers = submission?.answers || [];
  const reflections = submission?.reflections || [];
  const recommendations = submission?.recommendations || [];

  const questionInfoById = {};
  const assessmentDomains = submission?.assessmentId?.domains || [];
  assessmentDomains.forEach((domain) => {
    (domain.questions || []).forEach((question) => {
      questionInfoById[question.id] = {
        text: question.text,
        options: question.options || [],
      };
    });
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Participant Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary shrink-0" />
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
              <BookOpen className="h-5 w-5 text-primary shrink-0" />
              Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InfoRow
              label="Assessment"
              value={submission?.assessmentSlug || '—'}
              icon={BookOpen}
            />
            <InfoRow
              label="Assessment Type"
              value={submission?.assessmentId?.introduction?.badge || submission?.assessmentSlug || '—'}
              icon={BookOpen}
            />
            <InfoRow
              label="Submitted"
              value={submission?.completedAt ? formatDate(submission.completedAt) : '—'}
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
              <Award className="h-5 w-5 text-primary shrink-0" />
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              <span className={`text-3xl sm:text-4xl font-bold ${getScoreColor(submission?.overallScore || 0)}`}>
                {submission?.overallScore?.toFixed(0) || 0}%
              </span>
              <div className="flex-1 min-w-[60px] h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${(submission?.overallScore || 0) >= 60 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(submission?.overallScore || 0, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary shrink-0" />
              Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: submission?.resultRange?.color || '#534AB7' }}
            >
              <p className="font-semibold text-base sm:text-lg break-words">{submission?.resultRange?.title || '—'}</p>
              <p className="text-xs sm:text-sm opacity-90 mt-1 break-words">{submission?.resultRange?.description || '—'}</p>
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
                <div className="flex flex-wrap justify-between text-sm gap-1">
                  <span className="font-medium break-words">{domain.domainLabel}</span>
                  <span className="text-gray-500 shrink-0">{domain.score} / {domain.maxScore}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(domain.percentage || 0, 100)}%`,
                      backgroundColor: submission?.resultRange?.color || '#534AB7',
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
                <p className="text-sm break-words">{rec.text}</p>
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
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <p className="text-sm sm:text-[15px] font-bold text-gray-700 break-words flex-1 min-w-[120px]">
                      {index + 1}. {info?.text || 'Question text unavailable'}
                    </p>
                    <span className="text-xs sm:text-sm font-medium whitespace-nowrap text-gray-500 shrink-0">
                      Score: {answer.score} / {answer.value}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium mt-1 break-words">
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
                <p className="text-sm font-medium text-gray-700 break-words">{reflection.question}</p>
                <p className="text-sm text-primary font-medium mt-1 break-words">
                  Answer: <span className="text-[#10B981]">{reflection.answer || 'No answer provided'}</span>
                </p>
              </div>
            ))}
          </div>
        </DetailSection>
      )}
    </div>
  );
};
