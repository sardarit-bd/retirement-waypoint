'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FiveDomainsSection from '@/components/coaching/FiveDomainsSection';
import { useCoachingCms } from '@/features/coaching-cms/hooks/useCoachingCms';

const fallbackHero = {
  badge: 'Retirement Coaching',
  title: 'Retirement Coaching with David Allen, Ph.D.',
  subtitle:
    'Personalized guidance to help you navigate retirement with purpose, structure, confidence, and emotional readiness.',
};

const fallbackOverview = {
  badge: 'Coaching Services',
  headline:
    'Most people prepare financially for retirement — but not for everything else.',
  paragraphs: [
    'The loss of structure. The shift in identity. The question of what comes next. These aren’t small adjustments. They’re among the most significant psychological transitions you’ll ever navigate in your lifetime.',
    'I’m a behavioral and industrial psychologist with 40 years of experience helping people understand what drives them — and what holds them back. I’ve spent the last chapter of my own career doing what I wish more people had helped me do earlier: applying behavioral science to the question of how to actually thrive in retirement, not just survive it.',
    'My coaching draws on around the five domains of retirement thriving - (1) Identify the purpose, (2) Engagement and vitality, (3) Connection and belonging, (4) Growth and learning, and (5) Meaning and legacy. These domains consistently link to wellbeing and fulfillment in later life. We don’t just talk. We build a clear picture of where you are, where you want to go, and what’s standing in the way.',
  ],
};

const fallbackFramework = {
  badge: 'THE FRAMEWORK',
  title: 'Five Domains of Retirement Thriving',
  subtitle:
    'Grounded in decades of behavioral science, these five domains provide a practical framework for building a meaningful and fulfilling retirement.',
  domains: [
    {
      tag: 'FIVE DOMAINS',
      title: 'Identity & Purpose',
      subtitle: 'Who are you becoming?',
      description:
        'Who are you when the title is gone? Reclaiming identity anchored in values, not roles.',
      iconName: 'Compass',
    },
    {
      tag: 'FIVE DOMAINS',
      title: 'Engagement & Vitality',
      subtitle: 'Energy and flow',
      description:
        'Energy, flow, and the daily rhythm of a life that feels alive and fully activated.',
      iconName: 'Zap',
    },
    {
      tag: 'FIVE DOMAINS',
      title: 'Connection & Belonging',
      subtitle: 'Relationships that sustain',
      description:
        'The quality and intentionality of relationships that sustain wellbeing across decades.',
      iconName: 'HeartHandshake',
    },
    {
      tag: 'FIVE DOMAINS',
      title: 'Growth & Learning',
      subtitle: 'Stay curious, stay vital',
      description:
        'Staying curious, challenged, and expanding — the antidote to stagnation in retirement.',
      iconName: 'GraduationCap',
    },
    {
      tag: 'FIVE DOMAINS',
      title: 'Meaning & Legacy',
      subtitle: 'What you leave behind',
      description:
        'What you stand for, what you leave behind, and the story you choose to live now.',
      iconName: 'Sparkles',
    },
  ],
};

const fallbackAssessmentNote = {
  noteText:
    'Your assessment results will be used as a starting point to develop a customized coaching plan for you. This data will be stored and tracked to measure progress during the coaching engagement. Comments will be combined with survey results to identify the key factors that can have the biggest impact on your ability to thrive in retirement.',
};

const fallbackEligibility = {
  boxTitle: 'This is right for you if:',
  points: [
    'You’re within 2–3 years of retiring and want to go in prepared',
    'You’ve already retired and feel like something’s missing',
    'You’re restless, disconnected, or struggling to find your footing',
  ],
};

const fallbackCta = {
  buttonText: 'Work With Me',
  buttonLink: '/contact',
};

