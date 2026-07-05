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
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[#1B2B4B]">Loading coupon...</div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
        <p className="text-red-500">Failed to load coupon</p>
      </div>
    );
  }

  const coupon = data.data;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Edit Coupon</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Update coupon details</p>
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