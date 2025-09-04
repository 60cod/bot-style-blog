import { Project } from '@/types/projects';
import { ExternalLink, Github, Calendar } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const statusColors = {
    'Active': 'bg-green-100 text-green-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Archived': 'bg-gray-100 text-gray-800'
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="cursor-pointer w-full"
      onClick={() => onSelect(project)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl text-gray-300">🚀</div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
              {project.title}
            </h3>
            
            {/* Action Links */}
            <div className="flex gap-2 ml-2">
              {project.liveUrl && (
                <button
                  onClick={(e) => handleLinkClick(e, project.liveUrl!)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  title="View Live Project"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}
              {project.githubUrl && (
                <button
                  onClick={(e) => handleLinkClick(e, project.githubUrl!)}
                  className="p-1 text-gray-500 hover:text-gray-900 transition-colors"
                  title="View GitHub Repository"
                >
                  <Github className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <Calendar className="h-3 w-3" />
            <span>{new Date(project.createdAt).toLocaleDateString('en-US')}</span>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}