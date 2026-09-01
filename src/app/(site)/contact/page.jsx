import { ContactClient } from '@/components/contact/ContactClient';
import { getCmsData } from '@/lib/cms/fetchCmsData';

export async function generateMetadata() {
  const data = await getCmsData('/api/contact-cms');
  const header = data?.header;

  const title = header?.title
    ? `${header.title} | Retirement Waypoint`
    : 'Contact Retirement Waypoint | Connect with Dave Allen';
  const description =
    header?.subtitle ||
    'Have questions about retirement readiness assessments, books, or transition coaching? Send a message and connect with Dr. Dave Allen.';

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

export default async function ContactPage() {
  const data = await getCmsData('/api/contact-cms');
  return <ContactClient initialContent={data} />;
}