import { BookDetailsContent } from '@/features/reviews/components/BookDetailsContent';
import Link from 'next/link';

async function getBook(slug) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  try {
    const res = await fetch(`${backendUrl}/api/public/books/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error(`Failed to fetch book for slug "${slug}":`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await getBook(slug);

  if (!book) {
    return {
      title: 'Book Not Found | Retirement Waypoint',
      description: 'The requested book could not be found.',
    };
  }

  const title = book.title || 'Book Details';
  const description =
    book.subtitle ||
    book.description?.slice(0, 160) ||
    'Retirement planning publication by David Allen, Ph.D.';

  return {
    title: `${title} | Retirement Waypoint`,
    description,
    openGraph: {
      title: `${title} | Retirement Waypoint`,
      description,
      type: 'book',
      images: book.coverImage ? [{ url: book.coverImage }] : [],
    },
    alternates: {
      canonical: `/book/${slug}`,
    },
  };
}

export default async function BookDetailsPage({ params }) {
  const { slug } = await params;
  const book = await getBook(slug);

  if (!book) {
    return (
      <main className="min-h-screen bg-[#F8F5EF] py-32 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="text-3xl font-bold text-[#1B2B4B]">Book Not Found</h1>
          <p className="mt-2 text-[#1B2B4B]/60">
            Sorry, we couldn't find the book you're looking for.
          </p>
          <Link
            href="/book"
            className="inline-block mt-6 rounded-2xl bg-[#C9A84C] px-6 py-3 font-bold text-[#1B2B4B] hover:bg-[#D6B45A] transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </main>
    );
  }

  return <BookDetailsContent book={book} />;
}