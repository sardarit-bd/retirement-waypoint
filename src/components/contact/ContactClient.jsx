'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  Phone,
  Send,
  MessageCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const submitContactMessage = useSubmitContactMessage();
  const isSending = submitContactMessage.isPending;

  const validateField = (field, value) => {
    const trimmed = typeof value === 'string' ? value.trim() : '';
    switch (field) {
      case 'name':
        if (!trimmed) return 'Please enter your name.';
        if (trimmed.length < 3) return 'Please enter a name with at least 3 characters.';
        if (trimmed.length > 100) return 'Name cannot exceed 100 characters.';
        return '';
      case 'email':
        if (!trimmed) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Please enter a valid email address.';
        if (trimmed.length > 255) return 'Email cannot exceed 255 characters.';
        return '';
      case 'subject':
        if (!trimmed) return 'Please enter a subject.';
        if (trimmed.length < 5) return 'Please enter a subject of at least 5 characters.';
        if (trimmed.length > 150) return 'Subject cannot exceed 150 characters.';
        return '';
      case 'message':
        if (!trimmed) return 'Please enter your message.';
        if (trimmed.length < 20) return 'Please enter a message of at least 20 characters.';
        if (trimmed.length > 3000) return 'Message cannot exceed 3000 characters.';
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg || undefined }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, form[field]);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while a request is in flight
    if (isSending) {
      return;
    }

    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      subject: validateField('subject', form.subject),
      message: validateField('message', form.message),
    };

    const activeErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([, msg]) => Boolean(msg))
    );

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      const firstInvalidKey = Object.keys(activeErrors)[0];
      const el = document.getElementById(`contact-${firstInvalidKey}`);
      if (el) el.focus();
      return;
    }

    setErrors({});

    submitContactMessage.mutate(form, {
      onSuccess: (response) => {
        // Show success toast immediately upon confirmed API response
        toast.success(
          response?.message || "Message sent successfully! We'll get back to you soon.",
          {
            duration: 4000,
            position: 'top-right',
          }
        );

        // Reset form fields only after confirmed success
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setErrors({});
        setTouched({});
        submitContactMessage.reset();
      },
      onError: (error) => {
        // Preserve user input on failure; map field errors if returned from backend
        const serverErrors = error.response?.data?.errors;
        if (serverErrors && typeof serverErrors === 'object') {
          setErrors((prev) => ({ ...prev, ...serverErrors }));
          const firstKey = Object.keys(serverErrors)[0];
          if (firstKey) {
            const el = document.getElementById(`contact-${firstKey}`);
            if (el) el.focus();
          }
        }

        toast.error(
          error.response?.data?.message ||
            'Failed to send message. Please review the highlighted fields and try again.',
          { duration: 5000, position: 'top-right' }
        );
      },
    });
  };

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
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={3}
                  maxLength={100}
                  type="text"
                  value={form.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="Your name"
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={`h-13 w-full rounded-2xl border px-4 text-[#1B2B4B] outline-none transition ${
                    errors.name
                      ? 'border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C]'
                  }`}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@example.com"
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={`h-13 w-full rounded-2xl border px-4 text-[#1B2B4B] outline-none transition ${
                    errors.email
                      ? 'border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C]'
                  }`}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold text-[#1B2B4B]">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  required
                  minLength={5}
                  maxLength={150}
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleFieldChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  placeholder="How can we help?"
                  aria-required="true"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  className={`h-13 w-full rounded-2xl border px-4 text-[#1B2B4B] outline-none transition ${
                    errors.subject
                      ? 'border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C]'
                  }`}
                />
                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-[#1B2B4B]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      form.message.trim().length > 0 && form.message.trim().length < 20
                        ? 'font-medium text-amber-600'
                        : 'text-[#1B2B4B]/50'
                    }`}
                  >
                    {form.message.trim().length}/20 min characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={20}
                  maxLength={3000}
                  rows={7}
                  value={form.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  placeholder="Write your message (minimum 20 characters)..."
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full resize-none rounded-2xl border p-4 text-[#1B2B4B] outline-none transition ${
                    errors.message
                      ? 'border-red-500 bg-red-50/20 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                      : 'border-[#1B2B4B]/10 bg-[#F8F5EF] focus:border-[#C9A84C]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSending}
              className="group mt-6 h-13 cursor-pointer rounded-full bg-[#C9A84C] px-6 text-base font-semibold text-[#1B2B4B] transition-all duration-300 hover:bg-[#04103A] hover:text-white disabled:pointer-events-none disabled:opacity-90"
            >
              <span>{isSending ? 'Sending...' : formInfo.submitButtonText || 'Send Message'}</span>

              <span className="ml-2 flex items-center justify-center">
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
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
