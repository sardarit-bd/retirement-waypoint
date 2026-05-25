"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  ChevronRight,
  Target,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const AssessmentPreviewSection = () => {
  const [selectedOption, setSelectedOption] = useState("Somewhat Confident");
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const steps = [
    {
      icon: Target,
      title: "Answer Guided Questions",
      description: "Reflect on your retirement readiness across key life areas",
    },
    {
      icon: BarChart3,
      title: "Receive Personalized Insights",
      description: "Get data-driven feedback tailored to your unique situation",
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Monitor your growth and adjust your retirement roadmap",
    },
  ];

  const answerOptions = [
    { value: "Very Confident", label: "Very Confident" },
    { value: "Somewhat Confident", label: "Somewhat Confident" },
    { value: "Unsure", label: "Unsure" },
    { value: "Concerned", label: "Concerned" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#1B2B4B] py-20 md:py-28 lg:py-32">
      {/* Animated Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-[#C9A84C]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-[#C9A84C]/5 blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 h-60 w-60 rounded-full bg-[#C9A84C]/5 blur-3xl" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left Side - Content */}
          <div className="flex-1 mb-12 lg:mb-0">
            {/* Glass Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/5 px-4 py-2 text-sm font-medium text-[#C9A84C] backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              <span>Retirement Readiness Assessment</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Understand Where You Are —
              <span className="text-[#C9A84C]"> And What Comes Next</span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
              Gain personalized insights into your emotional readiness,
              lifestyle structure, purpose, and confidence as you prepare for
              retirement.
            </p>

            {/* Steps */}
            <div className="space-y-5 mb-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    {/* Glass Icon Container */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:border-[#C9A84C]/30 transition-all duration-300">
                      <Icon className="h-6 w-6 text-[#C9A84C]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/60">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <Button
              variant="ghost"
              // onClick={handlePopupOpen}
              className="group w-full cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#04103A] shadow-xl transition-all duration-300 hover:!bg-[#04103A] hover:!text-white hover:shadow-2xl sm:w-auto md:text-lg"
              asChild
            >
              <Link
                href="/assessment"
                className="flex items-center justify-center"
              >
                <span>Start Assessment</span>

                <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>

          {/* Right Side - Assessment UI Mockup */}
          <div className="flex-1 max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="relative">
              {/* Floating Glow Effects Behind Card */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#C9A84C]/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C9A84C]/15 rounded-full blur-3xl" />

              {/* Decorative Rings */}
              <div className="absolute -top-6 -right-6 w-40 h-40 border border-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-white/10 rounded-full" />

              {/* Main Glassmorphism Card */}
              <Card className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Gold Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 via-transparent to-transparent pointer-events-none" />

                <CardContent className="relative z-10 p-6 md:p-8">
                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white/80">
                        Question 4 of 12
                      </span>
                      <span className="text-sm font-semibold text-[#C9A84C]">
                        67%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-[#C9A84C] h-2 rounded-full transition-all duration-500"
                        style={{ width: "67%" }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      How confident do you feel about your sense of purpose
                      after retirement?
                    </h3>

                    {/* Answer Options */}
                    <div className="space-y-3">
                      {answerOptions.map((option) => {
                        const isSelected = selectedOption === option.value;
                        return (
                          <button
                            key={option.value}
                            onClick={() => setSelectedOption(option.value)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-[#C9A84C]/20 border-2 border-[#C9A84C] text-white"
                                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {option.label}
                              </span>
                              {isSelected && (
                                <CheckCircle2 className="h-5 w-5 text-[#C9A84C]" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-transparent text-white/50">
                        Powered by behavioral psychology
                      </span>
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="flex items-center justify-center gap-2 text-xs text-white/60">
                    <Sparkles className="h-3 w-3 text-[#C9A84C]" />
                    <span>Personalized readiness insights</span>
                    <Sparkles className="h-3 w-3 text-[#C9A84C]" />
                  </div>
                </CardContent>

                {/* Subtle Card Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#C9A84C]/10 via-transparent to-transparent pointer-events-none" />
              </Card>
            </div>

            {/* Small Descriptive Text */}
            <p className="text-center text-xs text-white/40 mt-4 font-medium">
              Sample question from our comprehensive assessment
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>

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

export default AssessmentPreviewSection;
