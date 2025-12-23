import { useState } from 'react';
import RecipeCard from './RecipeCard';

interface Recipe {
  id: string | number;
  name: string;
  image: string;
  description?: string;
  time?: string;
  protein?: string;
  calories?: string;
}

interface RecipesGridProps {
  recipesData: Recipe[];
  getImageUrl: (imageName: string) => string;
}

function RecipesGrid({ recipesData, getImageUrl }: RecipesGridProps): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);

  return (
    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
      {recipesData.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          index={index}
          hoveredCard={hoveredCard}
          onHoverStart={setHoveredCard}
          onHoverEnd={setHoveredCard}
          getImageUrl={getImageUrl}
        />
      ))}
    </div>
  );
}

export default RecipesGrid;
