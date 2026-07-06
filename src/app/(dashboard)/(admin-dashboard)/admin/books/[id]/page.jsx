'use client';

import { useParams } from 'next/navigation';
import { AdminBookDetails } from '@/features/books/components/AdminBookDetails';
import { useAdminBook } from '@/features/books/hooks/useAdminBooks';

export default function BookDetailsPage() {
  const params = useParams();
  const bookId = params.id;
  const { data, isLoading, error } = useAdminBook(bookId);

  return (
    <div className="max-w-5xl mx-auto py-6">
      <AdminBookDetails 
        book={data?.data} 
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}