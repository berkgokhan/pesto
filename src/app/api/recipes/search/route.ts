import { NextRequest, NextResponse } from 'next/server';
import { recipeDb } from '@/lib/mock-database';

// Search payload interface
interface SearchPayload {
  query?: string;
  sort?: string;
  tags?: string[];
  pageSize?: number;
  page?: number;
}

// POST method for using payload object
export async function POST(request: NextRequest) {
  try {
    const payload: SearchPayload = await request.json();

    const {
      query = '',
      sort = 'featured',
      tags = [],
      pageSize = 6,
      page = 1
    } = payload;

    // Use mock database search
    const result = await recipeDb.searchRecipes({
      query,
      tags,
      sort,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    const totalPages = Math.ceil(result.totalCount / pageSize);

    return NextResponse.json({
      success: true,
      data: {
        recipes: result.recipes,
        totalCount: result.totalCount,
        totalPages,
        currentPage: page
      }
    });
  }
  catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
}

// GET method for using query parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q') || '';
    const sort = searchParams.get('s') || 'featured';
    const tags = ((searchParams.get('t')?.split(',').filter(Boolean)) as string[]) || [];
    const pageSize = parseInt(searchParams.get('m') || '6');
    const page = parseInt(searchParams.get('page') || '1');

    // Use mock database search
    const result = await recipeDb.searchRecipes({
      query,
      tags,
      sort,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    const totalPages = Math.ceil(result.totalCount / pageSize);

    return NextResponse.json({
      success: true,
      data: {
        recipes: result.recipes,
        totalCount: result.totalCount,
        totalPages,
        currentPage: page
      }
    });
  }
  catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search recipes' },
      { status: 500 }
    );
  }
}
