'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Search,
  Sparkles,
  Eye,
  Pencil,
  Trash2,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import {
  useAdminBooks,
  useArchiveBook,
  usePublishBook,
  useDeleteBook,
} from '../hooks/useAdminBooks';
import { AdminDeleteBookDialog } from './AdminDeleteBookDialog';

const cardClass =
  'rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]';

function AdminBooksSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`${cardClass} p-6`}>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-3 h-5 w-80" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={`${cardClass} p-5`}>
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="mt-4 h-5 w-32" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBooksError({ error, refetch }) {
  const message =
    error?.response?.data?.message || error?.message || 'Failed to load books';

  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center">
      <div className="mx-auto mb-4 w-fit rounded-full bg-red-500/10 p-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      <h2 className="text-xl font-semibold text-red-500">Unable to Load Books</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">{message}</p>
      <Button
        onClick={() => refetch()}
        className="mt-6 rounded-full bg-[#C9A84C] px-6 font-semibold text-[#1B2B4B] hover:bg-[#D6B45A]"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}

export function AdminBooksContent() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    bookId: null,
    bookTitle: '',
  });
  const limit = 9;

  const params = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      status: status === 'all' ? undefined : status,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }),
    [page, search, status]
  );

  const { data, isLoading, error, refetch } = useAdminBooks(params);
  const publishBook = usePublishBook();
  const archiveBook = useArchiveBook();
  const deleteBook = useDeleteBook();

  const books = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handlePublish = (bookId) => publishBook.mutate(bookId);
  const handleArchive = (bookId) => archiveBook.mutate(bookId);

  const handleDeleteClick = (book) => {
    setDeleteDialog({
      isOpen: true,
      bookId: book._id,
      bookTitle: book.title,
    });
  };

  const handleDeleteConfirm = () => {
    deleteBook.mutate(deleteDialog.bookId, {
      onSuccess: () => {
        setDeleteDialog({ isOpen: false, bookId: null, bookTitle: '' });
      },
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, bookId: null, bookTitle: '' });
  };

  if (isLoading) return <AdminBooksSkeleton />;
  if (error) return <AdminBooksError error={error} refetch={refetch} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className={`${cardClass} p-6`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              <BookOpen className="h-4 w-4" />
              Admin Books
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1B2B4B]">
              Manage your digital library
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#1B2B4B]/60">
              Review published and draft titles, publish new books, and keep archived content out
              of the storefront.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href="/admin/books/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Book
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`${cardClass} p-4`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
              <Input
                value={search}
                onChange={(event) => {
                  setPage(1);
                  setSearch(event.target.value);
                }}
                placeholder="Search books"
                className="h-10 w-full rounded-full border-[#1B2B4B]/10 bg-[#F8F5EF] pl-9 text-sm text-[#1B2B4B] sm:w-56 lg:w-64"
              />
            </div>
            <select
              value={status}
              onChange={(event) => {
                setPage(1);
                setStatus(event.target.value);
              }}
              className="h-10 rounded-full border border-[#1B2B4B]/10 bg-[#F8F5EF] px-3 text-sm text-[#1B2B4B] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
            >
              <option value="all">All statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="text-sm text-[#1B2B4B]/50">
            {books.length} book{books.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {books.length === 0 ? (
        <div className={`${cardClass} p-12 text-center`}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[#C9A84C]">
            <Sparkles className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-semibold text-[#1B2B4B]">No books found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#1B2B4B]/60">
            Try a different search or status filter to find the right title.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => {
            const isPublished = book.status === 'PUBLISHED';
            const isArchived = book.status === 'ARCHIVED';
            const isDraft = book.status === 'DRAFT';

            return (
              <motion.article
                key={book._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${cardClass} overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_rgba(4,16,58,0.12)]`}
              >
                <div className="relative aspect-4/5 bg-[#F8F5EF]">
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold text-[#1B2B4B]/30">
                      No Cover
                    </div>
                  )}
                  <div
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white ${
                      isPublished
                        ? 'bg-emerald-500'
                        : isArchived
                        ? 'bg-gray-500'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {book.status}
                  </div>
                  {book.featured && (
                    <div className="absolute right-4 top-4 rounded-full bg-[#C9A84C] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B2B4B]">
                      Featured
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-sm font-medium text-[#C9A84C]">{book.authorName}</p>
                    <h3 className="mt-1 text-lg font-semibold text-[#1B2B4B] line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#1B2B4B]/60">
                      {book.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-[#1B2B4B]/60">
                    <span className="rounded-full bg-[#F8F5EF] px-3 py-1">${book.price}</span>
                    <span className="rounded-full bg-[#F8F5EF] px-3 py-1">
                      {book.pageCount} pages
                    </span>
                    <span className="rounded-full bg-[#F8F5EF] px-3 py-1">
                      {book.totalReviews || 0} reviews
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {/* View Button */}
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-[#F8F5EF]"
                    >
                      <Link href={`/admin/books/${book._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* Edit Button */}
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-[#F8F5EF]"
                    >
                      <Link href={`/admin/books/${book._id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>

                    {/* Publish Button - Only for DRAFT */}
                    {isDraft && (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(book._id)}
                        disabled={publishBook.isPending}
                        className="flex-1 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-70"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Publish
                      </Button>
                    )}

                    {/* Archive Button - Only for PUBLISHED */}
                    {isPublished && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleArchive(book._id)}
                        disabled={archiveBook.isPending}
                        className="flex-1 rounded-full border-[#1B2B4B]/10 hover:border-[#C9A84C]/30 hover:bg-[#F8F5EF]"
                      >
                        Archive
                      </Button>
                    )}

                    {/* Unarchive/Republish - Only for ARCHIVED */}
                    {isArchived && (
                      <Button
                        size="sm"
                        onClick={() => handlePublish(book._id)}
                        disabled={publishBook.isPending}
                        className="flex-1 rounded-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] disabled:opacity-70"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Republish
                      </Button>
                    )}

                    {/* Delete Button - Always available */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(book)}
                      className="rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                      disabled={deleteBook.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <OrderPagination meta={meta} onPageChange={setPage} />
      )}

      {/* Delete Confirmation Dialog */}
      <AdminDeleteBookDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        bookTitle={deleteDialog.bookTitle}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteBook.isPending}
      />
    </motion.div>
  );
}