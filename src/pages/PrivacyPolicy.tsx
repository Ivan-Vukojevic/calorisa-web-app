import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PolicySection {
  title: string;
  content: string;
}

/**
 * Privacy Policy page component
 */
function PrivacyPolicy(): JSX.Element {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections: PolicySection[] = [
    {
      title: t('privacy.intro.title', 'Introduction'),
      content: t('privacy.intro.content', 'This Privacy Policy describes how Calorisa ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services.')
    },
    {
      title: t('privacy.dataCollection.title', 'Data Collection'),
      content: t('privacy.dataCollection.content', 'We collect information you provide directly to us, including: name, email address, phone number, health information (optional), fitness goals, dietary preferences, and any other information you choose to provide through our contact forms or service inquiries.')
    },
    {
      title: t('privacy.dataUse.title', 'How We Use Your Data'),
      content: t('privacy.dataUse.content', 'We use the collected information to: provide personalized nutrition and fitness services, communicate with you about our services, respond to your inquiries, send newsletters (with your consent), improve our services, and comply with legal obligations.')
    },
    {
      title: t('privacy.dataProtection.title', 'Data Protection'),
      content: t('privacy.dataProtection.content', 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized personnel.')
    },
    {
      title: t('privacy.dataSecurity.title', 'Data Security'),
      content: t('privacy.dataSecurity.content', 'We use industry-standard security measures including SSL encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.')
    },
    {
      title: t('privacy.cookies.title', 'Cookies'),
      content: t('privacy.cookies.content', 'Our website uses cookies to improve user experience. Cookies are small text files stored on your device. You can control cookie settings through your browser preferences. We use cookies for: remembering your language preference, analyzing website traffic, and improving website functionality.')
    },
    {
      title: t('privacy.thirdParty.title', 'Third-Party Services'),
      content: t('privacy.thirdParty.content', 'We may use third-party services such as Google Analytics for website analytics, email service providers for newsletters, and social media platforms. These services have their own privacy policies and may collect data according to their terms.')
    },
    {
      title: t('privacy.yourRights.title', 'Your Rights (GDPR)'),
      content: t('privacy.yourRights.content', 'Under GDPR, you have the right to: access your personal data, rectify inaccurate data, erase your data ("right to be forgotten"), restrict processing of your data, object to data processing, data portability, and withdraw consent at any time. To exercise these rights, contact us at sarah@calorisa.com.')
    },
    {
      title: t('privacy.dataRetention.title', 'Data Retention'),
      content: t('privacy.dataRetention.content', 'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Client health and nutrition records are kept for 7 years in accordance with professional standards.')
    },
    {
      title: t('privacy.childrenPrivacy.title', "Children's Privacy"),
      content: t('privacy.childrenPrivacy.content', 'Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us.')
    },
    {
      title: t('privacy.changes.title', 'Changes to This Policy'),
      content: t('privacy.changes.content', 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.')
    },
    {
      title: t('privacy.contact.title', 'Contact Us'),
      content: t('privacy.contact.content', 'If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at: Email: sarah@calorisa.com, Address: Ul. Franje Kuhača 8, Osijek, Croatia')
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
              {t('privacy.title', 'Privacy Policy')}
            </h1>
            <p className="text-body text-[var(--brand)] mb-8">
              {t('privacy.lastUpdated', 'Last Updated')}: {t('privacy.date', 'November 21, 2025')}
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
                {t('privacy.contactButton', 'Contact Us')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;
