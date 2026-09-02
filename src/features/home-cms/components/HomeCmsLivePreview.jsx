'use client';

import { useState } from 'react';
import {
  Monitor,
  Smartphone,
  Sparkles,
  Shield,
  FileCheck,
  HeartHandshake,
  Mail,
  Layers,
  Eye,
} from 'lucide-react';
import HeroSection from '@/components/home/hero/hero';
import TrustSection from '@/components/home/trust/trust-section';
import AssessmentPreviewSection from '@/components/home/assessment-preview/assessment-preview-section';
import BookSection from '@/components/home/book/book-section';
import SupportSection from '@/components/home/hero/support-section';
import NewsletterSection from '@/components/home/newsletter/newsletter-section';
import { Button } from '@/components/ui/button';

export function HomeCmsLivePreview({ formData, activeTab }) {
  const [viewDevice, setViewDevice] = useState('desktop'); // desktop | mobile
  const [showFullPage, setShowFullPage] = useState(false);

  const sectionTitles = {
    hero: 'Hero Section',
    trust: 'Trust & Methodology',
    assessment: 'Assessment Preview',
    support: 'Support & Guidance',
    newsletter: 'Newsletter Subscription',
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroSection content={formData.hero} />;
      case 'trust':
        return <TrustSection content={formData.trust} />;
      case 'assessment':
        return <AssessmentPreviewSection content={formData.assessmentPreview} />;
      case 'support':
        return <SupportSection content={formData.support} />;
      case 'newsletter':
        return <NewsletterSection content={formData.newsletter} />;
      default:
        return <HeroSection content={formData.hero} />;
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
            {showFullPage ? 'Full Homepage Live Preview' : `Live Preview: ${sectionTitles[activeTab] || 'Section'}`}
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
      <div className="relative flex-1 overflow-y-auto bg-[#04103A] p-2 sm:p-4 max-h-[calc(100vh-200px)] min-h-[500px]">
        <div
          className={`mx-auto transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#04103A] ${
            viewDevice === 'mobile' ? 'max-w-sm' : 'w-full'
          }`}
        >
          {showFullPage ? (
            <div className="space-y-0">
              <HeroSection content={formData.hero} />
              <TrustSection content={formData.trust} />
              <AssessmentPreviewSection content={formData.assessmentPreview} />
              <BookSection />
              <SupportSection content={formData.support} />
              <NewsletterSection content={formData.newsletter} />
            </div>
          ) : (
            renderActiveSection()
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeCmsLivePreview;
