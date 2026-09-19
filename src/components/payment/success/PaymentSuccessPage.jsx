/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, BookOpen, ShoppingBag, Download, Loader2, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { paymentApi } from "@/features/payments/api/payment.api";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);
  const [token, setToken] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const { session } = useSession();
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    const id = searchParams.get("orderId");
    const sessionId = searchParams.get("session_id");
    const downloadToken = searchParams.get("token");

    if (id) {
      setOrderId(id);
    }
    if (downloadToken) {
      setToken(downloadToken);
    }

    if (!id && !sessionId && !downloadToken) {
      router.push("/book");
      return;
    }

    // Verify session and retrieve direct download link if session_id or orderId present
    if (id || sessionId) {
      setIsVerifying(true);
      paymentApi
        .verifySession(id, sessionId)
        .then((data) => {
          setOrderInfo(data);
          if (data?.downloadToken) {
            setToken(data.downloadToken);
          }
          if (data?.orderId && !id) {
            setOrderId(data.orderId);
          }
        })
        .catch((err) => {
          console.error("Payment session verification error:", err);
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [searchParams, router]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Build the streaming download link
  let downloadUrl = null;
  if (orderInfo?.downloadUrl) {
    downloadUrl = orderInfo.downloadUrl.startsWith("http")
      ? orderInfo.downloadUrl
      : `${apiUrl}${orderInfo.downloadUrl}`;
  } else if (token) {
    downloadUrl = `${apiUrl}/api/public/books/download?token=${token}`;
  }

  const bookTitle = orderInfo?.book?.title;
  const displayOrderNumber = orderInfo?.orderNumber || orderId;

  return (
    <div id="PaymentSuccessPage" className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-emerald-100 p-4 shadow-sm border border-emerald-200/60">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B2B4B] tracking-tight">
          Payment Successful!
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#1B2B4B]/70 max-w-md mx-auto">
          {token || downloadUrl
            ? "Thank you for your purchase! Your digital book is ready for instant download below."
            : "Thank you for your purchase. Your digital book access has been confirmed."}
        </p>

        {/* Order Details Card */}
        {displayOrderNumber && (
          <div className="mt-6 rounded-xl bg-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(27,43,75,0.06)] border border-[#1B2B4B]/10 text-left flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#1B2B4B]/50 font-medium">Order Number</p>
              <p className="font-mono font-semibold text-[#1B2B4B] text-base sm:text-lg mt-0.5">{displayOrderNumber}</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Paid</span>
            </div>
          </div>
        )}

        {/* Action Area */}
        <div className="mt-6 space-y-4">
          {/* Loading verification state */}
          {isVerifying && !token ? (
            <div className="p-6 rounded-xl bg-white border border-[#1B2B4B]/10 shadow-sm flex flex-col items-center justify-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#C9A84C]" />
              <p className="text-sm font-medium text-[#1B2B4B]/70">
                Confirming payment and preparing your download link...
              </p>
            </div>
          ) : (token || downloadUrl) ? (
            /* Primary Download Section */
            <div className="space-y-3">
              {bookTitle && (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1B2B4B]/80 bg-[#1B2B4B]/5 py-1.5 px-3 rounded-lg">
                  <FileText className="h-4 w-4 text-[#C9A84C]" />
                  <span>{bookTitle}</span>
                </div>
              )}

              <a
                href={downloadUrl}
                download
                className="block w-full"
              >
                <Button className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-14 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Your Book (PDF)
                </Button>
              </a>

              <div className="rounded-xl bg-white p-3.5 text-xs text-[#1B2B4B]/70 border border-[#1B2B4B]/10 leading-relaxed text-left">
                <span className="font-semibold text-[#1B2B4B]">Instant access:</span> Click above to download directly to your device. A backup download link has also been sent to your email and will remain active for 7 days.
              </div>
            </div>
          ) : null}

          {/* User Library Navigation */}
          {isAuthenticated && (
            <Link href="/dashboard/my-books" className="block w-full">
              <Button variant="outline" className="w-full h-12 cursor-pointer border-[#1B2B4B]/20 text-[#1B2B4B] hover:bg-white font-semibold">
                <BookOpen className="mr-2 h-5 w-5 text-[#C9A84C]" />
                Go to My Books Library
              </Button>
            </Link>
          )}

          {/* Continue Shopping */}
          <Link href="/book" className="block w-full">
            <Button variant="ghost" className="w-full h-11 cursor-pointer text-[#1B2B4B]/70 hover:text-[#1B2B4B] text-sm">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Browsing Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}