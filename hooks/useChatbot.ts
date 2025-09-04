import { useState, useCallback } from 'react';
import { Message, NavigationSection, ChatbotState, ContactStep, AboutStep, ContactData } from '@/types';
import { createUserMessage, createLoadingMessage, createInitialMessage } from '@/lib/message-utils';
import { BotMessageFactory, UserMessageFactory } from '@/lib/message-factories';
import { isValidEmail, normalizeEmail } from '@/lib/email-utils';

export function useChatbot(): ChatbotState & {
  handleSectionClick: (section: NavigationSection) => void;
  handleAboutButtonClick: (buttonText: string) => void;
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
  const [aboutStep, setAboutStep] = useState<AboutStep | null>(null);
  const [contactData, setContactData] = useState<ContactData>({ email: '', message: '' });
  const [isEmailSending, setIsEmailSending] = useState(false);

  // Use factory methods for message creation

  const handleSectionClick = useCallback((section: NavigationSection) => {
    setShowInitialButtons(false);
    
    if (section === 'Contact') {
      // Contact workflow - don't expand, but enable input after delay
      setContactStep('email');

      const userMessage = UserMessageFactory.createMessage(section);
      setMessages(prev => [...prev, userMessage]);

      // Bot response with delay
      setTimeout(() => {
        const botMessage = BotMessageFactory.createContactEmailPrompt();
        setMessages(prev => [...prev, botMessage]);
        setIsInputEnabled(true);
      }, 600);
    } else if (section === 'About') {
      // About workflow - don't expand, show navigation buttons
      setAboutStep('initial');

      const userMessage = UserMessageFactory.createMessage(section);
      setMessages(prev => [...prev, userMessage]);

      // Bot response with about navigation buttons
      setTimeout(() => {
        const botMessage = BotMessageFactory.createAboutPrompt();
        setMessages(prev => [...prev, botMessage]);
      }, 600);
    } else {
      // Other sections - expand as usual
      setIsExpanded(true);

      const userMessage = createUserMessage(section);
      setMessages(prev => [...prev, userMessage]);

      // Loading message with delay
      setTimeout(() => {
        const loadingMessage = createLoadingMessage(section);
        setMessages(prev => [...prev, loadingMessage]);
      }, 400);
    }
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    // Temporarily disable input to prevent rapid sending
    setIsInputEnabled(false);
    
    // Add user message with slight delay
    setTimeout(() => {
      const userMessage = UserMessageFactory.createMessage(message);
      setMessages(prev => [...prev, userMessage]);
      
      // Add bot response with additional delay
      setTimeout(() => {
        if (contactStep === 'email') {
          if (isValidEmail(message)) {
            const normalizedEmail = normalizeEmail(message);
            setContactData(prev => ({ ...prev, email: normalizedEmail }));
            setContactStep('message');

            const botMessage = BotMessageFactory.createContactMessagePrompt();
            setMessages(prev => [...prev, botMessage]);
            setIsInputEnabled(true);
          } else {
            const botMessage = BotMessageFactory.createEmailValidationError();
            setMessages(prev => [...prev, botMessage]);
            setIsInputEnabled(true);
          }
        } else if (contactStep === 'message') {
          setContactData(prev => ({ ...prev, message }));
          setContactStep('confirmation');
          // Keep input disabled for confirmation step

          const botMessage = BotMessageFactory.createContactConfirmation(contactData.email, message);
          setMessages(prev => [...prev, botMessage]);
        }
      }, 800); // Bot response delay
    }, 200); // User message delay
  }, [contactStep, contactData.email]);

  const handleConfirmSend = useCallback(async () => {
    setIsEmailSending(true);
    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: contactData.email,
          message: contactData.message,
        }),
      });

      const result = await response.json();

      setTimeout(() => {
        if (response.ok && result.success) {
          const botMessage = BotMessageFactory.createEmailSuccessMessage();
          setMessages(prev => [...prev, botMessage]);
        } else {
          const botMessage = BotMessageFactory.createEmailErrorMessage();
          setMessages(prev => [...prev, botMessage]);
        }
        setContactStep(null);
        setIsInputEnabled(false);
        setIsEmailSending(false);
      }, 500);
    } catch (error) {
      console.error('Failed to send email:', error);
      setTimeout(() => {
        const botMessage = BotMessageFactory.createEmailErrorMessage();
        setMessages(prev => [...prev, botMessage]);
        setContactStep(null);
        setIsInputEnabled(false);
        setIsEmailSending(false);
      }, 500);
    }
  }, [contactData]);

  const handleCancelSend = useCallback(() => {
    handleBackToHome();
  }, []);

  const handleAboutButtonClick = useCallback((buttonText: string) => {
    // Handle social media links directly without adding user message
    if (buttonText === 'LinkedIn') {
      window.open('https://www.linkedin.com/in/na60', '_blank');
      return;
    }
    if (buttonText === 'GitHub') {
      window.open('https://github.com/60cod', '_blank');
      return;
    }
    if (buttonText === 'Email') {
      window.open('mailto:zz6cod@gmail.com', '_blank');
      return;
    }

    // Add user message for other buttons
    const userMessage = UserMessageFactory.createMessage(buttonText);
    setMessages(prev => [...prev, userMessage]);

    // Bot response based on the button clicked
    setTimeout(() => {
      const botMessage = BotMessageFactory.createAboutResponse(buttonText);
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  }, []);

  const handleBackToHome = useCallback(() => {
    setIsExpanded(false);
    setShowInitialButtons(true);
    setIsInputEnabled(false);
    setContactStep(null);
    setAboutStep(null);
    setContactData({ email: '', message: '' });
    setMessages([createInitialMessage()]);
  }, []);

  return {
    messages,
    showInitialButtons,
    isExpanded,
    isInputEnabled,
    contactStep,
    aboutStep,
    contactData,
    isEmailSending,
    handleSectionClick,
    handleAboutButtonClick,
    handleBackToHome,
    handleSendMessage,
    handleConfirmSend,
    handleCancelSend
  };
}