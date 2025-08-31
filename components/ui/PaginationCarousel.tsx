'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePaginationCarousel } from '@/hooks/usePaginationCarousel';
import { Article } from '@/types/articles';
import { ArticleCard } from './ArticleCard';

interface PaginationCarouselProps {
  articles: Article[];
  onArticleSelect: (article: Article) => void;
  itemsPerPage?: number;
}

export function PaginationCarousel({ 
  articles, 
  onArticleSelect, 
  itemsPerPage = 3 
}: PaginationCarouselProps) {
  const {
    currentPage,
    totalPages,
    currentItems,
    goToNextPage,
    goToPrevPage,
    hasItems,
    canNavigate
  } = usePaginationCarousel(articles, itemsPerPage);

  if (!hasItems) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">No articles found</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Previous Button */}
      <button
        onClick={goToPrevPage}
        disabled={!canNavigate}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-opacity disabled:opacity-30"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Articles Container */}
      <div className="overflow-hidden w-full">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex gap-4 shrink-0 w-full"
            >
              {articles
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={onArticleSelect}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={goToNextPage}
        disabled={!canNavigate}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-opacity disabled:opacity-30"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

    </div>
  );
}