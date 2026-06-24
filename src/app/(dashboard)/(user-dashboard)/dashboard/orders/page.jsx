'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMyOrders } from '@/features/orders/hooks/useOrders';
import { OrderGrid } from '@/features/orders/components/OrderGrid';
import { OrderFilters } from '@/features/orders/components/OrderFilters';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import { useSession } from '@/hooks/useSession';

export default function OrdersPage() {
  const router = useRouter();
  const { session, isLoading: isSessionLoading } = useSession();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    if (!isSessionLoading && !session) {
      router.push('/auth');
    }
  }, [session, isSessionLoading, router]);

  // Parse sort options
  const [sortField, sortOrder] = sortBy.split('_');

  const { data, isLoading, error, refetch } = useMyOrders({
    page,
    limit,
    search: searchQuery || undefined,
    orderStatus: statusFilter !== 'all' ? statusFilter : undefined,
    sortBy: sortField,
    sortOrder,
  });

  const orders = data?.data || [];
  const meta = data?.meta;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setPage(1);
  };

  if (isSessionLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Filters */}
      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalOrders={meta?.total}
        isLoading={isLoading}
      />

      {/* Order Grid */}
      <OrderGrid
        orders={orders}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <OrderPagination meta={meta} onPageChange={handlePageChange} />
      )}
    </motion.div>
  );
}