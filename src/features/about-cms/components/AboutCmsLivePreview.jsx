'use client';

import { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Layers,
} from 'lucide-react';
import DaveStory from '@/components/about/dave-story';
import MissionVision from '@/components/about/mission-vision';
import CoreValues from '@/components/about/core-values';
import LifestyleCTA from '@/components/about/lifestyle-cta';
import FinalCTA from '@/components/about/final-cta';
import { Button } from '@/components/ui/button';

export function AboutCmsLivePreview({ formData, activeTab }) {
  const [viewDevice, setViewDevice] = useState('desktop'); // desktop | mobile
  const [showFullPage, setShowFullPage] = useState(false);

  const sectionTitles = {
    hero: 'Hero & Bio',
    missionVision: 'Mission & Vision',
    coreValues: 'Core Values',
    quoteBanner: 'Inspirational Quote Banner',
    finalCta: 'Call to Action',
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'hero':
        return <DaveStory content={formData?.hero} />;
      case 'missionVision':
        return <MissionVision content={formData?.missionVision} />;
      case 'coreValues':
        return <CoreValues content={formData?.coreValues} />;
      case 'quoteBanner':
        return <LifestyleCTA content={formData?.quoteBanner} />;
      case 'finalCta':
        return <FinalCTA content={formData?.finalCta} />;
      default:
        return <DaveStory content={formData?.hero} />;
    }
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-[#1B2B4B]/15 bg-[#04103A] text-white shadow-xl overflow-hidden">
      {/* Mockup Top Browser Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#06154F]/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs font-semibold text-white/70">
            {showFullPage
              ? 'Full About Page Live Preview'
              : `Live Preview: ${sectionTitles[activeTab] || 'Section'}`}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#C9A84C]/20 px-2 py-0.5 text-[10px] font-bold text-[#C9A84C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowFullPage(!showFullPage)}
            className={`h-8 px-2.5 text-xs font-medium cursor-pointer ${
              showFullPage
                ? 'bg-[#C9A84C] text-[#1B2B4B] font-bold hover:bg-[#D6B45A]'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" />
            {showFullPage ? 'Active Section' : 'Full Page'}
          </Button>

          <div className="flex items-center rounded-lg bg-white/10 p-0.5 border border-white/10">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewDevice('desktop')}
              className={`h-7 w-7 rounded-md cursor-pointer ${
                viewDevice === 'desktop'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title="Desktop View"
            >
              <Monitor className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewDevice('mobile')}
              className={`h-7 w-7 rounded-md cursor-pointer ${
                viewDevice === 'mobile'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              title="Mobile View"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Viewport Container */}
      <div className="relative flex-1 overflow-y-auto bg-white p-0 max-h-[calc(100vh-200px)] min-h-[500px]">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewDevice === 'mobile' ? 'max-w-sm shadow-2xl border-x border-gray-300' : 'w-full'
          }`}
        >
          {showFullPage ? (
            <div className="space-y-0">
              <DaveStory content={formData?.hero} />
              <MissionVision content={formData?.missionVision} />
              <CoreValues content={formData?.coreValues} />
              <LifestyleCTA content={formData?.quoteBanner} />
              <FinalCTA content={formData?.finalCta} />
            </div>
          ) : (
            renderActiveSection()
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutCmsLivePreview;
