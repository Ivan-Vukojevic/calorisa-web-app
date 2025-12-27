import { memo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Drumstick, Flame } from 'lucide-react';

interface Recipe {
  id: string | number;
  name: string;
  image: string;
  description?: string;
  time?: string;
  protein?: string;
  calories?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  hoveredCard: string | number | null;
  onHoverStart: (id: string | number) => void;
  onHoverEnd: (id: null) => void;
  getImageUrl: (imageName: string) => string;
}

const RecipeCard = memo<RecipeCardProps>(({ 
  recipe, 
  index, 
  hoveredCard, 
  onHoverStart, 
  onHoverEnd, 
  getImageUrl 
}) => {
  return (
    <motion.div 
      className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-shadow duration-300" 
      key={recipe.id}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.12,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => onHoverStart(recipe.id)}
      onHoverEnd={() => onHoverEnd(null)}
    >
      {/* Image Container with fixed aspect ratio */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <motion.img 
          src={getImageUrl(recipe.image)} 
          alt={recipe.name} 
          className="w-full h-full object-cover"
          animate={{ 
            scale: hoveredCard === recipe.id ? 1.08 : 1 
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Enhanced Hover Overlay with gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[var(--brand)]/85 via-[var(--brand)]/20 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredCard === recipe.id ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content Area with better padding */}
      <div className="flex flex-col flex-grow p-6">
        {/* Recipe Title with improved typography */}
        <motion.h3 
          className="text-xl font-bold text-[var(--brand)] mb-3 leading-tight text-center"
          animate={{ 
            color: hoveredCard === recipe.id ? "var(--brand)" : "var(--brand)"
          }}
          transition={{ duration: 0.3 }}
        >
          {recipe.name}
        </motion.h3>
        
        {/* Description with better readability */}
        <p className="text-[0.95rem] text-[#4f4f4f] leading-relaxed mb-5 text-center flex-grow">
          {recipe.description}
        </p>
        
        {/* Stats with badge-style layout */}
        <motion.div 
          className="grid grid-cols-3 gap-3 mt-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: index * 0.12 + 0.3
              }
            }
          }}
        >
          <motion.div 
            className="flex flex-col items-center bg-[#f7f0ec] rounded-xl p-3 hover:bg-[#f7f0ec] transition-colors duration-300"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Clock className="text-[1.75rem] text-[var(--brand)] mb-1.5" /> 
            <span className="text-xs font-semibold text-[var(--brand)]">{recipe.time}</span>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center bg-[var(--cream)] rounded-xl p-3 hover:bg-[var(--cream)] transition-colors duration-300"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Drumstick className="text-[1.75rem] text-[var(--brand)] mb-1.5" /> 
            <span className="text-xs font-semibold text-[var(--brand)]">{recipe.protein}</span>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center bg-[var(--cream)] rounded-xl p-3 hover:bg-[var(--cream)] transition-colors duration-300"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <Flame className="text-[1.75rem] text-[var(--brand)] mb-1.5" /> 
            <span className="text-xs font-semibold text-[var(--brand)]">{recipe.calories}</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

RecipeCard.displayName = 'RecipeCard';

export default RecipeCard;
