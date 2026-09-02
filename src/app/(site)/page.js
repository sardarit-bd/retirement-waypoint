import { HomeClient } from '@/components/home/HomeClient';
import { getCmsData } from '@/lib/cms/fetchCmsData';

export async function generateMetadata() {
  const data = await getCmsData('/api/home-cms');
  const hero = data?.hero;

  const title = hero?.title
    ? `${hero.title} | Retirement Waypoint`
    : 'Retirement Waypoint | Navigate Retirement With Confidence & Purpose';
  const description =
    hero?.subtitle ||
    'Retirement Waypoint helps professionals understand their readiness, rediscover purpose, and build a meaningful next chapter through guided assessments and expert insights.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: hero?.backgroundImage ? [{ url: hero.backgroundImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: hero?.backgroundImage ? [hero.backgroundImage] : [],
    },
  };
}

export default async function HomePage() {
  const data = await getCmsData('/api/home-cms');
  return <HomeClient initialContent={data} />;
}