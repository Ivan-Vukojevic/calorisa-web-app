import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { ensurePdfFontsLoaded } from '../../lib/pdfFonts';
import { useProductData } from './useProductData';
import { ProductTabButtons, ProductTabButtonsMobile } from './ProductTabButtons';
import { ProductCard as ProductCardComponent, ProductCardMobile } from './ProductCard';

interface UslugaItem {
  naziv: string;
  trenutnaCijena: string;
  cijenaNaDatum: string;
}

function ProductsSection(): JSX.Element {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('nutrition');
  const [usluge, setUsluge] = useState<UslugaItem[]>([]);
  const [rawUsluge, setRawUsluge] = useState<Record<string, unknown>[]>([]);
  const { getCurrentCards } = useProductData();

  useEffect(() => {
    const controller = new AbortController();

    const dohvatiUsluge = async (): Promise<void> => {
      try {
        const response = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL + '?format=json', {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Neuspjelo dohvaćanje usluga. Status: ${response.status}`);
        }

        const data: unknown = await response.json();
        const rawList = Array.isArray(data)
          ? data
          : Array.isArray((data as { usluge?: unknown[] }).usluge)
            ? (data as { usluge: unknown[] }).usluge
            : Array.isArray((data as { data?: unknown[] }).data)
              ? (data as { data: unknown[] }).data
              : [];

        const rawRecords = rawList.filter(
          (item): item is Record<string, unknown> => typeof item === 'object' && item !== null
        );
        setRawUsluge(rawRecords);

        const normalized = rawRecords.map((zapis): UslugaItem => {
          const naziv = String(zapis.naziv ?? zapis.name ?? '').trim();
          const trenutna = String(
            zapis.trenutnaCijena ?? zapis.price ?? zapis.currentPrice ?? ''
          ).trim();
          const datumCijena = String(
            zapis.cijenaNaDatum ?? zapis.anchorPrice ?? zapis.oldPrice ?? ''
          ).trim();

          return {
            naziv,
            trenutnaCijena: trenutna,
            cijenaNaDatum: datumCijena
          };
        }).filter((item) => item.naziv.length > 0);

        setUsluge(normalized);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setRawUsluge([]);
          setUsluge([]);
        }
      }
    };

    void dohvatiUsluge();

    return () => {
      controller.abort();
    };
  }, []);

  const generirajPdf = async (): Promise<void> => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const datum = new Date().toLocaleDateString('hr-HR');

    await ensurePdfFontsLoaded(doc);
    const pdfFont = 'NotoSans';

    const procitajPrviString = (zapis: Record<string, unknown>, kljucevi: string[]): string => {
      for (const kljuc of kljucevi) {
        const vrijednost = zapis[kljuc];
        if (vrijednost === undefined || vrijednost === null) {
          continue;
        }
        const tekst = String(vrijednost).trim();
        if (tekst.length > 0 && tekst.toLowerCase() !== 'undefined' && tekst.toLowerCase() !== 'null') {
          return tekst;
        }
      }
      return '';
    };

    console.group('[ProductsSection] PDF source diagnostics');
    console.log('Raw API records:', rawUsluge);
    console.log('Normalized services:', usluge);
    console.groupEnd();

    const rowsForPdf = (rawUsluge.length > 0 ? rawUsluge : usluge.map((item) => ({
      naziv: item.naziv,
      trenutnaCijena: item.trenutnaCijena,
      cijenaNaDatum: item.cijenaNaDatum
    }))).map((zapis, index) => {
      const fallback = usluge[index];

      const naziv = procitajPrviString(zapis, ['naziv', 'name', 'service', 'usluga', 'title'])
        || fallback?.naziv
        || 'N/A';
      const trenutna = procitajPrviString(zapis, [
        'trenutnaCijena',
        'price',
        'currentPrice',
        'cijena',
        'iznos'
      ]) || fallback?.trenutnaCijena || '-';
      const anchor = procitajPrviString(zapis, [
        'cijenaNaDatum',
        'anchorPrice',
        'oldPrice',
        'referencePrice',
        'cijena1092026'
      ]) || fallback?.cijenaNaDatum || '-';

      return { naziv, trenutna, anchor };
    });

    doc.setFont(pdfFont, 'bold');
    doc.setFontSize(18);
    doc.setTextColor(17, 24, 39);
    doc.text('CALORISA - CJENIK USLUGA', 14, 20);

    doc.setFont(pdfFont, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text(`Datum generiranja: ${datum}`, 14, 26);
    doc.text('Usklađeno s obvezom dvojnih cijena prema Zakonu o zaštiti potrošača.', 14, 31);

    doc.setDrawColor(156, 163, 175);
    doc.setLineWidth(0.2);
    doc.line(14, 35, 196, 35);
    doc.line(14, 43, 196, 43);

    doc.setFont(pdfFont, 'bold');
    doc.setFontSize(10);
    doc.setTextColor(31, 41, 55);
    doc.text('Naziv usluge', 16, 40);
    doc.text('Cijena', 140, 40);
    doc.text('Cijena na 10.9.2026.', 165, 40);

    let currentY = 49;

    rowsForPdf.forEach((item) => {
      if (currentY > 280) {
        doc.addPage();
        currentY = 20;
      }

      const serviceName = item.naziv.length > 60 ? `${item.naziv.slice(0, 60)}...` : item.naziv;

      doc.setFont(pdfFont, 'normal');
      doc.setFontSize(10);
      doc.setTextColor(31, 41, 55);
      doc.text(serviceName, 16, currentY);

      doc.setFont(pdfFont, 'bold');
      doc.setTextColor(31, 41, 55);
      doc.text(`${item.trenutna} €`, 140, currentY);

      doc.setFont(pdfFont, 'normal');
      doc.setTextColor(107, 114, 128);
      doc.text(`${item.anchor} €`, 165, currentY);

      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.1);
      doc.line(14, currentY + 3, 196, currentY + 3);

      currentY += 8;
    });

    doc.save('cjenik-usluga-calorisa.pdf');
  };

  const cardsForTab = getCurrentCards(activeTab);
  const currentCards = Array.isArray(cardsForTab) ? cardsForTab : [];

  return (
    <section className="w-full box-border bg-gradient-to-b from-[var(--cream)] to-[var(--cream-light)] relative overflow-hidden pb-28">
      
      {/* Desktop Version */}
      <div className="hidden md:block w-full min-h-screen relative">
        <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-display-responsive text-[var(--brand)] text-center mb-8"
          >
            {t('main.products.heading', 'Our Services')}
          </motion.h2>

          <ProductTabButtons activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              className={`flex flex-wrap justify-center items-stretch gap-10 w-full max-w-[1400px] ${
                currentCards.length === 3 ? 'gap-x-10 gap-y-8' : ''
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentCards.length > 0 ? (
                currentCards.map((card, index) => (
                  <div 
                    key={`product-wrapper-${card.title}-${index}`}
                    className={`flex ${currentCards.length === 3 && index === 2 ? 'lg:basis-full lg:max-w-[520px] justify-center' : ''}`}
                  >
                    <ProductCardComponent card={card} index={index} />
                  </div>
                ))
              ) : (
                <p className="text-white">No products available at the moment.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden flex flex-col px-5 py-5">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-display-responsive text-[var(--brand)] whitespace-normal px-0 md:px-3 mb-4 md:mb-8 lg:mb-12 text-center"
        >
          {t('main.products.heading', 'Our Services')}
        </motion.h2>

        <ProductTabButtonsMobile activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className="flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentCards.length > 0 ? (
              currentCards.map((card, index) => (
                <ProductCardMobile key={`mobile-${card.title}-${index}`} card={card} index={index} />
              ))
            ) : (
              <p className="text-[var(--brand)] text-center">No products available at the moment.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5">
        <div className="w-full md:w-auto max-w-sm mx-auto flex flex-col gap-3 mt-10 mb-6">
          <button
            type="button"
            onClick={generirajPdf}
            className="w-full flex justify-center items-center gap-2 bg-[var(--brand)] text-[var(--cream)] px-5 py-2.5 rounded-xl font-medium shadow-sm hover:opacity-90 transition duration-200 cursor-pointer text-sm md:text-base"
          >
            {t('main.products.downloadPdf', '📄 Cjenik usluga (PDF)')}
          </button>

        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
