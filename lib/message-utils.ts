import { Message, NavigationSection } from '@/types';
import { BotMessageFactory, UserMessageFactory } from './message-factories';

// Legacy wrapper functions for backward compatibility
export function createUserMessage(content: string): Message {
  return UserMessageFactory.createMessage(content);
}

export function createLoadingMessage(section: NavigationSection): Message {
  return BotMessageFactory.createFullWidthMessage(section);
}

export function createInitialMessage(): Message {
  return BotMessageFactory.createInitialMessage();
}