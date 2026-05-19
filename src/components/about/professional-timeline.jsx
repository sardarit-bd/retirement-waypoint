"use client";

const timeline = [
  {
    year: "1990",
    title: "Began Psychology Career",
    description: "Started helping people understand motivation, behavior, and personal growth.",
  },
  {
    year: "2005",
    title: "Leadership & Workplace Consulting",
    description: "Guided professionals and organizations through change, identity, and leadership.",
  },
  {
    year: "2020",
    title: "Retirement Transition Focus",
    description: "Focused deeply on the emotional and psychological side of life beyond work.",
  },
  {
    year: "2026",
    title: "Retirement Waypoint Launched",
    description: "Created a guided platform for retirement readiness, purpose, and clarity.",
  },
];

const ProfessionalTimeline = () => {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1B2B4B] sm:text-4xl">
            A Career Built Around People, Purpose, and Transition
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-[#C9A84C]/35 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative grid gap-6 md:grid-cols-2 ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                <div className={index % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12"}>
                  <div className="relative ml-12 rounded-[24px] border border-[#1B2B4B]/10 bg-white p-6 shadow-[0_18px_50px_rgba(27,43,75,0.07)] md:ml-0">
                    <span className="mb-3 inline-flex rounded-full bg-[#C9A84C]/15 px-3 py-1 text-sm font-bold text-[#1B2B4B]">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-[#1B2B4B]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#1B2B4B]/65">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-[#C9A84C] shadow-lg md:left-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalTimeline;