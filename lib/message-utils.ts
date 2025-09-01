import { Message, NavigationSection } from '@/types';

export function createUserMessage(content: string): Message {
  return {
    id: Date.now().toString(),
    content,
    isBot: false
  };
}

export function createLoadingMessage(section: NavigationSection): Message {
  return {
    id: (Date.now() + 1).toString(),
    content: '',
    isBot: true,
    isFullWidth: true,
    selectedSection: section
  };
}

export function createInitialMessage(): Message {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return {
    id: '1',
    content: "Hello, I'm Yugyeong Na. What would you like to explore?",
    isBot: true,
    timestamp: timeString
  };
}