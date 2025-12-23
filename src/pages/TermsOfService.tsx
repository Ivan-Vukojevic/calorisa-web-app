import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface TermsSection {
  title: string;
  content: string;
}

/**
 * Terms of Service page component
 */
function TermsOfService(): JSX.Element {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections: TermsSection[] = [
    {
      title: t('terms.acceptance.title', 'Acceptance of Terms'),
      content: t('terms.acceptance.content', 'By accessing and using the Calorisa website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.')
    },
    {
      title: t('terms.services.title', 'Services Provided'),
      content: t('terms.services.content', 'Calorisa provides personalized nutrition consultation, fitness training programs, Pilates Reformer sessions, and related health and wellness services. Our services are designed for informational and educational purposes and should not replace professional medical advice.')
    },
    {
      title: t('terms.eligibility.title', 'Eligibility'),
      content: t('terms.eligibility.content', 'You must be at least 16 years old to use our services. If you are under 18, you must have parental or guardian consent. By using our services, you represent that you meet these requirements.')
    },
    {
      title: t('terms.userResponsibilities.title', 'User Responsibilities'),
      content: t('terms.userResponsibilities.content', 'You agree to: provide accurate and complete information, maintain the confidentiality of your account, notify us immediately of any unauthorized use, follow professional guidance and recommendations, inform us of any health conditions or changes, and use our services in a lawful and respectful manner.')
    },
    {
      title: t('terms.healthDisclaimer.title', 'Health and Medical Disclaimer'),
      content: t('terms.healthDisclaimer.content', 'Our nutrition and fitness services are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with your physician before starting any new nutrition or exercise program. Calorisa is not responsible for any health issues that may arise from following our recommendations without proper medical supervision.')
    },
    {
      title: t('terms.payments.title', 'Payments and Fees'),
      content: t('terms.payments.content', 'Service fees are as published on our website or as agreed in individual consultations. Payment is required before services are rendered unless otherwise agreed. Prices are subject to change with notice. Refund policies are determined on a case-by-case basis.')
    },
    {
      title: t('terms.cancellation.title', 'Cancellation and Rescheduling'),
      content: t('terms.cancellation.content', 'Appointments must be cancelled or rescheduled at least 24 hours in advance. Late cancellations or no-shows may result in charges. We reserve the right to cancel or reschedule appointments due to unforeseen circumstances.')
    },
    {
      title: t('terms.intellectualProperty.title', 'Intellectual Property'),
      content: t('terms.intellectualProperty.content', 'All content on the Calorisa website, including text, images, logos, nutrition plans, training programs, and recipes, is the intellectual property of Calorisa and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.')
    },
    {
      title: t('terms.confidentiality.title', 'Confidentiality'),
      content: t('terms.confidentiality.content', 'We treat all client information with strict confidentiality in accordance with professional standards and GDPR regulations. Health and nutrition information will not be shared with third parties without your explicit consent, except as required by law.')
    },
    {
      title: t('terms.liability.title', 'Limitation of Liability'),
      content: t('terms.liability.content', 'Calorisa and its staff are not liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the specific service in question.')
    },
    {
      title: t('terms.termination.title', 'Termination'),
      content: t('terms.termination.content', 'We reserve the right to terminate or suspend access to our services at any time, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.')
    },
    {
      title: t('terms.changes.title', 'Changes to Terms'),
      content: t('terms.changes.content', 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.')
    },
    {
      title: t('terms.governingLaw.title', 'Governing Law'),
      content: t('terms.governingLaw.content', 'These Terms of Service are governed by and construed in accordance with the laws of Croatia. Any disputes shall be resolved in the courts of Osijek, Croatia.')
    },
    {
      title: t('terms.contact.title', 'Contact Information'),
      content: t('terms.contact.content', 'For questions about these Terms of Service, please contact us at:\nEmail: sarah@calorisa.com\nAddress: Ul. Franje Kuhača 8, Osijek, Croatia')
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
              {t('terms.title', 'Terms of Service')}
            </h1>
            <p className="text-body text-[var(--brand)] mb-8">
              {t('terms.lastUpdated', 'Last Updated')}: {t('terms.date', 'November 21, 2025')}
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm"
                >
                  <h2 className="text-h3 text-[var(--brand)] mb-3">
                    {section.title}
                  </h2>
                  <p className="text-body text-[var(--brand)] whitespace-pre-line">
                    {section.content}
                  </p>
                </motion.section>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <a 
                href="/#contact" 
                className="inline-block px-6 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition-colors"
              >
                {t('terms.contactButton', 'Contact Us')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default TermsOfService;
