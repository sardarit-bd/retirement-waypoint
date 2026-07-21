'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Users, DollarSign, Ticket, Clock, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CouponStatusBadge } from './CouponStatusBadge';

export function CouponDetailsCard({ coupon, isLoading }) {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
        <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 sm:p-6 animate-pulse">
          <div className="h-6 sm:h-8 w-32 sm:w-48 bg-gray-200 rounded" />
        </div>
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="h-5 sm:h-6 w-24 sm:w-32 bg-gray-200 rounded" />
                <div className="h-3 sm:h-4 w-full bg-gray-200 rounded" />
                <div className="h-3 sm:h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border-red-500/20 bg-red-500/5 p-8 sm:p-12 text-center mx-3 sm:mx-0">
        <p className="text-red-500 text-sm sm:text-base">Coupon not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4 sm:space-y-6 px-3 sm:px-0"
    >
      {/* Header */}
      <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-4 sm:p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group -ml-2 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 text-[#1B2B4B] hover:bg-[#F8F5EF]"
            >
              <Link href="/admin/coupons">
                <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-xs sm:text-sm font-medium">Back to Coupons</span>
              </Link>
            </Button>
            <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1B2B4B]">
                {coupon.code}
              </h1>
              <CouponStatusBadge coupon={coupon} size="lg" />
            </div>
            {coupon.name && (
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[#1B2B4B]/60">{coupon.name}</p>
            )}
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[#04103A] shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/admin/coupons/${coupon._id}/edit`}>
                <Edit className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Edit Coupon
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Left Column - Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Coupon Information */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B] mb-3 sm:mb-4">
                Coupon Information
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Code</span>
                  <span className="font-mono font-semibold text-[#C9A84C] text-sm sm:text-base break-all">{coupon.code}</span>
                </div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Name</span>
                  <span className="font-medium text-[#1B2B4B] text-sm sm:text-base break-words text-right xs:text-left">{coupon.name || 'N/A'}</span>
                </div>
                {coupon.description && (
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-1 xs:gap-2">
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Description</span>
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/70 max-w-[200px] xs:max-w-[250px] sm:max-w-[300px] text-right">{coupon.description}</span>
                  </div>
                )}
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Type</span>
                  <Badge className="border-[#1B2B4B]/10 text-[#1B2B4B]/70 text-[10px] sm:text-xs">
                    {coupon.type === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                  </Badge>
                </div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Discount</span>
                  <span className="font-bold text-[#1B2B4B] text-sm sm:text-base">
                    {coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : formatCurrency(coupon.value)}
                  </span>
                </div>
                {coupon.maximumDiscountAmount && (
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Maximum Discount</span>
                    <span className="text-sm sm:text-base text-[#1B2B4B]">{formatCurrency(coupon.maximumDiscountAmount)}</span>
                  </div>
                )}
                {coupon.minimumOrderAmount > 0 && (
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Minimum Order</span>
                    <span className="text-sm sm:text-base text-[#1B2B4B]">{formatCurrency(coupon.minimumOrderAmount)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validity */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B] mb-3 sm:mb-4">
                Validity
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {coupon.validFrom && (
                  <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Valid From</span>
                    <span className="text-xs sm:text-sm text-[#1B2B4B] text-right">{formatDate(coupon.validFrom)}</span>
                  </div>
                )}
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Expires At</span>
                  <span className={`text-xs sm:text-sm ${coupon.isExpired ? 'text-red-500' : 'text-[#1B2B4B]'} text-right`}>
                    {formatDate(coupon.expiresAt)}
                  </span>
                </div>
                {coupon.isExpired && (
                  <div className="rounded-xl bg-red-500/10 p-2 sm:p-3 text-xs sm:text-sm text-red-500 text-center">
                    This coupon has expired
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-4 sm:space-y-6">
          {/* Usage Statistics */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B] mb-3 sm:mb-4">
                Usage Statistics
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A84C]" />
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Used Count</span>
                  </div>
                  <span className="font-bold text-[#1B2B4B] text-sm sm:text-base">
                    {coupon.usedCount}
                    {coupon.usageLimit !== null && ` / ${coupon.usageLimit}`}
                  </span>
                </div>
                {coupon.usageLimit !== null && (
                  <div className="w-full bg-[#F8F5EF] rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-[#C9A84C] rounded-full h-1.5 sm:h-2 transition-all duration-500"
                      style={{
                        width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Ticket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A84C]" />
                    <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Per-User Limit</span>
                  </div>
                  <span className="text-sm sm:text-base text-[#1B2B4B]">{coupon.perUserLimit}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-[#1B2B4B] mb-3 sm:mb-4">
                Metadata
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Status</span>
                  <CouponStatusBadge coupon={coupon} />
                </div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Created</span>
                  <span className="text-xs sm:text-sm text-[#1B2B4B] text-right">{formatDate(coupon.createdAt)}</span>
                </div>
                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2">
                  <span className="text-xs sm:text-sm text-[#1B2B4B]/60">Last Updated</span>
                  <span className="text-xs sm:text-sm text-[#1B2B4B] text-right">{formatDate(coupon.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}