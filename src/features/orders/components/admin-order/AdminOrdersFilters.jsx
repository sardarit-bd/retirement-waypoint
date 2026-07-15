'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronDown, Calendar, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ORDER_STATUS_OPTIONS = [
  { value: 'all', label: 'All Orders' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'REFUNDED', label: 'Refunded' },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: 'all', label: 'All Payments' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PAID', label: 'Paid' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'REFUNDED', label: 'Refunded' },
];

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'createdAt_asc', label: 'Oldest First' },
  { value: 'totalAmount_desc', label: 'Highest Amount' },
  { value: 'totalAmount_asc', label: 'Lowest Amount' },
];

export function AdminOrdersFilters({
  searchQuery,
  onSearchChange,
  orderStatusFilter,
  onOrderStatusFilterChange,
  paymentStatusFilter,
  onPaymentStatusFilterChange,
  sortBy,
  onSortChange,
  totalOrders,
  isLoading,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const currentOrderStatusLabel = ORDER_STATUS_OPTIONS.find(
    (opt) => opt.value === orderStatusFilter
  )?.label || 'All Orders';

  const currentPaymentStatusLabel = PAYMENT_STATUS_OPTIONS.find(
    (opt) => opt.value === paymentStatusFilter
  )?.label || 'All Payments';

  const currentSortLabel = SORT_OPTIONS.find(
    (opt) => opt.value === sortBy
  )?.label || 'Newest First';

  return (
    <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
      <div className="flex flex-col gap-4">
        {/* Search and Sort Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search - Full width on mobile */}
          <div className="flex w-full flex-wrap items-center gap-3">
            <motion.div
              animate={{ scale: isSearchFocused ? 1.02 : 1 }}
              className="relative w-full sm:flex-1 sm:min-w-[200px]"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B2B4B]/40" />
              <Input
                type="text"
                placeholder="Search by order number, customer..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full rounded-full border-white/20 bg-[#F8F5EF] pl-9 pr-4 py-2 text-sm text-[#1B2B4B] placeholder:text-[#1B2B4B]/40 focus:border-[#C9A84C]/50 focus:ring-[#C9A84C]/20 sm:w-56 lg:w-80"
              />
            </motion.div>
          </div>

          {/* Filter Buttons - Wrap on mobile */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Order Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none rounded-full border-white/20 bg-[#F8F5EF] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30"
                >
                  <Filter className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{currentOrderStatusLabel}</span>
                  <span className="xs:hidden">Status</span>
                  <ChevronDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl max-h-80 overflow-y-auto min-w-[160px]"
              >
                {ORDER_STATUS_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onOrderStatusFilterChange(option.value)}
                    className={cn(
                      'rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
                      orderStatusFilter === option.value
                        ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                        : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Payment Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none rounded-full border-white/20 bg-[#F8F5EF] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30"
                >
                  <CreditCard className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{currentPaymentStatusLabel}</span>
                  <span className="xs:hidden">Payment</span>
                  <ChevronDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl max-h-80 overflow-y-auto min-w-[160px]"
              >
                {PAYMENT_STATUS_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onPaymentStatusFilterChange(option.value)}
                    className={cn(
                      'rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
                      paymentStatusFilter === option.value
                        ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                        : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
                    )}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none rounded-full border-white/20 bg-[#F8F5EF] px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-[#1B2B4B] hover:bg-white/90 hover:border-[#C9A84C]/30"
                >
                  <span className="hidden sm:inline">{currentSortLabel}</span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown className="ml-1 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-2xl border-white/20 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl min-w-[140px]"
              >
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={cn(
                      'rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm cursor-pointer transition-colors',
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

        {/* Stats Row */}
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between border-t border-[#1B2B4B]/5 pt-3 gap-2">
          <div className="text-xs sm:text-sm text-[#1B2B4B]/50">
            {isLoading ? 'Loading...' : `${totalOrders || 0} order${totalOrders !== 1 ? 's' : ''}`}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#1B2B4B]/40">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>All dates</span>
          </div>
        </div>
      </div>
    </div>
  );
}