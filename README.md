# Bot Style Blog

Dynamic chatbot-style navigation interface built with Next.js and Tailwind CSS.

## Features

- 🤖 Interactive chatbot-style interface
- 📱 Responsive design with smooth animations
- 🎨 Clean, modern UI with custom color scheme
- 🏗️ Modular, scalable architecture
- 📄 Prepared for 4 content sections: Articles, Projects, About, Contact

## Architecture

### Project Structure
```
├── app/              # Next.js app router
├── components/       # React components
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── types/           # TypeScript type definitions
└── constants/       # Application constants
```

### Key Components

- **Chatbot**: Main chatbot interface
- **Avatar**: User avatar component  
- **MessageBubble**: Chat message display
- **NavigationButtons**: Section navigation
- **ChatInput**: Input area (disabled)

### Custom Hooks

- **useChatbot**: Manages chatbot state and interactions

### Future Extensions

Ready for expansion with individual pages for:
- `/articles` - Blog posts and articles
- `/projects` - Portfolio projects
- `/about` - Personal information
- `/contact` - Contact information

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Color Scheme

- Primary: `#030213` (Dark navy)
- Background: Light gray tones
- Accent: White with subtle shadows