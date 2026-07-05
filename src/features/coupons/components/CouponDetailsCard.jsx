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
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
        <p className="text-red-500">Coupon not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="group -ml-2 rounded-full px-3 py-2 text-[#1B2B4B] hover:bg-[#F8F5EF]"
            >
              <Link href="/admin/coupons">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium">Back to Coupons</span>
              </Link>
            </Button>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1B2B4B]">
                {coupon.code}
              </h1>
              <CouponStatusBadge coupon={coupon} size="lg" />
            </div>
            {coupon.name && (
              <p className="mt-1 text-sm text-[#1B2B4B]/60">{coupon.name}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] px-6 text-[#04103A] font-semibold shadow-md shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all"
            >
              <Link href={`/admin/coupons/${coupon._id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Coupon
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column - Info */}
        <div className="space-y-6">
          {/* Coupon Information */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Coupon Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Code</span>
                  <span className="font-mono font-semibold text-[#C9A84C]">{coupon.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Name</span>
                  <span className="font-medium text-[#1B2B4B]">{coupon.name || 'N/A'}</span>
                </div>
                {coupon.description && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Description</span>
                    <span className="text-sm text-[#1B2B4B]/70 max-w-[200px] text-right">
                      {coupon.description}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Type</span>
                  <Badge className="border-[#1B2B4B]/10 text-[#1B2B4B]/70">
                    {coupon.type === 'PERCENTAGE' ? 'Percentage' : 'Fixed Amount'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Discount</span>
                  <span className="font-bold text-[#1B2B4B]">
                    {coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : formatCurrency(coupon.value)}
                  </span>
                </div>
                {coupon.maximumDiscountAmount && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Maximum Discount</span>
                    <span className="text-[#1B2B4B]">{formatCurrency(coupon.maximumDiscountAmount)}</span>
                  </div>
                )}
                {coupon.minimumOrderAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Minimum Order</span>
                    <span className="text-[#1B2B4B]">{formatCurrency(coupon.minimumOrderAmount)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validity */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Validity
              </h2>
              <div className="space-y-3">
                {coupon.validFrom && (
                  <div className="flex justify-between">
                    <span className="text-[#1B2B4B]/60">Valid From</span>
                    <span className="text-[#1B2B4B]">{formatDate(coupon.validFrom)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Expires At</span>
                  <span className={coupon.isExpired ? 'text-red-500' : 'text-[#1B2B4B]'}>
                    {formatDate(coupon.expiresAt)}
                  </span>
                </div>
                {coupon.isExpired && (
                  <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
                    This coupon has expired
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Usage Statistics */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Usage Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#C9A84C]" />
                    <span className="text-[#1B2B4B]/60">Used Count</span>
                  </div>
                  <span className="font-bold text-[#1B2B4B]">
                    {coupon.usedCount}
                    {coupon.usageLimit !== null && ` / ${coupon.usageLimit}`}
                  </span>
                </div>
                {coupon.usageLimit !== null && (
                  <div className="w-full bg-[#F8F5EF] rounded-full h-2">
                    <div
                      className="bg-[#C9A84C] rounded-full h-2 transition-all duration-500"
                      style={{
                        width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-[#C9A84C]" />
                    <span className="text-[#1B2B4B]/60">Per-User Limit</span>
                  </div>
                  <span className="text-[#1B2B4B]">{coupon.perUserLimit}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card className="border-white/20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_15px_50px_rgba(4,16,58,0.08)]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">
                Metadata
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Status</span>
                  <CouponStatusBadge coupon={coupon} />
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Created</span>
                  <span className="text-sm text-[#1B2B4B]">{formatDate(coupon.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B2B4B]/60">Last Updated</span>
                  <span className="text-sm text-[#1B2B4B]">{formatDate(coupon.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}