/* eslint-disable react-hooks/set-state-in-effect */
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, X, Download, Loader2, FileSpreadsheet, FileText } from 'lucide-react';
import { useExportSubscribers } from '../hooks/useNewsletterSubscribers';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'unsubscribed', label: 'Unsubscribed' },
];

export function NewsletterSubscribersFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
}) {
  const [localSearch, setLocalSearch] = useState(search || '');
  const exportSubscribers = useExportSubscribers();

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

  const handleExport = (format) => {
    exportSubscribers.mutate({ format, search, status });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
          <Input
            placeholder="Search by email..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="border-[#1B2B4B]/10 bg-white/80 pl-9 pr-8 backdrop-blur-sm focus:border-[#C9A84C]"
          />
          {localSearch && (
            <button
              type="button"
              onClick={handleSearchClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B2B4B]/40 hover:text-[#1B2B4B]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit" className="shrink-0 rounded-full bg-[#C9A84C] font-semibold text-[#1B2B4B] hover:bg-[#D6B45A] cursor-pointer">
          Search
        </Button>
      </form>

      <div className="flex gap-2">
        <Select
          value={status || 'all'}
          onValueChange={(value) => onStatusChange(value === 'all' ? '' : value)}
        >
          <SelectTrigger className="w-full border-[#1B2B4B]/10 bg-white/80 backdrop-blur-sm sm:w-[160px] cursor-pointer">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={onReset}
          className="shrink-0 rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
        >
          Reset
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              disabled={exportSubscribers.isPending}
              className="shrink-0 rounded-full border-[#1B2B4B]/15 text-[#1B2B4B] hover:bg-[#F8F5EF] cursor-pointer"
            >
              {exportSubscribers.isPending ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-1.5 h-4 w-4" />
              )}
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('csv')}>
              <FileText className="mr-2 h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('excel')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export as Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}