import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/api';
import RecipeContent from '@/components/RecipeContent';

export default async function RecipePage(props: PageProps<'/recipe/[slug]'>) {
  const { slug } = await props.params;

  const recipe = await getRecipeById(slug);

  if (recipe == null) {
    notFound();
  }

  return <RecipeContent recipe={recipe} />;
}
