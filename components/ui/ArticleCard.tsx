import { Article } from '@/types/articles';
import { Calendar } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
}

export function ArticleCard({ article, onSelect }: ArticleCardProps) {
  return (
    <div 
      className="cursor-pointer min-w-[280px] w-[280px]"
      onClick={() => onSelect(article)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {article.thumbnail ? (
            <img 
              src={article.thumbnail} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl text-gray-300">📝</div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.summary}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US')}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}