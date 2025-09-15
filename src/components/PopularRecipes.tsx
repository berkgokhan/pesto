'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { getFeaturedRecipes } from '@/lib/api';
import { ChevronRight } from "lucide-react";

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const featuredRecipes = await getFeaturedRecipes();
        setRecipes(featuredRecipes);
      } catch (error) {
        console.error('Error fetching featured recipes:', error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const firstRecipe = recipes[0];
  const otherRecipes = recipes.slice(1, 5);

  if (isLoading) {
    return (
      <div className='w-full flex flex-col items-start justify-start gap-8'>
        <h2 className='text-3xl font-display font-bold text-primary'>Popular Recipes</h2>
        <div className='w-full flex items-center justify-center py-8'>
          <div className='text-on-surface-variant'>Loading recipes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-start justify-start gap-8'>
      <h2 className='text-3xl font-display font-bold text-primary'>Popular Recipes</h2>

      {/* Main featured recipe */}
      {firstRecipe && (
        <RecipeCard
          id={firstRecipe.id}
          imageSrc={firstRecipe.imageSrc}
          alt={firstRecipe.title}
          title={firstRecipe.title}
          description={firstRecipe.description}
          tags={firstRecipe.tags}
        />
      )}

      {/* Two smaller recipe cards */}
      {otherRecipes.length > 0 && (
        <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-8'>
          {otherRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              imageSrc={recipe.imageSrc}
              alt={recipe.title}
              title={recipe.title}
              description={recipe.description}
              tags={recipe.tags}
            />
          ))}
        </div>
      )}
      <div className='w-full flex flex-row items-center justify-start gap-8'>
        <Link
          href='/recipes'
          className='flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl hover:bg-primary/80 transition-colors font-medium'
        >
          View All Recipes
          <ChevronRight className='size-[1.25em] text-on-primary hover:text-on-primary/80 transition-colors' />
        </Link>
      </div>
    </div>
  );
}