export function CoachingClient({ initialContent }) {
  const { data: response } = useCoachingCms();
  const cms = initialContent !== undefined && initialContent !== null ? initialContent : response?.data;

  const hero = cms?.hero || fallbackHero;
  const overview = cms?.overview || fallbackOverview;
  const framework = cms?.framework || fallbackFramework;
  const assessmentNote = cms?.assessmentNote || fallbackAssessmentNote;
  const eligibility = cms?.eligibility || fallbackEligibility;
  const cta = cms?.cta || fallbackCta;

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      {/* Hero Section */}
      <section className="bg-[#1B2B4B] px-4 pb-20 pt-40 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
            {hero.badge || 'Retirement Coaching'}
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* Coaching Introduction Section */}
      <section id="coaching-introduction" className="-mt-10 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] bg-white p-6 shadow-2xl sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-[#C9A84C]/15 px-4 py-2 text-sm font-semibold text-[#C9A84C]">
              {overview.badge || 'Coaching Services'}
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-[#1B2B4B] sm:text-4xl">
              {overview.headline}
            </h2>

            <div className="mt-6 space-y-6 text-base leading-8 text-[#1B2B4B]/70 sm:text-lg">
              {(overview.paragraphs?.length ? overview.paragraphs : fallbackOverview.paragraphs).map(
                (p, idx) => {
                  if (!p) return null;
                  const trimmed = typeof p === 'string' ? p.trim() : '';
                  const isPricing =
                    trimmed.toLowerCase().startsWith('costs:') ||
                    trimmed.toLowerCase().startsWith('pricing:');

                  if (isPricing) {
                    const lines = trimmed
                      .split('\n')
                      .map((l) => l.trim())
                      .filter(Boolean);
                    const title = lines[0] || 'Costs:';
                    const items = lines.slice(1);

                    return (
                      <div
                        key={idx}
                        className="my-6 rounded-2xl border border-[#C9A84C]/25 bg-[#F8F5EF] p-6 sm:p-8"
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-[#1B2B4B]">
                          {title}
                        </h3>
                        {items.length > 0 ? (
                          <div className="mt-4 space-y-3">
                            {items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="flex items-start gap-3 rounded-xl border border-[#1B2B4B]/10 bg-white p-4 shadow-sm"
                              >
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A84C]" />
                                <p className="text-sm sm:text-base leading-relaxed text-[#1B2B4B]/80 font-medium">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 whitespace-pre-line text-slate-700 leading-relaxed">
                            {trimmed}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={idx}
                      className="whitespace-pre-line text-slate-700 leading-relaxed"
                    >
                      {p}
                    </div>
                  );
                }
              )}

              {/* Five Domains Framework Subsection */}
              <section
                id="domains-framework"
                className="px-4 py-16 sm:px-6 lg:px-8 rounded-3xl"
                style={{ backgroundColor: '#04103A' }}
              >
                <div className="mx-auto max-w-7xl">
                  {/* Section Header */}
                  <div className="mb-14 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/5 px-4 py-2 text-sm font-semibold tracking-wide text-[#C9A84C] backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                      {framework.badge || 'THE FRAMEWORK'}
                    </span>
                    <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                      {framework.title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
                      {framework.subtitle}
                    </p>
                  </div>

                  {/* Dynamic 5-Column Grid */}
                  <FiveDomainsSection
                    domains={
                      framework.domains?.length
                        ? framework.domains
                        : fallbackFramework.domains
                    }
                  />
                </div>
              </section>

              {/* Assessment Connection Note */}
              <div className="pt-2 whitespace-pre-line text-slate-700 leading-relaxed">
                {assessmentNote.noteText}
              </div>
            </div>

            {/* Eligibility Checklist Box */}
            <div className="mt-10 rounded-[28px] border border-[#C9A84C]/25 bg-[#F8F5EF] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#1B2B4B]">
                {eligibility.boxTitle}
              </h3>

              <div className="mt-5 grid gap-4">
                {(eligibility.points?.length ? eligibility.points : fallbackEligibility.points).map(
                  (item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C9A84C]" />
                      <p className="leading-7 text-[#1B2B4B]/75">{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bottom Call to Action Button */}
            <Button
              asChild
              className="group mt-10 cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B] transition-all duration-300 hover:bg-[#04103A] hover:text-white"
            >
              <Link href={cta.buttonLink || '/contact'}>
                {cta.buttonText || 'Work With Me'}
                <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CoachingClient;
