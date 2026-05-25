"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FinalCTA = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  return (
    <section id="final-cta" className="relative bg-white py-20 sm:py-24 lg:py-28">
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#1B2B4B] sm:text-4xl lg:text-5xl">
          Ready To Understand Your Retirement Readiness?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#1B2B4B]/68 sm:text-lg">
          Take the assessment and begin building a more meaningful retirement
          journey.
        </p>

        <div className="mt-9">
          <Button
            variant="ghost"
            // onClick={handlePopupOpen}
            className="group w-full cursor-pointer rounded-full bg-white px-8 py-6 text-base font-semibold text-[#04103A] shadow-xl transition-all duration-300 hover:!bg-[#04103A] hover:!text-white hover:shadow-2xl sm:w-auto md:text-lg"
            asChild
          >
            <Link
              href="/assessment"
              className="flex items-center justify-center"
            >
              <span>Take Assessment</span>

              <ArrowRight className="ml-2 h-5 w-5 stroke-current transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </Button>
        </div>
      </div>

      {popupOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-[#04103A]">Coming Soon</h2>

            <p className="mt-3 text-gray-600">
              This page is currently under development.
            </p>

            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              className="mt-6 rounded-full bg-[#04103A] px-6 py-2 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinalCTA;
