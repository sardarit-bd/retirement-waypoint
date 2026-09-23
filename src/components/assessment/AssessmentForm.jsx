"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { useAssessmentSubmission } from "@/features/assessment/public/assessment/hooks/useAssessmentSubmission";
import {
  CoverPage,
  NamePage,
  EmailPage,
  ResultsPage,
  SurveyPage,
} from "./index";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const scale = [
  { label: "Strongly agree", value: 5 },
  { label: "Agree", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Disagree", value: 2 },
  { label: "Strongly disagree", value: 1 },
];

const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateName = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (trimmed.length > 100) return "Name must be at most 100 characters.";
  if (!NAME_REGEX.test(trimmed)) {
    return "Please enter a valid name (letters, spaces, apostrophes, and hyphens only).";
  }
  return "";
};

const validateEmail = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Please enter a valid email address.";
  }
  return "";
};

export default function AssessmentForm({ assessment }) {
  const [screen, setScreen] = useState("cover");
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [answers, setAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [draftData, setDraftData] = useState(null);

  const assessmentSlug = assessment.slug;
  const storageKey = assessmentSlug ? `assessment-draft-${assessmentSlug}` : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [current, screen]);

  // Check for saved draft on mount
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const hasAnswers = parsed.answers && Object.keys(parsed.answers).length > 0;
        const hasProgress =
          parsed.current > 0 ||
          hasAnswers ||
          (parsed.user?.name && parsed.screen && parsed.screen !== "cover");

        if (hasProgress && parsed.screen !== "results") {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setDraftData(parsed);
          setHasDraft(true);
        }
      }
    } catch (err) {
      console.error("Failed to load draft from localStorage:", err);
    }
  }, [storageKey]);

  // Save draft whenever state changes (except on cover or results)
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    if (screen === "cover" || screen === "results") return;

    try {
      const draft = {
        screen,
        current,
        answers,
        user: { name: user.name, email: user.email || "" },
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(storageKey, JSON.stringify(draft));
    } catch (err) {
      console.error("Failed to save draft to localStorage:", err);
    }
  }, [storageKey, screen, current, answers, user.name, user.email]);

  const handleResumeDraft = () => {
    if (!draftData) return;
    if (draftData.screen) setScreen(draftData.screen);
    if (typeof draftData.current === "number") setCurrent(draftData.current);
    if (draftData.answers) setAnswers(draftData.answers);
    if (draftData.user) setUser(draftData.user);
    setHasDraft(false);
    toast.success("Progress restored");
  };

  const handleDismissDraft = () => {
    if (storageKey && typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
    setHasDraft(false);
    setDraftData(null);
  };

  const submissionMutation = useAssessmentSubmission();

  // Handle both old and new data structure
  const domains = assessment.domains || [];
  const introduction = assessment.introduction || {};
  const hero = assessment.hero || {};

  const domain = domains[current] || {};

  const getDomainScore = (item) => {
    let total = 0;
    let count = 0;

    (item.questions || item.items || []).forEach((question, index) => {
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

  const totalSteps = (domains.length || 5) + 2;

  const handleStart = () => {
    const nameError = validateName(user.name);

    if (nameError) {
      setErrors((prev) => ({ ...prev, name: nameError }));
      toast.error(nameError);
      return;
    }

    setErrors({ name: "", email: "" });
    setUser((prev) => ({
      ...prev,
      name: prev.name.trim(),
    }));
    setScreen("survey");
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleReflectionChange = (domainKey, value) => {
    setAnswers({
      ...answers,
      [`${domainKey}_open`]: value,
    });
  };

  const handleSubmit = async () => {
    if (user.email && user.email.trim()) {
      const emailError = validateEmail(user.email);
      if (emailError) {
        setErrors((prev) => ({ ...prev, email: emailError }));
        toast.error(emailError);
        return;
      }
    }
    setErrors((prev) => ({ ...prev, email: "" }));

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

    // 1. Build flat answers array with actual question IDs
    const flatAnswers = domains.flatMap((domain) => {
      const items = domain.questions || domain.items || [];
      return items.map((question, index) => {
        const questionId = question.id || `${domain.key}_${index}`;
        const value = answers[questionId] || 0;
        const option = scale.find(o => o.value === value);
        return {
          questionId: questionId,
          domainId: domain.id,
          value: value,
          score: option?.value || 0,
        };
      });
    });

    // 2. Build reflections array
    const reflections = domains.map((domain) => ({
      domainId: domain.id,
      domainKey: domain.key,
      question: domain.reflection?.question || domain.openQuestion || domain.open || '',
      answer: answers[`${domain.key}_open`] || '',
    }));

    // 3. Build participant object
    const participant = {
      name: user.name.trim() || 'Participant',
      email: (user.email || '').trim().toLowerCase(),
    };

    // 4. Final payload - matches backend schema exactly
    const submissionData = {
      participant,
      answers: flatAnswers,
      reflections,
    };

    // Submit to backend
    submissionMutation.mutate(
      {
        slug: assessmentSlug,
        data: submissionData,
      },
      {
        onSuccess: (response) => {
          if (storageKey && typeof window !== "undefined") {
            localStorage.removeItem(storageKey);
          }
          setHasDraft(false);
          setDraftData(null);
          setSubmissionResult({
            ...(response?.data || {}),
            reflections: response?.data?.reflections || reflections,
          });
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
      <div className="relative">
        {hasDraft && (
          <div className="fixed top-20 left-1/2 z-40 w-full max-w-2xl -translate-x-1/2 px-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-[#C9A84C]/40 bg-[#0F172A]/95 p-4 shadow-2xl backdrop-blur-xl">
              <div>
                <p className="text-sm font-semibold text-white">
                  You have an assessment in progress
                </p>
                <p className="text-xs text-white/60">
                  Would you like to resume where you left off?
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDismissDraft}
                  className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
                >
                  Start Over
                </button>
                <button
                  onClick={handleResumeDraft}
                  className="cursor-pointer rounded-xl bg-[#C9A84C] px-3.5 py-1.5 text-xs font-semibold text-[#1B2B4B] shadow-md transition hover:bg-[#D6B45A]"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        )}
        <CoverPage
          assessment={assessment}
          introduction={introduction}
          hero={hero}
          totalItems={totalItems}
          domains={domains}
          onBegin={() => setScreen("name")}
        />
      </div>
    );
  }

  // Name Page (Before we begin)
  if (screen === "name" || screen === "register") {
    return (
      <NamePage
        user={user}
        errors={errors}
        onUserChange={setUser}
        onBack={() => setScreen("cover")}
        onContinue={handleStart}
        validateName={validateName}
        totalSteps={totalSteps}
      />
    );
  }

  // Email Page (Before You View Your Report)
  if (screen === "email") {
    return (
      <EmailPage
        user={user}
        errors={errors}
        onUserChange={setUser}
        onBack={() => setScreen("survey")}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        validateEmail={validateEmail}
        totalSteps={totalSteps}
      />
    );
  }

  // Results Page
  if (screen === "results") {
    return (
      <ResultsPage
        user={user}
        assessment={assessment}
        domains={domains}
        answers={answers}
        submissionResult={submissionResult}
        previousSubmission={submissionResult?.previousSubmission || null}
        overallScore={overallScore}
        getDomainScore={getDomainScore}
        chartData={chartData}
        chartOptions={chartOptions}
        onStartOver={() => {
          if (storageKey && typeof window !== "undefined") {
            localStorage.removeItem(storageKey);
          }
          setHasDraft(false);
          setDraftData(null);
          setScreen("cover");
          setCurrent(0);
          setAnswers({});
          setUser({ name: "", email: "" });
          setSubmissionResult(null);
          toast.success("Assessment reset");
        }}
      />
    );
  }

  // Survey Page
  return (
    <SurveyPage
      domains={domains}
      current={current}
      answers={answers}
      totalItems={totalItems}
      progressPercent={progressPercent}
      isSubmitting={isSubmitting}
      onAnswer={handleAnswer}
      onReflectionChange={handleReflectionChange}
      onPrevious={() => setCurrent(current - 1)}
      onNext={() => {
        if (current === domains.length - 1) {
          setScreen("email");
        } else {
          setCurrent(current + 1);
        }
      }}
      onSubmit={handleSubmit}
    />
  );
}