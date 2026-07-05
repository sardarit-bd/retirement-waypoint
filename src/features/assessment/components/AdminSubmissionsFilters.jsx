'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const SORT_OPTIONS = [
  { value: 'completedAt_desc', label: 'Newest First' },
  { value: 'completedAt_asc', label: 'Oldest First' },
  { value: 'overallScore_desc', label: 'Highest Score' },
  { value: 'overallScore_asc', label: 'Lowest Score' },
];

export function AdminSubmissionsFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalSubmissions,
  isLoading,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const currentSortLabel = SORT_OPTIONS.find(
    (opt) => opt.value === sortBy
  )?.label || 'Newest First';

  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search */}
            <motion.div
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              className="relative flex-1 min-w-[200px]"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
              <Input
                type="text"
                placeholder="Search by user name or email..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full rounded-full border-white/20 bg-[#F8F5EF] pl-9 pr-4 py-2 text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 focus:border-[#C9A84C]/50 focus:ring-[#C9A84C]/20 sm:w-56 lg:w-80"
              />
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-[#F8F5EF] px-4 py-2 text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30"
                >
                  <span className="hidden sm:inline">{currentSortLabel}</span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl"
              >
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={cn(
                      'rounded-xl px-4 py-2.5 text-sm cursor-pointer transition-colors',
                      sortBy === option.value
                        ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                        : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#1B2B4B]/5 pt-3">
          <div className="text-sm text-[#1B2B4B]/50">
            {isLoading ? 'Loading...' : `${totalSubmissions || 0} submission${totalSubmissions !== 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
    </div>
  );
}