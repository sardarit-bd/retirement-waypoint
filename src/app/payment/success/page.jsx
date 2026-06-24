'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (orderId) {
        router.replace(`/dashboard/orders/${orderId}`);
      } else {
        router.replace('/dashboard/orders');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [orderId, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />

        <h1 className="text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="text-muted-foreground">
          Your payment has been completed successfully.
        </p>

        <p className="text-sm text-muted-foreground">
          Redirecting to your order...
        </p>
      </div>
    </div>
  );
}