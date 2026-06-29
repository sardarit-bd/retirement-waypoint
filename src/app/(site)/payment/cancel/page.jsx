"use client";

import Link from "next/link";
import { XCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center px-4 py-32">
      <div className="mx-auto max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-[#1B2B4B]">Payment Cancelled</h1>
        <p className="mt-2 text-[#1B2B4B]/60">
          Your purchase was not completed. You can try again or continue shopping.
        </p>

        <div className="mt-8 space-y-3">
          <Button
            onClick={() => window.history.back()}
            className="w-full bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A] h-12"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Try Again
          </Button>
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