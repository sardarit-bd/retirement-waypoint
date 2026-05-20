"use client";

import Image from "next/image";

const LifestyleCTA = () => {
  return (
    <section className="relative h-[520px] overflow-hidden sm:h-[620px]">
      <Image
        src="/images/about/retirement-lifestyle.jpg"
        alt="Retirement lifestyle with purpose and possibility"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#1B2B4B]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B4B]/75 via-[#1B2B4B]/35 to-transparent" />

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Retirement Is Not The End Of Your Story
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/78 sm:text-xl">
            It's the beginning of a new chapter filled with purpose, growth,
            and possibility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LifestyleCTA;