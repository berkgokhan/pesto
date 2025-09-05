import { Recipe } from '@/types/recipe';

// Base URL configuration
const BASE_URL = process.env.BASE_URL || '';

export interface SearchParams {
	query?: string;
	sort?: string;
	tags?: string[];
	pageSize?: number;
	page?: number;
}

export interface SearchResult {
	recipes: Recipe[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
}

export async function getFeaturedRecipes(): Promise<Recipe[]> {
	try {
		const response = await fetch(`${BASE_URL}/api/recipes/popular`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || 'Failed to fetch featured recipes');
		}

		return result.data;
	}
	catch (error) {
		console.error('Error fetching featured recipes:', error);
		throw error;
	}
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
	try {
		const response = await fetch(`${BASE_URL}/api/recipes/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || 'Failed to fetch recipe');
		}

		return result.data;
	}
	catch (error) {
		console.error('Error fetching recipe:', error);
		return null;
	}
}

export async function getRecipesWithFilters(params: SearchParams): Promise<SearchResult> {
	try {
		const response = await fetch(`${BASE_URL}/api/recipes/search`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: params.query || '',
				sort: params.sort || 'featured',
				tags: params.tags || [],
				pageSize: params.pageSize || 6,
				page: params.page || 1
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.error || 'Search failed');
		}

		return {
			recipes: result.data.recipes,
			totalCount: result.data.totalCount,
			totalPages: result.data.totalPages,
			currentPage: result.data.currentPage
		};
	}
	catch (error) {
		console.error('Error fetching recipes with filters:', error);
		throw error;
	}

}

export async function deleteRecipeBySlug(slug: string): Promise<void> {
	try {
		const response = await fetch(`${BASE_URL}/api/recipes/${slug}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug })
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Please sign in to delete recipes');
			}
			if (response.status === 403) {
				throw new Error('Admin access required to delete recipes');
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		if (!result.success) {
			throw new Error(result.error || 'Failed to delete recipe');
		}
	}
	catch (error) {
		console.error('Error deleting recipe:', error);
		throw error;
	}
}

export async function addFeaturedRecipe(slug: string): Promise<Recipe> {
	try {
		const response = await fetch(`${BASE_URL}/api/recipes/popular`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug })
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Please sign in to manage featured recipes');
			}
			if (response.status === 403) {
				throw new Error('Admin access required to manage featured recipes');
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		if (!result.success) {
			throw new Error(result.error || 'Failed to add featured recipe');
		}

		return result.data;
	}
	catch (error) {
		console.error('Error adding featured recipe:', error);
		throw error;
	}
}

export async function removeFeaturedRecipe(slug: string): Promise<void> {
	try {
		const response = await fetch(`${BASE_URL}/api/recipes/popular`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug })
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Please sign in to manage featured recipes');
			}
			if (response.status === 403) {
				throw new Error('Admin access required to manage featured recipes');
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		if (!result.success) {
			throw new Error(result.error || 'Failed to remove featured recipe');
		}
	}
	catch (error) {
		console.error('Error removing featured recipe:', error);
		throw error;
	}
}