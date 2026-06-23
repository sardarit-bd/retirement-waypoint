'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useOrderDetails } from '@/features/orders/hooks/useOrderDetails';
import { OrderHeader } from '@/features/orders/components/OrderHeader';
import { OrderItemsSection } from '@/features/orders/components/OrderItemsSection';
import { PaymentInfoCard } from '@/features/orders/components/PaymentInfoCard';
import { OrderSummaryCard } from '@/features/orders/components/OrderSummaryCard';
import { CouponCard } from '@/features/orders/components/CouponCard';
import { InvoiceCard } from '@/features/orders/components/InvoiceCard';
import { TimelineCard } from '@/features/orders/components/TimelineCard';
import { PendingOrderCard } from '@/features/orders/components/PendingOrderCard';
import { PaymentFailedCard } from '@/features/orders/components/PaymentFailedCard';
import { CancelledOrderCard } from '@/features/orders/components/CancelledOrderCard';
import { CompletedOrderContent } from '@/features/orders/components/CompletedOrderContent';
import { OrderDetailsSkeleton } from '@/features/orders/components/OrderDetailsSkeleton';
import { OrderDetailsErrorState } from '@/features/orders/components/OrderDetailsErrorState';
import { getOrderState, isOrderAccessible } from '@/features/orders/constants/order.constants';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.orderId;
  const { data: order, isLoading, error, refetch } = useOrderDetails(orderId);

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (error) {
    return <OrderDetailsErrorState error={error} refetch={refetch} />;
  }

  if (!order) {
    return <OrderDetailsErrorState error="Order not found" refetch={refetch} />;
  }

  const orderState = getOrderState(order);
  const isAccessible = isOrderAccessible(order);
  const hasInvoice = order.invoiceId || order.invoiceNumber;
  const hasCoupon = order.couponCode && order.discountAmount > 0;

  // Render state-specific content
  const renderStateContent = () => {
    switch (orderState) {
      case 'PENDING':
        return (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PendingOrderCard order={order} />
            </div>
            <div className="space-y-6">
              <OrderSummaryCard order={order} />
              {hasCoupon && <CouponCard order={order} />}
            </div>
          </div>
        );

      case 'FAILED':
        return (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PaymentFailedCard order={order} />
            </div>
            <div className="space-y-6">
              <OrderSummaryCard order={order} />
              {hasCoupon && <CouponCard order={order} />}
            </div>
          </div>
        );

      case 'CANCELLED':
        return (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CancelledOrderCard order={order} />
            </div>
            <div className="space-y-6">
              <OrderSummaryCard order={order} />
              {hasCoupon && <CouponCard order={order} />}
            </div>
          </div>
        );

      case 'COMPLETED':
        return (
          <CompletedOrderContent 
            order={order} 
            hasInvoice={hasInvoice}
            hasCoupon={hasCoupon}
          />
        );

      default:
        return (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PendingOrderCard order={order} />
            </div>
            <div className="space-y-6">
              <OrderSummaryCard order={order} />
              {hasCoupon && <CouponCard order={order} />}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Order Header */}
      <OrderHeader 
        order={order} 
        hasInvoice={hasInvoice && isAccessible}
      />

      {/* State-Specific Content */}
      {renderStateContent()}

      {/* Timeline - Always visible with appropriate state */}
      <TimelineCard 
        order={order} 
        purchases={order.purchases} 
        invoice={order.invoice}
      />
    </motion.div>
  );
}