'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/projects';
import { ProjectCard } from './ui/ProjectCard';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from Notion API
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/projects');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch projects');
        }
        
        setProjects(result.data);
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
    // Future: Navigate to project detail page
  };

  return (
    <div className="bg-gray-50">
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