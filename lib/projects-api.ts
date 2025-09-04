import { Project } from '@/types/projects';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PROJECTS_DATABASE_ID = '263e8f191da280639110dc9290c63f26';

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

export async function getAllProjects(): Promise<Project[]> {
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not configured');
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${PROJECTS_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      }
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    const data: NotionResponse = await response.json();
    
    return data.results
      .map(transformNotionProject)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by date, newest first
      
  } catch (error) {
    console.error('Failed to fetch projects from Notion:', error);
    throw error;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  // For now, return first 4 projects as featured. In future, can filter by project_featured field
  return allProjects.slice(0, 4);
}