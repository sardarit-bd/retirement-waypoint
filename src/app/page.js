import AboutDaveSection from '@/components/home/about-dave/about-dave-section'
import AssessmentPreviewSection from '@/components/home/assessment-preview/assessment-preview-section'
import BookSection from '@/components/home/book/book-section'
import HeroSection from '@/components/home/hero/hero'
import TrustSection from '@/components/home/trust/trust-section'
import Navbar from '@/components/shared/navbar/navbar'
import React from 'react'

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustSection />
      <AssessmentPreviewSection />
      <AboutDaveSection />
      <BookSection />
    </>
  )
}

export default Home