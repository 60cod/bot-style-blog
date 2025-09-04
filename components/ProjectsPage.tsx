'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/projects';
import { ProjectCard } from './ui/ProjectCard';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for now - will be replaced with actual API call
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock project data
        const mockProjects: Project[] = [
          {
            id: '1',
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
            thumbnail: '/projects/ecommerce.jpg',
            techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
            liveUrl: 'https://example-ecommerce.com',
            githubUrl: 'https://github.com/example/ecommerce',
            createdAt: '2024-01-15',
            status: 'Completed'
          },
          {
            id: '2',
            title: 'Real-time Chat Application',
            description: 'A real-time messaging application built with Next.js and Socket.io. Supports group chats, file sharing, and emoji reactions.',
            thumbnail: '/projects/chat-app.jpg',
            techStack: ['Next.js', 'Socket.io', 'MongoDB', 'Redis'],
            liveUrl: 'https://example-chat.com',
            githubUrl: 'https://github.com/example/chat',
            createdAt: '2024-02-20',
            status: 'Active'
          },
          {
            id: '3',
            title: 'Task Management Dashboard',
            description: 'A comprehensive project management tool with drag-and-drop functionality, team collaboration features, and advanced reporting.',
            thumbnail: '/projects/task-manager.jpg',
            techStack: ['Vue.js', 'Express.js', 'MySQL', 'Docker'],
            githubUrl: 'https://github.com/example/tasks',
            createdAt: '2024-03-10',
            status: 'In Progress'
          },
          {
            id: '4',
            title: 'Weather Analytics Platform',
            description: 'A data visualization platform for weather analytics with interactive charts, historical data comparison, and API integrations.',
            thumbnail: '/projects/weather-app.jpg',
            techStack: ['React', 'D3.js', 'Python', 'FastAPI'],
            liveUrl: 'https://example-weather.com',
            createdAt: '2023-12-05',
            status: 'Archived'
          },
          {
            id: '5',
            title: 'Cryptocurrency Tracker',
            description: 'A real-time cryptocurrency price tracking application with portfolio management, price alerts, and market analysis.',
            thumbnail: '/projects/crypto-tracker.jpg',
            techStack: ['Angular', 'Firebase', 'CoinGecko API'],
            liveUrl: 'https://example-crypto.com',
            githubUrl: 'https://github.com/example/crypto',
            createdAt: '2024-01-28',
            status: 'Active'
          },
          {
            id: '6',
            title: 'AI Content Generator',
            description: 'An AI-powered content generation tool that helps create blog posts, social media content, and marketing copy using GPT integration.',
            thumbnail: '/projects/ai-generator.jpg',
            techStack: ['Svelte', 'OpenAI API', 'Supabase'],
            githubUrl: 'https://github.com/example/ai-content',
            createdAt: '2024-03-25',
            status: 'In Progress'
          }
        ];

        setProjects(mockProjects);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const handleProjectSelect = (project: Project) => {
    console.log('Selected project:', project);
    // Future: Navigate to project detail page
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={handleProjectSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}