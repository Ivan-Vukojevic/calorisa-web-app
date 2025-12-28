import { useTranslation } from 'react-i18next';
import RecipesTitle from './RecipesTitle';
import RecipesCarousel from './RecipesCarousel';
import RecipesGrid from './RecipesGrid';
import { getImageUrl } from './utils/imageHelpers';

interface Recipe {
  id: string | number;
  name: string;
  image: string;
  description?: string;
  time?: string;
  protein?: string;
  calories?: string;
}

function RecipesSection(): JSX.Element {
  const { t } = useTranslation();

  // Fetch recipes data from i18n and ensure it's an array
  const rawRecipes = t('main.recipes.recipesData', { returnObjects: true });
  const recipesData: Recipe[] = Array.isArray(rawRecipes) ? rawRecipes : [];

  return (
    <section className="flex flex-col items-center justify-center px-[20px] py-[40px] md:py-[60px] lg:py-[80px] text-center min-h-screen w-full box-border bg-[var(--brand)]">
      <RecipesTitle />
      <RecipesCarousel recipesData={recipesData} getImageUrl={getImageUrl} />
      <RecipesGrid recipesData={recipesData} getImageUrl={getImageUrl} />
    </section>
  );
}

export default RecipesSection;
