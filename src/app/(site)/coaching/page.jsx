"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Zap,
  HeartHandshake,
  GraduationCap,
  Sparkles,
  Clock,
  BookOpen,
  Mail,
  Users,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FiveDomainsSection from "@/components/coaching/FiveDomainsSection";

const rightForYou = [
  "You're within 2–3 years of retiring and want to go in prepared",
  "You've already retired and feel like something's missing",
  "You're restless, disconnected, or struggling to find your footing",
];

const domains = [
  {
    id: 1,
    title: "Identity & Purpose",
    subtitle: "Who are you becoming?",
    description:
      "Who are you when the title is gone? Reclaiming identity anchored in values, not roles.",
    featured: false,
    icon: Compass,
  },
  {
    id: 2,
    title: "Engagement & Vitality",
    subtitle: "Energy and flow",
    description:
      "Energy, flow, and the daily rhythm of a life that feels alive and fully activated.",
    featured: false,
    icon: Zap,
  },
  {
    id: 3,
    title: "Connection & Belonging",
    subtitle: "Relationships that sustain",
    description:
      "The quality and intentionality of relationships that sustain wellbeing across decades.",
    featured: true,
    icon: HeartHandshake,
  },
  {
    id: 4,
    title: "Growth & Learning",
    subtitle: "Stay curious, stay vital",
    description:
      "Staying curious, challenged, and expanding — the antidote to stagnation in retirement.",
    featured: false,
    icon: GraduationCap,
  },
  {
    id: 5,
    title: "Meaning & Legacy",
    subtitle: "What you leave behind",
    description:
      "What you stand for, what you leave behind, and the story you choose to live now.",
    featured: false,
    icon: Sparkles,
  },
];

const services = [
  {
    id: 1,
    tag: "FOUNDATION",
    title: "Discovery Session",
    description:
      "A single 90-minute coaching conversation anchored in your Five Domains results. Ideal for getting clarity and a directional roadmap.",
    features: [
      "Five Domains Assessment",
      "90-min coaching session",
      "Written action summary",
      "Resource recommendations",
    ],
    price: "97",
    period: "one time",
    buttonText: "Get Started",
    buttonVariant: "outline",
    featured: false,
  },
  {
    id: 2,
    tag: "MOST POPULAR",
    title: "90-Day Coaching Program",
    description:
      "A structured, evidence-based coaching engagement that takes you from transition to intentional thriving. The flagship Retirement Waypoint experience.",
    features: [
      "Six 60-min coaching sessions",
      "Full Five Domains workbook",
      "Personalized retirement design plan",
      "Email support between sessions",
      "Access to all assessments",
    ],
    price: "497",
    period: "90 days",
    buttonText: "Reserve Your Spot",
    buttonVariant: "gold",
    featured: true,
  },
  {
    id: 3,
    tag: "COMMUNITY",
    title: "Group Cohort",
    description:
      "Six weeks of structured group coaching with peers navigating the same transition. Curriculum built on the Five Domains framework.",
    features: [
      "6 weekly group sessions (90 min)",
      "Cohort of 6–10 participants",
      "Full workbook & assessments",
      "Community discussion board",
    ],
    price: "97",
    period: "6 weeks",
    buttonText: "Join the Waitlist",
    buttonVariant: "outline",
    featured: false,
  },
];

