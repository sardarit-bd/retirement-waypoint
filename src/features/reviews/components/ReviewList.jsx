"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ReviewItem } from "./ReviewItem";
import { useBookReviews } from "../hooks/useReviews";

export const ReviewList = ({ bookId, totalReviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isFetching, refetch } = useBookReviews(bookId, {
    page: currentPage,
    limit,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const reviews = data?.data || data?.reviews || [];
  const pagination = data?.pagination || {
    page: currentPage,
    limit,
    total: totalReviews || 0,
    totalPages: Math.ceil((totalReviews || 0) / limit),
  };

  const totalPages = pagination.totalPages || Math.ceil((totalReviews || 0) / limit);

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const reviewsSection = document.getElementById('reviews');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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

  if (isLoading && reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#C9A84C]" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-[#1B2B4B]">No reviews yet</h3>
        <p className="text-[#1B2B4B]/60 mt-2">
          Be the first verified reader to review this book.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Review Items */}
      <div>
        {reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>

      {/* Loading indicator for page changes */}
      {isFetching && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-[#C9A84C]" />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isFetching}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentPage === 1 || isFetching
                ? 'text-[#1B2B4B]/30 cursor-not-allowed'
                : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1.5 text-sm text-[#1B2B4B]/40"
                >
                  …
                </span>
              );
            }

            return (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                disabled={isFetching}
                className={`w-9 h-9 text-sm font-medium rounded-md transition-colors ${
                  page === currentPage
                    ? 'bg-[#1B2B4B] text-white'
                    : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isFetching}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentPage === totalPages || isFetching
                ? 'text-[#1B2B4B]/30 cursor-not-allowed'
                : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};