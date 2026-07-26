import { Award, TrendingUp, TrendingDown, MinusIcon } from "lucide-react";
import { Radar } from "react-chartjs-2";
import AssessmentShell from "./AssessmentShell";

const glassCard = "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl";

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
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-400">
        <TrendingUp className="h-4 w-4" />
        {absolute ? `+${Math.abs(change)}` : `+${change}%`}
      </span>
    );
  }
  if (direction === "declined") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-red-400">
        <TrendingDown className="h-4 w-4" />
        {absolute ? `-${Math.abs(change)}` : `${change}%`}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/60">
      <MinusIcon className="h-4 w-4" />
      No change
    </span>
  );
};

const ResultsPage = ({
  user,
  assessment,
  domains,
  submissionResult,
  previousSubmission,
  overallScore,
  getDomainScore,
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

  const displayScore = resultData.overallScore || overallScore;
  const displayDomainScores = resultData.domainScores || domains.map((item) => ({
    domainId: item.id,
    domainKey: item.key,
    domainLabel: item.label,
    percentage: getDomainScore(item),
  }));

  // Build a map of previous domain scores keyed by domainKey for easy lookup
  const prevDomainMap = {};
  if (previousSubmission?.domainScores) {
    previousSubmission.domainScores.forEach((ds) => {
      prevDomainMap[ds.domainKey || ds.domainId] = ds.percentage;
    });
  }

  return (
    <AssessmentShell>
      <div className="mx-auto max-w-7xl space-y-5">
        <div className={`${glassCard} p-8 text-center`}>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B]">
            <Award className="h-7 w-7" />
          </div>

          <h2 className="text-2xl font-semibold text-white">
            {user.name} — your {assessment.type || "Retirement"} profile
          </h2>

          {/* Current Score */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Current Score
            </p>
            <p className="mt-2 text-6xl font-bold text-[#C9A84C]">
              {displayScore}%
            </p>
          </div>

          {/* Comparison with Previous */}
          {previousSubmission && (
            <div className="mx-auto mt-6 inline-flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Compared with your last assessment
              </p>

              <div className="flex items-center gap-4 sm:gap-8">
                {/* Previous */}
                <div className="text-center">
                  <p className="text-xs text-white/40">
                    {formatDate(previousSubmission.completedAt)}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white/60">
                    {previousSubmission.overallScore}%
                  </p>
                  <p className="text-xs text-white/35">Previous</p>
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
                  <p className="text-xs text-[#C9A84C]/60">Today</p>
                  <p className="mt-1 text-lg font-semibold text-[#C9A84C]">
                    {displayScore}%
                  </p>
                  <p className="text-xs text-[#C9A84C]/50">Current</p>
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
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {previousSubmission.scoreChangeDirection === "improved" &&
                `Great progress! Your retirement readiness improved by ${Math.abs(previousSubmission.scoreChange)} points since your last assessment.`}
              {previousSubmission.scoreChangeDirection === "declined" &&
                `Your score changed since your last assessment. Review your results to identify areas for improvement.`}
              {previousSubmission.scoreChangeDirection === "unchanged" &&
                `Your score is consistent with your last assessment. You're maintaining your readiness level.`}
              {!previousSubmission.scoreChangeDirection &&
                `You're making measurable progress in your retirement journey.`}
            </p>
          )}

          {resultData?.resultRange && (
            <p className="mt-5 text-lg text-white/70">
              {resultData.resultRange.title}
            </p>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
          <div className={`${glassCard} p-6`}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              Domain Profile
            </p>
            <Radar data={chartData} options={chartOptions} />
          </div>

          <div className="space-y-4">
            {displayDomainScores.map((item, index) => {
              const domainItem = domains[index] || {};
              const score = item.percentage || 0;
              const prevScore = prevDomainMap[item.domainKey || item.domainId];
              const hasPrev = prevScore !== undefined;

              // Compute domain-level change
              let domainChange = null;
              let domainChangeDirection = null;
              if (hasPrev) {
                domainChange = Math.round(score - prevScore);
                domainChangeDirection = domainChange > 0 ? "improved" : domainChange < 0 ? "declined" : "unchanged";
              }

              return (
                <div key={item.domainKey || item.domainId} className={`${glassCard} p-5`}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white">
                      {item.domainLabel || domainItem.label || "Domain"}
                    </h3>
                  </div>

                  {/* Comparison scores */}
                  <div className="flex items-center gap-4">
                    {/* Current */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#C9A84C]/60 font-medium">Current</span>
                        <span className="font-bold" style={{ color: domainItem.color || '#C9A84C' }}>
                          {score}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/15">
                        <div
                          className="h-2 rounded-full transition-all duration-700"
                          style={{
                            width: `${score}%`,
                            backgroundColor: domainItem.color || '#C9A84C',
                          }}
                        />
                      </div>
                    </div>

                    {/* Previous */}
                    {hasPrev && (
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/35 font-medium">Previous</span>
                          <span className="text-sm font-medium text-white/50">
                            {prevScore}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full transition-all duration-700"
                            style={{
                              width: `${prevScore}%`,
                              backgroundColor: `${domainItem.color || '#C9A84C'}60`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Domain change indicator */}
                  {hasPrev && (
                    <div className="mt-2 flex justify-end">
                      {domainChangeDirection === "improved" && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400/80">
                          <TrendingUp className="h-3 w-3" />
                          Improved +{domainChange}
                        </span>
                      )}
                      {domainChangeDirection === "declined" && (
                        <span className="inline-flex items-center gap-1 text-xs text-red-400/80">
                          <TrendingDown className="h-3 w-3" />
                          Declined {domainChange}
                        </span>
                      )}
                      {domainChangeDirection === "unchanged" && (
                        <span className="inline-flex items-center gap-1 text-xs text-white/35">
                          <MinusIcon className="h-3 w-3" />
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

        <div className={`${glassCard} p-6`}>
          <h3 className="mb-2 text-lg font-semibold text-white">
            {resultData?.resultRange?.title || assessment.nextStepsTitle || "What this means for your planning"}
          </h3>

          <p className="leading-7 text-white/65">
            {resultData?.resultRange?.description || assessment.nextSteps ||
              "Domains scoring below 60% are meaningful areas to explore and strengthen as you prepare for your next chapter."}
          </p>

          {resultData?.recommendations && resultData.recommendations.length > 0 && (
            <ul className="mt-4 space-y-2">
              {resultData.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-white/60 flex items-start gap-2">
                  <span className="text-[#C9A84C]">•</span>
                  <span>{rec.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={onStartOver}
            className="cursor-pointer rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
          >
            Start over
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
};

export default ResultsPage;