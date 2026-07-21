'use client';

import { useState, useMemo } from 'react';
import {
  AssessmentParticipantsStats,
  AssessmentParticipantsFilters,
  AssessmentParticipantsTable,
  AssessmentParticipantsPagination,
  useAssessmentParticipants,
  useAssessmentParticipantStats,
} from '@/features/assessment-participants';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AssessmentParticipantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('search') || '';
  const initialAssessment = searchParams.get('assessment') || '';
  const initialResult = searchParams.get('result') || '';
  const initialSort = searchParams.get('sort') || 'newest';

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [assessmentSlug, setAssessmentSlug] = useState(initialAssessment);
  const [resultRange, setResultRange] = useState(initialResult);
  const [sortBy, setSortBy] = useState(initialSort);

  const params = useMemo(() => ({
    page,
    limit: 10,
    search: search || undefined,
    assessmentSlug: assessmentSlug || undefined,
    resultRange: resultRange || undefined,
    sortBy,
  }), [page, search, assessmentSlug, resultRange, sortBy]);

  const { data, isLoading, error, isFetching } = useAssessmentParticipants(params);
  const { data: statsData, isLoading: statsLoading } = useAssessmentParticipantStats();

  const updateUrlParams = (newParams) => {
    const params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      }
    });
    router.push(`/admin/assessment-participants?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
    updateUrlParams({ ...getCurrentParams(), search: value, page: 1 });
  };

  const handleAssessmentChange = (value) => {
    setAssessmentSlug(value);
    setPage(1);
    updateUrlParams({ ...getCurrentParams(), assessment: value, page: 1 });
  };

  const handleResultChange = (value) => {
    setResultRange(value);
    setPage(1);
    updateUrlParams({ ...getCurrentParams(), result: value, page: 1 });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
    updateUrlParams({ ...getCurrentParams(), sort: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateUrlParams({ ...getCurrentParams(), page: newPage });
  };

  const handleReset = () => {
    setSearch('');
    setAssessmentSlug('');
    setResultRange('');
    setSortBy('newest');
    setPage(1);
    router.push('/admin/assessment-participants', { scroll: false });
  };

  const getCurrentParams = () => ({
    search,
    assessment: assessmentSlug,
    result: resultRange,
    sort: sortBy,
    page,
  });

  const submissions = data?.submissions || [];
  console.log(data)
  const meta = data?.meta || {};
  const filterOptions = data?.filters || {};

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
      <AssessmentParticipantsStats data={statsData} isLoading={statsLoading} />

      <AssessmentParticipantsFilters
        search={search}
        onSearchChange={handleSearchChange}
        assessmentSlug={assessmentSlug}
        onAssessmentChange={handleAssessmentChange}
        resultRange={resultRange}
        onResultRangeChange={handleResultChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        assessmentOptions={filterOptions.assessmentSlugs || []}
        resultOptions={filterOptions.resultRanges || []}
        onReset={handleReset}
      />

      <AssessmentParticipantsTable
        data={submissions}
        meta={meta}
        isLoading={isLoading || isFetching}
        error={error}
      />

      <AssessmentParticipantsPagination
        page={meta.page || 1}
        totalPages={meta.pages || 1}
        hasNextPage={meta.hasNextPage || false}
        hasPrevPage={meta.hasPrevPage || false}
        onPageChange={handlePageChange}
      />
    </div>
  );
}