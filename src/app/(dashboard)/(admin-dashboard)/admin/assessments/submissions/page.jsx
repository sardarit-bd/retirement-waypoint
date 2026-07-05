'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useAdminSubmissions } from '@/features/assessment/hooks/useAssessment';
import { AdminSubmissionsTable } from '@/features/assessment/components/AdminSubmissionsTable';
import { AdminSubmissionsFilters } from '@/features/assessment/components/AdminSubmissionsFilters';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';

export default function AdminSubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('completedAt_desc');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Parse sort options
  const [sortField, sortOrder] = sortBy.split('_');

  // Build query params
  const params = useMemo(() => {
    const p = {
      page,
      limit,
      sortBy: sortField,
      sortOrder,
    };

    if (searchQuery) p.search = searchQuery;

    return p;
  }, [page, searchQuery, sortField, sortOrder]);

  const { data, isLoading, error, refetch } = useAdminSubmissions(params);

  const submissions = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  if (error) {
    return (
      <div className="py-6">
        <DashboardErrorState error={error} refetch={refetch} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
            <FileText className="h-4 w-4" />
            Assessment Submissions
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-[#1B2B4B]">
            Submission History
          </h1>
          <p className="mt-1 text-sm text-[#1B2B4B]/60">
            View all assessment submissions from users
          </p>
        </div>
      </div>

      {/* Filters */}
      <AdminSubmissionsFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalSubmissions={meta.total}
        isLoading={isLoading}
      />

      {/* Table */}
      <AdminSubmissionsTable submissions={submissions} isLoading={isLoading} />

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <OrderPagination meta={meta} onPageChange={handlePageChange} />
      )}
    </motion.div>
  );
}