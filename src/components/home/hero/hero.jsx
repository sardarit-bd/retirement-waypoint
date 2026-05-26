"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const trustPoints = [
    {
      icon: TrendingUp,
      text: "Psychology-based guidance",
    },
    {
      icon: Users,
      text: "Personalized readiness insights",
    },
    {
      icon: Target,
      text: "Progress tracking for your next chapter",
    },
  ];

  const readinessMetrics = [
    { label: "Purpose & Identity", value: 78 },
    { label: "Lifestyle Structure", value: 65 },
    { label: "Social Connection", value: 72 },
  ];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
      </div>

      {/* Left Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#04103A]/95 via-[#06154F]/90 to-[#06154F]/65 md:via-[#06154F]/85 md:via-45% md:to-transparent" />

      {/* Soft Bottom Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-[#04103A]/40 to-transparent" />

      {/* Premium Blur Glow */}
      <div className="absolute left-4 top-24 z-[2] h-56 w-56 rounded-full bg-blue-500/20 blur-3xl md:left-10 md:top-32 md:h-72 md:w-72" />
      <div className="absolute bottom-20 left-1/3 z-[2] h-48 w-48 rounded-full bg-white/10 blur-3xl md:h-60 md:w-60" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12">
            {/* Left Content */}
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-xl sm:text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                <span className="line-clamp-1">
                  Retirement readiness made clearer
                </span>
              </div>

              <h1 className="mb-6 text-[38px] font-bold leading-[1.15] tracking-tight text-white sm:mb-8 sm:text-5xl lg:text-5xl">
                Navigate Retirement With Confidence, Purpose, and Clarity
              </h1>

              <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white sm:text-lg md:text-xl lg:mx-0">
                Retirement Waypoint helps professionals understand their
                readiness, rediscover purpose, and build a meaningful next
                chapter through guided assessments and expert insights.
              </p>

              <div className="mb-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  variant="ghost"
                  // onClick={handlePopupOpen}
                  className="group w-full cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#04103A] shadow-xl transition-all duration-300 hover:!bg-[#04103A] hover:!text-white hover:shadow-2xl sm:w-auto md:text-lg"
                  asChild
                >
                  <Link
                    href="/assessment"
                    className="flex items-center justify-center"
                  >
                    <span>Take Assessment</span>

                    <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  // onClick={handlePopupOpen}
                  className="w-full cursor-pointer rounded-full border border-white/40 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/20 hover:text-white sm:w-auto md:text-lg"
                  asChild
                >
                  <Link
                    href="/resources"
                    className="flex items-center justify-center"
                  >
                    Explore Resources
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col items-start justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 lg:justify-start">
                {trustPoints.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex w-full items-center gap-2 sm:w-auto"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                      <Icon className="h-4 w-4 text-white" />
                    </div>

                    <span className="text-left text-sm font-medium leading-snug text-white/85">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Glass Assessment Card */}
          </div>
        </div>
      </div>

      {popupOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-[#04103A]">Coming Soon</h2>

            <p className="mt-3 text-gray-600">
              This page is currently under development.
            </p>

            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="mt-6 rounded-full bg-[#04103A] px-6 py-2 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
