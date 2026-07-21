import { Loader2 } from "lucide-react";
import DomainProgress from "./DomainProgress";
import QuestionItem from "./QuestionItem";
import ReflectionInput from "./ReflectionInput";
import AssessmentShell from "./AssessmentShell";

const glassCard = "rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl";

const SurveyPage = ({
  domains,
  current,
  answers,
  totalItems,
  progressPercent,
  isSubmitting,
  onAnswer,
  onReflectionChange,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const domain = domains[current] || {};
  const questions = domain.questions || domain.items || [];

  return (
    <AssessmentShell>
      <div className="mx-auto max-w-4xl">
        <DomainProgress
          domain={domain}
          current={current}
          total={domains.length}
          progressPercent={progressPercent}
        />

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
              {current * 3 + 1}–{current * 3 + questions.length} of {totalItems} items
            </div>
          </div>

          <div className="space-y-7">
            {questions.map((question, index) => {
              const questionId = question.id || `${domain.key}_${index}`;
              const selected = answers[questionId];

              return (
                <QuestionItem
                  key={questionId}
                  question={question}
                  questionId={questionId}
                  index={index}
                  current={current}
                  selected={selected}
                  onAnswer={onAnswer}
                />
              );
            })}
          </div>

          <ReflectionInput
            domain={domain}
            value={answers[`${domain.key}_open`] || ""}
            onChange={(value) => onReflectionChange(domain.key, value)}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            disabled={current === 0}
            onClick={onPrevious}
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-default disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={onNext}
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
};

export default SurveyPage;