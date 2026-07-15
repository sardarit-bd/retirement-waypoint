'use client';

import { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';

// Components
// import { AssessmentCover } from './components/AssessmentCover';
// import { AssessmentRegistration } from './components/AssessmentRegistration';
// import { AssessmentSurvey } from './components/AssessmentSurvey';
// import { AssessmentResults } from './components/AssessmentResults';

// Hooks
// import { useAssessmentValidation } from './hooks/useAssessmentValidation';
// import { useAssessmentProgress } from './hooks/useAssessmentProgress';
// import { useAssessmentSubmission } from '../hooks/useAssessmentSubmission';

// Utils
// import {
//   calculateOverallScore,
//   calculateProgress,
//   buildSubmissionPayload,
// } from './utils/assessment.helpers';
import { AssessmentCover } from './AssessmentCover';
import { AssessmentRegistration } from './AssessmentRegistration';
import { AssessmentResults } from './AssessmentResults';
import { AssessmentSurvey } from './AssessmentSurvey';
import { useAssessmentValidation } from '../hooks/useAssessmentValidation';
import { useAssessmentSubmission } from '../hooks/useAssessmentSubmission';
import { buildSubmissionPayload, calculateOverallScore, calculateProgress } from '../utils/assessment.helpers';

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

// Screen states
const SCREENS = {
  COVER: 'cover',
  REGISTER: 'register',
  SURVEY: 'survey',
  RESULTS: 'results',
};

export default function AssessmentForm({ assessment }) {
  const [screen, setScreen] = useState(SCREENS.COVER);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  // Get data from assessment
  const domains = assessment?.domains || [];
  const assessmentSlug = assessment?.slug;
  const accentColor = assessment?.accent || '#C9A84C';

  // Validation hook
  const {
    user,
    errors,
    handleFieldChange,
    handleFieldBlur,
    validateAll,
    resetValidation,
  } = useAssessmentValidation({ name: '', email: '' });

  // Submission mutation
  const submissionMutation = useAssessmentSubmission();

  // Progress calculation
  const progress = useMemo(() => {
    return calculateProgress(domains, answers);
  }, [domains, answers]);

  // Overall score calculation
  const overallScore = useMemo(() => {
    return calculateOverallScore(domains, answers);
  }, [domains, answers]);

  // Handlers
  const handleStartAssessment = useCallback(() => {
    setScreen(SCREENS.REGISTER);
  }, []);

  const handleRegisterSubmit = useCallback(() => {
    const result = validateAll();
    if (result.isValid) {
      setScreen(SCREENS.SURVEY);
      toast.success('Assessment started');
    } else {
      const firstError = result.errors.name || result.errors.email;
      toast.error(firstError);
    }
  }, [validateAll]);

  const handleRegisterBack = useCallback(() => {
    setScreen(SCREENS.COVER);
  }, []);

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  const handleReflectionAnswer = useCallback((key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleNextDomain = useCallback(() => {
    if (currentDomainIndex < domains.length - 1) {
      setCurrentDomainIndex((prev) => prev + 1);
    }
  }, [currentDomainIndex, domains.length]);

  const handlePreviousDomain = useCallback(() => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex((prev) => prev - 1);
    }
  }, [currentDomainIndex]);

  const handleSubmit = useCallback(() => {
    // Check if all questions are answered
    let allAnswered = true;
    let missingCount = 0;

    domains.forEach((domain) => {
      const questions = domain.questions || domain.items || [];
      questions.forEach((question, index) => {
        const questionId = question.id || `${domain.key}_${index}`;
        if (!answers[questionId]) {
          allAnswered = false;
          missingCount += 1;
        }
      });
    });

    if (!allAnswered) {
      toast.error(`Please answer all ${missingCount} remaining question(s) before submitting.`);
      return;
    }

    // Build payload
    const payload = buildSubmissionPayload(domains, answers, user, []);

    // Submit
    submissionMutation.mutate(
      {
        slug: assessmentSlug,
        data: payload,
      },
      {
        onSuccess: (response) => {
          setSubmissionResult(response.data);
          setScreen(SCREENS.RESULTS);
        },
        onError: (error) => {
          toast.error(error?.message || 'Failed to submit assessment. Please try again.');
        },
      }
    );
  }, [domains, answers, user, assessmentSlug, submissionMutation]);

  const handleReset = useCallback(() => {
    setScreen(SCREENS.COVER);
    setCurrentDomainIndex(0);
    setAnswers({});
    setSubmissionResult(null);
    resetValidation();
    toast.success('Assessment reset');
  }, [resetValidation]);

  // Render based on screen
  if (screen === SCREENS.COVER) {
    return <AssessmentCover assessment={assessment} onStart={handleStartAssessment} />;
  }

  if (screen === SCREENS.REGISTER) {
    return (
      <AssessmentRegistration
        user={user}
        errors={errors}
        onFieldChange={handleFieldChange}
        onFieldBlur={handleFieldBlur}
        onBack={handleRegisterBack}
        onSubmit={handleRegisterSubmit}
      />
    );
  }

  if (screen === SCREENS.RESULTS) {
    return (
      <AssessmentResults
        user={user}
        assessment={assessment}
        domains={domains}
        answers={answers}
        submissionResult={submissionResult}
        overallScore={overallScore}
        onReset={handleReset}
      />
    );
  }

  // SURVEY screen
  return (
    <AssessmentSurvey
      domains={domains}
      currentIndex={currentDomainIndex}
      answers={answers}
      progress={progress}
      isSubmitting={submissionMutation.isPending}
      onAnswer={handleAnswer}
      onReflectionAnswer={handleReflectionAnswer}
      onPrevious={handlePreviousDomain}
      onNext={handleNextDomain}
      onSubmit={handleSubmit}
    />
  );
}