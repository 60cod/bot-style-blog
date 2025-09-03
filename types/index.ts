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

export type ContactStep = 'initial' | 'email' | 'message' | 'confirmation';

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
  contactData: ContactData;
}