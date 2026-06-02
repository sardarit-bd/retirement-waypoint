"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
  "All Books",
  "Retirement",
  "Purpose",
  "Lifestyle",
  "Workbooks",
  "Guides",
];

export const BookFilters = ({ activeCategory, setActiveCategory }) => {
  return (
    <section id="book-filters" className="relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl -translate-y-6">
        <div className="rounded-2xl border border-[#1B2B4B]/10 bg-white p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-[#C9A84C]" />
            <span className="text-sm font-semibold text-[#1B2B4B]">
              Categories
            </span>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                      activeCategory === category
                        ? "bg-[#C9A84C] text-[#1B2B4B] hover:bg-[#D6B45A]"
                        : "border-[#1B2B4B]/10 bg-[#F8F5EF] text-[#1B2B4B]/70 hover:border-[#C9A84C] hover:text-[#1B2B4B]"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
};