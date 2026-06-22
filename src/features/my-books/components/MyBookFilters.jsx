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

const sortOptions = [
  { value: 'purchasedAt_desc', label: 'Newest Purchase' },
  { value: 'purchasedAt_asc', label: 'Oldest Purchase' },
  { value: 'title_asc', label: 'Title A-Z' },
  { value: 'title_desc', label: 'Title Z-A' },
  { value: 'authorName_asc', label: 'Author A-Z' },
  { value: 'authorName_desc', label: 'Author Z-A' },
];

export function MyBookFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalBooks,
  isLoading,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const currentSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || 'Sort';

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side - Title & Count */}
      <div>
        <h1 className="text-3xl font-bold text-[#1B2B4B]">My Library</h1>
        <p className="mt-1 text-[#1B2B4B]/60">
          {isLoading ? 'Loading...' : `${totalBooks || 0} books in your library`}
        </p>
      </div>

      {/* Right Side - Search & Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <motion.div
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
          <Input
            type="text"
            placeholder="Search your books..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full rounded-full border-white/20 bg-white/70 pl-11 pr-4 py-2.5 text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 backdrop-blur-xl focus:border-[#C9A84C]/50 focus:ring-[#C9A84C]/20 sm:w-56 lg:w-64"
          />
        </motion.div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full border-white/20 bg-white/70 backdrop-blur-xl px-4 py-2.5 text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30"
            >
              <Filter className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{currentSortLabel}</span>
              <span className="sm:hidden">Sort</span>
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl"
          >
            {sortOptions.map((option) => (
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
  );
}