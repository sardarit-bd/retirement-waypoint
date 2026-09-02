"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Compass,
  ShieldCheck,
  Users,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const iconMap = {
  Target,
  Compass,
  ShieldCheck,
  Users,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
};

const defaultValues = [
  {
    iconName: "Target",
    title: "Purpose",
    description:
      "Helping people rediscover meaning and direction beyond their professional identity.",
  },
  {
    iconName: "Compass",
    title: "Clarity",
    description:
      "Turning uncertainty into a clearer path for the next chapter of life.",
  },
  {
    iconName: "ShieldCheck",
    title: "Confidence",
    description:
      "Supporting professionals as they move forward with emotional readiness.",
  },
  {
    iconName: "Users",
    title: "Human Connection",
    description:
      "Recognizing that relationships, belonging, and support shape a fulfilling retirement.",
  },
];

const CoreValues = ({ content }) => {
  const title =
    content?.title || "The Values Behind Retirement Waypoint";
  const subtitle =
    content?.subtitle ||
    "Every part of the platform is shaped by the belief that retirement should feel guided, personal, and meaningful.";
  const valuesList = content?.values?.length
    ? content.values
    : defaultValues;

  return (
    <section className="relative bg-[#1B2B4B] py-20 sm:py-24 lg:py-28">
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valuesList.map((val, idx) => {
            const Icon = iconMap[val.iconName] || Target;
            return (
              <Card
                key={`${idx}-${val.title}`}
                className="rounded-[26px] border border-white/10 bg-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/35 hover:bg-white/15"
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C]/15">
                    <Icon className="h-6 w-6 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{val.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {val.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;