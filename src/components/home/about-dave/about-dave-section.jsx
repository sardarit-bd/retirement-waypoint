"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const AboutDaveSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B2B4B] via-[#16223E] to-[#0F1A30] py-20 md:py-28 lg:py-32">
      {/* Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Large Rounded Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-[32px] shadow-2xl overflow-hidden border border-white/10">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image/Video Block */}
            <div className="relative lg:w-1/2 group">
              <div className="relative h-96 lg:h-full min-h-[400px] overflow-hidden">
                <Image
                  src="/images/about-dave.jpg"
                  alt="Dave - Industrial Psychologist enjoying retirement lifestyle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                
                {/* Dark Navy Overlay */}
                <div className="absolute inset-0 bg-[#1B2B4B]/40" />
                
                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    href="/about-dave"
                    className="cursor-pointer group/btn"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#C9A84C] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl">
                      <Play className="h-8 w-8 md:h-10 md:w-10 text-[#1B2B4B] ml-1" fill="#1B2B4B" />
                    </div>
                  </Link>
                </div>

                {/* Subtle Border Overlay */}
                <div className="absolute inset-0 rounded-t-[32px] lg:rounded-l-[32px] lg:rounded-r-none ring-1 ring-white/20 pointer-events-none" />
              </div>
            </div>

            {/* Right Side - Content Block with Warm Background */}
            <div className="lg:w-1/2 relative bg-[#F6E4C2] overflow-hidden">
              {/* Decorative oversized letter/shape */}
              <div className="absolute -top-10 -right-10 text-[180px] md:text-[220px] font-bold text-[#C9A84C]/10 select-none pointer-events-none">
                D
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#C9A84C]/5 blur-3xl" />
              
              {/* Content Wrapper */}
              <div className="relative z-10 p-8 md:p-10 lg:p-12">
                {/* Heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B2B4B] mb-6 tracking-tight">
                  About Dave
                </h2>

                {/* Decorative Line */}
                <div className="w-16 h-1 bg-[#C9A84C] rounded-full mb-6" />

                {/* Lead Text */}
                <p className="text-lg md:text-xl text-[#1B2B4B]/80 font-medium leading-relaxed mb-5">
                  Dave is a PhD industrial psychologist with 30+ years of experience
                  helping people understand work, identity, motivation, and life
                  transitions.
                </p>

                {/* Body Paragraph */}
                <p className="text-base md:text-lg text-[#1B2B4B]/70 leading-relaxed mb-8">
                  Retirement Waypoint was created to help professionals thrive
                  emotionally and psychologically in retirement — combining
                  behavioral science, practical structure, and lived experience.
                </p>

                {/* Learn More Button */}
                <Button
                  variant="ghost"
                  className="group bg-transparent hover:bg-[#1B2B4B] text-[#1B2B4B] hover:text-white border-2 border-[#1B2B4B] rounded-full px-6 py-5 text-base font-semibold transition-all duration-300 cursor-pointer"
                  asChild
                >
                  <Link href="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* Small Credibility Badge */}
                <div className="mt-8 pt-6 border-t border-[#C9A84C]/30">
                  <p className="text-sm text-[#1B2B4B]/50 italic">
                    PhD • Industrial Psychology • Retirement Transition Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDaveSection;