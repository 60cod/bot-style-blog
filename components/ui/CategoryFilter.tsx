'use client';

import { ArticleCategory } from '@/types/articles';

interface CategoryFilterProps {
  categories: ArticleCategory[];
  selectedCategories: ArticleCategory[];
  onCategoryToggle: (category: ArticleCategory) => void;
}

const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  'Web Development': 'bg-blue-100 text-blue-800 border-blue-200',
  'Design': 'bg-purple-100 text-purple-800 border-purple-200',
  'Technology': 'bg-green-100 text-green-800 border-green-200',
  'Career': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Tutorial': 'bg-red-100 text-red-800 border-red-200',
  'Opinion': 'bg-gray-100 text-gray-800 border-gray-200'
};

export function CategoryFilter({ categories, selectedCategories, onCategoryToggle }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        const colorClass = CATEGORY_COLORS[category];
        
        return (
          <button
            key={category}
            onClick={() => onCategoryToggle(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              isSelected 
                ? colorClass 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}