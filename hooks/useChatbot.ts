import { useState, useCallback } from 'react';
import { Message, NavigationSection, ChatbotState } from '@/types';
import { createUserMessage, createLoadingMessage, createInitialMessage } from '@/lib/message-utils';

export function useChatbot(): ChatbotState & {
  handleSectionClick: (section: NavigationSection) => void;
  handleBackToHome: () => void;
} {
  const [messages, setMessages] = useState<Message[]>([createInitialMessage()]);
  const [showInitialButtons, setShowInitialButtons] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSectionClick = useCallback((section: NavigationSection) => {
    setShowInitialButtons(false);
    setIsExpanded(true);

    const userMessage = createUserMessage(section);
    const loadingMessage = createLoadingMessage(section);

    setMessages(prev => [...prev, userMessage, loadingMessage]);
  }, []);

  const handleBackToHome = useCallback(() => {
    setIsExpanded(false);
    setShowInitialButtons(true);
    setMessages([createInitialMessage()]);
  }, []);

  return {
    messages,
    showInitialButtons,
    isExpanded,
    handleSectionClick,
    handleBackToHome
  };
}