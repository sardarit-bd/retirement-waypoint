'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCreateBook } from '@/features/books/hooks/useAdminBooks';
import { AdminBookForm } from '@/features/books/components/AdminBookForm';

export default function CreateBookPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateBook();

  const handleSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        router.push('/admin/books');
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <Button
          asChild
          variant="ghost"
          className="gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B] mb-4"
        >
          <Link href="/admin/books">
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Create New Book</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Add a new digital book to the store</p>
      </div>
      <AdminBookForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}