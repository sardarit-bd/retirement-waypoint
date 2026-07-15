'use client';

import { Clock, BarChart3, MessageSquareText, Lock, Compass } from 'lucide-react';
import { AssessmentShell, glassCardStyle } from './AssessmentShell';
import { calculateTotalQuestions } from '../utils/assessment.helpers';

export const AssessmentCover = ({ assessment, onStart }) => {
  const domains = assessment.domains || [];
  const introduction = assessment.introduction || {};
  const hero = assessment.hero || {};
  const totalQuestions = calculateTotalQuestions(domains);
  const accentColor = assessment.accent || '#C9A84C';

  return (
    <AssessmentShell>
      <div className={`mx-auto max-w-3xl overflow-hidden ${glassCardStyle}`}>
        <div className="px-6 py-10 text-center sm:px-10 md:px-14">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#1B2B4B] shadow-lg">
            <Compass className="h-8 w-8" />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C9A84C]">
            Retirement Waypoint
          </p>

          <span
            className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold text-white"
            style={{ backgroundColor: `${accentColor}22` }}
          >
            {introduction.subtitle || hero.subtitle || assessment.segment || 'Retirement Assessment'}
          </span>

          <h1 className="mx-auto mb-5 max-w-2xl font-serif text-3xl leading-tight text-white sm:text-4xl">
            {introduction.title || hero.title || assessment.title || 'Assessment'}
          </h1>

          <p className="mb-7 text-sm font-semibold text-[#C9A84C]">
            {assessment.introduction?.author || 'David Allen, Ph.D.'}
          </p>

          <p className="mx-auto max-w-xl text-base leading-8 text-white/70">
            {introduction.description ||
              hero.description ||
              assessment.intro ||
              'This assessment measures your retirement readiness across five key behavioral domains.'}
          </p>

          <div className="my-8 h-px bg-white/10" />

          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: Clock, label: introduction.duration || '10–12 min' },
              { icon: BarChart3, label: `${totalQuestions} scaled items` },
              { icon: MessageSquareText, label: `${domains.length} reflections` },
              { icon: Lock, label: 'Confidential' },
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
            Answer based on where you are today — not where you think you should be. Honest
            responses create the most useful results.
          </p>

          <button
            onClick={onStart}
            className="cursor-pointer rounded-xl bg-[#C9A84C] px-8 py-3.5 text-sm font-semibold text-[#1B2B4C] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D6B45A] hover:shadow-xl"
          >
            {introduction.ctaButton || 'Begin assessment'}
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
};