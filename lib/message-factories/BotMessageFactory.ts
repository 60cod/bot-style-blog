import { BotMessage, NavigationSection } from '@/types';

export class BotMessageFactory {
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

  static createTextMessage(content: string, buttons?: string[]): BotMessage {
    return {
      id: this.generateId(),
      content,
      isBot: true,
      timestamp: this.generateTimestamp(),
      buttons
    };
  }

  static createFullWidthMessage(section: NavigationSection): BotMessage {
    return {
      id: this.generateId(),
      content: '',
      isBot: true,
      timestamp: this.generateTimestamp(),
      isFullWidth: true,
      selectedSection: section
    };
  }

  static createInitialMessage(): BotMessage {
    return {
      id: '1',
      content: "Hello, I'm Yugyeong Na. What would you like to explore?",
      isBot: true,
      timestamp: this.generateTimestamp()
    };
  }

  static createContactEmailPrompt(): BotMessage {
    return this.createTextMessage(
      "Please enter your email address to get started.",
      ['Return']
    );
  }

  static createContactMessagePrompt(): BotMessage {
    return this.createTextMessage(
      "Great! Now please enter your message.",
      ['Return']
    );
  }

  static createEmailValidationError(): BotMessage {
    return this.createTextMessage(
      "⚠️ Please enter a valid email address.",
      ['Return']
    );
  }

  static createContactConfirmation(email: string, message: string): BotMessage {
    return this.createTextMessage(
      `Would you like to send this message from ${email}?\n\nMessage: "${message}"`
    );
  }

  static createEmailSuccessMessage(): BotMessage {
    return this.createTextMessage(
      "✅ Thank you! Your message has been sent successfully. I'll get back to you soon!",
      ['Return']
    );
  }

  static createEmailErrorMessage(): BotMessage {
    return this.createTextMessage(
      "Sorry, there was an error sending your message. Please try again later or contact me directly at zz6cod@gmail.com.",
      ['Return']
    );
  }

  static createAboutPrompt(): BotMessage {
    return this.createTextMessage(
      "What would you like to know about me?",
      ['Experience', 'Education', 'Technical Skills', 'Social']
    );
  }

  static createAboutResponse(buttonText: string): BotMessage {
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

    return this.createTextMessage(botResponse, ['Return']);
  }
}