import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  HeartHandshake,
  Lightbulb,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredResources = [
  {
    title: "Retirement Readiness Checklist",
    category: "Checklist",
    desc: "A simple guide to understand your emotional and lifestyle readiness.",
    image: "/images/resources/resource-1.jpg",
  },
  {
    title: "Finding Purpose After Retirement",
    category: "Purpose",
    desc: "Explore how identity, meaning, and direction change after work.",
    image: "/images/resources/resource-2.jpg",
  },
  {
    title: "Building Healthy Retirement Routines",
    category: "Lifestyle",
    desc: "Learn how structure supports confidence, energy, and wellbeing.",
    image: "/images/resources/resource-3.jpg",
  },
];

const downloads = [
  "Retirement Transition Worksheet",
  "Purpose Reflection Guide",
  "Weekly Routine Planner",
];

const blogs = [
  "The Psychology of Retirement",
  "Why Retirement Feels Emotionally Difficult",
  "Creating Structure After Work Ends",
];

const ResourcesPage = () => {
  return (
    <main className="overflow-hidden bg-[#F8F5EF]">
      {/* <section className="relative bg-[#1B2B4B] px-4 pb-24 pt-40 text-white sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#C9A84C]/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
              <BookOpen className="h-4 w-4 text-[#C9A84C]" />
              Retirement Learning Hub
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Retirement Resources & Guidance
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Practical tools, guides, and psychological insights to help you
              navigate retirement with confidence, clarity, and purpose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#featured-resources"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#C9A84C] px-7 py-3 font-semibold text-[#1B2B4B] transition hover:bg-[#D6B45A]"
              >
                Explore Guides
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/assessment"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
              >
                Take Assessment
              </Link>
            </div>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[36px] border border-white/10 shadow-2xl">
            <Image
              src="/images/resources/resources-hero.jpg"
              alt="Retirement resources"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B4B]/70 to-transparent" />
          </div>
        </div>
      </section> */}

      <section id="featured-resources" className="bg-[#1B2B4B] px-4 py-20 pt-40 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#C9A84C]">
              Featured Resources
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Start With Practical Guidance
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredResources.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[28px] bg-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-bold text-[#1B2B4B]">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#1B2B4B]">
                    {item.title}
                  </h3>
                  <p className="mb-5 text-sm leading-7 text-[#1B2B4B]/65">
                    {item.desc}
                  </p>
                  <Link
                    href="/resources"
                    className="inline-flex cursor-pointer items-center font-semibold text-[#1B2B4B] hover:text-[#C9A84C]"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="download-resources" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#C9A84C]">
              Downloadable Tools
            </p>
            <h2 className="text-3xl font-bold text-[#1B2B4B] sm:text-4xl">
              Worksheets & Planning Guides
            </h2>
            <p className="mt-5 text-base leading-8 text-[#1B2B4B]/65">
              Helpful exercises and simple planning tools for reflection,
              structure, and personal clarity.
            </p>
          </div>

          <div className="grid gap-4">
            {downloads.map((title) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-3xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B2B4B] text-[#C9A84C]">
                    <FileText className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#1B2B4B]">{title}</h3>
                    <p className="text-sm text-[#1B2B4B]/60">
                      PDF guide for retirement transition planning.
                    </p>
                  </div>
                </div>

                <button className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#1B2B4B] transition hover:bg-[#D6B45A]">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="learning-resources" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#C9A84C]">
              Learning Topics
            </p>
            <h2 className="text-3xl font-bold text-[#1B2B4B] sm:text-4xl">
              Explore Retirement Insights
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Lightbulb,
                title: "Purpose & Identity",
                desc: "Understand how meaning changes beyond work.",
              },
              {
                icon: HeartHandshake,
                title: "Connection & Belonging",
                desc: "Build relationships and support after career life.",
              },
              {
                icon: PlayCircle,
                title: "Guided Learning",
                desc: "Future videos and lessons for retirement transition.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-3xl border border-[#1B2B4B]/10 bg-white p-7 shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B2B4B] text-[#C9A84C]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#1B2B4B]">
                  {title}
                </h3>
                <p className="text-sm leading-7 text-[#1B2B4B]/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1B2B4B] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#C9A84C]">
              Latest Articles
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Read More About Retirement Transition
            </h2>
          </div>

          <div className="grid gap-4">
            {blogs.map((title) => (
              <Link
                href="/resources"
                key={title}
                className="group flex cursor-pointer items-center justify-between rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl transition hover:bg-white/15"
              >
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Practical insight for emotional and lifestyle readiness.
                  </p>
                </div>

                <ArrowRight className="h-5 w-5 text-[#C9A84C] transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles-resources" className="bg-white px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1B2B4B] sm:text-4xl">
            Not Sure Where To Start?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#1B2B4B]/65">
            Take the retirement readiness assessment and discover which areas of
            your next chapter need the most attention.
          </p>

          <Button
            variant="ghost"
            // onClick={handlePopupOpen}
            className="group w-full cursor-pointer rounded-full bg-[#C9A84C] mt-6 px-8 py-6 text-base font-semibold text-[#04103A] shadow-xl transition-all duration-300 hover:bg-[#04103A] hover:text-white hover:shadow-2xl sm:w-auto md:text-lg"
            asChild
          >
            <Link
              href="/assessment"
              className="flex items-center justify-center"
            >
              <span>Take Assessment</span>

              <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ResourcesPage;
