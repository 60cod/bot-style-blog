import { Message } from '@/types';

export class UserMessageFactory {
  private static generateId(): string {
    return Date.now().toString();
  }

  private static getTimestamp(): string {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  static createMessage(content: string): Message {
    return {
      id: this.generateId(),
      content,
      isBot: false,
      timestamp: this.getTimestamp()
    };
  }
}