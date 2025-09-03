import { NextResponse } from 'next/server';
import { getNotionService } from '@/lib/notion';

export async function GET() {
  try {
    const notionService = getNotionService();
    const articlesByCategory = await notionService.getArticlesByCategory();
    
    return NextResponse.json({
      success: true,
      data: articlesByCategory,
    });
  } catch (error) {
    console.error('API Error - Failed to fetch articles by category:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch articles by category',
      },
      { status: 500 }
    );
  }
}