const CoachingPage = () => {
  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      {/* Hero Section */}
      <section className="bg-[#1B2B4B] px-4 pb-20 pt-40 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]"></span>
            Retirement Coaching
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Retirement Coaching with David Allen, Ph.D.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Personalized guidance to help you navigate retirement with purpose,
            structure, confidence, and emotional readiness.
          </p>
        </div>
      </section>

      {/* Coaching Introduction Section */}
      <section
        id="coaching-introduction"
        className="-mt-10 px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[32px] bg-white p-6 shadow-2xl sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-[#C9A84C]/15 px-4 py-2 text-sm font-semibold text-[#C9A84C]">
              Coaching Services
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-[#1B2B4B] sm:text-4xl">
              Most people prepare financially for retirement — but not for
              everything else.
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-[#1B2B4B]/70 sm:text-lg">
              <p>
                The loss of structure. The shift in identity. The question of
                what comes next. These aren&apos;t small adjustments.
                They&apos;re among the most significant psychological
                transitions you&apos;ll ever navigate in your lifetime.
              </p>

              <p>
                I&apos;m a behavioral and industrial psychologist with 40 years
                of experience helping people understand what drives them — and
                what holds them back. I&apos;ve spent the last chapter of my own
                career doing what I wish more people had helped me do earlier:
                applying behavioral science to the question of how to actually
                thrive in retirement, not just survive it.
              </p>

              <p>
                My coaching draws on around the five domains of retirement
                thriving -{" "}
                <span className="text-green-500 font-medium">(1) </span>{" "}
                Identify the purpose,{" "}
                <span className="text-green-500 font-medium"> (2) </span>
                Engagement and vitality,{" "}
                <span className="text-green-500 font-medium"> (3) </span>{" "}
                Connection and belonging,{" "}
                <span className="text-green-500 font-medium"> (4) </span> Growth
                and learning, and{" "}
                <span className="text-green-500 font-medium"> (5) </span>{" "}
                Meaning and legacy. These domains consistently link to wellbeing
                and fulfillment in later life. We don&apos;t just talk. We build
                a clear picture of where you are, where you want to go, and
                what&apos;s standing in the way.
              </p>

              <section
                id="domains-framework"
                className="px-4 py-24 sm:px-6 lg:px-8 rounded-2xl"
                style={{ backgroundColor: "#04103A" }}
              >
                <div className="mx-auto max-w-7xl">
                  {/* Section Header */}
                  <div className="mb-16 text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/5 px-4 py-2 text-sm font-semibold tracking-wide text-[#C9A84C] backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]"></span>
                      THE FRAMEWORK
                    </span>
                    <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                      Five Domains of Retirement Thriving
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
                      Grounded in decades of behavioral science, these five
                      domains provide a practical framework for building a
                      meaningful and fulfilling retirement.
                    </p>
                  </div>

                  {/* Dynamic 5-Column Grid */}
                  <FiveDomainsSection domains={domains}/>
                </div>
              </section>

              <p>
                Your assessment results will be used as a starting point to
                develop a customized coaching plan for you. This data will be
                stored and tracked to measure progress during the coaching
                engagement. Comments will be combined with survey results to
                identify the key factors that can have the biggest impact on
                your ability to thrive in retirement.
              </p>
            </div>

            <div className="mt-10 rounded-[28px] border border-[#C9A84C]/25 bg-[#F8F5EF] p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#1B2B4B]">
                This is right for you if:
              </h3>

              <div className="mt-5 grid gap-4">
                {rightForYou.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#C9A84C]" />
                    <p className="leading-7 text-[#1B2B4B]/75">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              className="group mt-10 cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B] transition-all duration-300 hover:bg-[#04103A] hover:text-white"
            >
              <Link href="/contact">
                Work With Me
                <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Coaching & Services Section */}
      {/* <section
        id="services"
        className="bg-[#F8F5EF] px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/80 px-4 py-2 text-sm font-semibold tracking-wide text-[#C9A84C] shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]"></span>
              COACHING & SERVICES
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-[#1B2B4B] sm:text-4xl lg:text-5xl">
              How We Work Together
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#1B2B4B]/60">
              Every engagement begins with your Five Domains assessment — a
              clear picture of where you stand across the dimensions that matter
              most in retirement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group relative rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  service.featured
                    ? "border-2 border-[#C9A84C] bg-[#1B2B4B] p-6 text-white shadow-xl hover:shadow-[#C9A84C]/20"
                    : "border border-[#1B2B4B]/10 bg-white p-6 hover:border-[#C9A84C]/40 hover:shadow-[#1B2B4B]/5"
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 right-6 rounded-full bg-[#C9A84C] px-3 py-1 text-xs font-bold text-[#1B2B4B]">
                    {service.tag}
                  </div>
                )}

                {!service.featured && (
                  <div className="mb-4 text-xs font-semibold tracking-[0.2em] text-[#C9A84C] uppercase">
                    {service.tag}
                  </div>
                )}

                <h3
                  className={`mb-2 text-xl font-bold ${
                    service.featured ? "text-white" : "text-[#1B2B4B]"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`mb-6 text-sm leading-relaxed ${
                    service.featured ? "text-white/70" : "text-[#1B2B4B]/70"
                  }`}
                >
                  {service.description}
                </p>

                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${
                        service.featured ? "text-white/70" : "text-[#1B2B4B]/70"
                      }`}
                    >
                      <span className="text-[#C9A84C]">
                        <HiOutlineArrowNarrowRight />
                      </span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <span
                    className={`text-2xl font-bold ${
                      service.featured ? "text-[#C9A84C]" : "text-[#1B2B4B]"
                    }`}
                  >
                    {service.price}
                  </span>
                  <span
                    className={`text-sm ${
                      service.featured ? "text-white/50" : "text-[#1B2B4B]/50"
                    }`}
                  >
                    {" "}
                    / {service.period}
                  </span>
                </div>

                <Link
                  href={service.link || "/contact"}
                  className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 text-center inline-block ${
                    service.featured
                      ? "bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
                      : "border border-[#1B2B4B] bg-transparent text-[#1B2B4B] hover:bg-[#1B2B4B] hover:text-white"
                  }`}
                >
                  {service.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section
        id="cta-section"
        className="bg-white px-4 py-16 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1B2B4B]">
            Ready To Explore Coaching?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#1B2B4B]/65">
            Connect with David to discuss your retirement transition goals and
            learn how personalized coaching can support your next chapter.
          </p>

          <Button
            asChild
            className="group mt-8 cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B] transition-all duration-300 hover:bg-[#D6B45A] hover:text-white"
          >
            <Link href="/contact">
              Contact David
              <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </section> */}
    </main>
  );
};

export default CoachingPage;
