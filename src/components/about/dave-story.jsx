"use client";

import Image from "next/image";
import { Brain } from "lucide-react";

const credentials = [
  "30+ Years Experience",
  "Industrial Psychologist",
  "Retirement Transition Specialist",
];

const DaveStory = () => {
  return (
    <section id="story" className="relative bg-[#1B2B4B] py-28 sm:py-24 lg:py-28">
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <Image
              src="/images/about/dave-story.png"
              alt="Dave, retirement transition specialist"
              width={900}
              height={1050}
              className="h-[420px] w-full object-cover sm:h-[560px]"
            />
          </div>
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
            <Brain className="h-4 w-4 text-[#C9A84C]" />
            Psychology Meets Purpose
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The Psychology Behind Retirement Waypoint
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-white/72 sm:text-lg">
            <p>
              Dave is a PhD industrial psychologist with 30+ years of
              experience helping people understand work, motivation,
              leadership, identity, and life transitions.
            </p>

            <p>
              Retirement Waypoint was created from the belief that retirement
              should not feel like the loss of purpose — but the beginning of
              a meaningful new chapter.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {credentials.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DaveStory;