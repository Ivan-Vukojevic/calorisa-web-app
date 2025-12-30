import { useMemo } from 'react';
import img1jpg from '../assets/images/calorisa-gallery-osijek-reformer-studio-01.jpg';
import img2jpg from '../assets/images/calorisa-gallery-osijek-trener-transformacije.jpg';
import img3jpg from '../assets/images/calorisa-gallery-osijek-reformer-studio-02.jpg';
import img4jpg from '../assets/images/calorisa-gallery-osijek-hormonalna-ravnoteza.jpg';
import img5jpg from '../assets/images/calorisa-gallery-osijek-reformer-studio-03.jpg';
import img6jpg from '../assets/images/calorisa-gallery-osijek-cjelovito-zdravlje.jpg';
import img7jpg from '../assets/images/calorisa-gallery-osijek-fitness-savjetnik.jpg';
import img8jpg from '../assets/images/calorisa-gallery-osijek-functional-coach.jpg';
import img9jpg from '../assets/images/calorisa-gallery-osijek-reformer-studio-04.jpg';
import img10jpg from '../assets/images/calorisa-gallery-osijek-healthy-eating.jpg';

interface GalleryPost {
  id: number;
  jpg: string;
  alt: string;
  zoom: number;
  focalPoint: string;
  zoomMobile?: number;
}

/**
 * Instagram-style gallery section displaying studio images
 */
function GallerySection(): JSX.Element {
  const posts = useMemo<GalleryPost[]>(() => [
    { id: 1, jpg: img1jpg, alt: 'Calorisa Pilates Reformer studio, Osijek', zoom: 1.15, focalPoint: 'top' },
    { id: 2, jpg: img2jpg, alt: 'Transformation training — personalized fitness coaching', zoom: 1.15, focalPoint: 'center' },
    { id: 3, jpg: img3jpg, alt: 'Calorisa Pilates Reformer studio, Osijek', zoom: 1.4, focalPoint: 'top' },
    { id: 4, jpg: img4jpg, alt: 'Hormonal balance nutrition coaching', zoom: 1.15, focalPoint: 'center' },
    { id: 5, jpg: img5jpg, alt: 'Calorisa Pilates Reformer studio, Osijek', zoom: 1.15, focalPoint: 'center 40%' },
    { id: 6, jpg: img6jpg, alt: 'Holistic health and wellness coaching', zoom: 1.15, focalPoint: 'bottom' },
    { id: 7, jpg: img7jpg, alt: 'Fitness consultation at Calorisa — personalized training plans', zoom: 1.15, focalPoint: 'center' },
    { id: 8, jpg: img8jpg, alt: 'Functional fitness coaching at Calorisa studio', zoom: 1.3, focalPoint: 'top' },
    { id: 9, jpg: img9jpg, alt: 'Calorisa Pilates Reformer studio, Osijek', zoom: 1.15, focalPoint: 'center' },
    { id: 10, jpg: img10jpg, alt: 'Healthy eating habits and meal planning guidance', zoom: 1.15, focalPoint: 'center' }
  ], []);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
      {posts.map(post => (
        <div 
          key={post.id} 
          className={`${
            post.id === 7 
              ? 'h-[300px] md:h-[200px]' 
              : 'h-[200px]'
          } w-full overflow-hidden`}
        >
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <img
            src={post.jpg}
            alt={post.alt}
            className="w-full h-full object-cover transform transition-transform duration-300 will-change-transform"
            style={{ 
              transform: `scale(${isMobile && post.zoomMobile ? post.zoomMobile : post.zoom})`, 
              objectPosition: post.focalPoint 
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

export default GallerySection;
