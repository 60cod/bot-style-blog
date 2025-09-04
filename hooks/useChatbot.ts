import { useState, useCallback } from 'react';
import { Message, NavigationSection, ChatbotState, ContactStep, AboutStep, ContactData } from '@/types';
import { createUserMessage, createLoadingMessage, createInitialMessage } from '@/lib/message-utils';
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
    } else if (section === 'About') {
      // About workflow - don't expand, show navigation buttons
      setAboutStep('initial');

      const userMessage = createUserMessageCustom(section);
      setMessages(prev => [...prev, userMessage]);

      // Bot response with about navigation buttons
      setTimeout(() => {
        const botMessage = createBotMessage(
          "What would you like to know about me?",
          ['Experience', 'Education', 'Technical Skills', 'Social']
        );
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
        setIsEmailSending(false);
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
        setIsEmailSending(false);
      }, 500);
    }
  }, [contactData, createBotMessage]);

  const handleCancelSend = useCallback(() => {
    handleBackToHome();
  }, []);

  const handleAboutButtonClick = useCallback((buttonText: string) => {
    // Add user message
    const userMessage = createUserMessageCustom(buttonText);
    setMessages(prev => [...prev, userMessage]);

    // Bot response based on the button clicked
    setTimeout(() => {
      let botResponse = '';
      switch (buttonText) {
        case 'Experience':
          botResponse = `🏢 **Professional Experience**

**Full-stack Developer** | Artistry Community (Aug. 2025 – Present)  
- Improved the personal information page with Next.js
- Built environments on AWS and setting up CI/CD pipelines

**Previous Projects | Spectra Inc. (Nov. 2022 – Jul. 2025)**
- Developed data processing and visualization APIs using Java and React
- Implemented real-time statistics using Java and Elasticsearch
- Performed zero-downtime AWS RDS deployments and optimized system performance
- Integrated KakaoTalk API and improved existing systems
- Leveraged AI to resolve development challenges and deliver multiple requirements in a short period
- Independently managed SM Lead operations for 90+ client servers`;
          break;
        case 'Education':
          botResponse = `🎓 **Education Background**

**Molecular Biology** | Jeonbuk National University
- Bioinformatics and computational methods exposure
- Data analysis and statistical reasoning
- Genomics and biological data handling
- Applied biotechnology and experimental automation thinking`;
          break;
        case 'Technical Skills':
          botResponse = `⚡ **Technical Skills**

**Backend**
• JAVA, Spring Framework, JPA
• REST API, Kafka
• Microservices architecture

**Frontend**
• React, JavaScript, TypeScript
• Next.js, TailwindCSS
• Modern component-based development

**Databases & Search**
• PostgreSQL, MySQL
• ElasticSearch

**DevOps & Infrastructure**
• AWS (EC2, RDS, S3)
• Kubernetes, Docker, ArgoCD
• CI/CD, Jenkins, Git
• Nginx, Grafana, Prometheus

**Current Focus**
• Full-stack architecture
• Cloud-native development
• System design & Algorithms`;
          break;
        case 'Social':
          botResponse = `🌐 **Let's Connect**

**GitHub**  
[github.com/60cod](https://github.com/60cod)  
Check out my latest projects and contributions

**Email**  
zz6cod@gmail.com  
Feel free to reach out for collaboration or opportunities

**LinkedIn**  
[Yugyeong Na](https://www.linkedin.com/in/na60)
Professional networking and career updates

I'm always open to discussing new opportunities, collaborations, or interesting technical challenges!`;
          break;
        default:
          botResponse = "I'd be happy to share more information. Please click on one of the buttons above.";
      }

      const botMessage = createBotMessage(botResponse, ['Return']);
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  }, [createUserMessageCustom, createBotMessage]);

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