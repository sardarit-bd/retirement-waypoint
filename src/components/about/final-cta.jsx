"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#1B2B4B] sm:text-4xl lg:text-5xl">
          Ready To Understand Your Retirement Readiness?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#1B2B4B]/68 sm:text-lg">
          Take the assessment and begin building a more meaningful retirement
          journey.
        </p>

        <div className="mt-9">
          <Button
            className="group h-14 cursor-pointer rounded-full bg-[#C9A84C] px-9 text-base font-semibold text-[#1B2B4B] shadow-xl transition-all duration-300 hover:bg-[#D6B45A] hover:shadow-2xl"
            asChild
          >
            <Link href="/assessment">
              Take Assessment
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;