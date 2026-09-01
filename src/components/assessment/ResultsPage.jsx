"use client";

import {
  Award,
  TrendingUp,
  TrendingDown,
  MinusIcon,
  Download,
  ArrowLeft,
  MessageSquareText,
  Calendar,
  CheckCircle2,
  ListChecks,
} from "lucide-react";
import { Radar } from "react-chartjs-2";
import AssessmentShell from "./AssessmentShell";

const glassCard =
  "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl print:backdrop-blur-none print:bg-[#16233F] print:border-white/20 print:shadow-none print:rounded-2xl";

const scale = [
  { label: "Strongly agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly disagree", value: 1 },
];

const getScoreBadgeClass = (score) => {
  if (score >= 5) {
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 print:bg-emerald-950/60 print:text-emerald-300 print:border-emerald-500/40";
  }
  if (score === 4) {
    return "bg-teal-500/20 text-teal-300 border border-teal-500/30 print:bg-teal-950/60 print:text-teal-300 print:border-teal-500/40";
  }
  if (score === 3) {
    return "bg-amber-500/20 text-amber-300 border border-amber-500/30 print:bg-amber-950/60 print:text-amber-300 print:border-amber-500/40";
  }
  if (score === 2) {
    return "bg-orange-500/20 text-orange-300 border border-orange-500/30 print:bg-orange-950/60 print:text-orange-300 print:border-orange-500/40";
  }
  if (score === 1) {
    return "bg-red-500/20 text-red-400 border border-red-500/30 print:bg-red-950/60 print:text-red-300 print:border-red-500/40";
  }
  return "bg-white/10 text-white/70 border border-white/15 print:bg-white/15 print:text-white/80";
};

const formatDate = (date) => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ScoreChangeBadge = ({ direction, change, absolute }) => {
  if (direction === "improved") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400 print:text-emerald-300 print:bg-emerald-950/60 print:border print:border-emerald-500/40">
        <TrendingUp className="h-4 w-4" />
        {absolute ? `+${Math.abs(change)}` : `+${change}%`}
      </span>
    );
  }
  if (direction === "declined") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-red-400 print:text-red-300 print:bg-red-950/60 print:border print:border-red-500/40">
        <TrendingDown className="h-4 w-4" />
        {absolute ? `-${Math.abs(change)}` : `${change}%`}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/60 print:text-white/80 print:bg-white/15">
      <MinusIcon className="h-4 w-4" />
      No change
    </span>
  );
};

