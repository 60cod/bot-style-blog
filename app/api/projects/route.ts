import { NextResponse } from 'next/server';
import { getProjectsNotionService } from '@/lib/projects-notion';

export async function GET() {
  try {
    const projectsService = getProjectsNotionService();
    const projects = await projectsService.getAllProjects();
    
    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    });
    
  } catch (error) {
    console.error('Projects API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
        data: []
      },
      { status: 500 }
    );
  }
}

// Enable static generation for this API route
export const dynamic = 'force-dynamic';