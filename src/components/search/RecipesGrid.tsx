'use client';

import { useSearch } from '@/contexts/SearchContext';
import RecipeCard from '../RecipeCard';

export default function RecipesGrid() {
  const { recipes, pageSize } = useSearch();

  if (!recipes || recipes.length === 0) {
    return (
      <div className='col-span-full flex flex-col items-center justify-center py-12'>
        <p className='text-lg text-on-surface-variant'>No recipes found</p>
        <p className='text-sm text-on-surface-variant/70'>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      {recipes.map((recipe, index) => {
        if (index >= pageSize) {
          return null;
        }

        return (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            imageSrc={recipe.imageSrc}
            alt={recipe.title}
            title={recipe.title}
            description={recipe.description}
            tags={recipe.tags}
          />
        );
      })}
    </>
  );
}
