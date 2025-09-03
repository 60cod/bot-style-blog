import { Article, ArticleCategory } from '@/types/articles';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ArticleApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ArticleApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ArticleApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const result: ApiResponse<T> = await response.json();
    
    if (!result.success || !result.data) {
      throw new ArticleApiError(result.error || 'API request failed');
    }

    return result.data;
  } catch (error) {
    if (error instanceof ArticleApiError) {
      throw error;
    }
    throw new ArticleApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getArticlesByCategory(): Promise<Record<ArticleCategory, Article[]>> {
  try {
    return await fetchApi<Record<ArticleCategory, Article[]>>('articles/categories');
  } catch (error) {
    console.error('Failed to fetch articles by category:', error);
    throw error;
  }
}

export async function getAllCategories(): Promise<ArticleCategory[]> {
  try {
    const articlesByCategory = await getArticlesByCategory();
    return Object.keys(articlesByCategory).filter(category => 
      articlesByCategory[category as ArticleCategory].length > 0
    ) as ArticleCategory[];
  } catch (error) {
    console.error('Failed to get all categories:', error);
    throw error;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    return await fetchApi<Article[]>('articles');
  } catch (error) {
    console.error('Failed to fetch all articles:', error);
    throw error;
  }
}