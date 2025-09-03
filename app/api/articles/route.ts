import { NextResponse } from 'next/server';
import { getNotionService } from '@/lib/notion';

export async function GET() {
  try {
    const notionService = getNotionService();
    const articles = await notionService.getArticles();
    
    return NextResponse.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error('API Error - Failed to fetch articles:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch articles',
      },
      { status: 500 }
    );
  }
}