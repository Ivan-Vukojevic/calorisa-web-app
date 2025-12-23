import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

/**
 * Frequently Asked Questions page component
 */
function FAQ(): JSX.Element {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqCategories: FAQCategory[] = [
    {
      category: t('faq.general.category', 'General Information'),
      questions: [
        {
          question: t('faq.general.q1.question'),
          answer: t('faq.general.q1.answer')
        },
        {
          question: t('faq.general.q2.question'),
          answer: t('faq.general.q2.answer')
        },
        {
          question: t('faq.general.q3.question'),
          answer: t('faq.general.q3.answer')
        },
        {
          question: t('faq.general.q4.question'),
          answer: t('faq.general.q4.answer')
        },
        {
          question: t('faq.general.q5.question'),
          answer: t('faq.general.q5.answer')
        },
        {
          question: t('faq.general.q6.question'),
          answer: t('faq.general.q6.answer')
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--cream)] to-[var(--cream-light)]">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-h1-responsive text-[var(--brand)] mb-4">
              {t('faq.title', 'Frequently Asked Questions')}
            </h1>
            <p className="text-body text-[var(--brand)] mb-12">
              {t('faq.subtitle', 'Find answers to common questions about nutrition, fitness, and Pilates Reformer training.')}
            </p>

            <div className="space-y-12">
              {faqCategories.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                >
                  <h2 className="text-h2 text-[var(--brand)] mb-6">
                    {category.category}
                  </h2>
                  <div className="space-y-6">
                    {category.questions.map((item, qIndex) => (
                      <motion.div
                        key={qIndex}
                        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: qIndex * 0.05 }}
                      >
                        <div className="px-6 py-4">
                          <h3 className="text-body-lg font-semibold text-[var(--brand)] mb-3">
                            {item.question}
                          </h3>
                          <p className="text-body text-[var(--brand)]/90">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <p className="text-body text-[var(--brand)]">
                {t('faq.stillHaveQuestions', "Still have questions?")}
              </p>
              <a 
                href="/#contact" 
                className="inline-block mt-4 px-6 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition-colors"
              >
                {t('faq.contactUs', 'Contact Us')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default FAQ;
