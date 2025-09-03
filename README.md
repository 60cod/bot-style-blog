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

### Prerequisites

1. Node.js (v18 or later)
2. Notion API Token and Database ID

### Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Notion integration:
   - Copy `.env.example` to `.env.local`
   - Add your Notion API token:
   ```bash
   NOTION_TOKEN=your_notion_integration_token
   ```

3. Test Notion connection:
```bash
npm run test:notion
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Notion Database Setup

Your Notion database should have the following properties:
- `article_title` (Title) - Article title
- `article_category` (Select) - Article category
- `article_tags` (Multi-select) - Article tags
- `article_date` (Date) - Publication date
- `article_excerpt` (Rich Text) - Article summary
- `cover` (File) - Article thumbnail image

The integration maps these Notion fields to the following article properties:
- `article_title` → `title`
- `article_category` → `category`
- `article_tags` → `tags`
- `article_date` → `publishedAt`
- `article_excerpt` → `summary`
- `cover` → `thumbnail`

## Color Scheme

- Primary: `#030213` (Dark navy)
- Background: Light gray tones
- Accent: White with subtle shadows