const ResultsPage = ({
  user = {},
  assessment = {},
  domains = [],
  answers = {},
  submissionResult,
  previousSubmission,
  overallScore = 0,
  getDomainScore = () => 0,
  chartData,
  chartOptions,
  onStartOver,
}) => {
  const resultData = submissionResult || {
    overallScore,
    domainScores: domains.map((item) => ({
      domainId: item.id,
      domainKey: item.key,
      domainLabel: item.label,
      percentage: getDomainScore(item),
    })),
  };

  const displayScore = resultData.overallScore ?? overallScore ?? 0;
  const displayDomainScores =
    resultData.domainScores ||
    domains.map((item) => ({
      domainId: item.id,
      domainKey: item.key,
      domainLabel: item.label,
      percentage: getDomainScore(item),
    }));

  // Build reflections list from submissionResult or fallback
  const reflections =
    resultData.reflections || submissionResult?.reflections || [];

  // Create answers lookup map supporting both Array and Object formats
  const answersMap = {};
  if (Array.isArray(answers)) {
    answers.forEach((ans) => {
      if (ans && ans.questionId !== undefined) {
        answersMap[ans.questionId] = ans.value ?? ans.score;
      }
    });
  } else if (answers && typeof answers === "object") {
    Object.entries(answers).forEach(([k, v]) => {
      answersMap[k] = v;
    });
  }

  // Also merge from submissionResult.answers if available
  if (Array.isArray(submissionResult?.answers)) {
    submissionResult.answers.forEach((ans) => {
      if (
        ans &&
        ans.questionId !== undefined &&
        answersMap[ans.questionId] === undefined
      ) {
        answersMap[ans.questionId] = ans.value ?? ans.score;
      }
    });
  }

  // Build a map of previous domain scores keyed by domainKey for easy lookup
  const prevDomainMap = {};
  if (previousSubmission?.domainScores) {
    previousSubmission.domainScores.forEach((ds) => {
      prevDomainMap[ds.domainKey || ds.domainId] = ds.percentage;
    });
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const completedDate = formatDate(
    resultData.completedAt ||
      resultData.createdAt ||
      submissionResult?.completedAt ||
      new Date()
  );

  const assessmentTitle =
    assessment.title ||
    assessment.introduction?.title ||
    assessment.hero?.title ||
    `${assessment.type || "Retirement"} Readiness Assessment`;

  return (
    <AssessmentShell>
      <div className="mx-auto max-w-7xl space-y-6 print:space-y-4 print:max-w-none print:w-full">
        {/* Top Action Bar (Hidden in Print) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 shadow-lg backdrop-blur-xl print:hidden">
          <button
            type="button"
            onClick={onStartOver}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:bg-white/15 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Start over</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-5 py-2.5 text-sm font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30 hover:scale-[1.02] active:scale-[0.98]"
              title="Save or print report as PDF"
            >
              <Download className="h-4 w-4" />
              <span>Save / Download PDF</span>
            </button>
          </div>
        </div>

        {/* Print Branded Header (Visible Only in Print or Print Preview) */}
        <div className="hidden print:block border-b border-white/20 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#C9A84C] tracking-wide">
                RETIREMENT WAYPOINT
              </h1>
              <p className="text-xs text-white/70 mt-0.5">
                Comprehensive Assessment & Profile Report
              </p>
            </div>
            <div className="text-right text-xs text-white/70 space-y-0.5">
              <p className="font-semibold text-white">
                {user?.name || "Participant"}
              </p>
              {user?.email && <p className="text-white/60">{user.email}</p>}
              <p className="text-white/50">{completedDate}</p>
            </div>
          </div>
        </div>

        {/* Hero Score Card */}
        <div
          className={`${glassCard} p-8 text-center print:p-6 print:break-inside-avoid`}
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg shadow-[#C9A84C]/30">
            <Award className="h-7 w-7" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
            {assessmentTitle}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            {user?.name
              ? `${user.name} — your profile results`
              : `Your ${assessment.type || "Retirement"} Profile`}
          </h2>

          {completedDate && (
            <p className="mt-1 text-xs text-white/50 flex items-center justify-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Completed on {completedDate}</span>
            </p>
          )}

          {/* Current Score */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
              Overall Readiness Score
            </p>
            <p className="mt-2 text-6xl font-extrabold text-[#C9A84C] tracking-tight">
              {displayScore}%
            </p>
          </div>

          {/* Comparison with Previous */}
          {previousSubmission && (
            <div className="mx-auto mt-6 inline-flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 print:border-white/20 print:bg-white/5">
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                Compared with your last assessment
              </p>

              <div className="flex items-center gap-6 sm:gap-8">
                {/* Previous */}
                <div className="text-center">
                  <p className="text-xs text-white/50">
                    {formatDate(previousSubmission.completedAt)}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white/70">
                    {previousSubmission.overallScore}%
                  </p>
                  <p className="text-xs text-white/40">Previous</p>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  {previousSubmission.scoreChangeDirection === "improved" && (
                    <TrendingUp className="h-6 w-6 text-emerald-400" />
                  )}
                  {previousSubmission.scoreChangeDirection === "declined" && (
                    <TrendingDown className="h-6 w-6 text-red-400" />
                  )}
                  {previousSubmission.scoreChangeDirection === "unchanged" && (
                    <MinusIcon className="h-6 w-6 text-white/40" />
                  )}
                  <span className="mt-1 text-xs text-white/50">vs</span>
                </div>

                {/* Current */}
                <div className="text-center">
                  <p className="text-xs text-[#C9A84C]/70">Today</p>
                  <p className="mt-1 text-lg font-semibold text-[#C9A84C]">
                    {displayScore}%
                  </p>
                  <p className="text-xs text-[#C9A84C]/60">Current</p>
                </div>
              </div>

              <ScoreChangeBadge
                direction={previousSubmission.scoreChangeDirection}
                change={previousSubmission.scoreChange}
              />
            </div>
          )}

          {/* Progress Message */}
          {previousSubmission && (
            <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-2xl mx-auto">
              {previousSubmission.scoreChangeDirection === "improved" &&
                `Great progress! Your readiness score improved by ${Math.abs(
                  previousSubmission.scoreChange
                )} points since your last assessment.`}
              {previousSubmission.scoreChangeDirection === "declined" &&
                `Your score changed since your last assessment. Review your domain breakdown below to identify areas for focus.`}
              {previousSubmission.scoreChangeDirection === "unchanged" &&
                `Your score is consistent with your last assessment. You are maintaining your readiness level.`}
              {!previousSubmission.scoreChangeDirection &&
                `You are making measurable progress in your retirement journey.`}
            </p>
          )}

          {resultData?.resultRange && (
            <div className="mt-6 inline-block rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-6 py-3">
              <p className="text-base font-semibold text-[#C9A84C]">
                {resultData.resultRange.title}
              </p>
              {resultData.resultRange.description && (
                <p className="mt-1 text-xs sm:text-sm text-white/80 max-w-xl">
                  {resultData.resultRange.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Domain Profile & Breakdown Grid */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] print:grid-cols-1 print:gap-4">
          {/* Radar Chart */}
          <div
            className={`${glassCard} p-6 flex flex-col justify-between print:p-5 print:break-inside-avoid`}
          >
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                Domain Profile Radar
              </p>
              <div className="relative mx-auto max-w-sm sm:max-w-md aspect-square flex items-center justify-center print:max-w-[320px]">
                {chartData && <Radar data={chartData} options={chartOptions} />}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-white/40 print:text-white/60">
              Visualizes relative strength balance across all assessment domains.
            </p>
          </div>

          {/* Domain Score Breakdown */}
          <div className="space-y-4 print:space-y-3">
            {displayDomainScores.map((item, index) => {
              const domainItem =
                domains.find(
                  (d) => d.id === item.domainId || d.key === item.domainKey
                ) ||
                domains[index] ||
                {};
              const score = item.percentage || 0;
              const prevScore = prevDomainMap[item.domainKey || item.domainId];
              const hasPrev = prevScore !== undefined;

              // Compute domain-level change
              let domainChange = null;
              let domainChangeDirection = null;
              if (hasPrev) {
                domainChange = Math.round(score - prevScore);
                domainChangeDirection =
                  domainChange > 0
                    ? "improved"
                    : domainChange < 0
                    ? "declined"
                    : "unchanged";
              }

              const domainColor = domainItem.color || "#C9A84C";

              return (
                <div
                  key={item.domainKey || item.domainId || index}
                  className={`${glassCard} p-5 print:p-4 print:break-inside-avoid`}
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white text-base">
                      {item.domainLabel ||
                        domainItem.label ||
                        `Domain ${index + 1}`}
                    </h3>
                  </div>

                  {/* Comparison scores */}
                  <div className="flex items-center gap-4">
                    {/* Current */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#C9A84C]/70 font-medium">
                          Current
                        </span>
                        <span
                          className="font-bold text-sm sm:text-base"
                          style={{ color: domainColor }}
                        >
                          {score}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/15 print:bg-white/20">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${score}%`,
                            backgroundColor: domainColor,
                          }}
                        />
                      </div>
                    </div>

                    {/* Previous */}
                    {hasPrev && (
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/40 font-medium">
                            Previous
                          </span>
                          <span className="text-sm font-medium text-white/60">
                            {prevScore}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/10 print:bg-white/15">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${prevScore}%`,
                              backgroundColor: `${domainColor}70`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Domain change indicator */}
                  {hasPrev && (
                    <div className="mt-2.5 flex justify-end">
                      {domainChangeDirection === "improved" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Improved +{domainChange}
                        </span>
                      )}
                      {domainChangeDirection === "declined" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400">
                          <TrendingDown className="h-3.5 w-3.5" />
                          Declined {domainChange}
                        </span>
                      )}
                      {domainChangeDirection === "unchanged" && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-white/40">
                          <MinusIcon className="h-3.5 w-3.5" />
                          No change
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actionable Guidance & Recommendations */}
        <div className={`${glassCard} p-6 print:p-5 print:break-inside-avoid`}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-[#C9A84C]" />
            <h3 className="text-lg font-semibold text-white">
              {resultData?.resultRange?.title ||
                assessment.nextStepsTitle ||
                "What this means for your planning"}
            </h3>
          </div>

          <p className="leading-relaxed text-white/75 text-sm sm:text-base">
            {resultData?.resultRange?.description ||
              assessment.nextSteps ||
              "Domains scoring below 60% are meaningful areas to explore and strengthen as you prepare for your next chapter."}
          </p>

          {resultData?.recommendations &&
            resultData.recommendations.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C9A84C] mb-3">
                  Key Recommendations
                </p>
                <ul className="space-y-2.5">
                  {resultData.recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className="text-sm text-white/80 flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="text-[#C9A84C] font-bold mt-0.5">•</span>
                      <span>{rec.text || rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* Qualitative Reflection Responses Section */}
        {reflections && reflections.length > 0 && (
          <div className={`${glassCard} p-6 print:p-5 print:break-inside-avoid`}>
            <div className="mb-4 flex items-center gap-2.5">
              <MessageSquareText className="h-5 w-5 text-[#C9A84C]" />
              <h3 className="text-lg font-semibold text-white">
                Your Reflection Responses
              </h3>
            </div>
            <p className="text-xs text-white/50 mb-4">
              Qualitative insights and reflections provided during your
              assessment.
            </p>

            <div className="space-y-4">
              {reflections.map((ref, idx) => {
                const domainItem =
                  domains.find(
                    (d) => d.id === ref.domainId || d.key === ref.domainKey
                  ) ||
                  domains[idx] ||
                  {};
                const questionText =
                  ref.question ||
                  domainItem.reflection?.question ||
                  domainItem.open ||
                  `Domain Reflection (${
                    domainItem.label || `Domain ${idx + 1}`
                  })`;
                const answerText =
                  ref.answer && ref.answer.trim()
                    ? ref.answer
                    : "No reflection entered.";

                return (
                  <div
                    key={ref.domainId || ref.domainKey || idx}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 print:border-white/20 print:bg-white/5 print:break-inside-avoid"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                      {domainItem.label || `Domain ${idx + 1}`}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/90 leading-snug">
                      {questionText}
                    </p>
                    <div className="mt-2.5 rounded-xl border border-white/5 bg-black/25 p-3.5 text-sm text-white/80 print:bg-white/10 print:text-white/90">
                      <p className="italic leading-relaxed whitespace-pre-wrap">
                        “{answerText}”
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Item-by-Item Assessment Responses Section (Only Visible in Exported/Printed PDF) */}
        {domains && domains.length > 0 && (
          <div
            className={`hidden print:block ${glassCard} p-6 sm:p-8 print:p-5 print:break-inside-avoid`}
          >
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <ListChecks className="h-6 w-6 text-[#C9A84C]" />
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Item-by-Item Assessment Responses
                  </h3>
                  <p className="text-xs text-white/50 mt-0.5">
                    Detailed question statements and your selected responses
                    grouped by domain
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 print:space-y-4">
              {domains.map((domain, dIdx) => {
                const questions = domain.questions || domain.items || [];
                if (!questions.length) return null;

                const domainScoreObj = displayDomainScores.find(
                  (ds) =>
                    ds.domainId === domain.id || ds.domainKey === domain.key
                );
                const domainScore = domainScoreObj?.percentage;
                const domainColor = domain.color || "#C9A84C";

                return (
                  <div
                    key={domain.id || domain.key || dIdx}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 print:p-4 print:border-white/20 print:bg-white/5 print:break-inside-avoid"
                  >
                    {/* Domain Sub-Header */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: domainColor }}
                        />
                        <h4 className="text-base font-semibold text-white">
                          {domain.label ||
                            domain.title ||
                            `Domain ${dIdx + 1}`}
                        </h4>
                      </div>
                      {domainScore !== undefined && (
                        <span
                          className="rounded-full px-3 py-0.5 text-xs font-bold"
                          style={{
                            backgroundColor: `${domainColor}25`,
                            color: domainColor,
                            border: `1px solid ${domainColor}50`,
                          }}
                        >
                          Score: {domainScore}%
                        </span>
                      )}
                    </div>

                    {/* Question List */}
                    <div className="divide-y divide-white/5">
                      {questions.map((question, qIdx) => {
                        const qText =
                          typeof question === "string"
                            ? question
                            : question.text || question.prompt || "";
                        const qId = question.id || `${domain.key}_${qIdx}`;
                        const userVal =
                          answersMap[qId] ??
                          answersMap[`${domain.key}_${qIdx}`] ??
                          answersMap[`${domain.id}_${qIdx}`] ??
                          answersMap[question.id];

                        const customOptions =
                          Array.isArray(question.options) &&
                          question.options.length > 0
                            ? question.options
                            : scale;
                        const selectedOpt = customOptions.find(
                          (o) => o.value === userVal
                        );
                        const answerLabel =
                          selectedOpt?.label ||
                          (userVal !== undefined
                            ? `Score ${userVal}`
                            : "Not answered");

                        const globalItemNumber =
                          domains
                            .slice(0, dIdx)
                            .reduce(
                              (acc, d) =>
                                acc +
                                (d.questions || d.items || []).length,
                              0
                            ) +
                          qIdx +
                          1;

                        return (
                          <div
                            key={qId || qIdx}
                            className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 print:break-inside-avoid"
                          >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-[#C9A84C] print:bg-white/15">
                                {globalItemNumber}
                              </span>
                              <p className="text-sm text-white/90 leading-relaxed break-words">
                                {qText}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 sm:self-center pl-9 sm:pl-0">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-semibold tracking-wide ${getScoreBadgeClass(
                                  userVal
                                )}`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 opacity-80" />
                                <span>{answerLabel}</span>
                                {userVal !== undefined && (
                                  <span className="opacity-60 font-normal">
                                    ({userVal}/5)
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Print Document Footer */}
        <div className="hidden print:block border-t border-white/20 pt-4 mt-6 text-center text-xs text-white/50 print:break-inside-avoid">
          <p>
            © {new Date().getFullYear()} Retirement Waypoint. Confidential
            Assessment Report. All rights reserved.
          </p>
          <p className="mt-0.5 text-white/40">
            Generated from www.retirementwaypoint.com
          </p>
        </div>

        {/* Bottom Action Area (Hidden in Print) */}
        <div className="no-print flex flex-wrap items-center justify-center gap-4 pt-4 print:hidden">
          <button
            type="button"
            onClick={onStartOver}
            className="cursor-pointer rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
          >
            Start over
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 py-3 text-sm font-semibold text-[#04103A] shadow-lg shadow-[#C9A84C]/25 transition-all hover:shadow-[#C9A84C]/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            <span>Save / Download PDF Report</span>
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
};

export default ResultsPage;