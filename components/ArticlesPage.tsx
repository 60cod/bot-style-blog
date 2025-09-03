'use client';

import { useState, useMemo, useEffect } from 'react';
import { Article, ArticleCategory } from '@/types/articles';
import { getArticlesByCategory, getAllCategories } from '@/lib/articles-api';
import { SearchBar } from './ui/SearchBar';
import { CategoryFilter } from './ui/CategoryFilter';
import { PaginationCarousel } from './ui/PaginationCarousel';

export function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentInput, setCurrentInput] = useState(''); // 현재 검색바 입력값
  const [selectedCategories, setSelectedCategories] = useState<ArticleCategory[]>([]);
  const [articlesByCategory, setArticlesByCategory] = useState<Record<ArticleCategory, Article[]>>({} as Record<ArticleCategory, Article[]>);
  const [allCategories, setAllCategories] = useState<ArticleCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        setError(null);
        const [categorizedArticles, categories] = await Promise.all([
          getArticlesByCategory(),
          getAllCategories()
        ]);
        setArticlesByCategory(categorizedArticles);
        setAllCategories(categories);
      } catch (err) {
        console.error('Failed to load articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  // 필터링 로직
  const filteredCategories = useMemo(() => {
    const categoriesToShow = selectedCategories.length > 0 
      ? selectedCategories 
      : allCategories;

    return categoriesToShow
      .map(category => ({
        category,
        articles: articlesByCategory[category]?.filter(article => {
          if (!searchQuery) return true;
          return (
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }) || []
      }))
      .filter(group => group.articles.length > 0);
  }, [searchQuery, selectedCategories, allCategories, articlesByCategory]);

  const handleCategoryToggle = (category: ArticleCategory) => {
    // 카테고리 변경 시 현재 입력값으로 검색 업데이트
    setSearchQuery(currentInput);
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleArticleSelect = (article: Article) => {
    console.log('Selected article:', article);
    // 향후 아티클 상세 페이지로 이동하는 로직 추가
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
          
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SearchBar 
              onSearch={setSearchQuery} 
              onQueryChange={setCurrentInput}
            />
            <CategoryFilter
              categories={allCategories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
            />
          </div>
        </div>

        {/* Articles by Category */}
        <div className="space-y-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          ) : (
            filteredCategories.map(({ category, articles }) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                  <span className="text-sm text-gray-500">{articles.length} articles</span>
                </div>
                
                <PaginationCarousel
                  articles={articles}
                  onArticleSelect={handleArticleSelect}
                  itemsPerPage={3}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}