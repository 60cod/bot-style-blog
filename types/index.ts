export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  buttons?: string[];
  isFullWidth?: boolean;
  selectedSection?: string;
  timestamp?: string;
}

export type NavigationSection = 'Articles' | 'Projects' | 'About' | 'Contact';

export interface ChatbotState {
  messages: Message[];
  showInitialButtons: boolean;
  isExpanded: boolean;
}