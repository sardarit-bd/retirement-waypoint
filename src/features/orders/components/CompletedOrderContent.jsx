'use client';

import { motion } from 'framer-motion';
import { OrderItemsSection } from './OrderItemsSection';
import { PaymentInfoCard } from './PaymentInfoCard';
import { OrderSummaryCard } from './OrderSummaryCard';
import { CouponCard } from './CouponCard';
import { InvoiceCard } from './InvoiceCard';
import { ReviewCard } from './ReviewCard';
import { AssessmentShortcutCard } from './AssessmentShortcutCard';

export function CompletedOrderContent({ order, hasInvoice, hasCoupon }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - 2/3 */}
      <div className="space-y-6 lg:col-span-2">
        {/* Purchased Items - Unlocked */}
        <OrderItemsSection 
          items={order.items} 
          orderId={order._id}
          isAccessible={true}
        />

        {/* Review Section */}
        <ReviewCard order={order} />

        {/* Assessment Shortcut */}
        <AssessmentShortcutCard order={order} />
      </div>

      {/* Right Column - 1/3 */}
      <div className="space-y-6">
        {/* Payment Information */}
        <PaymentInfoCard order={order} />

        {/* Order Summary */}
        <OrderSummaryCard order={order} />

        {/* Coupon */}
        {hasCoupon && <CouponCard order={order} />}

        {/* Invoice - Unlocked */}
        {hasInvoice && <InvoiceCard order={order} />}
      </div>
    </div>
  );
}