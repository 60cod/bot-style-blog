// Base message interface
export interface BaseMessage {
  id: string;
  content: string;
  timestamp: string;
}

// Bot-specific message interface
export interface BotMessage extends BaseMessage {
  isBot: true;
  buttons?: string[];
  isFullWidth?: boolean;
  selectedSection?: NavigationSection;
}

// User-specific message interface
export interface UserMessage extends BaseMessage {
  isBot: false;
}

// Union type for all messages
export type Message = BotMessage | UserMessage;

export type NavigationSection = 'Articles' | 'Projects' | 'About' | 'Contact';

export type ContactStep = 'initial' | 'email' | 'message' | 'confirmation';

export type AboutStep = 'initial' | 'experience' | 'education' | 'skills' | 'social';

export interface ContactData {
  email: string;
  message: string;
}

export interface ChatbotState {
  messages: Message[];
  showInitialButtons: boolean;
  isExpanded: boolean;
  isInputEnabled: boolean;
  contactStep: ContactStep | null;
  aboutStep: AboutStep | null;
  contactData: ContactData;
  isEmailSending: boolean;
}