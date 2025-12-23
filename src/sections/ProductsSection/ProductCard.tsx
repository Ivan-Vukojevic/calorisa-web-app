import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon';
import { getIconForNote } from './utils/getIconForNote.js';
import { getNoteText } from './utils/getNoteText.js';
import type { ProductCard as Card } from './useProductData';

interface ProductCardProps {
  card: Card;
  index: number;
}

export const ProductCard = memo<ProductCardProps>(({ card, index }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      key={`product-${card.title}-${index}`}
      className="flex flex-col justify-between bg-white backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-8 w-[520px] h-full text-left transition-all duration-300" 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
    >
      <motion.h3 
        className="text-3xl font-heading font-bold text-[var(--brand)] mb-4 leading-tight tracking-wide text-left uppercase"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
      >
        {card.title}
      </motion.h3>
      <motion.p 
        className="text-lg text-[#4f4f4f] mb-6 leading-relaxed text-justify"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      >
        {card.description}
      </motion.p>
      <motion.ul 
        className="list-none pl-0 m-0 mb-6 text-[#4f4f4f] text-lg leading-normal space-y-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: index * 0.15 + 0.4
            }
          }
        }}
      >
        {(card.notes || []).map((note, noteIndex) => (
          <motion.li 
            key={`note-${noteIndex}`} 
            className="flex items-start gap-4"
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <Icon 
              Component={getIconForNote(note)} 
              className="w-7 h-7 text-[var(--brand)] mt-0.5 flex-shrink-0"
            />
            <span className="flex-1">{getNoteText(note, t)}</span>
          </motion.li>
        ))}
      </motion.ul>
      <motion.a 
        href="#contact-section" 
        className="self-start mt-auto py-3 px-8 text-base font-semibold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] border-none rounded-full cursor-pointer no-underline shadow-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.6 }}
      >
        {card.button}
      </motion.a>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

interface ProductCardMobileProps {
  card: Card;
  index: number;
}

export function ProductCardMobile({ card, index }: ProductCardMobileProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="flex flex-col justify-between bg-white backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-8 w-full max-w-[420px] text-left mx-auto" 
      key={`product-mobile-${card.title}-${index}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <h3 className="text-3xl font-heading font-bold text-[var(--brand)] mb-4 leading-tight text-center uppercase">
        {card.title}
      </h3>
      <p className="text-lg text-[#4f4f4f] mb-6 leading-relaxed text-center">
        {card.description}
      </p>
      <ul className="list-none pl-0 m-0 mb-6 text-[#4f4f4f] text-lg leading-normal space-y-5">
        {(card.notes || []).map((note, noteIndex) => {
          const IconComponent = getIconForNote(note);
          return (
            <li key={`note-${noteIndex}`} className="flex items-start gap-4">
              <Icon 
                Component={IconComponent} 
                className="w-7 h-7 text-[var(--brand)] mt-0.5 flex-shrink-0"
              />
              <span className="flex-1">{getNoteText(note, t)}</span>
            </li>
          );
        })}
      </ul>
      <a 
        href="#contact-section" 
        className="self-center mt-auto py-3 px-8 text-base font-semibold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] border-none rounded-full cursor-pointer no-underline shadow-md"
      >
        {card.button}
      </a>
    </motion.div>
  );
}
