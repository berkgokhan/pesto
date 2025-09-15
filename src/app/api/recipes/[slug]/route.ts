import { NextRequest, NextResponse } from 'next/server';
import { recipeDb } from '@/lib/mock-database';
import { requireAdmin, createUnauthorizedResponse, createForbiddenResponse } from '@/lib/api-auth';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string; }>; }
) {
	try {
		const { slug } = await params;

		// Get recipe by ID from database
		const recipe = await recipeDb.getRecipeById(slug);

		if (!recipe) {
			return NextResponse.json(
				{ success: false, error: 'Recipe not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: recipe
		});
	}
	catch (error) {
		console.error('Error fetching recipe:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch recipe' },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string; }>; }) {
	try {
		// Require admin authentication
		const user = await requireAdmin(request);

		const { slug } = await params;
		const success = await recipeDb.deleteRecipeBySlug(slug);

		return NextResponse.json({
			success: success,
			message: `Recipe deleted by ${user.name || user.email}`
		});
	}
	catch (error) {
		if (error instanceof Error) {
			if (error.message.includes('Authentication')) {
				return createUnauthorizedResponse('Please sign in to delete recipes');
			}
			if (error.message.includes('Admin')) {
				return createForbiddenResponse('Admin access required to delete recipes');
			}
		}

		console.error('Error deleting recipe:', error);
		return NextResponse.json(
			{ success: false, error: 'Failed to delete recipe' },
			{ status: 500 }
		);
	}
}