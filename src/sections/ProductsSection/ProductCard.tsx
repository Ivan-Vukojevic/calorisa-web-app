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

const isPilatesCard = (title: string): boolean =>
  /pilates|reformer|trening u paru|pair training|in pairs/i.test(title);

const NOTE_PRICE_CLASS = 'text-xl font-bold text-[var(--brand)]';

const formatPilatesNote = (note: string): React.ReactNode => {
  const match = note.match(/^(.*?)(:\s*)(\d+(?:[.,]\d{1,2})?\s*€)(\s*\(.*\))?$/);

  if (!match) {
    return note;
  }

  const [, label, separator, priceText, suffix = ''] = match;

  return (
    <>
      {label}
      {separator}
      <span className={NOTE_PRICE_CLASS}>{priceText}</span>
      {suffix ? <span className="text-xs text-gray-500 leading-snug">{suffix}</span> : null}
    </>
  );
};

export const ProductCard = memo<ProductCardProps>(({ card, index }) => {
  const { t } = useTranslation();
  const { price = '0.00', anchorPrice = '0.00' } = card.cijene ?? {};
  const hasSveCijene = Array.isArray(card.sveCijene) && card.sveCijene.length > 0;
  const shouldHideBottomPrice = isPilatesCard(card.title);

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
      {hasSveCijene ? (
        <motion.div
          className="mb-6 space-y-4"
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
          {card.sveCijene?.map((stavka) => {
            const cleanedName = stavka.name.replace('Reformer Pilates - ', '');

            return (
              <motion.div
                key={stavka.name}
                className="border-b border-gray-200 pb-3 last:border-b-0"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <div className="flex items-start justify-between gap-4 text-base text-[#4f4f4f] mb-2">
                  <p className="flex-1">{cleanedName}</p>
                  <div className="flex items-baseline gap-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900">{`${stavka.price} €`}</p>
                    <p className="text-xs text-gray-500 leading-snug">{`(10.9.2026.: ${stavka.anchorPrice} €)`}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <>
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
                <span className="flex-1">
                  {isPilatesCard(card.title) && typeof note === 'string' && note.includes('€')
                    ? formatPilatesNote(note)
                    : getNoteText(note, t)}
                </span>
              </motion.li>
            ))}
          </motion.ul>
          {!isPilatesCard(card.title) && (
            <motion.div
              className="self-start mt-auto mb-4 text-left"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.15 + 0.55 }}
            >
              <div className="flex items-baseline gap-4">
                <p className="text-xl font-bold text-[var(--brand)] leading-tight">
                  {`Cijena: ${price} €`}
                </p>
                <p className="text-xs text-gray-500 leading-snug">
                  {`(10.9.2026.: ${anchorPrice} €)`}
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
      <motion.a 
        href="#contact-section" 
        className="self-start py-3 px-8 text-base font-semibold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] border-none rounded-full cursor-pointer no-underline shadow-md"
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
  const { price = '0.00', anchorPrice = '0.00' } = card.cijene ?? {};
  const hasSveCijene = Array.isArray(card.sveCijene) && card.sveCijene.length > 0;
  const shouldHideBottomPrice = isPilatesCard(card.title);

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
      <p className="text-base text-[#4f4f4f] mb-6 leading-relaxed text-center">
        {card.description}
      </p>
      {hasSveCijene ? (
        <div className="mb-6 space-y-3 text-left">
          {card.sveCijene?.map((stavka) => {
            const cleanedName = stavka.name.replace('Reformer Pilates - ', '');

            return (
              <div key={stavka.name} className="border-b border-gray-200 pb-3 last:border-b-0">
                <div className="flex items-start justify-between gap-3 text-sm text-[#4f4f4f] mb-2">
                  <p className="flex-1">{cleanedName}</p>
                  <div className="flex items-baseline gap-2 whitespace-nowrap">
                    <p className="font-bold text-gray-900">{`${stavka.price} €`}</p>
                    <p className="text-xs text-gray-500 leading-snug">{`(10.9.2026.: ${stavka.anchorPrice} €)`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <ul className="list-none pl-0 m-0 mb-6 text-[#4f4f4f] text-sm leading-normal space-y-3">
            {(card.notes || []).map((note, noteIndex) => {
              const IconComponent = getIconForNote(note);
              return (
                <li key={`note-${noteIndex}`} className="flex items-start gap-3">
                  <Icon 
                    Component={IconComponent} 
                    className="w-5 h-5 text-[var(--brand)] mt-0.5 flex-shrink-0"
                  />
                  <span className="flex-1">
                    {isPilatesCard(card.title) && typeof note === 'string' && note.includes('€')
                      ? formatPilatesNote(note)
                      : getNoteText(note, t)}
                  </span>
                </li>
              );
            })}
          </ul>
          {!isPilatesCard(card.title) && (
            <div className="self-start mt-auto mb-4 text-left">
              <div className="flex items-baseline gap-3">
                <p className="text-lg font-bold text-[var(--brand)] leading-tight">
                  {`Cijena: ${price} €`}
                </p>
                <p className="text-xs text-gray-500 leading-snug">
                  {`(10.9.2026.: ${anchorPrice} €)`}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      <a 
        href="#contact-section" 
        className="self-center py-3 px-8 text-base font-semibold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark)] border-none rounded-full cursor-pointer no-underline shadow-md"
      >
        {card.button}
      </a>
    </motion.div>
  );
}
