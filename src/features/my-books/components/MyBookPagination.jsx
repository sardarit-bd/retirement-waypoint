'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function MyBookPagination({ meta, onPageChange }) {
  if (!meta || meta.totalPages <= 1) return null;

  const { page, totalPages, hasNextPage, hasPrevPage } = meta;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (endPage - startPage < maxVisible - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisible - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2 pt-6"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className="rounded-full border-[#1B2B4B]/15 hover:border-[#C9A84C]/30 hover:bg-[#F8F5EF]"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1.5">
        {renderPageNumbers().map((p, index) =>
          p === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-sm text-[#1B2B4B]/40">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(p)}
              className={cn(
                'h-9 w-9 rounded-full text-sm font-medium transition-all',
                p === page
                  ? 'bg-[#C9A84C] text-[#04103A] hover:bg-[#D6B45A]'
                  : 'text-[#1B2B4B] hover:bg-[#F8F5EF]'
              )}
            >
              {p}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="rounded-full border-[#1B2B4B]/15 hover:border-[#C9A84C]/30 hover:bg-[#F8F5EF]"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}