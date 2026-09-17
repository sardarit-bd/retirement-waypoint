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
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { orderApi } from "@/features/orders/api/order.api";
import { couponApi } from "@/features/coupons/api/coupon.api";
import { paymentApi } from "@/features/payments/api/payment.api";
import { useSession } from "@/hooks/useSession";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { session, isLoading: userLoading } = useSession();
  const user = session?.user;
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const isAdmin = user?.role === "admin";

  // Redirect if cart is empty or if user is admin
  useEffect(() => {
    if (!userLoading) {
      if (isAdmin) {
        toast.error("Administrators cannot purchase books.");
        router.push("/admin/books");
        return;
      }
      if (cartItems.length === 0) {
        router.push("/book");
      }
    }
  }, [isAdmin, cartItems, userLoading, router]);

  const handleApplyCoupon = async () => {
    const trimmedCode = couponCode.trim();
    if (!trimmedCode) {
      setCouponError("Please enter a coupon code");
      return;
    }

    setCouponError("");
    setIsApplyingCoupon(true);
    try {
      const response = await couponApi.validateCoupon(trimmedCode, cartSubtotal);
      const couponData = response?.data || response;
      const discount = couponData?.discountAmount ?? couponData?.discount ?? 0;

      if (discount > 0) {
        setCouponError("");
        setOrderData({
          discount,
          total: couponData.finalAmount ?? Math.max(0, cartSubtotal - discount),
          coupon: couponData.coupon,
        });
        toast.success("Coupon applied successfully!");
      } else {
        setOrderData(null);
        setCouponError(response?.message || "Invalid or expired coupon code");
      }
    } catch (error) {
      setOrderData(null);
      setCouponError(
        error.response?.data?.message ||
        error.message ||
        "Invalid or expired coupon code"
      );
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCompletePayment = async () => {
    if (isAdmin) {
      toast.error("Administrators cannot purchase their own books.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!user) {
      if (!guestName.trim()) {
        toast.error("Please enter your full name");
        return;
      }
      if (!guestEmail.trim()) {
        toast.error("Please enter your email address for book delivery");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestEmail.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Prepare order data matching backend expectations
      const orderPayload = {
        items: cartItems.map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        guestName: !user ? guestName.trim() : undefined,
        guestEmail: !user ? guestEmail.trim().toLowerCase() : undefined,
        couponCode: orderData?.discount > 0 ? (orderData?.coupon?.code || couponCode.trim()) : undefined,
      };

      // Call Create Order API
      const response = await orderApi.createOrder(orderPayload);
      const createdOrder = response.data || response;
      const orderId = createdOrder._id;

      if (!orderId) {
        throw new Error("Failed to create order: No order ID returned");
      }

      // Proceed to Stripe Checkout Session creation
      const paymentResponse = await paymentApi.createCheckoutSession(orderId);
      const checkoutUrl = paymentResponse?.checkoutUrl;

      if (checkoutUrl) {
        toast.success("Redirecting to payment...");
        clearCart();
        window.location.href = checkoutUrl;
        return;
      }

      // If no checkout URL returned, handle based on status
      if (createdOrder.paymentStatus === "PENDING") {
        setOrderData(createdOrder);
        toast.success("Order created, payment pending");
        router.push(`/payment/pending?orderId=${orderId}`);
      } else {
        toast.success("Order created successfully");
        clearCart();
        router.push(`/payment/success?orderId=${orderId}`);
      }
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to create order. Please try again.",
      );
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
    <main id="checkout" className="min-h-screen bg-[#F8F5EF] pt-28 pb-20 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back to Store Link */}
        <div className="pt-6 pb-2">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1B2B4B]/70 hover:text-[#1B2B4B] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#1B2B4B] mt-2 mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Customer Information & Coupon */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information Card */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-[#1B2B4B] mb-6">
                Customer Information
              </h2>
              {user ? (
                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-medium text-[#1B2B4B]">
                      Email Address
                    </Label>
                    <Input
                      value={user.email || "user@example.com"}
                      disabled
                      className="bg-[#F8F5EF] cursor-not-allowed h-12 mt-1.5"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <Label className="text-sm font-medium text-[#1B2B4B]">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter Your Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="bg-white border-[#1B2B4B]/20 focus:border-[#C9A84C] h-12 mt-1.5"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#1B2B4B]">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter Your Email Address"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="bg-white border-[#1B2B4B]/20 focus:border-[#C9A84C] h-12 mt-1.5"
                    />
                    <p className="text-xs text-[#1B2B4B]/60 mt-2">
                      Your secure book download link and receipt will be delivered to this email.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Coupon Section */}
            <div className="rounded-2xl bg-white p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-semibold text-[#1B2B4B] mb-4">
                Coupon
              </h2>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    if (couponError) {
                      setCouponError("");
                    }
                    if (orderData?.coupon) {
                      setOrderData(null);
                    }
                  }}
                  className={`flex-1 h-12 ${
                    couponError
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-[#1B2B4B]/20 focus:border-[#C9A84C]"
                  }`}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="bg-[#1B2B4B] text-white hover:bg-[#1B2B4B]/90 h-12 px-6 font-medium"
                >
                  {isApplyingCoupon ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>

              {couponError && (
                <p className="text-xs text-red-500 font-medium mt-2">
                  {couponError}
                </p>
              )}

              {orderData?.coupon && (
                <div className="mt-3 flex items-center justify-between text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <span>
                    Coupon <strong>{orderData.coupon.code}</strong> applied (-${Number(orderData.discount).toFixed(2)})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderData(null);
                      setCouponCode("");
                      setCouponError("");
                    }}
                    className="text-red-500 hover:text-red-700 font-medium ml-2 underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sticky top-28">
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
                    {orderData?.discount ? `- $${Number(orderData.discount).toFixed(2)}` : "$0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span className="text-[#1B2B4B]">Total</span>
                  <span className="text-[#1B2B4B]">
                    $ {(orderData?.total !== undefined ? Number(orderData.total) : cartSubtotal).toFixed(2)}
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