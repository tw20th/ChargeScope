// hooks/usePagination.ts
import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number = 6) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToPage = (n: number) => setCurrentPage(n);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    goToNext,
    goToPrev,
    goToPage,
  };
}
