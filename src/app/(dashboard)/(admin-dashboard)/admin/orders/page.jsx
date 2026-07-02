'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import { AdminOrdersTable } from '@/features/orders/components/admin-order/AdminOrdersTable';
import { AdminOrdersFilters } from '@/features/orders/components/admin-order/AdminOrdersFilters';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';
import { useAllOrders } from '@/features/orders/hooks/useOrders';


export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Parse sort options
  const [sortField, sortOrder] = sortBy.split('_');

  // Build query params
  const params = useMemo(() => {
    const p = {
      page,
      limit,
      sortBy: sortField,
      sortOrder,
    };

    if (searchQuery) p.search = searchQuery;
    if (orderStatusFilter !== 'all') p.orderStatus = orderStatusFilter;
    if (paymentStatusFilter !== 'all') p.paymentStatus = paymentStatusFilter;

    return p;
  }, [page, searchQuery, orderStatusFilter, paymentStatusFilter, sortField, sortOrder]);

  const { data, isLoading, error, refetch } = useAllOrders(params);

  const orders = data?.data || [];
  const meta = data?.meta || {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleOrderStatusChange = (value) => {
    setOrderStatusFilter(value);
    setPage(1);
  };

  const handlePaymentStatusChange = (value) => {
    setPaymentStatusFilter(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
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
        <div>
          <h1 className="text-3xl font-bold text-[#1B2B4B]">Order Management</h1>
          <p className="mt-1 text-[#1B2B4B]/60">
            Monitor and manage all customer orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <AdminOrdersFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        orderStatusFilter={orderStatusFilter}
        onOrderStatusFilterChange={handleOrderStatusChange}
        paymentStatusFilter={paymentStatusFilter}
        onPaymentStatusFilterChange={handlePaymentStatusChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalOrders={meta.total}
        isLoading={isLoading}
      />

      {/* Table */}
      <AdminOrdersTable orders={orders} isLoading={isLoading} />

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <OrderPagination meta={meta} onPageChange={handlePageChange} />
      )}
    </motion.div>
  );
}