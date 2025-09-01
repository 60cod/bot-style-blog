import { Article, ArticleCategory } from '@/types/articles';

export const MOCK_ARTICLES: Article[] = [
  // Web Development
  {
    id: '1',
    title: 'Building Scalable React Applications',
    summary: 'Learn best practices for creating maintainable and scalable React applications with modern patterns.',
    category: 'Web Development',
    publishedAt: '2024-01-15',
    tags: ['React', 'JavaScript', 'Architecture'],
    thumbnail: ''
  },
  {
    id: '2',
    title: 'Next.js 14 App Router Deep Dive',
    summary: 'Comprehensive guide to the new App Router in Next.js 14 with practical examples.',
    category: 'Web Development',
    publishedAt: '2024-01-20',
    tags: ['Next.js', 'React', 'Routing'],
    thumbnail: ''
  },
  {
    id: '3',
    title: 'TypeScript Advanced Patterns',
    summary: 'Master advanced TypeScript patterns for better code quality and developer experience.',
    category: 'Web Development',
    publishedAt: '2024-02-01',
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    thumbnail: ''
  },
  {
    id: '4',
    title: 'Fourth',
    summary: 'Master advanced TypeScript patterns for better code quality and developer experience.',
    category: 'Web Development',
    publishedAt: '2024-02-01',
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    thumbnail: ''
  },
  {
    id: '5',
    title: 'Fifth',
    summary: 'Master advanced TypeScript patterns for better code quality and developer experience.',
    category: 'Web Development',
    publishedAt: '2024-02-01',
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    thumbnail: ''
  },

  // Design
  {
    id: '6',
    title: 'Modern UI/UX Design Principles',
    summary: 'Essential design principles for creating beautiful and functional user interfaces.',
    category: 'Design',
    publishedAt: '2024-01-10',
    tags: ['UI', 'UX', 'Design'],
    thumbnail: ''
  },
  {
    id: '7',
    title: 'Color Theory in Web Design',
    summary: 'Understanding color psychology and creating effective color schemes for web applications.',
    category: 'Design',
    publishedAt: '2024-01-25',
    tags: ['Color', 'Design', 'Psychology'],
    thumbnail: ''
  },

  // Technology
  {
    id: '8',
    title: 'The Future of Web Technologies',
    summary: 'Exploring emerging web technologies and their impact on modern development.',
    category: 'Technology',
    publishedAt: '2024-02-05',
    tags: ['Web', 'Technology', 'Future'],
    thumbnail: ''
  },
  {
    id: '9',
    title: 'AI in Frontend Development',
    summary: 'How artificial intelligence is transforming the way we build user interfaces.',
    category: 'Technology',
    publishedAt: '2024-02-10',
    tags: ['AI', 'Frontend', 'Development'],
    thumbnail: ''
  },

  // Career
  {
    id: '10',
    title: 'From Junior to Senior Developer',
    summary: 'A roadmap for growing your skills and advancing your career in software development.',
    category: 'Career',
    publishedAt: '2024-01-30',
    tags: ['Career', 'Growth', 'Development'],
    thumbnail: ''
  },
  {
    id: '11',
    title: 'Building Your Developer Portfolio',
    summary: 'Tips and strategies for creating a compelling portfolio that gets you hired.',
    category: 'Career',
    publishedAt: '2024-02-15',
    tags: ['Portfolio', 'Career', 'Hiring'],
    thumbnail: ''
  }
];

export function getArticlesByCategory(): Record<ArticleCategory, Article[]> {
  const categories: ArticleCategory[] = [
    'Web Development',
    'Design', 
    'Technology',
    'Career',
    'Tutorial',
    'Opinion'
  ];

  return categories.reduce((acc, category) => {
    acc[category] = MOCK_ARTICLES.filter(article => article.category === category);
    return acc;
  }, {} as Record<ArticleCategory, Article[]>);
}

export function getAllCategories(): ArticleCategory[] {
  return Array.from(new Set(MOCK_ARTICLES.map(article => article.category)));
}