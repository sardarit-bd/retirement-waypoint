"use client";

export const BookHero = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <section className="bg-[#1B2B4B] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
            <span className="text-[#C9A84C]">✦</span>
            Retirement Waypoint Store
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Retirement Waypoint
            <span className="block text-[#C9A84C]">Book Store</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Books, workbooks, and guides designed to help you navigate
            retirement with confidence, clarity, and purpose.
          </p>
        </div>
      </div>
    </section>
  );
};