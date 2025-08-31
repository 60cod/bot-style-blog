import { Article, ArticleCategory } from '@/types/articles';

export const MOCK_ARTICLES: Article[] = [
  // Web Development
  {
    id: '1',
    title: 'Building Scalable React Applications',
    summary: 'Learn best practices for creating maintainable and scalable React applications with modern patterns.',
    category: 'Web Development',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['React', 'JavaScript', 'Architecture'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '2',
    title: 'Next.js 14 App Router Deep Dive',
    summary: 'Comprehensive guide to the new App Router in Next.js 14 with practical examples.',
    category: 'Web Development',
    publishedAt: '2024-01-20',
    readTime: 12,
    tags: ['Next.js', 'React', 'Routing'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '3',
    title: 'TypeScript Advanced Patterns',
    summary: 'Master advanced TypeScript patterns for better code quality and developer experience.',
    category: 'Web Development',
    publishedAt: '2024-02-01',
    readTime: 10,
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '4',
    title: 'Fourth',
    summary: 'Master advanced TypeScript patterns for better code quality and developer experience.',
    category: 'Web Development',
    publishedAt: '2024-02-01',
    readTime: 10,
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '5',
    title: 'Fifth',
    summary: 'Master advanced TypeScript patterns for better code quality and developer experience.',
    category: 'Web Development',
    publishedAt: '2024-02-01',
    readTime: 10,
    tags: ['TypeScript', 'JavaScript', 'Patterns'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },

  // Design
  {
    id: '4',
    title: 'Modern UI/UX Design Principles',
    summary: 'Essential design principles for creating beautiful and functional user interfaces.',
    category: 'Design',
    publishedAt: '2024-01-10',
    readTime: 6,
    tags: ['UI', 'UX', 'Design'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '5',
    title: 'Color Theory in Web Design',
    summary: 'Understanding color psychology and creating effective color schemes for web applications.',
    category: 'Design',
    publishedAt: '2024-01-25',
    readTime: 5,
    tags: ['Color', 'Design', 'Psychology'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },

  // Technology
  {
    id: '6',
    title: 'The Future of Web Technologies',
    summary: 'Exploring emerging web technologies and their impact on modern development.',
    category: 'Technology',
    publishedAt: '2024-02-05',
    readTime: 7,
    tags: ['Web', 'Technology', 'Future'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '7',
    title: 'AI in Frontend Development',
    summary: 'How artificial intelligence is transforming the way we build user interfaces.',
    category: 'Technology',
    publishedAt: '2024-02-10',
    readTime: 9,
    tags: ['AI', 'Frontend', 'Development'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },

  // Career
  {
    id: '8',
    title: 'From Junior to Senior Developer',
    summary: 'A roadmap for growing your skills and advancing your career in software development.',
    category: 'Career',
    publishedAt: '2024-01-30',
    readTime: 11,
    tags: ['Career', 'Growth', 'Development'],
    thumbnail: '',
    author: 'Yugyeong Na'
  },
  {
    id: '9',
    title: 'Building Your Developer Portfolio',
    summary: 'Tips and strategies for creating a compelling portfolio that gets you hired.',
    category: 'Career',
    publishedAt: '2024-02-15',
    readTime: 8,
    tags: ['Portfolio', 'Career', 'Hiring'],
    thumbnail: '',
    author: 'Yugyeong Na'
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