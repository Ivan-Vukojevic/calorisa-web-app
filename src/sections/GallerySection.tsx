import { useMemo } from 'react';
import img1 from '../assets/images/calorisa-gallery-osijek-trener-transformacije.jpg';
import img2 from '../assets/images/calorisa-gallery-osijek-reformer-studio-02.jpg';
import img3 from '../assets/images/calorisa-gallery-osijek-hormonalna-ravnoteza.jpg';
import img4 from '../assets/images/calorisa-gallery-osijek-fitness-savjetnik.jpg';
import img5 from '../assets/images/calorisa-gallery-osijek-functional-coach.jpg';

interface GalleryPost {
  id: number;
  jpg: string;
  alt: string;
}

/**
 * Instagram-style gallery section displaying studio images
 */
function GallerySection(): JSX.Element {
  const posts = useMemo<GalleryPost[]>(() => [
    { id: 1, jpg: img1, alt: 'Transformation training — personalized fitness coaching' },
    { id: 2, jpg: img2, alt: 'Calorisa Pilates Reformer studio, Osijek' },
    { id: 3, jpg: img3, alt: 'Hormonal balance nutrition coaching' },
    { id: 4, jpg: img4, alt: 'Fitness consultation at Calorisa — personalized training plans' },
    { id: 5, jpg: img5, alt: 'Functional fitness coaching at Calorisa studio' }
  ], []);

  return (
    <div className="w-full bg-[#f7f0ec] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 w-full">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="relative aspect-square overflow-hidden"
          >
            {/* eslint-disable-next-line react/forbid-dom-props */}
            <img
              src={post.jpg}
              alt={post.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GallerySection;
