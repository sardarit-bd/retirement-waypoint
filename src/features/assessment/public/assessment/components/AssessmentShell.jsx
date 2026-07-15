'use client';

const glassCard =
  'rounded-[32px] border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-2xl';

export const AssessmentShell = ({ children }) => {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#1B2B4B] px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">{children}</div>
    </section>
  );
};

export const glassCardStyle = glassCard;