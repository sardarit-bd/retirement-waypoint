import { Award } from "lucide-react";
import { Radar } from "react-chartjs-2";
import AssessmentShell from "./AssessmentShell";

const glassCard = "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl";

const ResultsPage = ({
  user,
  assessment,
  domains,
  submissionResult,
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

          <p className="mt-4 text-6xl font-bold text-[#C9A84C]">
            {displayScore}%
          </p>

          {resultData?.resultRange && (
            <p className="mt-4 text-lg text-white/70">
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

              return (
                <div key={item.domainKey || item.domainId} className={`${glassCard} p-5`}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white">
                      {item.domainLabel || domainItem.label || "Domain"}
                    </h3>

                    <span className="font-bold" style={{ color: domainItem.color || '#C9A84C' }}>
                      {score}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${score}%`,
                        backgroundColor: domainItem.color || '#C9A84C',
                      }}
                    />
                  </div>
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