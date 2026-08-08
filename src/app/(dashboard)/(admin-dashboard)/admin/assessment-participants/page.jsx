'use client';

import { useState, useMemo } from 'react';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { AssessmentParticipantsAPI } from '@/features/assessment-participants/api/assessment-participants.api';
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
  const [exportingFormat, setExportingFormat] = useState(null);

  const handleExport = async (format) => {
    if (exportingFormat) return;

    setExportingFormat(format);
    try {
      const response = await AssessmentParticipantsAPI.exportParticipants({
        search: search || undefined,
        assessmentSlug: assessmentSlug || undefined,
        resultRange: resultRange || undefined,
        format,
      });
      const contentDisposition = response.headers['content-disposition'] || '';
      const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
      const filename = filenameMatch?.[1] || `assessment-responses.${format}`;
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success(`Assessment responses exported as ${format.toUpperCase()}.`);
    } catch (exportError) {
      const message = exportError.response?.data?.message || 'Unable to export assessment responses.';
      toast.error(message);
    } finally {
      setExportingFormat(null);
    }
  };

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
  const meta = data?.meta || {};
  const filterOptions = data?.filters || {};

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <span className="text-sm text-gray-500 sm:mr-auto">Export assessment responses</span>
        <Button
          variant="outline"
          onClick={() => handleExport('csv')}
          disabled={!!exportingFormat}
          className="cursor-pointer"
        >
          {exportingFormat === 'csv' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          CSV
        </Button>
        <Button
          onClick={() => handleExport('xlsx')}
          disabled={!!exportingFormat}
          className="cursor-pointer"
        >
          {exportingFormat === 'xlsx' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Excel
        </Button>
      </div>

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