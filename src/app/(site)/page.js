import AboutDaveSection from "@/components/home/about-dave/about-dave-section";
import AssessmentPreviewSection from "@/components/home/assessment-preview/assessment-preview-section";
import BookSection from "@/components/home/book/book-section";
import HeroSection from "@/components/home/hero/hero";
import SupportSection from "@/components/home/hero/support-section";
import NewsletterSection from "@/components/home/newsletter/newsletter-section";
import TrustSection from "@/components/home/trust/trust-section";

const Home = () => {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <AssessmentPreviewSection />
      <AboutDaveSection />
      <BookSection />
      <SupportSection />
      {/* <NewsletterSection /> */}
    </>
  );
};

export default Home;