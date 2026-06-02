"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BookCTA = () => {
  return (
    <section className="bg-[#1B2B4B] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Start With The Book. Continue With The Assessment.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/65">
          Build insight through guided reading, then use the assessment to
          understand your personal readiness profile.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
           <Button
            variant="ghost"
            // onClick={handlePopupOpen}
            className="group w-full cursor-pointer rounded-full bg-[#C9A84C] px-6 py-4 font-semibold text-sm! text-[#04103A] shadow-xl transition-all duration-300 hover:bg-[#04103A] hover:text-white hover:shadow-2xl sm:w-auto md:text-lg"
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
          {/* Placeholder for dashboard library - future implementation */}
          {/* <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white"
            onClick={() =>
              alert(
                "Library access will be available after login & payment integration."
              )
            }
          >
            My Library
          </Button> */}
        </div>
        {/* Hidden placeholder for future PDF reader integration */}
        <div className="hidden" aria-hidden="true">
          {/* 
            FUTURE IMPLEMENTATION NOTES:
            - PDF Reader Component: Will be added to /dashboard/library/[bookId]
            - Requires: user authentication, purchase verification
            - PDF files stored in cloud storage (S3, Cloudinary, etc.)
            - Implement PDF viewer (react-pdf, @react-pdf-viewer/core)
            - Track reading progress
            - Book download option
          */}
        </div>
      </div>
    </section>
  );
};