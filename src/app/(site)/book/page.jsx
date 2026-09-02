import { BookStoreClient } from '@/components/book/BookStoreClient';

export const metadata = {
  title: 'Books & Guides | Retirement Waypoint',
  description:
    'Explore books and guides by David Allen, Ph.D. designed to help you navigate retirement psychology, identity, and lifestyle planning.',
  openGraph: {
    title: 'Books & Guides | Retirement Waypoint',
    description:
      'Explore books and guides by David Allen, Ph.D. designed to help you navigate retirement psychology, identity, and lifestyle planning.',
    type: 'website',
  },
  alternates: {
    canonical: '/book',
  },
};

async function getInitialBooks() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  try {
    const res = await fetch(
      `${backendUrl}/api/public/books?page=1&limit=12&sortBy=publishedAt&sortOrder=desc`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { books: [], pagination: null };
    const json = await res.json();
    return {
      books: json?.data || [],
      pagination: json?.meta || null,
    };
  } catch (error) {
    console.error('Failed to fetch books on server:', error);
    return { books: [], pagination: null };
  }
}

export default async function BookPage() {
  const { books, pagination } = await getInitialBooks();

  return (
    <BookStoreClient
      initialBooks={books}
      initialPagination={pagination}
    />
  );
}