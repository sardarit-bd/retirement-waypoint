"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  HeartHandshake,
  Lightbulb,
  Target,
  Compass,
  ShieldCheck,
  Users,
  Sparkles,
} from "lucide-react";

const iconMap = {
  HeartHandshake,
  Lightbulb,
  Target,
  Compass,
  ShieldCheck,
  Users,
  Sparkles,
};

const MissionVision = ({ content }) => {
  const title =
    content?.title || "A More Human Way To Approach Retirement";
  const subtitle =
    content?.subtitle ||
    "Retirement Waypoint exists to bring emotional clarity, structure, and purpose to one of life's most meaningful transitions.";

  const missionTitle = content?.mission?.title || "Mission";
  const missionDesc =
    content?.mission?.description ||
    "Helping professionals thrive emotionally and psychologically in retirement.";
  const MissionIcon =
    iconMap[content?.mission?.iconName] || HeartHandshake;

  const visionTitle = content?.vision?.title || "Vision";
  const visionDesc =
    content?.vision?.description ||
    "A future where retirement is approached with clarity, structure, and purpose.";
  const VisionIcon = iconMap[content?.vision?.iconName] || Lightbulb;

  return (
    <section id="mission-vision" className="bg-[#F8F5EF] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#1B2B4B] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#1B2B4B]/65 sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] border-0 bg-white shadow-[0_20px_60px_rgba(27,43,75,0.08)]">
            <CardContent className="p-8 sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A84C]/15">
                <MissionIcon className="h-7 w-7 text-[#C9A84C]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B2B4B]">{missionTitle}</h3>
              <p className="mt-4 text-lg leading-relaxed text-[#1B2B4B]/68">
                {missionDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-0 bg-[#1B2B4B] shadow-[0_20px_60px_rgba(27,43,75,0.16)]">
            <CardContent className="p-8 sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C9A84C]/15">
                <VisionIcon className="h-7 w-7 text-[#C9A84C]" />
              </div>
              <h3 className="text-2xl font-bold text-white">{visionTitle}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/72">
                {visionDesc}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;