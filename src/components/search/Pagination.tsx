'use client';

import { useSearch } from '@/contexts/SearchContext';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useSearch();

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = (): Array<number | string> => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: number[] = [];
    const rangeWithDots: Array<number | string> = [];

    // Calculate the range of pages to show
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add the range
    rangeWithDots.push(...range);

    // Always show last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex items-center justify-center gap-2'>
      {/* Previous button */}
      <button
        disabled={currentPage === 1}
        className='cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg border border-outline-variant bg-surface-container text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        aria-label='Previous page'
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className='w-4 h-4' />
      </button>

      {/* Page numbers */}
      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <div
              key={`dots-${index}`}
              className='flex items-center justify-center w-8 h-8'
            >
              <MoreHorizontal className='w-4 h-4 text-on-surface-variant' />
            </div>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${isCurrentPage
              ? 'bg-primary text-on-primary border-primary'
              : 'border-outline-variant bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isCurrentPage ? 'page' : undefined}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next button */}
      <button
        disabled={currentPage === totalPages}
        className='cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg border border-outline-variant bg-surface-container text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        aria-label='Next page'
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ChevronRight className='w-4 h-4' />
      </button>
    </div>
  );
}
