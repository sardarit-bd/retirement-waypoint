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
import { Search, X } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' },
];

export function ContactMessagesFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
}) {
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
          <Input
            placeholder="Search by name, email, or subject..."
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
      </div>
    </div>
  );
}