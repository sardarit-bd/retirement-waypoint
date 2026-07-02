'use client';

import { AdminOrderDetailsContent } from '@/features/orders/components/admin-order/AdminOrderDetailsContent';
import { useOrder } from '@/features/orders/hooks/useOrders';
import { useParams } from 'next/navigation';

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;

  const { data, isLoading, error } = useOrder(orderId);

  if (error) {
    return (
      <div className="py-6">
        <div className="rounded-3xl border-red-500/20 bg-red-500/5 p-12 text-center">
          <p className="text-red-500">Failed to load order details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <AdminOrderDetailsContent order={data?.data} isLoading={isLoading} />
    </div>
  );
}