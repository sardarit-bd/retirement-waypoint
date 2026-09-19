'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Monitor, Smartphone, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FiveDomainsSection from '@/components/coaching/FiveDomainsSection';
import { CoachingClient } from '@/components/coaching/CoachingClient';

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

export function CoachingCmsLivePreview({ formData, activeTab }) {
  const [viewDevice, setViewDevice] = useState('desktop');
  const [showFullPage, setShowFullPage] = useState(true);

  const sectionTitles = {
    heroOverview: 'Hero & Overview',
    framework: 'Five Domains Framework',
    eligibilityCta: 'Audience & CTA',
  };

  const hero = formData?.hero || fallbackHero;
  const overview = formData?.overview || fallbackOverview;
  const framework = formData?.framework || fallbackFramework;
  const assessmentNote = formData?.assessmentNote || fallbackAssessmentNote;
  const eligibility = formData?.eligibility || fallbackEligibility;
  const cta = formData?.cta || fallbackCta;

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'heroOverview':
        return (
          <div className="space-y-6 bg-[#F8F5EF] pb-10">
            {/* Hero Section */}
            <section className="bg-[#1B2B4B] px-4 pb-14 pt-14 text-white text-center">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                  {hero.badge || 'Retirement Coaching'}
                </div>
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl text-white">
                  {hero.title}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-2xl mx-auto">
                  {hero.subtitle}
                </p>
              </div>
            </section>

            {/* Overview Section */}
            <div className="mx-auto max-w-4xl px-4 -mt-8">
              <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl">
                <span className="inline-flex rounded-full bg-[#C9A84C]/15 px-3.5 py-1.5 text-xs font-semibold text-[#C9A84C]">
                  {overview.badge || 'Coaching Services'}
                </span>
                <h2 className="mt-4 text-xl sm:text-2xl font-bold leading-tight text-[#1B2B4B]">
                  {overview.headline}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#1B2B4B]/70">
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
                            className="my-4 rounded-xl border border-[#C9A84C]/25 bg-[#F8F5EF] p-4 sm:p-5"
                          >
                            <h3 className="text-base font-bold text-[#1B2B4B]">
                              {title}
                            </h3>
                            {items.length > 0 ? (
                              <div className="mt-3 space-y-2">
                                {items.map((item, itemIdx) => (
                                  <div
                                    key={itemIdx}
                                    className="flex items-start gap-2.5 rounded-lg border border-[#1B2B4B]/10 bg-white p-3 shadow-xs"
                                  >
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                                    <p className="text-xs sm:text-sm leading-relaxed text-[#1B2B4B]/80 font-medium">
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="mt-2 whitespace-pre-line text-slate-700 leading-relaxed">
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
                </div>
              </div>
            </div>
          </div>
        );

      case 'framework':
        return (
          <div className="bg-[#04103A] p-6 sm:p-10 text-white min-h-[400px]">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#C9A84C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                {framework.badge || 'THE FRAMEWORK'}
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold leading-tight text-white">
                {framework.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
                {framework.subtitle}
              </p>
            </div>
            <FiveDomainsSection
              domains={framework.domains?.length ? framework.domains : fallbackFramework.domains}
            />
          </div>
        );

      case 'eligibilityCta':
        return (
          <div className="bg-[#F8F5EF] p-6 sm:p-10 space-y-6">
            {/* Assessment Note */}
            <div className="rounded-2xl border border-[#1B2B4B]/10 bg-white p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
                Assessment Connection
              </h4>
              <div className="text-sm leading-relaxed text-[#1B2B4B]/75 whitespace-pre-line">
                {assessmentNote.noteText}
              </div>
            </div>

            {/* Eligibility Box */}
            <div className="rounded-2xl border border-[#C9A84C]/25 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1B2B4B]">
                {eligibility.boxTitle}
              </h3>
              <div className="mt-4 grid gap-3">
                {(eligibility.points?.length ? eligibility.points : fallbackEligibility.points).map(
                  (item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                      <p className="text-sm leading-relaxed text-[#1B2B4B]/75">{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 text-center sm:text-left">
              <Button
                asChild
                className="group cursor-pointer rounded-full bg-[#C9A84C] px-8 py-5 text-sm font-semibold text-[#1B2B4B] transition-all duration-300 hover:bg-[#04103A] hover:text-white"
              >
                <Link href={cta.buttonLink || '/contact'}>
                  {cta.buttonText || 'Work With Me'}
                  <ArrowRight className="ml-2 h-4 w-4 stroke-current transition-all duration-300 group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        );

      default:
        return <CoachingClient initialContent={formData} />;
    }
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-[#1B2B4B]/15 bg-[#04103A] text-white shadow-xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#06154F]/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs font-semibold text-white/70">
            {showFullPage
              ? 'Full Coaching Page Live Preview'
              : `Live Preview: ${sectionTitles[activeTab] || 'Section'}`}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A84C]/20 px-2 py-0.5 text-[10px] font-bold text-[#C9A84C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFullPage(!showFullPage)}
            className={`h-8 px-2.5 text-xs font-medium cursor-pointer ${
              showFullPage
                ? 'bg-[#C9A84C] text-[#1B2B4B] font-bold hover:bg-[#D6B45A]'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            {showFullPage ? 'Full Page' : 'Active Tab Focus'}
          </Button>

          <div className="flex items-center rounded-lg bg-white/10 p-0.5 border border-white/10">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewDevice('desktop')}
              className={`h-7 w-7 rounded-md cursor-pointer ${
                viewDevice === 'desktop'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title="Desktop View"
            >
              <Monitor className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewDevice('mobile')}
              className={`h-7 w-7 rounded-md cursor-pointer ${
                viewDevice === 'mobile'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title="Mobile View"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Viewport Container */}
      <div className="relative flex-1 overflow-y-auto bg-[#F8F5EF] p-0 max-h-[calc(100vh-200px)] min-h-[500px]">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewDevice === 'mobile'
              ? 'max-w-sm shadow-2xl border-x border-gray-300 min-h-full'
              : 'w-full'
          }`}
        >
          {showFullPage ? (
            <CoachingClient initialContent={formData} />
          ) : (
            renderActiveSection()
          )}
        </div>
      </div>
    </div>
  );
}

export default CoachingCmsLivePreview;
