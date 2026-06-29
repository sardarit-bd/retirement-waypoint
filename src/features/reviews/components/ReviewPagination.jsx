"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ReviewPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading 
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="h-9 px-3 border-[#1B2B4B]/15 hover:bg-[#F8F5EF] text-[#1B2B4B]"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="h-9 w-9 flex items-center justify-center text-sm text-[#1B2B4B]/40"
            >
              …
            </span>
          );
        }

        return (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            className={`h-9 w-9 p-0 ${
              page === currentPage
                ? "bg-[#1B2B4B] text-white hover:bg-[#1B2B4B]/90"
                : "border-[#1B2B4B]/15 hover:bg-[#F8F5EF] text-[#1B2B4B]"
            }`}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="h-9 px-3 border-[#1B2B4B]/15 hover:bg-[#F8F5EF] text-[#1B2B4B]"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};