import { useState, useCallback } from 'react';
import { Message, NavigationSection, ChatbotState, ContactStep, ContactData } from '@/types';
import { createUserMessage, createLoadingMessage, createInitialMessage } from '@/lib/message-utils';
import { isValidEmail, normalizeEmail } from '@/lib/email-utils';

export function useChatbot(): ChatbotState & {
  handleSectionClick: (section: NavigationSection) => void;
  handleBackToHome: () => void;
  handleSendMessage: (message: string) => void;
  handleConfirmSend: () => void;
  handleCancelSend: () => void;
} {
  const [messages, setMessages] = useState<Message[]>([createInitialMessage()]);
  const [showInitialButtons, setShowInitialButtons] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [contactStep, setContactStep] = useState<ContactStep | null>(null);
  const [contactData, setContactData] = useState<ContactData>({ email: '', message: '' });

  const createBotMessage = useCallback((content: string, buttons?: string[]): Message => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return {
      id: Date.now().toString(),
      content,
      isBot: true,
      buttons,
      timestamp: timeString
    };
  }, []);

  const createUserMessageCustom = useCallback((content: string): Message => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: timeString
    };
  }, []);

  const handleSectionClick = useCallback((section: NavigationSection) => {
    if (section === 'Contact') {
      // Contact workflow - don't expand, but enable input
      setShowInitialButtons(false);
      setIsInputEnabled(true);
      setContactStep('email');

      const userMessage = createUserMessageCustom(section);
      const botMessage = createBotMessage(
        "Please enter your email address to get started:",
        ['Return']
      );

      setMessages(prev => [...prev, userMessage, botMessage]);
    } else {
      // Other sections - expand as usual
      setShowInitialButtons(false);
      setIsExpanded(true);

      const userMessage = createUserMessage(section);
      const loadingMessage = createLoadingMessage(section);

      setMessages(prev => [...prev, userMessage, loadingMessage]);
    }
  }, [createUserMessageCustom, createBotMessage]);

  const handleSendMessage = useCallback((message: string) => {
    const userMessage = createUserMessageCustom(message);
    setMessages(prev => [...prev, userMessage]);

    if (contactStep === 'email') {
      if (isValidEmail(message)) {
        const normalizedEmail = normalizeEmail(message);
        setContactData(prev => ({ ...prev, email: normalizedEmail }));
        setContactStep('message');

        const botMessage = createBotMessage(
          "Great! Now please enter your message:",
          ['Return']
        );
        setMessages(prev => [...prev, botMessage]);
      } else {
        const botMessage = createBotMessage(
          "Please enter a valid email address:",
          ['Return']
        );
        setMessages(prev => [...prev, botMessage]);
      }
    } else if (contactStep === 'message') {
      setContactData(prev => ({ ...prev, message }));
      setContactStep('confirmation');
      setIsInputEnabled(false);

      const botMessage = createBotMessage(
        `Would you like to send this message from ${contactData.email}?\n\nMessage: "${message}"`
      );
      setMessages(prev => [...prev, botMessage]);
    }
  }, [contactStep, contactData.email, createUserMessageCustom, createBotMessage]);

  const handleConfirmSend = useCallback(() => {
    // TODO: Implement actual email sending
    const botMessage = createBotMessage(
      "Thank you! Your message has been sent successfully. I'll get back to you soon!",
      ['Return']
    );
    setMessages(prev => [...prev, botMessage]);
    setContactStep(null);
    setIsInputEnabled(false);
  }, [createBotMessage]);

  const handleCancelSend = useCallback(() => {
    handleBackToHome();
  }, []);

  const handleBackToHome = useCallback(() => {
    setIsExpanded(false);
    setShowInitialButtons(true);
    setIsInputEnabled(false);
    setContactStep(null);
    setContactData({ email: '', message: '' });
    setMessages([createInitialMessage()]);
  }, []);

  return {
    messages,
    showInitialButtons,
    isExpanded,
    isInputEnabled,
    contactStep,
    contactData,
    handleSectionClick,
    handleBackToHome,
    handleSendMessage,
    handleConfirmSend,
    handleCancelSend
  };
}