import PaymentPendingPage from "@/components/payment/pending/PaymentPendingPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPendingPage />
    </Suspense>
  );
}