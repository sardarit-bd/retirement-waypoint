"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardCheck,
  LineChart,
  Compass,
  BookOpen,
  HeartHandshake,
  Lightbulb,
} from "lucide-react";

const supportItems = [
  {
    icon: ClipboardCheck,
    title: "Readiness Assessment",
    description:
      "Understand your emotional, lifestyle, and purpose readiness before retirement.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Track your growth over time and see where your next chapter is improving.",
  },
  {
    icon: Compass,
    title: "Purpose & Identity",
    description:
      "Navigate the shift from career identity to a more meaningful life structure.",
  },
  {
    icon: BookOpen,
    title: "Guided Resources",
    description:
      "Access practical books, worksheets, and insights designed for transition.",
  },
  {
    icon: HeartHandshake,
    title: "Coaching Support",
    description:
      "Receive personal guidance for building confidence, clarity, and direction.",
  },
  {
    icon: Lightbulb,
    title: "Expert Insights",
    description:
      "Learn from behavioral psychology principles and real retirement experience.",
  },
];

const SupportSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/support-bg.jpg"
          alt="Retirement lifestyle support"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Navy Overlay */}
      {/* <div className="absolute inset-0 bg-[#1B2B4B]/10" /> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B2B4B]/20 via-[#1B2B4B]/80 to-[#1B2B4B]/40" />

      {/* Gold Glow */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#C9A84C]/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-2xl">
            How Retirement Waypoint Helps
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Support For Your Next Chapter
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            A simple, structured way to understand your readiness, build
            purpose, and move into retirement with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {supportItems.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group rounded-3xl border border-white/10 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15 hover:shadow-2xl"
            >
              <CardContent className="p-6">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A84C]/20 transition-all duration-300 group-hover:bg-[#C9A84C]">
                  <Icon className="h-7 w-7 text-[#C9A84C] transition-colors duration-300 group-hover:text-[#1B2B4B]" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-white">
                  {title}
                </h3>

                <p className="text-sm leading-relaxed text-white/65">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;