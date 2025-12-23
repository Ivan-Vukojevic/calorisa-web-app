import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from './ContactForm';
import { useContactForm } from './hooks/useContactForm';

function ContactSection(): JSX.Element {
  const { t } = useTranslation();
  const { formData, handleChange, handleSubmit, isSubmitting, status } = useContactForm();

  return (
    <section id="contact-section" className="min-h-screen flex flex-col justify-center items-center px-[20px] py-[50px] bg-[#f7f0ec]">
      <motion.h2 
        className="text-display-responsive text-[#6b4f4f] whitespace-normal px-0 md:px-3 mb-4 md:mb-8 lg:mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {t("main.contact.title")}
      </motion.h2>

      <motion.p 
        className="text-body md:text-body-lg text-center max-w-[800px] mb-[30px] text-[#6b4f4f]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {t("main.contact.description")}
      </motion.p>

      <ContactForm 
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
      />

      <motion.div 
        className="w-full max-w-[800px] flex flex-col items-center gap-[30px] text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        <div>
          <h3 className="text-h5 mb-[20px] text-[#6b4f4f]">{t("main.contact.social.title")}</h3>
          <div className="flex gap-[20px] justify-center">
            <motion.a 
              href="mailto:calorisanutrition@gmail.com" 
              title="email" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[2rem] text-[#6b4f4f] transition-all duration-300 hover:scale-110 hover:text-[#6b4f4f]"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/calorisanutrition?igsh=MTczMGJvMXdqbjg5Mg%3D%3D&utm_source=qr" 
              title="instagram" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[2rem] text-[#6b4f4f] transition-all duration-300 hover:scale-110 hover:text-[#6b4f4f]"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="https://youtube.com/@calorisa?si=Cc3on3GyzkW6sJjJ" 
              title="youtube" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[2rem] text-[#6b4f4f] transition-all duration-300 hover:scale-110 hover:text-[#6b4f4f]"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaYoutube />
            </motion.a>
          </div>
        </div>
        
        <div>
          <h3 className="text-h5 mb-[20px] text-[#6b4f4f]">{t("main.contact.address.title")}</h3>
          <p className="text-body text-[#6b4f4f]">
            <FaMapMarkerAlt className="inline mr-[10px]" />
            {t("main.contact.address.details")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;
