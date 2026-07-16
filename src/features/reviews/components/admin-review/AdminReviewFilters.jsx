'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
];

const RATING_OPTIONS = [
  { value: 'all', label: 'All Ratings' },
  { value: '5', label: '★★★★★ (5)' },
  { value: '4', label: '★★★★☆ (4)' },
  { value: '3', label: '★★★☆☆ (3)' },
  { value: '2', label: '★★☆☆☆ (2)' },
  { value: '1', label: '★☆☆☆☆ (1)' },
];

export function AdminReviewFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  ratingFilter,
  onRatingFilterChange,
  totalReviews,
  isLoading,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const currentStatusLabel = STATUS_OPTIONS.find(
    (opt) => opt.value === statusFilter
  )?.label || 'All';

  const currentRatingLabel = RATING_OPTIONS.find(
    (opt) => opt.value === ratingFilter
  )?.label || 'All Ratings';

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-3 sm:p-4 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search */}
            <motion.div
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              className="relative flex-1 min-w-[140px] sm:min-w-[200px]"
            >
              <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
              <Input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full rounded-full border-white/20 bg-[#F8F5EF] pl-7 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 focus:border-[#C9A84C]/50 focus:ring-[#C9A84C]/20 sm:w-40 lg:w-64"
              />
            </motion.div>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-[#F8F5EF] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30 cursor-pointer"
                >
                  <Filter className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Status: {currentStatusLabel}</span>
                  <span className="xs:hidden">Status</span>
                  <ChevronDown className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl min-w-[140px]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onStatusFilterChange(option.value)}
                    className={cn(
                      'rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
                      statusFilter === option.value
                        ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                        : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rating Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-[#F8F5EF] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30 cursor-pointer"
                >
                  <Star className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A84C]" />
                  <span className="hidden xs:inline">{currentRatingLabel}</span>
                  <span className="xs:hidden">Rating</span>
                  <ChevronDown className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl min-w-[140px]"
              >
                {RATING_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onRatingFilterChange(option.value)}
                    className={cn(
                      'rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
                      ratingFilter === option.value
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

          <div className="text-xs sm:text-sm text-[#1B2B4B]/50 whitespace-nowrap">
            {isLoading ? 'Loading...' : `${totalReviews || 0} review${totalReviews !== 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
    </div>
  );
}