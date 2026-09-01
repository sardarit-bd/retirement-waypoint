import { CoachingClient } from '@/components/coaching/CoachingClient';
import { getCmsData } from '@/lib/cms/fetchCmsData';

export async function generateMetadata() {
  const data = await getCmsData('/api/coaching-cms');
  const hero = data?.hero;

  const title = hero?.title
    ? `${hero.title} | Retirement Waypoint`
    : 'Retirement Coaching with David Allen, Ph.D. | Retirement Waypoint';
  const description =
    hero?.subtitle ||
    'Personalized guidance and behavioral science framework to help you navigate retirement with purpose, structure, confidence, and emotional readiness.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CoachingPage() {
  const data = await getCmsData('/api/coaching-cms');
  return <CoachingClient initialContent={data} />;
}
