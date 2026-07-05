'use client';

import { useState } from 'react';
import { useAdminCoupon, useAdminCouponUsage } from '@/features/coupons/hooks/useCoupons';
import { CouponDetailsCard } from '@/features/coupons/components/CouponDetailsCard';
import { CouponUsageTable } from '@/features/coupons/components/CouponUsageTable';
import { useParams } from 'next/navigation';

export default function CouponDetailsPage() {
  const params = useParams();
  const couponId = params.id;
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useAdminCoupon(couponId);
  const { data: usageData, isLoading: usageLoading } = useAdminCouponUsage(couponId, { page, limit });

  const coupon = data?.data;
  const usages = usageData?.data || [];
  const meta = usageData?.meta || {
    page: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-6">
      <CouponDetailsCard coupon={coupon} isLoading={isLoading} />

      {/* Usage History */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-[#1B2B4B] mb-4">Usage History</h2>
        <CouponUsageTable
          usages={usages}
          meta={meta}
          isLoading={usageLoading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}