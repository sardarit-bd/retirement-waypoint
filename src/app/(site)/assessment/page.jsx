import Link from "next/link";

const assessments = [
  {
    title: "Pre-Retiree",
    desc: "Planning to retire in 3–5 years",
    href: "/assessment/pre-retiree",
  },
  {
    title: "Recent Retiree",
    desc: "Retired in the past 5 years",
    href: "/assessment/recent-retiree",
  },
  {
    title: "Established Retiree",
    desc: "Retired 5 or more years",
    href: "/assessment/established-retiree",
  },
];

const AssessmentPage = () => {
  return (
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-60">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">
          Retirement Waypoint
        </p>

        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Choose Your Assessment
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-white/70">
          Select the assessment that best matches your current retirement stage.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {assessments.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="cursor-pointer rounded-3xl border border-white/10 bg-white/10 p-7 text-left shadow-xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15"
            >
              <h2 className="mb-3 text-2xl font-bold text-white">
                {item.title}
              </h2>

              <p className="mb-6 text-white/65">{item.desc}</p>

              <span className="font-semibold text-[#C9A84C]">
                Start assessment →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssessmentPage;