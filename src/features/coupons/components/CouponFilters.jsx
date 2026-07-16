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

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'expired', label: 'Expired' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'PERCENTAGE', label: 'Percentage' },
  { value: 'FIXED_AMOUNT', label: 'Fixed Amount' },
];

export function CouponFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  totalCoupons,
  isLoading,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const currentStatusLabel = STATUS_OPTIONS.find(
    (opt) => opt.value === statusFilter
  )?.label || 'All Statuses';

  const currentTypeLabel = TYPE_OPTIONS.find(
    (opt) => opt.value === typeFilter
  )?.label || 'All Types';

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-3 sm:p-4 md:p-5 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
        {/* Search and Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <motion.div
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              className="relative w-full"
            >
              <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
              <Input
                type="text"
                placeholder={window.innerWidth < 640 ? "Search..." : "Search by code or name..."}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full rounded-full border-white/20 bg-[#F8F5EF] pl-8 sm:pl-9 pr-3 sm:pr-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 focus:border-[#C9A84C]/50 focus:ring-[#C9A84C]/20"
              />
            </motion.div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-[#F8F5EF] px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30 cursor-pointer min-w-[70px] sm:min-w-[80px] md:min-w-[100px] lg:min-w-[130px] justify-between"
                >
                  <span className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5">
                    <Filter className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
                    <span className="hidden xs:inline truncate max-w-[40px] sm:max-w-[60px] md:max-w-[80px]">
                      {currentStatusLabel}
                    </span>
                    <span className="xs:hidden">Status</span>
                  </span>
                  <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 opacity-50 flex-shrink-0 ml-0.5 sm:ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl min-w-[120px] sm:min-w-[140px] md:min-w-[150px]"
              >
                {STATUS_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onStatusFilterChange(option.value)}
                    className={cn(
                      'rounded-xl px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
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

            {/* Type Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-[#F8F5EF] px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30 cursor-pointer min-w-[70px] sm:min-w-[80px] md:min-w-[100px] lg:min-w-[130px] justify-between"
                >
                  <span className="hidden xs:inline truncate max-w-[40px] sm:max-w-[60px] md:max-w-[80px]">
                    {currentTypeLabel}
                  </span>
                  <span className="xs:hidden">Type</span>
                  <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 opacity-50 flex-shrink-0 ml-0.5 sm:ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl min-w-[120px] sm:min-w-[140px] md:min-w-[150px]"
              >
                {TYPE_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onTypeFilterChange(option.value)}
                    className={cn(
                      'rounded-xl px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
                      typeFilter === option.value
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

        {/* Total Coupons Count */}
        <div className="flex items-center justify-between border-t border-[#1B2B4B]/5 pt-2 sm:pt-3">
          <div className="text-[10px] sm:text-xs md:text-sm text-[#1B2B4B]/50">
            {isLoading ? 'Loading...' : `${totalCoupons || 0} coupon${totalCoupons !== 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
    </div>
  );
}