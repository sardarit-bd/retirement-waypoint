"use client";

import { Button } from "@/components/ui/button";

const CATEGORIES = ["All Books", "Investment", "Psychology", "Lifestyle", "Health", "Planning"];

export const BookFilters = ({ activeCategory, setActiveCategory }) => {
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => handleCategoryClick(category)}
          className={`
            rounded-full px-4 py-2 text-sm font-medium transition-all
            ${
              activeCategory === category
                ? "bg-[#1B2B4B] text-white hover:bg-[#1B2B4B]/90"
                : "border-[#1B2B4B]/20 text-[#1B2B4B] hover:bg-[#1B2B4B]/5"
            }
          `}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};