import Link from 'next/link';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types/recipe';
import { ChevronRight, MoveRightIcon } from "lucide-react";

export default function PopularRecipes({ recipes }: { recipes: Recipe[]; }) {

  const firstRecipe = recipes[0];
  const otherRecipes = recipes.slice(1, 5);

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
