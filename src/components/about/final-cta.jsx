"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = ({ content }) => {
  const title =
    content?.title || "Ready To Understand Your Retirement Readiness?";
  const subtitle =
    content?.subtitle ||
    "Take the assessment and begin building a more meaningful retirement journey.";
  const buttonText = content?.buttonText || "Take Assessment";
  const buttonLink = content?.buttonLink || "/assessment";

  return (
    <section id="final-cta" className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#1B2B4B] sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#1B2B4B]/68 sm:text-lg">
          {subtitle}
        </p>

        <div className="mt-9">
          <Button
            variant="ghost"
            className="group w-full cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#04103A] shadow-xl transition-all duration-300 hover:!bg-[#04103A] hover:!text-white hover:shadow-2xl sm:w-auto md:text-lg"
            asChild
          >
            <Link
              href={buttonLink}
              className="flex items-center justify-center"
            >
              <span>{buttonText}</span>

              <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
