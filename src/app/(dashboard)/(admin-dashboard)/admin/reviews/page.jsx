'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { OrderPagination } from '@/features/orders/components/OrderPagination';
import { AdminReviewTable } from '@/features/reviews/components/admin-review/AdminReviewTable';
import { AdminReviewFilters } from '@/features/reviews/components/admin-review/AdminReviewFilters';
import { AdminReviewStats } from '@/features/reviews/components/admin-review/AdminReviewStats';
import { DashboardErrorState } from '@/features/dashboard/components/DashboardErrorState';
import { useAdminApproveReview, useAdminDeleteReview, useAdminRejectReview, useAdminReviews } from '@/features/reviews/hooks/useReviews';


export default function AdminReviewsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [page, setPage] = useState(1);
    const limit = 10;

    // Build query params
    const params = useMemo(() => {
        const p = {
            page,
            limit,
            sortBy: 'createdAt',
            sortOrder: 'desc',
        };

        if (searchQuery) p.search = searchQuery;

        if (statusFilter === 'pending') {
            p.approved = 'false';
        } else if (statusFilter === 'approved') {
            p.approved = 'true';
        }

        if (ratingFilter !== 'all') {
            p.rating = ratingFilter;
        }

        return p;
    }, [page, searchQuery, statusFilter, ratingFilter]);

    // Queries and Mutations
    const { data, isLoading, error, refetch } = useAdminReviews(params);
    const approveReview = useAdminApproveReview();
    const rejectReview = useAdminRejectReview();
    const deleteReview = useAdminDeleteReview();

    const reviews = data?.data || [];
    const meta = data?.meta || {
        page: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
    };

    // Calculate stats from reviews
    const stats = useMemo(() => {
        if (!reviews.length && !data?.data?.length) {
            return {
                totalReviews: 0,
                pendingReviews: 0,
                approvedReviews: 0,
                averageRating: 0,
            };
        }

        const allReviews = data?.data || [];
        const total = allReviews.length;
        const pending = allReviews.filter((r) => !r.isApproved).length;
        const approved = allReviews.filter((r) => r.isApproved).length;
        const avgRating = approved > 0
            ? allReviews.filter((r) => r.isApproved).reduce((sum, r) => sum + r.rating, 0) / approved
            : 0;

        return {
            totalReviews: total,
            pendingReviews: pending,
            approvedReviews: approved,
            averageRating: avgRating,
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

    const handleRatingChange = (value) => {
        setRatingFilter(value);
        setPage(1);
    };

    const handleApprove = (reviewId) => {
        approveReview.mutate(reviewId);
    };

    const handleReject = (reviewId) => {
        rejectReview.mutate(reviewId);
    };

    const handleDelete = (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            deleteReview.mutate(reviewId);
        }
    };

    if (error) {
        return (
            <div className="py-4 sm:py-6 px-3 sm:px-0">
                <DashboardErrorState error={error} refetch={refetch} />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6 py-4 sm:py-6 px-3 sm:px-0"
        >
            {/* Header */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 sm:p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1B2B4B]">Review Management</h1>
                    <p className="mt-0.5 sm:mt-1 text-sm sm:text-base text-[#1B2B4B]/60">
                        Moderate and manage all customer reviews
                    </p>
                </div>
            </div>

            {/* Stats */}
            <AdminReviewStats stats={stats} isLoading={isLoading} />

            {/* Filters */}
            <AdminReviewFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusChange}
                ratingFilter={ratingFilter}
                onRatingFilterChange={handleRatingChange}
                totalReviews={meta.total}
                isLoading={isLoading}
            />

            {/* Table */}
            <AdminReviewTable
                reviews={reviews}
                isLoading={isLoading}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
                isApproving={approveReview.isPending}
                isRejecting={rejectReview.isPending}
                isDeleting={deleteReview.isPending}
            />

            {/* Pagination */}
            {meta.totalPages > 1 && (
                <OrderPagination meta={meta} onPageChange={handlePageChange} />
            )}
        </motion.div>
    );
}