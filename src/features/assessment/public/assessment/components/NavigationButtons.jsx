'use client';

import { Loader2 } from 'lucide-react';

export const NavigationButtons = ({
  current,
  total,
  isLast,
  isSubmitting,
  onPrevious,
  onSubmit,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        disabled={current === 0}
        onClick={onPrevious}
        className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-default disabled:opacity-40"
      >
        Previous
      </button>

      <button
        onClick={isLast ? onSubmit : onNext}
        disabled={isSubmitting}
        className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : isLast ? (
          'Submit Assessment'
        ) : (
          'Next domain'
        )}
      </button>
    </div>
  );
};