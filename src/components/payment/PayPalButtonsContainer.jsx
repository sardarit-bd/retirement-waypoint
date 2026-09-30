"use client";

import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Loader2, AlertCircle } from "lucide-react";

/**
 * PayPalButtonsContainer
 * Renders PayPal Smart Payment Buttons with script loading states and safe error boundaries
 */
export default function PayPalButtonsContainer({
  disabled = false,
  isProcessing = false,
  onBeforeCreate,
  onCreateOrder,
  onApprovePayment,
  onCancelPayment,
  onErrorPayment,
}) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const [errorMessage, setErrorMessage] = useState("");

  if (!clientId) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-center text-xs text-amber-800">
        <div className="flex items-center justify-center gap-1.5 font-semibold text-amber-900 mb-1">
          <AlertCircle className="h-4 w-4" />
          <span>PayPal Setup Notice</span>
        </div>
        <p>
          PayPal payments are being configured. Please use Credit / Debit Card to complete your purchase today, or contact support.
        </p>
      </div>
    );
  }

  const initialOptions = {
    clientId: clientId,
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <div className="w-full space-y-2">
      {errorMessage && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium">
          {errorMessage}
        </div>
      )}

      <PayPalScriptProvider options={initialOptions}>
        <div className={`relative ${disabled || isProcessing ? "opacity-60 pointer-events-none" : ""}`}>
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
              height: 48,
              tagline: false,
            }}
            disabled={disabled || isProcessing}
            createOrder={async (data, actions) => {
              setErrorMessage("");

              // 1. Run form validation (guest email, name, etc.)
              if (onBeforeCreate && !onBeforeCreate()) {
                // Abort PayPal popup if required fields are missing
                return actions.reject();
              }

              try {
                // 2. Call parent callback which creates internal order and PayPal order
                const paypalOrderId = await onCreateOrder();
                if (!paypalOrderId) {
                  throw new Error("No PayPal order ID generated");
                }
                return paypalOrderId;
              } catch (err) {
                const msg =
                  err.response?.data?.message ||
                  err.message ||
                  "Failed to create PayPal payment session";
                setErrorMessage(msg);
                if (onErrorPayment) onErrorPayment(msg);
                return actions.reject();
              }
            }}
            onApprove={async (data, actions) => {
              try {
                if (onApprovePayment) {
                  await onApprovePayment(data);
                }
              } catch (err) {
                const msg =
                  err.response?.data?.message ||
                  err.message ||
                  "Failed to finalize PayPal payment";
                setErrorMessage(msg);
                if (onErrorPayment) onErrorPayment(msg);
              }
            }}
            onCancel={(data) => {
              console.log("ℹ️ Customer cancelled PayPal checkout:", data);
              if (onCancelPayment) onCancelPayment(data);
            }}
            onError={(err) => {
              console.error("❌ PayPal SDK button error:", err);
              const msg =
                "A PayPal communication error occurred. Please try again or pay with credit card.";
              setErrorMessage(msg);
              if (onErrorPayment) onErrorPayment(msg);
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
