'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAdminCoupon, useUpdateCoupon } from '@/features/coupons/hooks/useCoupons';
import { CouponForm } from '@/features/coupons/components/CouponForm';

export default function EditCouponPage() {
  const params = useParams();
  const router = useRouter();
  const couponId = params.id;

  const { data, isLoading, error } = useAdminCoupon(couponId);
  const { mutate, isPending } = useUpdateCoupon();

  const handleSubmit = (formData) => {
    mutate(
      { couponId, data: formData },
      {
        onSuccess: () => {
          router.push('/admin/coupons');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 px-3">
        <div className="animate-pulse text-[#1B2B4B] text-sm sm:text-base">Loading coupon...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border-red-500/20 bg-red-500/5 p-8 sm:p-12 text-center mx-3 sm:mx-0">
        <p className="text-red-500 text-sm sm:text-base">Failed to load coupon</p>
      </div>
    );
  }

  const coupon = data.data;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-3 sm:px-0">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1B2B4B]">Edit Coupon</h1>
        <p className="mt-0.5 sm:mt-1 text-sm sm:text-base text-[#1B2B4B]/60">Update coupon details</p>
      </div>
      <CouponForm
        initialData={coupon}
        isEdit={true}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}