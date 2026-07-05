// app/(dashboard)/(admin-dashboard)/admin/assessments/page.jsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAssessmentPages, useAdminAssessmentTypes } from '@/features/assessment/hooks/useAssessment';
import { AdminAssessmentsTable } from '@/features/assessment/components/AdminAssessmentsTable';
import { AdminAssessmentFilters } from '@/features/assessment/components/AdminAssessmentFilters';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';

export default function AdminAssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch assessment types for filter
  const { data: typesData, isLoading: typesLoading } = useAdminAssessmentTypes({
    limit: 100,
  });
  const assessmentTypes = typesData?.data || [];

  // Build query params
  const params = useMemo(() => {
    const p = {
      page,
      limit,
      sortBy: 'displayOrder',
      sortOrder: 'asc',
    };

    if (searchQuery) p.search = searchQuery;

    if (statusFilter === 'published') {
      p.isPublished = 'true';
    } else if (statusFilter === 'draft') {
      p.isPublished = 'false';
    }

    if (typeFilter !== 'all') {
      p.assessmentTypeId = typeFilter;
    }

    return p;
  }, [page, searchQuery, statusFilter, typeFilter]);

  const { data, isLoading, error, refetch } = useAdminAssessmentPages(params);

  const assessments = data?.data || [];
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

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              <FileText className="h-4 w-4" />
              Admin Assessments
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1B2B4B]">
              Manage Assessments
            </h1>
            <p className="mt-1 text-sm text-[#1B2B4B]/60">
              Create and manage retirement readiness assessments
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
          >
            <Link href="/admin/assessments/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Assessment
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <AdminAssessmentFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusChange}
        typeFilter={typeFilter}
        onTypeFilterChange={handleTypeChange}
        assessmentTypes={assessmentTypes}
        totalPages={meta.total}
        isLoading={isLoading || typesLoading}
      />

      {/* Table */}
      <AdminAssessmentsTable assessments={assessments} isLoading={isLoading} />

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <OrderPagination meta={meta} onPageChange={handlePageChange} />
      )}
    </motion.div>
  );
}