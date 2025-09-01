'use client';

import { useState, useCallback, useMemo } from 'react';

export function usePaginationCarousel<T>(items: T[], itemsPerPage: number = 3) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // 페이지 계산
  const totalPages = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  // 현재 페이지의 아이템들
  const currentItems = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // 다음 페이지로 이동
  const goToNextPage = useCallback(() => {
    if (totalPages === 0) return;
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  // 이전 페이지로 이동
  const goToPrevPage = useCallback(() => {
    if (totalPages === 0) return;
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // 특정 페이지로 이동
  const goToPage = useCallback((page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPrevPage,
    goToPage,
    hasItems: items.length > 0,
    canNavigate: totalPages > 1,
    hasPrevPage: currentPage > 0,
    hasNextPage: currentPage < totalPages - 1
  };
}