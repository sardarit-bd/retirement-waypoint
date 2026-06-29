"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  const bookImage = imageError
    ? "https://placehold.co/400x600/1B2B4B/FFFFFF?text=Book+Cover"
    : book.coverImage;

  const isPublished = book.status === "PUBLISHED";

  return (
    <Card className="group relative overflow-hidden rounded-[28px] border border-[#1B2B4B]/10 bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(27,43,75,0.18)]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C9A84C]/5 via-transparent to-[#1B2B4B]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="relative mx-auto h-72 w-48 overflow-visible">
          <div className="absolute inset-0 rounded-md bg-[#1B2B4B]/10 blur-xl transition duration-500 group-hover:scale-110" />

          <div className="relative h-full w-full overflow-hidden rounded-md border border-[#1B2B4B]/10 bg-[#F8F5EF] shadow-2xl">
            <Image
              src={bookImage}
              alt={book.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              onError={() => setImageError(true)}
              sizes="192px"
            />
          </div>

          {book.featured && (
            <Badge className="absolute -left-4 top-3 z-20 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-[#C9A84C] p-0 text-[11px] font-black leading-3 text-[#1B2B4B] shadow-xl ring-4 ring-white hover:bg-[#C9A84C]">
              ★
              <span>FEATURED</span>
            </Badge>
          )}

          {isPublished && (
            <div className="absolute bottom-5 right-[-34px] rotate-[-38deg] bg-green-600 px-10 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
              Available
            </div>
          )}
        </div>

        <CardContent className="mt-6 p-0 text-center">
          <h3 className="mx-auto line-clamp-2 min-h-[58px] max-w-[240px] text-lg font-bold leading-7 text-[#1B2B4B] transition-colors duration-300 group-hover:text-[#C9A84C]">
            {book.title}
          </h3>

          <p className="mt-2 line-clamp-1 text-sm text-[#1B2B4B]/60">
            by {book.authorName}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-2xl font-black text-[#1B2B4B]">
              $ {book.price}
            </span>
          </div>

          <div className="mt-6">
            <Button
              asChild
              className="w-full h-11 cursor-pointer rounded-2xl bg-[#1B2B4B] text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#1B2B4B]"
            >
              <Link href={`/book/${book.slug}`}>
                <Eye className="mr-1.5 h-4 w-4" />
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};