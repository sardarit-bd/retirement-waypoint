"use client";

import DaveStory from "@/components/about/dave-story";
import MissionVision from "@/components/about/mission-vision";
import CoreValues from "@/components/about/core-values";
import LifestyleCTA from "@/components/about/lifestyle-cta";
import FinalCTA from "@/components/about/final-cta";
import { useAboutCms } from "@/features/about-cms/hooks/useAboutCms";

export function AboutClient({ initialContent }) {
  const { data: response } = useAboutCms();
  const cms = initialContent !== undefined && initialContent !== null ? initialContent : response?.data;

  return (
    <main className="overflow-hidden bg-white">
      <DaveStory content={cms?.hero} />
      <MissionVision content={cms?.missionVision} />
      <CoreValues content={cms?.coreValues} />
      <LifestyleCTA content={cms?.quoteBanner} />
      <FinalCTA content={cms?.finalCta} />
    </main>
  );
}

export default AboutClient;
