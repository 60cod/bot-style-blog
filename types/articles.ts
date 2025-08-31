export interface Article {
  id: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  publishedAt: string;
  readTime: number;
  tags: string[];
  thumbnail: string;
  author: string;
}

export type ArticleCategory = 
  | 'Web Development'
  | 'Design'
  | 'Technology'
  | 'Career'
  | 'Tutorial'
  | 'Opinion';

export interface CategoryGroup {
  category: ArticleCategory;
  articles: Article[];
}

export interface SearchFilters {
  query: string;
  selectedCategories: ArticleCategory[];
}