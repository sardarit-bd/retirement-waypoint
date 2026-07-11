"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import {
  Award,
  BarChart3,
  Clock,
  Compass,
  Lock,
  MessageSquareText,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useAssessmentSubmission } from "@/features/assessment/public/assessment/hooks/useAssessmentSubmission";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const scale = [
  { label: "Strongly agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly disagree", value: 1 },
];

const glassCard =
  "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl";

const AssessmentShell = ({ children }) => {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">{children}</div>
    </section>
  );
};

export default function AssessmentForm({ assessment }) {
  const [screen, setScreen] = useState("cover");
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState({ name: "", email: "" });
  const [answers, setAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  const submissionMutation = useAssessmentSubmission();

  // Handle both old and new data structure
  const domains = assessment.domains || [];
  const introduction = assessment.introduction || {};
  const hero = assessment.hero || {};
  const assessmentSlug = assessment.slug;

  const domain = domains[current] || {};

  const getDomainScore = (item) => {
    let total = 0;
    let count = 0;

    (item.questions || item.items || []).forEach((question, index) => {
      // Use the actual question ID as the key
      const questionId = question.id || `${item.key}_${index}`;
      const value = answers[questionId];

      if (value) {
        total += value;
        count += 1;
      }
    });

    return count ? Math.round((total / (count * 5)) * 100) : 0;
  };

  const overallScore = Math.round(
    domains.reduce((sum, item) => sum + getDomainScore(item), 0) /
      (domains.length || 1),
  );

  const totalItems = domains.reduce(
    (sum, item) => sum + (item.questions || item.items || []).length,
    0,
  );

  const answeredTotal = domains.reduce((sum, item) => {
    const items = item.questions || item.items || [];
    const count = items.filter((question, index) => {
      const questionId = question.id || `${item.key}_${index}`;
      return answers[questionId];
    }).length;
    return sum + count;
  }, 0);

  const progressPercent = Math.round((answeredTotal / (totalItems || 1)) * 100);

  const handleStart = () => {
    if (!user.name || !user.email) {
      toast.error("Please enter your name and email");
      return;
    }

    setScreen("survey");
    toast.success("Assessment started");
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    let allAnswered = true;
    const missingQuestions = [];

    domains.forEach((domain) => {
      const items = domain.questions || domain.items || [];
      items.forEach((question, index) => {
        const questionId = question.id || `${domain.key}_${index}`;
        if (!answers[questionId]) {
          allAnswered = false;
          missingQuestions.push(questionId);
        }
      });
    });

    if (!allAnswered) {
      toast.error(`Please answer all questions before submitting.`);
      return;
    }

    // ============================================================
    // FIX: Build payload matching backend contract exactly
    // ============================================================

    // 1. Build flat answers array with actual question IDs
    const flatAnswers = domains.flatMap((domain) => {
      const items = domain.questions || domain.items || [];
      return items.map((question, index) => {
        const questionId = question.id || `${domain.key}_${index}`;
        const value = answers[questionId] || 0;
        // Find the option to get the score
        const option = scale.find(o => o.value === value);
        return {
          questionId: questionId,  // Use actual question.id from backend
          domainId: domain.id,     // Use actual domain.id from backend
          value: value,
          score: option?.value || 0,
        };
      });
    });

    // 2. Build reflections array
    const reflections = domains.map((domain) => ({
      domainId: domain.id,
      domainKey: domain.key,
      question: domain.reflection?.question || domain.open || '',
      answer: answers[`${domain.key}_open`] || '',
    }));

    // 3. Build participant object
    const participant = {
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
    };

    // 4. Final payload - matches backend schema exactly
    const submissionData = {
      participant,
      answers: flatAnswers,
      reflections,
    };

    // Log payload for debugging
    console.log('📦 Submission Payload:', JSON.stringify(submissionData, null, 2));

    // Submit to backend
    submissionMutation.mutate(
      {
        slug: assessmentSlug,
        data: submissionData,
      },
      {
        onSuccess: (response) => {
          setSubmissionResult(response.data);
          setScreen("results");
        },
      }
    );
  };

  // Chart data for results
  const chartData = {
    labels: domains.map((item) => item.label),
    datasets: [
      {
        data: domains.map((item) => getDomainScore(item)),
        backgroundColor: `${assessment.accent || '#C9A84C'}22`,
        borderColor: assessment.accent || '#C9A84C',
        borderWidth: 2,
        pointBackgroundColor: domains.map((item) => item.color || '#C9A84C'),
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          backdropColor: "transparent",
          color: "#94a3b8",
          font: { size: 10 },
        },
        grid: { color: "rgba(255,255,255,0.12)" },
        angleLines: { color: "rgba(255,255,255,0.12)" },
        pointLabels: {
          color: "#ffffff",
          font: { size: 11 },
        },
      },
    },
  };

  const isSubmitting = submissionMutation.isPending;

  // Cover Page
  if (screen === "cover") {
    return (
      <AssessmentShell>
        <div className={`mx-auto max-w-3xl overflow-hidden ${glassCard}`}>
          <div className="px-6 py-10 text-center sm:px-10 md:px-14">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg">
              <Compass className="h-8 w-8" />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
              Retirement Waypoint
            </p>

            <span
              className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: `${assessment.accent || '#C9A84C'}22`,
                color: "#ffffff",
              }}
            >
              {introduction.subtitle || hero.subtitle || assessment.segment || "Retirement Assessment"}
            </span>

            <h1 className="mx-auto mb-5 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
              {introduction.title || hero.title || assessment.title || "Assessment"}
            </h1>

            <p className="mb-7 text-sm font-semibold text-[#C9A84C]">
              {assessment.introduction?.author || "David Allen, Ph.D."}
            </p>

            <p className="mx-auto max-w-xl text-base leading-8 text-white/70">
              {introduction.description || hero.description || assessment.intro || 
                "This assessment measures your retirement readiness across five key behavioral domains."}
            </p>

            <div className="my-8 h-px bg-white/10" />

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Clock, label: introduction.duration || "10–12 min" },
                { icon: BarChart3, label: `${totalItems} scaled items` },
                { icon: MessageSquareText, label: `${domains.length} reflections` },
                { icon: Lock, label: "Confidential" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white/70 backdrop-blur-xl"
                >
                  <Icon className="h-4 w-4 text-[#C9A84C]" />
                  {label}
                </div>
              ))}
            </div>

            <p className="mx-auto mb-8 max-w-xl text-center text-sm italic leading-7 text-white/55">
              Answer based on where you are today — not where you think you
              should be. Honest responses create the most useful results.
            </p>

            <button
              onClick={() => setScreen("register")}
              className="cursor-pointer rounded-xl bg-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D6B45A] hover:shadow-xl"
            >
              {introduction.ctaButton || "Begin assessment"}
            </button>
          </div>
        </div>
      </AssessmentShell>
    );
  }

  // Registration Page
  if (screen === "register") {
    return (
      <AssessmentShell>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 mt-13">
            <div className="h-1 rounded-full bg-white/15">
              <div
                className="h-1 rounded-full bg-[#C9A84C] transition-all duration-500"
                style={{ width: "12%" }}
              />
            </div>

            <div className="mt-2 flex justify-between text-xs text-white/50">
              <span>Getting started</span>
              <span>Step 1 of 6</span>
            </div>
          </div>

          <div className={`${glassCard} p-6 sm:p-8`}>
            <h2 className="mb-2 text-2xl font-semibold text-white">
              Before we begin
            </h2>

            <p className="mb-7 text-sm leading-7 text-white/65">
              Your responses are confidential and used only to deliver your
              personalized results.
            </p>

            <label className="mb-2 block text-sm font-semibold text-white/70">
              Your name
            </label>
            <input
              className="mb-5 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
              placeholder="Your name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />

            <label className="mb-2 block text-sm font-semibold text-white/70">
              Email address
            </label>
            <input
              className="mb-5 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
              placeholder="you@example.com"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <div className="mb-7 flex gap-2 rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 p-4 text-sm leading-6 text-white/65">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A84C]" />
              <p>
                Your information is never shared or sold. David Allen, Ph.D. may
                follow up with resources tailored to your results.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setScreen("cover")}
                className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Back
              </button>

              <button
                onClick={handleStart}
                className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </AssessmentShell>
    );
  }

  // Results Page
  if (screen === "results") {
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
              onClick={() => {
                setScreen("cover");
                setCurrent(0);
                setAnswers({});
                setUser({ name: "", email: "" });
                setSubmissionResult(null);
                toast.success("Assessment reset");
              }}
              className="cursor-pointer rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
            >
              Start over
            </button>
          </div>
        </div>
      </AssessmentShell>
    );
  }

  // Survey Page
  return (
    <AssessmentShell>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <div className="h-1 rounded-full bg-white/15">
            <div
              className="h-1 rounded-full bg-[#C9A84C] transition-all duration-500"
              style={{
                width: `${Math.max(progressPercent, 8)}%`,
              }}
            />
          </div>

          <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs text-white/50">
            <span>{domain.label}</span>
            <span>
              Domain {current + 1} of {domains.length}
            </span>
          </div>
        </div>

        <div className={`${glassCard} mb-5 p-6 sm:p-8`}>
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <span
                className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white"
                style={{
                  backgroundColor: `${domain.color || '#C9A84C'}55`,
                }}
              >
                {domain.label}
              </span>

              <h2 className="mb-2 text-2xl font-semibold text-white">
                {domain.label}
              </h2>

              <p className="max-w-2xl text-sm leading-7 text-white/65">
                {domain.description}
              </p>
            </div>

            <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-3 text-sm font-semibold text-[#C9A84C]">
              {current * 3 + 1}–{current * 3 + (domain.questions || domain.items || []).length} of{" "}
              {totalItems} items
            </div>
          </div>

          <div className="space-y-7">
            {(domain.questions || domain.items || []).map((question, index) => {
              // Use the actual question ID for state key
              const questionId = question.id || `${domain.key}_${index}`;
              const selected = answers[questionId];
              const itemText = typeof question === 'string' ? question : question.text || '';

              return (
                <div key={questionId} className="border-b border-white/10 pb-7">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
                    Item {current * 3 + index + 1}
                  </p>

                  <p className="mb-4 text-base leading-7 text-white/85">
                    {itemText}
                  </p>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                    {scale.map((option) => {
                      const isSelected = selected === option.value;

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(questionId, option.value)}
                          className="cursor-pointer rounded-xl border px-3 py-3 text-xs font-semibold leading-snug transition-all duration-200 hover:-translate-y-0.5"
                          style={{
                            backgroundColor: isSelected
                              ? "rgba(34,197,94,0.25)"
                              : "rgba(255,255,255,0.08)",

                            borderColor: isSelected
                              ? "#22C55E"
                              : "rgba(255,255,255,0.12)",

                            color: isSelected
                              ? "#ffffff"
                              : "rgba(255,255,255,0.65)",

                            boxShadow: isSelected
                              ? "0 0 0 1px rgba(34,197,94,0.35)"
                              : "none",
                          }}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-white/40">
              Reflection Question
            </label>

            <p className="mb-3 text-sm italic leading-7 text-white/70">
              {domain.reflection?.question || domain.open || ''}
            </p>

            <textarea
              className="min-h-[110px] w-full resize-y rounded-xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/35 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20"
              value={answers[`${domain.key}_open`] || ""}
              placeholder="Share your thoughts here..."
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [`${domain.key}_open`]: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-default disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (current === domains.length - 1) {
                handleSubmit();
              } else {
                setCurrent(current + 1);
              }
            }}
            disabled={isSubmitting}
            className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="inline h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              current === domains.length - 1 ? "Submit Assessment" : "Next domain"
            )}
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}