'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAdminBook, useUpdateBook } from '@/features/books/hooks/useAdminBooks';
import { AdminBookForm } from '@/features/books/components/AdminBookForm';

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id;

  const { data, isLoading, error } = useAdminBook(bookId);
  const { mutate, isPending } = useUpdateBook();

  const handleSubmit = (formData) => {
    mutate(
      { bookId, formData },
      {
        onSuccess: () => {
          router.push('/admin/books');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading book...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
        <p className="text-red-500">Failed to load book</p>
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Edit Book</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Update book details</p>
      </div>
      <AdminBookForm
        initialData={book}
        isEdit={true}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}