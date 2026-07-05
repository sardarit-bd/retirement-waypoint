'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminCoupons } from '@/features/coupons/hooks/useCoupons';
import { CouponsTable } from '@/features/coupons/components/CouponsTable';
import { CouponStatsCard } from '@/features/coupons/components/CouponStatsCard';
import { CouponFilters } from '@/features/coupons/components/CouponFilters';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const limit = 10;

  const params = useMemo(() => {
    const p = {
      page,
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (searchQuery) p.search = searchQuery;

    if (statusFilter === 'active') {
      p.isActive = 'true';
    } else if (statusFilter === 'inactive') {
      p.isActive = 'false';
    } else if (statusFilter === 'expired') {
      p.expired = 'true';
    }

    if (typeFilter !== 'all') {
      p.type = typeFilter;
    }

    return p;
  }, [page, searchQuery, statusFilter, typeFilter]);

  const { data, isLoading, error, refetch } = useAdminCoupons(params);

  const coupons = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  // Calculate stats
  const stats = useMemo(() => {
    const allCoupons = data?.data || [];
    const total = allCoupons.length;
    const active = allCoupons.filter((c) => c.isActive && !c.isExpired).length;
    const inactive = allCoupons.filter((c) => !c.isActive).length;
    const expired = allCoupons.filter((c) => c.isExpired).length;
    const totalUsages = allCoupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
    const totalDiscount = allCoupons.reduce((sum, c) => {
      const discount = c.type === 'PERCENTAGE' 
        ? 0 
        : c.value * (c.usedCount || 0);
      return sum + discount;
    }, 0);

    return {
      total,
      active,
      inactive,
      expired,
      totalUsages,
      totalDiscount,
    };
  }, [data]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleTypeChange = (value) => {
    setTypeFilter(value);
    setPage(1);
  };

  if (error) {
    return (
      <div className="py-6">
        <DashboardErrorState error={error} refetch={refetch} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 py-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A84C]">
              <Ticket className="h-4 w-4" />
              Admin Coupons
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-[#1B2B4B]">
              Manage Coupons
            </h1>
            <p className="mt-1 text-sm text-[#1B2B4B]/60">
              Create and manage promotional coupons
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
          >
            <Link href="/admin/coupons/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Coupon
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <CouponStatsCard stats={stats} isLoading={isLoading} />

      {/* Filters */}
      <CouponFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusChange}
        typeFilter={typeFilter}
        onTypeFilterChange={handleTypeChange}
        totalCoupons={meta.total}
        isLoading={isLoading}
      />

      {/* Table */}
      <CouponsTable coupons={coupons} isLoading={isLoading} />

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <OrderPagination meta={meta} onPageChange={handlePageChange} />
      )}
    </motion.div>
  );
}