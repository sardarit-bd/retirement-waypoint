import AboutHero from "@/components/about/about-hero";
import DaveStory from "@/components/about/dave-story";
import MissionVision from "@/components/about/mission-vision";
import ProfessionalTimeline from "@/components/about/professional-timeline";
import CoreValues from "@/components/about/core-values";
import LifestyleCTA from "@/components/about/lifestyle-cta";
import FinalCTA from "@/components/about/final-cta";

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <AboutHero />
      <DaveStory />
      <MissionVision />
      <ProfessionalTimeline />
      <CoreValues />
      <LifestyleCTA />
      <FinalCTA />
    </main>
  );
}