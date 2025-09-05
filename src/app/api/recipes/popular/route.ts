import { NextRequest, NextResponse } from 'next/server';
import { recipeDb } from '@/lib/mock-database';
import { Recipe } from '@/types/recipe';
import { requireAdmin, createUnauthorizedResponse, createForbiddenResponse } from '@/lib/api-auth';

export async function GET() {
  try {
    // Get popular/featured recipes from database
    const popularRecipes = await recipeDb.getFeaturedRecipes(10);

    return NextResponse.json({
      success: true,
      data: popularRecipes
    });
  }
  catch (error) {
    console.error('Error fetching popular recipes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch popular recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const user = await requireAdmin(request);

    const payload: Pick<Recipe, 'slug'> = await request.json();
    const featuredRecipe = await recipeDb.insertFeaturedRecipe(payload);
    const success = Boolean(featuredRecipe);

    return NextResponse.json({
      success: success,
      data: featuredRecipe,
      message: `Featured recipe added by ${user.name || user.email}`
    });
  }
  catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Authentication')) {
        return createUnauthorizedResponse('Please sign in to manage featured recipes');
      }
      if (error.message.includes('Admin')) {
        return createForbiddenResponse('Admin access required to manage featured recipes');
      }
    }

    console.error('Error inserting featured recipe:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to insert featured recipe' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Require admin authentication
    const user = await requireAdmin(request);

    const payload: Pick<Recipe, 'slug'> = await request.json();
    const success = await recipeDb.removeFeaturedRecipe(payload);

    return NextResponse.json({
      success: success,
      message: `Featured recipe removed by ${user.name || user.email}`
    });
  }
  catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Authentication')) {
        return createUnauthorizedResponse('Please sign in to manage featured recipes');
      }
      if (error.message.includes('Admin')) {
        return createForbiddenResponse('Admin access required to manage featured recipes');
      }
    }

    console.error('Error removing featured recipe:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove featured recipe' },
      { status: 500 }
    );
  }
}
