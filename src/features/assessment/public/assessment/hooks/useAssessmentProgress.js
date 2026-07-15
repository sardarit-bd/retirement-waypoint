import { useMemo } from 'react';
import {
  calculateTotalQuestions,
  calculateAnsweredQuestions,
  calculateProgress,
} from '../utils/assessment.helpers';

export const useAssessmentProgress = (domains, answers) => {
  const totalQuestions = useMemo(() => {
    return calculateTotalQuestions(domains);
  }, [domains]);

  const answeredQuestions = useMemo(() => {
    return calculateAnsweredQuestions(domains, answers);
  }, [domains, answers]);

  const progress = useMemo(() => {
    return calculateProgress(domains, answers);
  }, [domains, answers]);

  const isComplete = useMemo(() => {
    return totalQuestions > 0 && answeredQuestions === totalQuestions;
  }, [totalQuestions, answeredQuestions]);

  const getMissingQuestions = useMemo(() => {
    const missing = [];
    domains.forEach((domain) => {
      const questions = domain.questions || domain.items || [];
      questions.forEach((question, index) => {
        const questionId = question.id || `${domain.key}_${index}`;
        if (!answers[questionId]) {
          missing.push(questionId);
        }
      });
    });
    return missing;
  }, [domains, answers]);

  return {
    totalQuestions,
    answeredQuestions,
    progress,
    isComplete,
    missingQuestions: getMissingQuestions,
  };
};