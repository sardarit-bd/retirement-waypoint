"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Clock, ShoppingBag, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderApi } from "@/features/orders/api/order.api";

export default function PaymentPendingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.push("/book");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrderById(orderId);
        setOrder(response.data || response);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  const handleContinuePayment = () => {
    if (order?.checkoutUrl) {
      window.location.href = order.checkoutUrl;
    } else {
      router.push("/book");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C9A84C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4 py-32">
      <div className="mx-auto max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-yellow-100 p-3">
            <Clock className="h-12 w-12 text-yellow-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Payment Pending</h1>
        <p className="mt-2 text-[#1B2B4B]/60">
          Your order is awaiting payment confirmation.
        </p>

        {order && (
          <div className="mt-4 space-y-2 rounded-lg bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-semibold text-[#1B2B4B]">{order._id}</p>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium text-yellow-600">{order.status}</p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          {order?.checkoutUrl && (
            <Button
              onClick={handleContinuePayment}
              className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Continue Payment
            </Button>
          )}
          <Link href="/dashboard/orders">
            <Button variant="outline" className="w-full h-12">
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}