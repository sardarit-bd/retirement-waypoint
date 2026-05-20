"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background Image */}
      <Image
        src="/images/about/about-bg.jpg"
        alt="About background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 object-cover object-center"
      />

      {/* Background Overlay */}
      {/* <div className="absolute inset-0 z-[1] bg-white/88" /> */}

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B2B4B]/10 via-[#1B2B4B]/50 to-[#1B2B4B]/20" />

      {/* Blur Effects */}
      <div className="absolute left-0 top-0 z-[3] h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl" />
      <div className="absolute right-0 top-20 z-[3] h-96 w-96 rounded-full bg-[#1B2B4B]/5 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-1 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#C9A84C]" />
            Meet Dave
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Helping Professionals Navigate Life Beyond Work
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white sm:text-lg lg:mx-0">
            Retirement is more than a financial transition — it's an emotional,
            psychological, and identity shift. Retirement Waypoint was created
            to help professionals move into this next chapter with confidence
            and purpose.
          </p>
        </div>

        {/* <div className="relative">
          <div className="absolute -inset-4 rounded-[40px] bg-[#C9A84C]/15 blur-2xl" />

          <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(27,43,75,0.25)]">
            <Image
              src="/images/about/about-hero.jpg"
              alt="Professional reflecting on retirement transition"
              width={900}
              height={1050}
              priority
              className="h-[420px] w-full object-cover sm:h-[540px] lg:h-[620px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B4B]/35 via-transparent to-transparent" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutHero;