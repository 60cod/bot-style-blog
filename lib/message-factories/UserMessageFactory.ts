import { UserMessage } from '@/types';

export class UserMessageFactory {
  private static generateId(): string {
    return Date.now().toString();
  }

  private static generateTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  static createMessage(content: string): UserMessage {
    return {
      id: this.generateId(),
      content,
      isBot: false,
      timestamp: this.generateTimestamp()
    };
  }
}