"use client";

import { useState } from "react";
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
  RegistrationPage,
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
  const trimmed = value.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < 2) return "Name must be at least 2 characters.";
  if (trimmed.length > 100) return "Name must be at most 100 characters.";
  if (!NAME_REGEX.test(trimmed)) {
    return "Please enter a valid name (letters, spaces, apostrophes, and hyphens only).";
  }
  return "";
};

const validateEmail = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "Email address is required.";
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
    const nameError = validateName(user.name);
    const emailError = validateEmail(user.email);

    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
      toast.error(nameError || emailError);
      return;
    }

    setErrors({ name: "", email: "" });
    setUser((prev) => ({
      ...prev,
      name: prev.name.trim(),
      email: prev.email.trim().toLowerCase(),
    }));
    setScreen("survey");
    toast.success("Assessment started");
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
      <CoverPage
        assessment={assessment}
        introduction={introduction}
        hero={hero}
        totalItems={totalItems}
        domains={domains}
        onBegin={() => setScreen("register")}
      />
    );
  }

  // Registration Page
  if (screen === "register") {
    return (
      <RegistrationPage
        user={user}
        errors={errors}
        onUserChange={setUser}
        onBack={() => setScreen("cover")}
        onContinue={handleStart}
        validateName={validateName}
        validateEmail={validateEmail}
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
        submissionResult={submissionResult}
        overallScore={overallScore}
        getDomainScore={getDomainScore}
        chartData={chartData}
        chartOptions={chartOptions}
        onStartOver={() => {
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
          handleSubmit();
        } else {
          setCurrent(current + 1);
        }
      }}
      onSubmit={handleSubmit}
    />
  );
}