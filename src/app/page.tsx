import HeroSection from '@/components/sections/HeroSection';
import PopularRecipes from '@/components/PopularRecipes';
import { getFeaturedRecipes } from '@/lib/api';

export default async function Home() {

  const featuredRecipes = await getFeaturedRecipes();

  return (
    <>
      <HeroSection />
      <PopularRecipes recipes={featuredRecipes} />
    </>
  );
}
