import { Message, NavigationSection } from '@/types';

export class BotMessageFactory {
  private static generateId(): string {
    return Date.now().toString();
  }

  private static getTimestamp(): string {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  static createInitialMessage(): Message {
    return {
      id: this.generateId(),
      content: "Hi! I'm Yugyeong Na, a developer passionate about creating innovative web solutions. 👋\n\nI'd love to share my journey with you! What would you like to explore?",
      isBot: true,
      timestamp: this.getTimestamp()
    };
  }

  static createFullWidthMessage(section: NavigationSection): Message {
    return {
      id: this.generateId(),
      content: `Loading ${section}...`,
      isBot: true,
      timestamp: this.getTimestamp(),
      isFullWidth: true,
      selectedSection: section
    };
  }

  static createContactEmailPrompt(): Message {
    return {
      id: this.generateId(),
      content: "Please enter your email address to get started.",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: ['Return']
    };
  }

  static createContactMessagePrompt(): Message {
    return {
      id: this.generateId(),
      content: "Great! What would you like to talk about?\nFeel free to share your thoughts, questions, or ideas.",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: ['Return']
    };
  }

  static createContactConfirmation(email: string, message: string): Message {
    return {
      id: this.generateId(),
      content: `Let me confirm your message:\n\n• Email: ${email}\n• Message: "${message}"\n\nShould I send this message?`,
      isBot: true,
      timestamp: this.getTimestamp()
    };
  }

  static createEmailSuccessMessage(): Message {
    return {
      id: this.generateId(),
      content: "Your message has been sent successfully! I'll get back to you as soon as possible.\n\nThanks for reaching out! 😊",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: ['Return']
    };
  }

  static createEmailErrorMessage(): Message {
    return {
      id: this.generateId(),
      content: "Sorry, there was an error sending your message. Please try again or contact me directly at zz6cod@gmail.com.",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: ['Return']
    };
  }

  static createEmailValidationError(): Message {
    return {
      id: this.generateId(),
      content: "Please enter a valid email address (e.g., name@example.com) so I can respond to you.",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: ['Return']
    };
  }

  static createAboutPrompt(): Message {
    return {
      id: this.generateId(),
      content: "I'm excited to share more about my background! 🌟\n\nWhat aspect of my journey interests you most?",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: ['Experience', 'Education', 'Technical Skills', 'Social']
    };
  }

  static createAboutResponse(buttonText: string): Message {
    const responses: Record<string, string> = {
      'Experience': "💼 Professional Experience\n\nFull-stack Developer | Artistry Community (Aug. 2025 – Present)\n- Improved the personal information page with Next.js\n- Built environments on AWS and setting up CI/CD pipelines\n\n**Previous Projects | Spectra Inc. (Nov. 2022 – Jul. 2025)**\n- Developed data processing and visualization APIs using Java and React\n- Implemented real-time statistics using Java and Elasticsearch\n- Performed zero-downtime AWS RDS deployments and optimized system performance\n- Integrated KakaoTalk API and improved existing systems\n- Leveraged AI to resolve development challenges and deliver multiple requirements in a short period\n- Independently managed SM Lead operations for 90+ client servers",
      
      'Education': "🎓 Education Background\n\nMolecular Biology | Jeonbuk National University\n- Bioinformatics and computational methods exposure\n- Data analysis and statistical reasoning\n- Genomics and biological data handling\n- Applied biotechnology and experimental automation thinking",
      
      'Technical Skills': "⚡ Technical Skills\n\nBackend\n• JAVA, Spring Framework, JPA\n• REST API, Kafka\n• Microservices architecture\n\nFrontend\n• React, JavaScript, TypeScript\n• Next.js, TailwindCSS\n• Modern component-based development\n\nDatabases & Search\n• PostgreSQL, MySQL\n• ElasticSearch\n\nDevOps & Infrastructure\n• AWS (EC2, RDS, S3)\n• Kubernetes, Docker, ArgoCD\n• CI/CD, Jenkins, Git\n• Nginx, Grafana, Prometheus\n\nCurrent Focus\n• Full-stack architecture\n• Cloud-native development\n• System design & Algorithms",
      
      'Social': "🌐 Let's Connect\n\nI'm always open to discussing new opportunities, collaborations, or interesting technical challenges!"
    };

    const buttons = buttonText === 'Social' ? ['LinkedIn', 'GitHub', 'Email', 'Return'] : ['Return'];
    
    return {
      id: this.generateId(),
      content: responses[buttonText] || "Thanks for your interest!",
      isBot: true,
      timestamp: this.getTimestamp(),
      buttons: buttons
    };
  }
}

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