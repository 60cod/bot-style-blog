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
    setShowInitialButtons(false);
    
    if (section === 'Contact') {
      // Contact workflow - don't expand, but enable input after delay
      setContactStep('email');

      const userMessage = createUserMessageCustom(section);
      setMessages(prev => [...prev, userMessage]);

      // Bot response with delay
      setTimeout(() => {
        const botMessage = createBotMessage(
          "Please enter your email address to get started.",
          ['Return']
        );
        setMessages(prev => [...prev, botMessage]);
        setIsInputEnabled(true);
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
  }, [createUserMessageCustom, createBotMessage, createUserMessage, createLoadingMessage]);

  const handleSendMessage = useCallback((message: string) => {
    // Temporarily disable input to prevent rapid sending
    setIsInputEnabled(false);
    
    // Add user message with slight delay
    setTimeout(() => {
      const userMessage = createUserMessageCustom(message);
      setMessages(prev => [...prev, userMessage]);
      
      // Add bot response with additional delay
      setTimeout(() => {
        if (contactStep === 'email') {
          if (isValidEmail(message)) {
            const normalizedEmail = normalizeEmail(message);
            setContactData(prev => ({ ...prev, email: normalizedEmail }));
            setContactStep('message');

            const botMessage = createBotMessage(
              "Great! Now please enter your message.",
              ['Return']
            );
            setMessages(prev => [...prev, botMessage]);
            setIsInputEnabled(true);
          } else {
            const botMessage = createBotMessage(
              "⚠️ Please enter a valid email address.",
              ['Return']
            );
            setMessages(prev => [...prev, botMessage]);
            setIsInputEnabled(true);
          }
        } else if (contactStep === 'message') {
          setContactData(prev => ({ ...prev, message }));
          setContactStep('confirmation');
          // Keep input disabled for confirmation step

          const botMessage = createBotMessage(
            `Would you like to send this message from ${contactData.email}?\n\nMessage: "${message}"`
          );
          setMessages(prev => [...prev, botMessage]);
        }
      }, 800); // Bot response delay
    }, 200); // User message delay
  }, [contactStep, contactData.email, createUserMessageCustom, createBotMessage]);

  const handleConfirmSend = useCallback(async () => {
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

      setTimeout(() => {
        if (response.ok) {
          const botMessage = createBotMessage(
            "✅ Thank you! Your message has been sent successfully. I'll get back to you soon!",
            ['Return']
          );
          setMessages(prev => [...prev, botMessage]);
        } else {
          const botMessage = createBotMessage(
            "Sorry, there was an error sending your message. Please try again later or contact me directly at zz6cod@gmail.com.",
            ['Return']
          );
          setMessages(prev => [...prev, botMessage]);
        }
        setContactStep(null);
        setIsInputEnabled(false);
      }, 500);
    } catch (error) {
      console.error('Failed to send email:', error);
      setTimeout(() => {
        const botMessage = createBotMessage(
          "Sorry, there was an error sending your message. Please try again later or contact me directly at zz6cod@gmail.com.",
          ['Return']
        );
        setMessages(prev => [...prev, botMessage]);
        setContactStep(null);
        setIsInputEnabled(false);
      }, 500);
    }
  }, [contactData, createBotMessage]);

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