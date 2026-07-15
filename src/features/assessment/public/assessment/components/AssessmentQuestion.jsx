'use client';

import { SCALE_OPTIONS } from '../utils/assessment.helpers';

export const AssessmentQuestion = ({
  question,
  questionId,
  index,
  currentDomainIndex,
  selectedValue,
  onAnswer,
}) => {
  const questionText = typeof question === 'string' ? question : question?.text || '';

  return (
    <div className="border-b border-white/10 pb-7">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/40">
        Item {currentDomainIndex * 3 + index + 1}
      </p>

      <p className="mb-4 text-base leading-7 text-white/85">{questionText}</p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {SCALE_OPTIONS.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              onClick={() => onAnswer(questionId, option.value)}
              className="cursor-pointer rounded-xl border px-3 py-3 text-xs font-semibold leading-snug transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: isSelected
                  ? 'rgba(34,197,94,0.25)'
                  : 'rgba(255,255,255,0.08)',
                borderColor: isSelected ? '#22C55E' : 'rgba(255,255,255,0.12)',
                color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.65)',
                boxShadow: isSelected ? '0 0 0 1px rgba(34,197,94,0.35)' : 'none',
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};