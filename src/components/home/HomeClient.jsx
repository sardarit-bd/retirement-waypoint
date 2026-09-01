"use client";

import HeroSection from "@/components/home/hero/hero";
import TrustSection from "@/components/home/trust/trust-section";
import AssessmentPreviewSection from "@/components/home/assessment-preview/assessment-preview-section";
import BookSection from "@/components/home/book/book-section";
import SupportSection from "@/components/home/hero/support-section";
import NewsletterSection from "@/components/home/newsletter/newsletter-section";
import { useHomeCms } from "@/features/home-cms/hooks/useHomeCms";

export function HomeClient() {
  const { data: response } = useHomeCms();
  const cms = response?.data;

  return (
    <>
      <HeroSection content={cms?.hero} />
      <TrustSection content={cms?.trust} />
      <AssessmentPreviewSection content={cms?.assessmentPreview} />
      <BookSection />
      <SupportSection content={cms?.support} />
      <NewsletterSection content={cms?.newsletter} />
    </>
  );
}

export default HomeClient;
