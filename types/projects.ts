export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  status: ProjectStatus;
}

export type ProjectStatus = 
  | 'Active'
  | 'Completed'
  | 'In Progress'
  | 'Archived';

export interface ProjectFilters {
  query: string;
  selectedStatus: ProjectStatus[];
}