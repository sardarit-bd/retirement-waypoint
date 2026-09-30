"use client";

import React from "react";
import { FaPaypal } from "react-icons/fa";

/**
 * Official Visa Logo Badge (Strict width/height, crisp vector)
 */
export function VisaLogo({ className = "h-4 w-6.5" }) {
  return (
    <span className="inline-flex items-center justify-center rounded border border-slate-200 bg-white px-1 py-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] shrink-0">
      <svg
        viewBox="0 0 48 32"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Visa"
      >
        <path
          d="M19.4 20.8h-2.5l1.6-9.6h2.5l-1.6 9.6zm10.7-9.4c-.5-.2-1.3-.4-2.3-.4-2.5 0-4.3 1.3-4.3 3.2 0 1.4 1.3 2.2 2.2 2.6 1 .5 1.3.8 1.3 1.2 0 .6-.8.9-1.5.9-1 0-1.6-.2-2.4-.5l-.3-.2-.4 2.2c.6.3 1.8.5 3 .5 2.7 0 4.4-1.3 4.4-3.3 0-1.1-.7-2-2.2-2.7-.9-.4-1.4-.7-1.4-1.2 0-.4.5-.8 1.4-.8.8 0 1.4.2 1.8.4l.2.1.5-2.5zm7.3 0h-1.9c-.6 0-1 .2-1.3.8l-3.6 8.6h2.6l.5-1.4h3.2l.3 1.4h2.3l-2.1-9.4zm-3 6.2l1.3-3.6.8 3.6h-2.1zm-19.1-6.2l-2.4 6.5-.3-1.3c-.5-1.6-2-3.4-3.7-4.3l2.4 8.6h2.6l3.9-9.5h-2.5z"
          fill="#1434CB"
        />
        <path
          d="M11.6 11.4h-4l-.1.4c3.1.8 5.2 2.7 6.1 4.9l-.9-4.4c-.2-.6-.6-.8-1.1-.9z"
          fill="#F9A51A"
        />
      </svg>
    </span>
  );
}

/**
 * Official Mastercard Logo Badge (Strict width/height, crisp vector)
 */
export function MastercardLogo({ className = "h-4 w-6.5" }) {
  return (
    <span className="inline-flex items-center justify-center rounded border border-slate-200 bg-white px-1 py-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] shrink-0">
      <svg
        viewBox="0 0 48 32"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mastercard"
      >
        <circle cx="18" cy="16" r="9" fill="#EB001B" />
        <circle cx="30" cy="16" r="9" fill="#F79E1B" fillOpacity="0.9" />
        <path
          d="M24 9.4c1.9 1.7 3 4.1 3 6.6s-1.1 4.9-3 6.6c-1.9-1.7-3-4.1-3-6.6s1.1-4.9 3-6.6z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  );
}

/**
 * Official American Express (Amex) Logo Badge (Strict width/height, crisp vector)
 */
export function AmexLogo({ className = "h-4 w-6.5" }) {
  return (
    <span className="inline-flex items-center justify-center rounded border border-[#006FCF] bg-[#006FCF] px-1 py-0.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] shrink-0">
      <svg
        viewBox="0 0 48 32"
        className={`${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="American Express"
      >
        <path
          d="M7 21h3.4l.7-1.8h3.3l.7 1.8h3.4l-4.3-9.5h-2.9L7 21zm5.7-4l.8-2.2.8 2.2h-1.6zm7.5 4h3l2.6-4.5 2.6 4.5h3v-9.5h-2.9l-2.7 4.7-2.7-4.7H20.2V21zm14.6 0h6.5v-2.1H38v-1.6h3.6V15.3H38v-1.6h3.9v-2.2h-6.8V21z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );
}

/**
 * Clean & Unbroken PayPal Logo Badge
 * Uses react-icons FaPaypal with authentic PayPal brand styling.
 * Prevents SVG coordinate overlaps or glyph glitching.
 */
export function PayPalLogo({ className = "h-5 w-auto" }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.05)] shrink-0 select-none">
      <FaPaypal className="h-4.5 w-3.5 text-[#0079C1] shrink-0" />
      <span className="text-sm font-black italic tracking-tight text-[#003087] leading-none">
        Pay<span className="text-[#0079C1]">Pal</span>
      </span>
    </div>
  );
}

/**
 * Official Stripe Wordmark Badge
 * Uses the authentic vector geometry with exact viewBox (54 36 360 150)
 * Sized with a fixed height and w-auto + shrink-0 to prevent flex squishing.
 */
export function StripeBadge({ className = "h-4 w-auto" }) {
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0 shrink-0 select-none">
      <span className="text-[12px] font-medium text-slate-500 leading-none">via</span>
      <svg
        viewBox="54 36 360 150"
        width="360"
        height="150"
        preserveAspectRatio="xMidYMid meet"
        className={`${className} flex-shrink-0 shrink-0 block`}
        style={{ aspectRatio: "360 / 150" }}
        fill="#635BFF"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Stripe"
      >
        {/* Letter 's' */}
        <path d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z" />
        {/* Letter 't' */}
        <path d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z" />
        {/* Letter 'r' */}
        <path d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z" />
        {/* Dot of 'i' */}
        <polygon points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3" />
        {/* Stem of 'i' */}
        <rect x="223.8" y="69.3" width="25.1" height="87.5" />
        {/* Letter 'p' */}
        <path d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z" />
        {/* Letter 'e' */}
        <path d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z" />
      </svg>
    </div>
  );
}
