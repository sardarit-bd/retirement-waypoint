'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CreditCard, RefreshCw, HelpCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ordersApi } from '../services/orders.api';
import toast from 'react-hot-toast';

export function PendingOrderCard({ order, onPaymentSuccess }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const hasCheckoutUrl = order.checkoutUrl !== null && order.checkoutUrl !== undefined;
  const isExpired = !hasCheckoutUrl;

  const handleContinuePayment = () => {
    if (order.checkoutUrl) {
      window.location.href = order.checkoutUrl;
    }
  };

  const handleRetryPayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ordersApi.retryPayment(order._id);
      
      if (response?.checkoutUrl) {
        // Redirect to new checkout session
        window.location.href = response.checkoutUrl;
      } else {
        setError('Unable to create payment session. Please try again.');
        toast.error('Failed to create payment session');
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to retry payment. Please contact support.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactSupport = () => {
    router.push('/support');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-yellow-500/10 backdrop-blur-xl p-8 shadow-[0_15px_50px_rgba(4,16,58,0.08)]"
    >
      <div className="flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className="rounded-full bg-yellow-500/10 p-4">
          {isExpired ? (
            <AlertCircle className="h-12 w-12 text-yellow-500" />
          ) : (
            <Clock className="h-12 w-12 text-yellow-500" />
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-[#1B2B4B]">
          {isExpired ? 'Payment Session Expired' : 'Payment Pending'}
        </h3>
        
        {/* Message */}
        <p className="max-w-md text-[#1B2B4B]/60">
          {isExpired 
            ? 'Your previous checkout session has expired. Generate a new payment session to continue.'
            : 'Your payment has not been completed yet. Complete your payment to unlock your books and resources.'
          }
        </p>

        {/* Error Message */}
        {error && (
          <div className="max-w-md rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Primary Actions */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {hasCheckoutUrl ? (
            // Continue Payment - Primary CTA
            <Button
              onClick={handleContinuePayment}
              className="w-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] py-6 text-base text-[#04103A] font-semibold shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Continue Payment
            </Button>
          ) : (
            // Retry Payment - Primary CTA (when session expired)
            <Button
              onClick={handleRetryPayment}
              disabled={isLoading}
              className="w-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#D6B45A] py-6 text-base text-[#04103A] font-semibold shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Creating Payment Session...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Retry Payment
                </>
              )}
            </Button>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <Button
            onClick={handleContactSupport}
            variant="outline"
            className="w-full rounded-full border-[#1B2B4B]/15 bg-white/50 text-[#1B2B4B] hover:bg-white/80 hover:border-[#C9A84C]/30 transition-all backdrop-blur-sm"
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Contact Support
          </Button>

          {/* Order Summary - Always visible */}
          <div className="mt-2 rounded-xl bg-white/50 p-4 text-sm backdrop-blur-sm">
            <div className="flex justify-between">
              <span className="text-[#1B2B4B]/60">Order Total</span>
              <span className="font-semibold text-[#1B2B4B]">
                ${order.totalAmount?.toFixed(2) || '0.00'}
              </span>
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <span className="text-[#1B2B4B]/40">Order #{order.orderNumber}</span>
              <span className="text-[#1B2B4B]/40">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}