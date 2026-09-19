"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  const bookImage = imageError
    ? "https://placehold.co/400x600/1B2B4B/FFFFFF?text=Book+Cover"
    : book.coverImage;

  const isPublished = book.status === "PUBLISHED";

  return (
    <Card className="group relative flex flex-col justify-between w-full h-full overflow-hidden rounded-2xl sm:rounded-[28px] border border-[#1B2B4B]/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(27,43,75,0.18)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/5 via-transparent to-[#1B2B4B]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Constrained Aspect Ratio Cover Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#F8F5EF] border border-[#1B2B4B]/10 shadow-sm">
          <Image
            src={bookImage}
            alt={book.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 340px, (max-width: 1024px) 50vw, 33vw"
          />

          {isPublished && (
            <div className="absolute top-3 right-3 z-10 rounded-full bg-green-600/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              Available
            </div>
          )}
        </div>

        <CardContent className="mt-4 p-0 flex flex-col flex-1 justify-between text-center">
          <div>
            <h3 className="line-clamp-2 min-h-[3.5rem] text-lg sm:text-xl font-bold leading-snug text-[#1B2B4B] transition-colors duration-300 group-hover:text-[#C9A84C]">
              {book.title}
            </h3>

            <p className="text-sm text-slate-500 my-1 line-clamp-1">
              by {book.authorName}
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xl font-semibold text-slate-900">
                ${book.price}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-2">
            <Button
              asChild
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-200 bg-[#1E293B] text-white hover:bg-[#0F172A] hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white shadow-md cursor-pointer"
            >
              <Link
                href={`/book/${book.slug}`}
                className="flex items-center justify-center gap-2 text-white hover:text-white"
              >
                <Eye className="h-4 w-4 text-white" />
                <span>View Details</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};