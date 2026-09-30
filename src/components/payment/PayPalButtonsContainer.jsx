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
  const envClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const [clientId, setClientId] = useState(envClientId);
  const [isLoadingConfig, setIsLoadingConfig] = useState(!envClientId);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (!clientId) {
      fetch("/api/payments/paypal/config")
        .then((res) => res.json())
        .then((json) => {
          if (isMounted && json?.data?.clientId) {
            setClientId(json.data.clientId);
          }
        })
        .catch((err) => {
          console.warn("Could not fetch remote PayPal config:", err);
        })
        .finally(() => {
          if (isMounted) {
            setIsLoadingConfig(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [clientId]);

  if (isLoadingConfig) {
    return (
      <div className="flex items-center justify-center p-6 text-sm text-slate-500">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#C9A84C]" />
        <span>Loading PayPal options...</span>
      </div>
    );
  }

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
    "disable-funding": "card,credit,paylater,venmo",
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
            fundingSource="paypal"
            style={{
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
              height: 48,
              tagline: false,
            }}
            disabled={disabled || isProcessing}
            onClick={(data, actions) => {
              if (onBeforeCreate && !onBeforeCreate()) {
                // Abort PayPal popup if required fields are missing
                return actions.reject();
              }
              // Allow the popup to open and proceed to createOrder
              return actions.resolve();
            }}
            createOrder={async () => {
              setErrorMessage("");

              try {
                // Call parent callback which creates internal order and PayPal order
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
                throw new Error(msg);
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
