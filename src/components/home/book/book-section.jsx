"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const books = [
  {
    title: "Thriving — Not Just Surviving — In Your Retirement Years",
    price: "$29",
    image: "/images/books/book-1.jpg",
    href: "/book",
  },
  {
    title: "The Retirement Readiness Workbook",
    price: "$24",
    image: "/images/books/book-2.jpg",
    href: "/resources",
  },
  {
    title: "Building Purpose After Work",
    price: "$32",
    image: "/images/books/book-3.jpg",
    href: "/resources",
  },
  {
    title: "Structure as Self-Care",
    price: "$18",
    image: "/images/books/book-4.jpg",
    href: "/resources",
  },
];

const BookCard = ({ book }) => {
  return (
    <Card className="group w-[280px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/40 hover:bg-white/15 hover:shadow-2xl sm:w-[310px]">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 280px, 310px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B4B]/70 via-transparent to-transparent" />
      </div>

      <CardContent className="p-5">
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold leading-snug text-white">
          {book.title}
        </h3>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-[#C9A84C]">
            {book.price}
          </span>

          <Button
            asChild
            className="cursor-pointer rounded-full bg-[#C9A84C] px-5 text-sm font-semibold text-[#1B2B4B] hover:bg-[#D6B45A]"
          >
            <Link href={book.href}>Buy Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BookSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#1B2B4B] py-20 md:py-28 lg:py-32">
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-[#C9A84C]/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-2xl">
            <BookOpen className="h-4 w-4 text-[#C9A84C]" />
            Retirement Learning Resources
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Recent Books & Resources
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Practical guides and insights designed to help professionals thrive
            emotionally, mentally, and socially through retirement transition.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#1B2B4B] to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#1B2B4B] to-transparent sm:w-24" />

          <div className="overflow-hidden py-4">
            <Marquee
              speed={40}
              gradient={false}
              pauseOnHover={true}
              autoFill={true}
            >
              {books.map((book, index) => (
                <div key={`${book.title}-${index}`} className="mx-3">
                  <BookCard book={book} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Button
            className="group cursor-pointer rounded-full bg-[#C9A84C] px-8 py-6 text-base font-semibold text-[#1B2B4B] shadow-xl transition-all duration-300 hover:bg-[#D6B45A] hover:shadow-2xl"
            asChild
          >
            <Link href="/resources">
              View All Resources
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookSection;