/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import {
  ArrowRight,
  Mail,
  Phone,
  Send,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import sendAnimation from '@/animations/message-sent.json';
import { useSubmitContactMessage } from '@/features/contact/hooks/useContact';
import { useContactCms } from '@/features/contact-cms/hooks/useContactCms';
import toast from 'react-hot-toast';

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

export function ContactClient({ initialContent }) {
  const { data: response } = useContactCms();
  const cms =
    initialContent !== undefined && initialContent !== null
      ? initialContent
      : response?.data;

  const header = cms?.header || fallbackHeader;
  const contactInfo = cms?.contactInfo || fallbackContactInfo;
  const promoCard = cms?.promoCard || fallbackPromoCard;
  const formInfo = cms?.formInfo || fallbackFormInfo;

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [showAnimation, setShowAnimation] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const lottieRef = useRef(null);

  const submitContactMessage = useSubmitContactMessage();
  const isSending = submitContactMessage.isPending;

  // Reset animation states when not sending
  useEffect(() => {
    if (!isSending && !showAnimation) {
      setIsAnimationComplete(false);
    }
  }, [isSending, showAnimation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Start animation immediately
    setShowAnimation(true);
    setIsAnimationComplete(false);

    submitContactMessage.mutate(form, {
      onSuccess: () => {
        // Success handled in animation callback
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            'Failed to send message. Please try again.',
          { duration: 5000, position: 'top-right' }
        );
      },
    });
  };

  // Handle animation completion
  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    setShowAnimation(false);

    if (submitContactMessage.isSuccess) {
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 4000,
        position: 'top-right',
      });
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      submitContactMessage.reset();
    }
  };

  const handleLottieComplete = () => {
    if (showAnimation) {
      handleAnimationComplete();
    }
  };

  const shouldShowLoading = isSending || showAnimation;

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      {/* Header Banner */}
      <section className="bg-[#1B2B4B] px-4 pb-20 pt-40 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">
            <MessageCircle className="h-4 w-4 text-[#C9A84C]" />
            {header.badge || 'Contact Retirement Waypoint'}
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {header.title}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
            {header.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section
        id="contact-information-section"
        className="-mt-10 px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left Column: Contact Info & Promo Card */}
          <div className="rounded-[32px] bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="text-2xl font-bold text-[#1B2B4B]">
              {contactInfo.sectionTitle}
            </h2>

            <p className="mt-3 leading-7 text-[#1B2B4B]/65">
              {contactInfo.sectionSubtitle}
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C9A84C]/20 text-[#C9A84C]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2B4B]">Email</h3>
                  <p className="mt-1 text-sm text-[#1B2B4B]/60">
                    {contactInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C9A84C]/20 text-[#C9A84C]">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1B2B4B]">Phone</h3>
                  <p className="mt-1 text-sm text-[#1B2B4B]/60">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Promo / Next Steps Card */}
            <div className="mt-10 rounded-3xl bg-[#1B2B4B] p-6 text-white">
              <h3 className="text-xl font-bold">{promoCard.title}</h3>

              <p className="mt-3 text-sm leading-7 text-white/70">
                {promoCard.description}
              </p>

              <Link
                href={promoCard.buttonLink || '/assessment'}
                className="mt-5 inline-flex cursor-pointer items-center rounded-full bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-[#1B2B4B] transition hover:bg-[#D6B45A]"
              >
                {promoCard.buttonText || 'Take Assessment'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Send A Message Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] bg-white p-6 shadow-2xl sm:p-8"
          >
            <h2 className="text-2xl font-bold text-[#1B2B4B]">
              {formInfo.formTitle}
            </h2>

            <p className="mt-3 leading-7 text-[#1B2B4B]/65">
              {formInfo.formSubtitle}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="h-13 w-full rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] px-4 text-[#1B2B4B] outline-none transition focus:border-[#C9A84C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="h-13 w-full rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] px-4 text-[#1B2B4B] outline-none transition focus:border-[#C9A84C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="How can we help?"
                  className="h-13 w-full rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] px-4 text-[#1B2B4B] outline-none transition focus:border-[#C9A84C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Message
                </label>
                <textarea
                  required
                  rows={7}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-2xl border border-[#1B2B4B]/10 bg-[#F8F5EF] p-4 text-[#1B2B4B] outline-none transition focus:border-[#C9A84C]"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={shouldShowLoading}
              className="group mt-6 h-13 cursor-pointer rounded-full bg-[#C9A84C] px-6 text-base font-semibold text-[#1B2B4B] transition-all duration-300 hover:bg-[#04103A] hover:text-white disabled:pointer-events-none disabled:opacity-90"
            >
              <span>{formInfo.submitButtonText || 'Send Message'}</span>

              <span className="ml-2 flex h-8 w-8 items-center justify-center overflow-visible">
                {shouldShowLoading ? (
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={sendAnimation}
                    loop={false}
                    className="h-8 w-8"
                    onComplete={handleLottieComplete}
                  />
                ) : (
                  <Send className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1.5" />
                )}
              </span>
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactClient;
