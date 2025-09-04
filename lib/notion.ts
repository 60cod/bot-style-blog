import { Article, ArticleCategory } from '@/types/articles';

// Notion API types
interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  in_trash: boolean;
  cover?: {
    type: string;
    file?: {
      url: string;
      expiry_time: string;
    };
  };
  properties: {
    article_title: {
      title: Array<{
        plain_text: string;
      }>;
    };
    article_category: {
      select: {
        name: string;
      } | null;
    };
    article_tags: {
      multi_select: Array<{
        name: string;
      }>;
    };
    article_date: {
      date: {
        start: string;
      } | null;
    };
    article_excerpt: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
  };
}

interface NotionResponse {
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

const ARTICLES_DATABASE_ID = process.env.ARTICLES_DATABASE_ID;
const NOTION_API_VERSION = '2022-06-28';

class NotionError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'NotionError';
  }
}

export class NotionService {
  private token: string;
  private baseUrl = 'https://api.notion.com/v1';

  constructor() {
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      throw new NotionError('NOTION_TOKEN environment variable is required');
    }
    if (!ARTICLES_DATABASE_ID) {
      throw new NotionError('ARTICLES_DATABASE_ID environment variable is required');
    }
    this.token = token;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Notion-Version': NOTION_API_VERSION,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new NotionError(
          `Notion API error: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof NotionError) {
        throw error;
      }
      throw new NotionError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private mapNotionPageToArticle(page: NotionPage): Article {
    // Extract title
    const title = page.properties.article_title.title
      .map(t => t.plain_text)
      .join('')
      .trim() || 'Untitled';

    // Extract category and map to valid ArticleCategory
    const categoryName = page.properties.article_category.select?.name;
    const category: ArticleCategory = this.mapToValidCategory(categoryName);

    // Extract tags
    const tags = page.properties.article_tags.multi_select
      .map(tag => tag.name)
      .filter(Boolean);

    // Extract published date
    const publishedAt = page.properties.article_date.date?.start || new Date().toISOString().split('T')[0];

    // Extract summary/excerpt
    const summary = page.properties.article_excerpt.rich_text
      .map(text => text.plain_text)
      .join('')
      .trim() || '';

    // Extract thumbnail
    const thumbnail = page.cover?.file?.url || '';

    return {
      id: page.id,
      title,
      summary,
      category,
      publishedAt,
      tags,
      thumbnail,
    };
  }

  private mapToValidCategory(categoryName?: string): ArticleCategory {
    if (!categoryName) return 'Technology';
    
    // Direct mapping for known categories
    const categoryMap: Record<string, ArticleCategory> = {
      'Web Development': 'Web Development',
      'Design': 'Design',
      'Technology': 'Technology',
      'Career': 'Career',
      'Tutorial': 'Tutorial',
      'Opinion': 'Opinion',
    };

    return categoryMap[categoryName] || 'Technology';
  }

  async getArticles(): Promise<Article[]> {
    try {
      const response = await this.makeRequest<NotionResponse>(`/databases/${ARTICLES_DATABASE_ID}/query`, {
        method: 'POST',
        body: JSON.stringify({}),
      });

      return response.results
        .filter(page => !page.archived && !page.in_trash)
        .map(page => this.mapNotionPageToArticle(page))
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
      console.error('Failed to fetch articles from Notion:', error);
      throw error;
    }
  }

  async getArticlesByCategory(): Promise<Record<ArticleCategory, Article[]>> {
    const articles = await this.getArticles();
    
    const categories: ArticleCategory[] = [
      'Web Development',
      'Design',
      'Technology',
      'Career',
      'Tutorial',
      'Opinion'
    ];

    return categories.reduce((acc, category) => {
      acc[category] = articles.filter(article => article.category === category);
      return acc;
    }, {} as Record<ArticleCategory, Article[]>);
  }

  async getAllCategories(): Promise<ArticleCategory[]> {
    const articles = await this.getArticles();
    return Array.from(new Set(articles.map(article => article.category)));
  }
}

// Singleton instance
let notionService: NotionService | null = null;

export function getNotionService(): NotionService {
  if (!notionService) {
    notionService = new NotionService();
  }
  return notionService;
}

// Helper functions to maintain compatibility with existing code
export async function getArticlesByCategory(): Promise<Record<ArticleCategory, Article[]>> {
  const service = getNotionService();
  return service.getArticlesByCategory();
}

export async function getAllCategories(): Promise<ArticleCategory[]> {
  const service = getNotionService();
  return service.getAllCategories();
}