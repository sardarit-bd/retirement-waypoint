'use client';

import { ShieldCheck } from 'lucide-react';
import { glassCardStyle } from './AssessmentShell';

export const AssessmentRegistration = ({
  user,
  errors,
  onFieldChange,
  onFieldBlur,
  onBack,
  onSubmit,
}) => {
  const handleNameChange = (e) => {
    onFieldChange('name', e.target.value);
  };

  const handleNameBlur = () => {
    onFieldBlur('name', user.name);
  };

  const handleEmailChange = (e) => {
    onFieldChange('email', e.target.value);
  };

  const handleEmailBlur = () => {
    onFieldBlur('email', user.email);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 mt-13">
        <div className="h-1 rounded-full bg-white/15">
          <div className="h-1 w-[12%] rounded-full bg-[#C9A84C] transition-all duration-500" />
        </div>

        <div className="mt-2 flex justify-between text-xs text-white/50">
          <span>Getting started</span>
          <span>Step 1 of 6</span>
        </div>
      </div>

      <div className={`${glassCardStyle} p-6 sm:p-8`}>
        <h2 className="mb-2 text-2xl font-semibold text-white">Before we begin</h2>

        <p className="mb-7 text-sm leading-7 text-white/65">
          Your responses are confidential and used only to deliver your personalized results.
        </p>

        <label className="mb-2 block text-sm font-semibold text-white/70">Your name</label>
        <input
          className={`mb-1 w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:ring-2 ${
            errors.name
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
              : 'border-white/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20'
          }`}
          placeholder="Your name"
          value={user.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
        {errors.name ? (
          <p className="mb-5 text-xs font-medium text-red-300">{errors.name}</p>
        ) : (
          <div className="mb-5" />
        )}

        <label className="mb-2 block text-sm font-semibold text-white/70">Email address</label>
        <input
          className={`mb-1 w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:ring-2 ${
            errors.email
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
              : 'border-white/10 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20'
          }`}
          placeholder="you@example.com"
          type="email"
          value={user.email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {errors.email ? (
          <p className="mb-5 text-xs font-medium text-red-300">{errors.email}</p>
        ) : (
          <div className="mb-5" />
        )}

        <div className="mb-7 flex gap-2 rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 p-4 text-sm leading-6 text-white/65">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A84C]" />
          <p>
            Your information is never shared or sold. David Allen, Ph.D. may follow up with
            resources tailored to your results.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Back
          </button>

          <button
            onClick={onSubmit}
            className="cursor-pointer rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#1B2B4B] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D6B45A]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};