// Vite: import all images in assets/images
const images = import.meta.glob('../../../assets/images/*', { eager: true, query: '?url', import: 'default' });

// Helper to get image URL from Vite's import.meta.glob
export const getImageUrl = (filename: string): string => {
  const match = Object.entries(images).find(([key]) => key.endsWith(`/${filename}`));
  return match ? match[1] as string : '';
};
