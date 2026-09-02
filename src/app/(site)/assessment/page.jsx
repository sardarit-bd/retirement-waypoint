import Link from 'next/link';

export const metadata = {
  title: 'Choose Your Assessment | Retirement Waypoint',
  description:
    'Select the retirement readiness assessment tailored to your stage: pre-retiree, recent-retiree, or established retiree.',
  openGraph: {
    title: 'Choose Your Assessment | Retirement Waypoint',
    description:
      'Select the retirement readiness assessment tailored to your stage: pre-retiree, recent-retiree, or established retiree.',
    type: 'website',
  },
  alternates: {
    canonical: '/assessment',
  },
};

const assessmentOrder = {
  'pre-retiree': 1,
  'recent-retiree': 2,
  'established-retiree': 3,
};

async function getAssessmentLandingData() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  try {
    const [landingRes, assessmentsRes] = await Promise.all([
      fetch(`${backendUrl}/api/assessment-landing`, { next: { revalidate: 60 } }).catch(() => null),
      fetch(`${backendUrl}/api/assessments/public`, { next: { revalidate: 60 } }).catch(() => null),
    ]);

    const landingJson = landingRes?.ok ? await landingRes.json() : null;
    const assessmentsJson = assessmentsRes?.ok ? await assessmentsRes.json() : null;

    return {
      landing: landingJson?.data || {},
      assessments: Array.isArray(assessmentsJson?.data) ? assessmentsJson.data : [],
    };
  } catch (err) {
    console.error('Error fetching assessment data on server:', err);
    return { landing: {}, assessments: [] };
  }
}

const segmentLabels = {
  'pre-retiree': 'Pre-Retiree',
  'recent-retiree': 'Recent-Retiree',
  'established-retiree': 'Established-Retiree',
};

export default async function AssessmentPage() {
  const { landing, assessments } = await getAssessmentLandingData();

  const sortedAssessments = [...assessments].sort(
    (a, b) => (assessmentOrder[a.slug] ?? 999) - (assessmentOrder[b.slug] ?? 999)
  );

  return (
    <section className="min-h-screen bg-[#1B2B4B] px-4 py-60">
      <div className="mx-auto max-w-6xl text-center">
        {/* Hero Section - Pre-rendered on Server */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">
          {landing.badge || 'Retirement Waypoint'}
        </p>

        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          {landing.title || 'Choose Your Assessment'}
        </h1>

        <p className="mx-auto mb-4 max-w-2xl text-white/70">
          {landing.subtitle || 'Select the assessment that best matches your current retirement stage.'}
        </p>

        <p className="mx-auto mb-12 max-w-4xl text-base leading-relaxed text-white/70">
          {landing.description ||
            'Each assessment draws on psychological research and includes reflection ' +
              'questions that will be analyzed alongside the assessment items to ' +
              'provide a complete and transparent measure of your current retirement ' +
              'readiness and overall status.'}
        </p>

        {/* Assessment Cards */}
        {sortedAssessments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No assessments available at this time.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {sortedAssessments.map((assessment) => (
              <Link
                key={assessment.slug}
                href={`/assessment/${assessment.slug}`}
                className="cursor-pointer rounded-3xl border border-white/10 bg-white/10 p-7 text-left shadow-xl backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15"
              >
                <h2 className="mb-3 text-2xl font-bold text-white capitalize">
                  {segmentLabels[assessment.slug] ||
                    assessment.segment ||
                    assessment.slug?.replace(/-/g, ' ')}
                </h2>

                <p className="mb-6 text-white/65">
                  {assessment.hero?.subtitle ||
                    assessment.introduction?.subtitle ||
                    assessment.intro ||
                    ''}
                </p>

                <span className="font-semibold text-[#C9A84C]">
                  Start Assessment →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}