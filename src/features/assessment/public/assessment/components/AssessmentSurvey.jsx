'use client';

import { AssessmentProgress } from './AssessmentProgress';
import { AssessmentQuestion } from './AssessmentQuestion';
import { ReflectionSection } from './ReflectionSection';
import { NavigationButtons } from './NavigationButtons';
import { glassCardStyle } from './AssessmentShell';
import { getDomainQuestions, getQuestionId, getQuestionText } from '../utils/assessment.helpers';

export const AssessmentSurvey = ({
  domains,
  currentIndex,
  answers,
  progress,
  isSubmitting,
  onAnswer,
  onReflectionAnswer,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const domain = domains[currentIndex] || {};
  const questions = getDomainQuestions(domain);
  const totalDomains = domains.length;
  const isLast = currentIndex === totalDomains - 1;
  const accentColor = domain?.color || '#C9A84C';

  return (
    <div className="mx-auto max-w-4xl">
      <AssessmentProgress
        domain={domain}
        current={currentIndex}
        total={totalDomains}
        progress={progress}
      />

      <div className={`${glassCardStyle} mb-5 p-6 sm:p-8`}>
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-bold text-white"
              style={{ backgroundColor: `${accentColor}55` }}
            >
              {domain.label}
            </span>

            <h2 className="mb-2 text-2xl font-semibold text-white">{domain.label}</h2>

            <p className="max-w-2xl text-sm leading-7 text-white/65">{domain.description}</p>
          </div>

          <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-3 text-sm font-semibold text-[#C9A84C]">
            {currentIndex * 3 + 1}–{currentIndex * 3 + questions.length} of{' '}
            {domains.reduce((sum, d) => sum + getDomainQuestions(d).length, 0)} items
          </div>
        </div>

        <div className="space-y-7">
          {questions.map((question, index) => {
            const questionId = getQuestionId(question, domain.key, index);
            const selectedValue = answers[questionId];
            const questionText = getQuestionText(question);

            return (
              <AssessmentQuestion
                key={questionId}
                question={question}
                questionId={questionId}
                index={index}
                currentDomainIndex={currentIndex}
                selectedValue={selectedValue}
                onAnswer={onAnswer}
              />
            );
          })}
        </div>

        <ReflectionSection
          domain={domain}
          domainKey={domain.key}
          value={answers[`${domain.key}_open`] || ''}
          onAnswer={onReflectionAnswer}
        />
      </div>

      <NavigationButtons
        current={currentIndex}
        total={totalDomains}
        isLast={isLast}
        isSubmitting={isSubmitting}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};