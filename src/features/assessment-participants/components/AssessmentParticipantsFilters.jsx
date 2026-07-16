'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'highestScore', label: 'Highest Score' },
  { value: 'lowestScore', label: 'Lowest Score' },
  { value: 'nameAZ', label: 'Name A-Z' },
  { value: 'nameZA', label: 'Name Z-A' },
];

export const AssessmentParticipantsFilters = ({
  search,
  onSearchChange,
  assessmentSlug,
  onAssessmentChange,
  resultRange,
  onResultRangeChange,
  sortBy,
  onSortChange,
  assessmentOptions = [],
  resultOptions = [],
  onReset,
}) => {
  const [localSearch, setLocalSearch] = useState(search || '');

  useEffect(() => {
    setLocalSearch(search || '');
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const handleSearchClear = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-9 pr-8 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary w-full"
            />
            {localSearch && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" className="shrink-0">
            Search
          </Button>
        </form>

        {/* Reset */}
        <Button
          variant="outline"
          onClick={onReset}
          className="shrink-0"
        >
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Assessment Filter */}
        <Select
          value={assessmentSlug || 'all'}
          onValueChange={(value) => onAssessmentChange(value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-white/80 backdrop-blur-sm border-gray-200">
            <SelectValue placeholder="All Assessments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assessments</SelectItem>
            {assessmentOptions.map((slug) => (
              <SelectItem key={slug} value={slug}>
                {slug}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Result Range Filter */}
        <Select
          value={resultRange || 'all'}
          onValueChange={(value) => onResultRangeChange(value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-white/80 backdrop-blur-sm border-gray-200">
            <SelectValue placeholder="All Results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            {resultOptions.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select
          value={sortBy || 'newest'}
          onValueChange={onSortChange}
        >
          <SelectTrigger className="w-full sm:w-[160px] bg-white/80 backdrop-blur-sm border-gray-200">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};