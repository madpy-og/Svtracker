import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CardPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
};

const CardPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: CardPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-3 mt-1 border-t border-cusgrey text-capt-m md:text-capt text-cusdarkgrey select-none">
      {totalItems !== undefined ? (
        <p className="font-medium">
          Total: <span className="text-cusblack font-bold">{totalItems}</span> items
        </p>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1 rounded-md hover:bg-cusgrey text-cusblack disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer transition-colors"
          aria-label="Previous Page"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4 md:w-4.5 md:h-4.5" />
        </button>

        <span className="font-semibold text-cusblack px-1 text-bs-m md:text-bs">
          {currentPage} <span className="text-cusdarkgrey font-normal">/</span> {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1 rounded-md hover:bg-cusgrey text-cusblack disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed cursor-pointer transition-colors"
          aria-label="Next Page"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4 md:w-4.5 md:h-4.5" />
        </button>
      </div>
    </div>
  );
};

export default CardPagination;
