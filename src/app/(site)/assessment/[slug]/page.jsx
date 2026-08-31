import AssessmentForm from '@/components/assessment/AssessmentForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getAssessment(slug) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  try {
    const res = await fetch(`${backendUrl}/api/assessments/public/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error(`Failed to fetch assessment for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const assessment = await getAssessment(slug);

  if (!assessment) {
    return {
      title: 'Assessment Not Found | Retirement Waypoint',
      description: 'The requested assessment could not be found.',
    };
  }

  const title =
    assessment.title ||
    assessment.introduction?.title ||
    assessment.hero?.title ||
    `${assessment.segment || slug?.replace(/-/g, ' ')} Assessment`;

  const description =
    assessment.introduction?.description ||
    assessment.hero?.description ||
    assessment.intro ||
    'Evaluate your retirement readiness across key psychological and lifestyle domains.';

  return {
    title: `${title} | Retirement Waypoint`,
    description,
    openGraph: {
      title: `${title} | Retirement Waypoint`,
      description,
      type: 'website',
    },
    alternates: {
      canonical: `/assessment/${slug}`,
    },
  };
}

export default async function AssessmentDetailPage({ params }) {
  const { slug } = await params;
  const assessment = await getAssessment(slug);

  if (!assessment) {
    return (
      <section className="min-h-screen bg-[#1B2B4B] px-4 py-60 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-2">Assessment not found</p>
          <p className="text-white/50 text-sm">
            The assessment you are looking for does not exist or has been unpublished.
          </p>
          <Link
            href="/assessment"
            className="inline-block mt-4 text-[#C9A84C] hover:text-[#D6B45A] transition-colors font-medium"
          >
            ← Back to all assessments
          </Link>
        </div>
      </section>
    );
  }

  return <AssessmentForm assessment={assessment} />;
}