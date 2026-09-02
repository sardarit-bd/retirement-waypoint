'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Monitor, Smartphone, Layers, ArrowRight, Mail, Phone, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactClient } from '@/components/contact/ContactClient';

const fallbackHeader = {
  badge: 'Contact Retirement Waypoint',
  title: 'Let’s Start The Conversation',
  subtitle:
    'Have questions about assessments, books, or retirement transition guidance? Send a message and we’ll get back to you.',
};

const fallbackContactInfo = {
  sectionTitle: 'Contact Information',
  sectionSubtitle:
    'Reach out for questions, support, or collaboration opportunities.',
  email: 'dave@retirementwaypoint.com',
  phone: '+1 (760) 960-0162',
};

const fallbackPromoCard = {
  title: 'Not Sure Where To Start?',
  description:
    'Take the retirement readiness assessment to understand your current transition profile.',
  buttonText: 'Take Assessment',
  buttonLink: '/assessment',
};

const fallbackFormInfo = {
  formTitle: 'Send A Message',
  formSubtitle:
    'Fill out the form below and we’ll respond as soon as possible.',
  submitButtonText: 'Send Message',
};

export function ContactCmsLivePreview({ formData, activeTab }) {
  const [viewDevice, setViewDevice] = useState('desktop');
  const [showFullPage, setShowFullPage] = useState(true);

  const sectionTitles = {
    header: 'Header & Banner',
    contactInfo: 'Contact Info & Promo Card',
    formInfo: 'Form Settings',
  };

  const header = formData?.header || fallbackHeader;
  const contactInfo = formData?.contactInfo || fallbackContactInfo;
  const promoCard = formData?.promoCard || fallbackPromoCard;
  const formInfo = formData?.formInfo || fallbackFormInfo;

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'header':
        return (
          <div className="bg-[#1B2B4B] p-8 sm:p-12 text-white text-center rounded-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-xl">
              <MessageCircle className="h-4 w-4 text-[#C9A84C]" />
              {header.badge || 'Contact Retirement Waypoint'}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
              {header.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
              {header.subtitle}
            </p>
          </div>
        );

      case 'contactInfo':
        return (
          <div className="space-y-6 bg-[#F8F5EF] p-6">
            <div className="rounded-3xl bg-white p-6 shadow-md">
              <h2 className="text-xl font-bold text-[#1B2B4B]">
                {contactInfo.sectionTitle}
              </h2>
              <p className="mt-2 text-sm text-[#1B2B4B]/65">
                {contactInfo.sectionSubtitle}
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/20 text-[#C9A84C]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1B2B4B]">Email</h3>
                    <p className="text-xs text-[#1B2B4B]/60">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C9A84C]/20 text-[#C9A84C]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1B2B4B]">Phone</h3>
                    <p className="text-xs text-[#1B2B4B]/60">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>

              {/* Promo Card */}
              <div className="mt-8 rounded-2xl bg-[#1B2B4B] p-5 text-white">
                <h3 className="text-base font-bold">{promoCard.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {promoCard.description}
                </p>
                <Link
                  href={promoCard.buttonLink || '/assessment'}
                  className="mt-4 inline-flex items-center rounded-full bg-[#C9A84C] px-4 py-2 text-xs font-semibold text-[#1B2B4B] transition hover:bg-[#D6B45A]"
                >
                  {promoCard.buttonText || 'Take Assessment'}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        );

      case 'formInfo':
        return (
          <div className="bg-[#F8F5EF] p-6">
            <div className="rounded-3xl bg-white p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-[#1B2B4B]">
                {formInfo.formTitle}
              </h2>
              <p className="text-sm text-[#1B2B4B]/65">
                {formInfo.formSubtitle}
              </p>

              <div className="space-y-3 pt-2">
                <div className="h-10 w-full rounded-xl bg-[#F8F5EF] border border-[#1B2B4B]/10 px-3 text-xs text-[#1B2B4B]/40 flex items-center">
                  Your name
                </div>
                <div className="h-10 w-full rounded-xl bg-[#F8F5EF] border border-[#1B2B4B]/10 px-3 text-xs text-[#1B2B4B]/40 flex items-center">
                  you@example.com
                </div>
                <div className="h-10 w-full rounded-xl bg-[#F8F5EF] border border-[#1B2B4B]/10 px-3 text-xs text-[#1B2B4B]/40 flex items-center">
                  How can we help?
                </div>
                <div className="h-24 w-full rounded-xl bg-[#F8F5EF] border border-[#1B2B4B]/10 p-3 text-xs text-[#1B2B4B]/40">
                  Write your message...
                </div>
              </div>

              <Button
                type="button"
                className="group mt-4 h-11 cursor-pointer rounded-full bg-[#C9A84C] px-6 text-sm font-semibold text-[#1B2B4B] hover:bg-[#04103A] hover:text-white"
              >
                <span>{formInfo.submitButtonText || 'Send Message'}</span>
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return <ContactClient initialContent={formData} />;
    }
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-[#1B2B4B]/15 bg-[#04103A] text-white shadow-xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#06154F]/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 text-xs font-semibold text-white/70">
            {showFullPage
              ? 'Full Contact Page Live Preview'
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
            {showFullPage ? 'Full Page' : 'Active Tab Focus'}
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

      {/* Viewport Container */}
      <div className="relative flex-1 overflow-y-auto bg-[#F8F5EF] p-0 max-h-[calc(100vh-200px)] min-h-[500px]">
        <div
          className={`mx-auto transition-all duration-300 ${
            viewDevice === 'mobile'
              ? 'max-w-sm shadow-2xl border-x border-gray-300 min-h-full'
              : 'w-full'
          }`}
        >
          {showFullPage ? (
            <ContactClient initialContent={formData} />
          ) : (
            renderActiveSection()
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactCmsLivePreview;
