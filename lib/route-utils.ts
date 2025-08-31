import { NavigationSection } from '@/types';

export const ROUTE_PATHS = {
  Articles: '/articles',
  Projects: '/projects', 
  About: '/about',
  Contact: '/contact'
} as const;

export function getSectionRoute(section: NavigationSection): string {
  return ROUTE_PATHS[section];
}

export function getSectionTitle(section: NavigationSection): string {
  return section;
}

export function getSectionDescription(section: NavigationSection): string {
  const descriptions = {
    Articles: 'Read my latest articles and blog posts',
    Projects: 'Explore my portfolio and projects',
    About: 'Learn more about me and my background',
    Contact: 'Get in touch with me'
  };
  
  return descriptions[section];
}