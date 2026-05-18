"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  ClipboardCheck,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const TrustSection = () => {
  const statsData = [
    {
      icon: Briefcase,
      value: "30+",
      label: "Years Experience",
      description:
        "Behavioral psychology experience focused on people, purpose, and life transitions.",
    },
    {
      icon: ClipboardCheck,
      value: "Guided",
      label: "Assessments",
      description:
        "Structured readiness tools designed to reveal emotional and lifestyle preparation.",
    },
    {
      icon: TrendingUp,
      value: "Progress",
      label: "Tracking",
      description:
        "Help users understand where they are today and what to improve next.",
    },
    {
      icon: Lightbulb,
      value: "Expert",
      label: "Insights",
      description:
        "Research-backed guidance around identity, structure, relationships, and purpose.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1B2B4B] py-20 md:py-28 lg:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-[#C9A84C]/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-18 lg:mb-20">
          <div className="mb-5 inline-flex animate-fade-in items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-2xl">
            <Sparkles className="h-4 w-4 text-[#C9A84C]" />
            <span>Built for meaningful transition</span>
            <CheckCircle2 className="h-4 w-4 text-[#C9A84C]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Built on{" "}
            <span className="bg-gradient-to-r from-[#C9A84C] via-white to-[#C9A84C] bg-clip-text text-transparent">
              Psychology, Purpose,
            </span>
            and Progress
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#C9A84C]" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Helping professionals transition into retirement with clarity,
            confidence, and a practical framework for building a meaningful next
            chapter.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map(({ icon: Icon, value, label, description }) => (
            <Card
              key={label}
              className="group relative overflow-hidden rounded-3xl border border-[#C9A84C]/25 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/60 hover:bg-white/15"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/20 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <CardContent className="relative z-10 p-6">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/10 backdrop-blur-xl">
                  <Icon className="h-7 w-7 text-[#C9A84C] transition-transform duration-300 group-hover:scale-110" />
                </div>

                <div className="mb-2 text-3xl font-bold text-white md:text-4xl">
                  {value}
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white/90">
                  {label}
                </h3>

                <p className="text-sm leading-relaxed text-white/65">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Badge */}
        <div className="mt-12 text-center md:mt-16">
          <div className="inline-flex max-w-2xl items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-5 py-3 text-sm text-white/75 backdrop-blur-2xl">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C9A84C]" />
            Designed for professionals who want to thrive in retirement — not
            just step away from work.
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;