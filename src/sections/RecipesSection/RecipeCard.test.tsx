import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

interface MockRecipe {
  id: number;
  name: string;
  image: string;
  description: string;
  time: string;
  protein: string;
  calories: string;
}

const mockRecipe: MockRecipe = {
  id: 1,
  name: 'Test Recipe',
  image: 'test-image.jpg',
  description: 'Test description',
  time: '30 min',
  protein: '25g',
  calories: '350 kcal',
};

const mockProps = {
  recipe: mockRecipe,
  index: 0,
  hoveredCard: null,
  onHoverStart: () => {},
  onHoverEnd: () => {},
  getImageUrl: (img: string) => `/images/${img}`,
};

describe('RecipeCard', () => {
  it('should render recipe information', () => {
    render(<RecipeCard {...mockProps} />);
    
    expect(screen.getByText('Test Recipe')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('25g')).toBeInTheDocument();
    expect(screen.getByText('350 kcal')).toBeInTheDocument();
  });

  it('should render recipe image with correct src', () => {
    render(<RecipeCard {...mockProps} />);
    
    const image = screen.getByAltText('Test Recipe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test-image.jpg');
  });

  it('should call getImageUrl with recipe image', () => {
    const getImageUrl = (img: string): string => {
      expect(img).toBe('test-image.jpg');
      return `/images/${img}`;
    };
    
    render(<RecipeCard {...mockProps} getImageUrl={getImageUrl} />);
  });

  it('should display nutrition stats icons', () => {
    const { container } = render(<RecipeCard {...mockProps} />);
    
    // Check for SVG icons (FaClock, FaDrumstickBite, FaFireAlt)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it('should have proper accessibility', () => {
    render(<RecipeCard {...mockProps} />);
    
    const image = screen.getByAltText('Test Recipe');
    expect(image).toHaveAttribute('alt');
  });
});
