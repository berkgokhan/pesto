'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteRecipeBySlug } from '@/lib/api';
import { Recipe } from '@/types/recipe';
import { Trash2, AlertCircle } from 'lucide-react';

interface RecipeContentProps {
	recipe: Recipe;
}

export default function RecipeContent({ recipe }: RecipeContentProps) {
	const router = useRouter();
	const { data: session } = useSession();
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDeleteRecipe = async () => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${recipe.title}"? This action cannot be undone.`
		);

		if (!confirmed) return;

		setIsDeleting(true);
		setError(null);

		try {
			await deleteRecipeBySlug(recipe.slug);
			// Redirect to recipes page after successful deletion
			router.push('/recipes');
		}
		catch (err) {
			console.error('Error deleting recipe:', err);
			setError(err instanceof Error ? err.message : 'Failed to delete recipe');
		}
		finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='w-full flex flex-col items-start justify-start gap-8'>
			{/* Recipe Header */}
			<div className='w-full flex flex-col items-start justify-start gap-4'>
				<div className='w-full flex items-center justify-between'>
					<h1 className='text-4xl font-bold text-on-surface'>{recipe.title}</h1>
					{session?.user?.role === 'admin' && (
						<button
							onClick={handleDeleteRecipe}
							disabled={isDeleting}
							className='flex items-center gap-2 px-4 py-2 bg-error-container text-on-error-container rounded-lg hover:bg-error-container/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							<Trash2 className='size-4' />
							{isDeleting ? 'Deleting...' : 'Delete Recipe'}
						</button>
					)}
				</div>
				<p className='text-on-surface-variant text-lg'>{recipe.description}</p>
			</div>

			{/* Error Message */}
			{error && (
				<div className='w-full p-4 bg-error-container text-on-error-container rounded-lg border border-error/20 flex items-center gap-2'>
					<AlertCircle className='size-5' />
					{error}
				</div>
			)}

			{/* Recipe Image */}
			{recipe.imageSrc && (
				<div className='w-full'>
					<img
						src={recipe.imageSrc}
						alt={recipe.title}
						className='w-full h-64 object-cover rounded-2xl'
					/>
				</div>
			)}

			{/* Recipe Tags */}
			{recipe.tags && recipe.tags.length > 0 && (
				<div className='w-full flex flex-col items-start justify-start gap-2'>
					<h2 className='text-xl font-semibold text-on-surface'>Tags</h2>
					<div className='flex flex-wrap gap-2'>
						{recipe.tags.map((tag, index) => (
							<span
								key={index}
								className='px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-sm'
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			)}

			{/* Recipe Metadata */}
			<div className='w-full p-4 bg-surface-container rounded-lg border border-outline/20'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
					<div>
						<span className='text-on-surface-variant'>Recipe ID:</span>
						<span className='ml-2 text-on-surface'>{recipe.id}</span>
					</div>
					<div>
						<span className='text-on-surface-variant'>Slug:</span>
						<span className='ml-2 text-on-surface'>{recipe.slug}</span>
					</div>
					{recipe.createdAt && (
						<div>
							<span className='text-on-surface-variant'>Created:</span>
							<span className='ml-2 text-on-surface'>{new Date(recipe.createdAt).toLocaleDateString()}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
