import { AboutClient } from '@/components/about/AboutClient';
import { getCmsData } from '@/lib/cms/fetchCmsData';

export async function generateMetadata() {
  const data = await getCmsData('/api/about-cms');
  const hero = data?.hero;
  const missionVision = data?.missionVision;

  const title = hero?.title
    ? `${hero.title} | Retirement Waypoint`
    : 'About Dave & Retirement Waypoint | Psychology-Based Retirement Transition';
  const description =
    missionVision?.subtitle ||
    'Learn about Dr. Dave Allen and how 40+ years of behavioral psychology helps professionals navigate retirement with clarity, structure, and purpose.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: hero?.profileImage ? [{ url: hero.profileImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: hero?.profileImage ? [hero.profileImage] : [],
    },
  };
}

export default async function AboutPage() {
  const data = await getCmsData('/api/about-cms');
  return <AboutClient initialContent={data} />;
}