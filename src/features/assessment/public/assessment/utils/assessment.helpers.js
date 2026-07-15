
// Scale options
export const SCALE_OPTIONS = [
  { label: 'Strongly agree', value: 5 },
  { label: 'Agree', value: 4 },
  { label: 'Neutral', value: 3 },
  { label: 'Disagree', value: 2 },
  { label: 'Strongly disagree', value: 1 },
];

/**
 * Get questions from a domain (handles both old and new data structure)
 */
export const getDomainQuestions = (domain) => {
  return domain?.questions || domain?.items || [];
};

/**
 * Get question ID (handles both old and new data structure)
 */
export const getQuestionId = (question, domainKey, index) => {
  return question?.id || `${domainKey}_${index}`;
};

/**
 * Get question text (handles both old and new data structure)
 */
export const getQuestionText = (question) => {
  if (typeof question === 'string') return question;
  return question?.text || '';
};

/**
 * Calculate domain score
 */
export const calculateDomainScore = (domain, answers) => {
  const questions = getDomainQuestions(domain);
  let total = 0;
  let count = 0;

  questions.forEach((question, index) => {
    const questionId = getQuestionId(question, domain.key, index);
    const value = answers[questionId];
    if (value) {
      total += value;
      count += 1;
    }
  });

  return count ? Math.round((total / (count * 5)) * 100) : 0;
};

/**
 * Calculate overall score
 */
export const calculateOverallScore = (domains, answers) => {
  if (!domains || domains.length === 0) return 0;
  const total = domains.reduce((sum, domain) => sum + calculateDomainScore(domain, answers), 0);
  return Math.round(total / domains.length);
};

/**
 * Calculate total questions
 */
export const calculateTotalQuestions = (domains) => {
  return domains.reduce(
    (sum, domain) => sum + getDomainQuestions(domain).length,
    0
  );
};

/**
 * Calculate answered questions
 */
export const calculateAnsweredQuestions = (domains, answers) => {
  let count = 0;
  domains.forEach((domain) => {
    const questions = getDomainQuestions(domain);
    questions.forEach((question, index) => {
      const questionId = getQuestionId(question, domain.key, index);
      if (answers[questionId]) {
        count += 1;
      }
    });
  });
  return count;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (domains, answers) => {
  const total = calculateTotalQuestions(domains);
  if (total === 0) return 0;
  const answered = calculateAnsweredQuestions(domains, answers);
  return Math.round((answered / total) * 100);
};

/**
 * Build assessment submission payload
 */
export const buildSubmissionPayload = (domains, answers, user, reflections) => {
  // Build flat answers array
  const flatAnswers = domains.flatMap((domain) => {
    const questions = getDomainQuestions(domain);
    return questions.map((question, index) => {
      const questionId = getQuestionId(question, domain.key, index);
      const value = answers[questionId] || 0;
      const option = SCALE_OPTIONS.find((o) => o.value === value);
      return {
        questionId,
        domainId: domain.id,
        value,
        score: option?.value || 0,
      };
    });
  });

  // Build reflections array
  const reflectionData = domains.map((domain) => ({
    domainId: domain.id,
    domainKey: domain.key,
    question: domain.reflection?.question || domain.open || '',
    answer: answers[`${domain.key}_open`] || '',
  }));

  return {
    participant: {
      name: user.name.trim(),
      email: user.email.trim().toLowerCase(),
    },
    answers: flatAnswers,
    reflections: reflectionData,
  };
};

/**
 * Get domain color with fallback
 */
export const getDomainColor = (domain, fallback = '#C9A84C') => {
  return domain?.color || fallback;
};

/**
 * Get assessment accent color
 */
export const getAssessmentAccent = (assessment, fallback = '#C9A84C') => {
  return assessment?.accent || fallback;
};