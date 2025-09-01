import { NavigationSection } from '@/types';

export const NAVIGATION_SECTIONS: NavigationSection[] = [
  'Articles',
  'Projects', 
  'About',
  'Contact'
];

export const CHATBOT_DIMENSIONS = {
  collapsed: { width: 'w-[600px]', height: 'h-[900px]' },
  expanded: { width: 'w-[1000px]', height: 'h-[1200px]' }
} as const;

export const BRAND_COLORS = {
  primary: '#030213',
  avatar: '#030213'
} as const;

export const LOADING_AREA_HEIGHT = 'min-h-[820px]';