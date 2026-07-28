'use client';

export const AssessmentSkeleton = () => {
  const skeletonItem = (className) =>
    `animate-shimmer-dark rounded ${className}`;

  return (
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-60">
      <div className="mx-auto max-w-6xl text-center">
        {/* Hero Section */}
        <div className={skeletonItem('mx-auto mb-3 h-4 w-48')} />

        <div className="mx-auto mb-4 max-w-lg space-y-2">
          <div className={`${skeletonItem('mx-auto h-10 w-80')} hidden md:block`} />
          <div className={skeletonItem('mx-auto h-9 w-64 md:hidden')} />
        </div>

        <div className={skeletonItem('mx-auto mb-4 h-5 w-full max-w-2xl')} />

        <div className="mx-auto mb-12 max-w-4xl space-y-2">
          <div className={skeletonItem('mx-auto h-4 w-full')} />
          <div className={skeletonItem('mx-auto h-4 w-11/12')} />
          <div className={skeletonItem('mx-auto h-4 w-10/12')} />
        </div>

        {/* Assessment Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 text-left shadow-xl backdrop-blur-2xl"
            >
              <div className={skeletonItem('mb-3 h-7 w-40 sm:w-52')} />

              <div className="mb-6 space-y-2">
                <div className={skeletonItem('h-4 w-full')} />
                <div className={skeletonItem('h-4 w-3/4')} />
              </div>

              <div className={skeletonItem('h-5 w-36')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
