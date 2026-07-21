'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Mail } from 'lucide-react';
import { ContactMessagesFilters, ContactMessagesPagination, ContactMessagesStats, ContactMessagesTable, useContactMessages, useContactMessageStats } from '@/features/contact-messages/contact-messages-index';
// import {
//   ContactMessagesStats,
//   ContactMessagesFilters,
//   ContactMessagesTable,
//   ContactMessagesPagination,
//   useContactMessages,
//   useContactMessageStats,
// } from '@/features/contact-messages';

export default function ContactMessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || '';

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search: search || undefined,
      status: status || undefined,
    }),
    [page, search, status]
  );

  const { data, isLoading, error, isFetching } = useContactMessages(params);
  const { data: statsData, isLoading: statsLoading } = useContactMessageStats();

  const updateUrlParams = (newParams) => {
    const urlParams = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        urlParams.set(key, value);
      }
    });
    router.push(`/admin/contact-messages?${urlParams.toString()}`, { scroll: false });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
    updateUrlParams({ search: value, status, page: 1 });
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
    updateUrlParams({ search, status: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateUrlParams({ search, status, page: newPage });
  };

  const handleReset = () => {
    setSearch('');
    setStatus('');
    setPage(1);
    router.push('/admin/contact-messages', { scroll: false });
  };

  const messages = data?.messages || [];
  const meta = data?.meta || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6"
    >
      <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)] backdrop-blur-xl sm:rounded-3xl">
        <div className="mb-3 flex w-fit items-center gap-2 rounded-full bg-[#C9A84C]/10 px-3 py-1.5 text-xs font-semibold text-[#C9A84C]">
          <Mail className="h-3.5 w-3.5" />
          Inbox
        </div>
        <h1 className="text-2xl font-bold text-[#1B2B4B] sm:text-3xl">Contact Messages</h1>
        <p className="mt-1 text-sm text-[#1B2B4B]/60">
          Review and manage inquiries submitted through the public contact form.
        </p>
      </div>

      <ContactMessagesStats data={statsData} isLoading={statsLoading} />

      <ContactMessagesFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        onReset={handleReset}
      />

      <ContactMessagesTable
        data={messages}
        meta={meta}
        isLoading={isLoading || isFetching}
        error={error}
      />

      <ContactMessagesPagination
        page={meta.page || 1}
        totalPages={meta.pages || 1}
        hasNextPage={meta.hasNextPage || false}
        hasPrevPage={meta.hasPrevPage || false}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
}