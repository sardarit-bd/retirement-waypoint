/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, BookOpen, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const id = searchParams.get("orderId");
    if (id) {
      setOrderId(id);
    } else {
      router.push("/book");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4 py-32">
      <div className="mx-auto max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Payment Successful!</h1>
        <p className="mt-2 text-[#1B2B4B]/60">
          Thank you for your purchase. Your book is now available in your library.
        </p>

        {orderId && (
          <div className="mt-4 rounded-lg bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-semibold text-[#1B2B4B]">{orderId}</p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <Link href="/dashboard/books">
            <Button className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12">
              <BookOpen className="mr-2 h-5 w-5" />
              Go to My Books
            </Button>
          </Link>
          <Link href="/book">
            <Button variant="outline" className="w-full h-12">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}