import { Project } from '@/types/projects';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

class ProjectApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ProjectApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ProjectApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const result: ApiResponse<T> = await response.json();
    
    if (!result.success || !result.data) {
      throw new ProjectApiError(result.error || 'API request failed');
    }

    return result.data;
  } catch (error) {
    if (error instanceof ProjectApiError) {
      throw error;
    }
    throw new ProjectApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    return await fetchApi<Project[]>('projects');
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const allProjects = await getAllProjects();
    // For now, return first 4 projects as featured. In future, can filter by project_featured field
    return allProjects.slice(0, 4);
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    throw error;
  }
}