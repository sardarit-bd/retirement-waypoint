'use client';

import { useRouter } from 'next/navigation';
import { useCreateCoupon } from '@/features/coupons/hooks/useCoupons';
import { CouponForm } from '@/features/coupons/components/CouponForm';

export default function CreateCouponPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateCoupon();

  const handleSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        router.push('/admin/coupons');
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Create New Coupon</h1>
        <p className="mt-1 text-[#1B2B4B]/60">Create a new promotional coupon</p>
      </div>
      <CouponForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </div>
  );
}