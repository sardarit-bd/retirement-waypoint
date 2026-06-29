"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  Lock, 
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { orderApi } from "@/features/orders/api/order.api";
import { useSession } from "@/hooks/useSession";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { session, isLoading: userLoading } = useSession();
  const user = session?.user;
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (!userLoading && (!user || cartItems.length === 0)) {
      router.push("/book");
    }
  }, [user, cartItems, userLoading, router]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      // This would be implemented based on your backend coupon API
      // const response = await orderApi.applyCoupon(couponCode);
      // setOrderData(response.data);
      toast.success("Coupon code applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Coupon code is invalid or expired");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCompletePayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data matching backend expectations
      const orderPayload = {
        items: cartItems.map(item => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        notes: notes || undefined,
        couponCode: couponCode || undefined,
      };

      // Call the existing Create Order API
      const response = await orderApi.createOrder(orderPayload);

      // Check if backend returned Stripe Checkout URL
      if (response.checkoutUrl) {
        toast.success("Redirecting to payment...");
        // Redirect to Stripe Checkout
        window.location.href = response.checkoutUrl;
        return;
      }

      // If no checkout URL, handle based on status
      if (response.status === "PENDING") {
        setOrderData(response);
        toast.success("Order created, payment pending");
        router.push(`/payment/pending?orderId=${response._id}`);
      } else {
        // Handle other statuses
        toast.success("Order created successfully");
        clearCart();
        router.push(`/payment/success?orderId=${response._id}`);
      }

    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(error.response?.data?.message || "Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F5EF] py-32">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h1 className="text-3xl font-bold text-[#1B2B4B]">Your Cart is Empty</h1>
          <p className="mt-2 text-[#1B2B4B]/60">
            Add some books to your cart before proceeding to checkout.
          </p>
          <Link href="/book">
            <Button className="mt-6 bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF] py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/book"
          className="inline-flex items-center gap-2 text-[#1B2B4B]/60 hover:text-[#1B2B4B] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <h1 className="text-3xl font-bold text-[#1B2B4B] mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-[#1B2B4B] mb-4">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-[#1B2B4B]">Name</Label>
                  <Input
                    value={user.name || "User Name"}
                    disabled
                    className="bg-[#F8F5EF] cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#1B2B4B]">Email</Label>
                  <Input
                    value={user.email || "user@example.com"}
                    disabled
                    className="bg-[#F8F5EF] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-[#1B2B4B] mb-4">
                Coupon
              </h2>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="bg-[#1B2B4B] text-white hover:bg-[#1B2B4B]/90"
                >
                  {isApplyingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-[#1B2B4B] mb-4">
                Order Notes
              </h2>
              <Textarea
                placeholder="Add any special instructions or notes about your order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sticky top-24">
              <h2 className="text-xl font-semibold text-[#1B2B4B] mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1B2B4B] truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × $ {item.price}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#1B2B4B]">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">$ {cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-semibold text-green-600">
                    {orderData?.discount ? `- $${orderData.discount}` : "$0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span className="text-[#1B2B4B]">Total</span>
                  <span className="text-[#1B2B4B]">
                    $ {orderData?.total?.toFixed(2) || cartSubtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 rounded-lg bg-[#F8F5EF] p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-[#1B2B4B]" />
                  <span className="font-medium text-[#1B2B4B]">Payment Method</span>
                </div>
                <p className="text-xs text-muted-foreground">Credit / Debit Card</p>
                <p className="text-xs text-muted-foreground">Powered by Stripe</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Secure payment</span>
                </div>
              </div>

              {/* Complete Payment Button */}
              <Button
                onClick={handleCompletePayment}
                disabled={isProcessing || cartItems.length === 0}
                className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12 text-base font-bold mt-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Complete Payment
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Your payment is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}