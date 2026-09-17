/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, BookOpen, ShoppingBag, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);
  const [token, setToken] = useState(null);
  const { session } = useSession();
  const isAuthenticated = !!session?.user;

  useEffect(() => {
    const id = searchParams.get("orderId");
    const downloadToken = searchParams.get("token");

    if (id) {
      setOrderId(id);
    }
    if (downloadToken) {
      setToken(downloadToken);
    }

    if (!id && !downloadToken) {
      router.push("/book");
    }
  }, [searchParams, router]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const downloadUrl = token ? `${apiUrl}/api/orders/download/${token}?redirect=true` : null;

  return (
    <div id="PaymentSuccessPage" className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4 py-32">
      <div className="mx-auto max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Payment Successful!</h1>
        <p className="mt-2 text-[#1B2B4B]/60">
          {token
            ? "Thank you for your purchase! Your digital book is ready for instant download."
            : "Thank you for your purchase. Your book is now available in your library."}
        </p>

        {orderId && (
          <div className="mt-4 rounded-lg bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-semibold text-[#1B2B4B]">{orderId}</p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {token ? (
            <div className="space-y-3">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <Download className="mr-2 h-5 w-5" />
                  Download Your Book (PDF)
                </Button>
              </a>
              <div className="rounded-lg bg-white/80 p-3 text-xs text-[#1B2B4B]/70 border border-[#1B2B4B]/10 leading-relaxed">
                A backup download link has also been sent to your email. The link remains active for 7 days.
              </div>
            </div>
          ) : isAuthenticated ? (
            <Link href="/dashboard/my-books" className="block w-full">
              <Button className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12 cursor-pointer">
                <BookOpen className="mr-2 h-5 w-5" />
                Go to My Books
              </Button>
            </Link>
          ) : null}

          <Link href="/book" className="block w-full">
            <Button variant="outline" className="w-full h-12 cursor-pointer border-[#1B2B4B]/20 text-[#1B2B4B] hover:bg-white">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}