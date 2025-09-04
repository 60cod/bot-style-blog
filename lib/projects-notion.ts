import { Project } from '@/types/projects';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PROJECTS_DATABASE_ID = process.env.PROJECTS_DATABASE_ID;
const NOTION_API_VERSION = '2022-06-28';

interface NotionResponse {
  object: 'list';
  results: NotionProject[];
  next_cursor: string | null;
  has_more: boolean;
}

interface NotionProject {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    project_title: {
      title: Array<{
        plain_text: string;
      }>;
    };
    project_description: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    project_status: {
      select: {
        name: string;
      } | null;
    };
    project_technologies: {
      multi_select: Array<{
        name: string;
      }>;
    };
    project_demo_url: {
      url: string | null;
    };
    project_github_url: {
      url: string | null;
    };
    project_start_date: {
      date: {
        start: string;
      } | null;
    };
    project_featured: {
      checkbox: boolean;
    };
  };
}

class ProjectsNotionError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ProjectsNotionError';
  }
}

function transformNotionProject(notionProject: NotionProject): Project {
  const title = notionProject.properties.project_title.title
    .map(t => t.plain_text)
    .join('');
    
  const description = notionProject.properties.project_description.rich_text
    .map(t => t.plain_text)
    .join('');
    
  const status = notionProject.properties.project_status.select?.name || 'Active';
  
  const techStack = notionProject.properties.project_technologies.multi_select
    .map(tech => tech.name);
    
  const createdAt = notionProject.properties.project_start_date.date?.start || 
    notionProject.created_time;

  return {
    id: notionProject.id,
    title: title || 'Untitled Project',
    description: description || 'No description available',
    thumbnail: '', // Notion doesn't provide thumbnails in this structure, will use placeholder
    techStack,
    liveUrl: notionProject.properties.project_demo_url.url || undefined,
    githubUrl: notionProject.properties.project_github_url.url || undefined,
    createdAt,
    status: mapNotionStatus(status)
  };
}

function mapNotionStatus(notionStatus: string): Project['status'] {
  switch (notionStatus.toLowerCase()) {
    case 'active':
      return 'Active';
    case 'completed':
      return 'Completed';
    case 'in progress':
      return 'In Progress';
    case 'archived':
      return 'Archived';
    default:
      return 'Active';
  }
}

export class ProjectsNotionService {
  private token: string;
  private baseUrl = 'https://api.notion.com/v1';

  constructor() {
    if (!NOTION_TOKEN) {
      throw new ProjectsNotionError('NOTION_TOKEN environment variable is required');
    }
    if (!PROJECTS_DATABASE_ID) {
      throw new ProjectsNotionError('PROJECTS_DATABASE_ID environment variable is required');
    }
    this.token = NOTION_TOKEN;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        next: { revalidate: 900 }, // 15분 캐싱
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
          'Notion-Version': NOTION_API_VERSION,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ProjectsNotionError(
          `Notion API error: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ProjectsNotionError) {
        throw error;
      }
      throw new ProjectsNotionError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await this.makeRequest<NotionResponse>(`/databases/${PROJECTS_DATABASE_ID}/query`, {
        method: 'POST',
        body: JSON.stringify({}),
      });

      return response.results
        .map(transformNotionProject)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Failed to fetch projects from Notion:', error);
      throw error;
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    const allProjects = await this.getAllProjects();
    // For now, return first 4 projects as featured. In future, can filter by project_featured field
    return allProjects.slice(0, 4);
  }
}

// Singleton instance
let projectsNotionService: ProjectsNotionService | null = null;

export function getProjectsNotionService(): ProjectsNotionService {
  if (!projectsNotionService) {
    projectsNotionService = new ProjectsNotionService();
  }
  return projectsNotionService;
}