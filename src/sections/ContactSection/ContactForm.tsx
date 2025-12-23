import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';

interface SelectOption {
  value: string;
  label: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  age: string;
  height: string;
  weight: string;
  bodyFat: string;
  diseases: string;
  diseasesOther: string;
  dailyTraining: string;
  bloodTest: string;
  nutritionGoal: string;
  trainingType: string;
  message: string;
}

interface ContactFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  status?: { ok: boolean | null; message: string };
}

function ContactForm({ formData, handleChange, handleSubmit, isSubmitting, status }: ContactFormProps): JSX.Element {
  const { t } = useTranslation();
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const serviceOptions: SelectOption[] = [
    { value: '', label: t('main.contact.form.serviceOptions.placeholder') },
    { value: 'training', label: t('main.contact.form.serviceOptions.training') },
    { value: 'nutrition', label: t('main.contact.form.serviceOptions.nutrition') },
    { value: 'pilates', label: t('main.contact.form.serviceOptions.pilates') },
    { value: 'other', label: t('main.contact.form.serviceOptions.other') }
  ];

  const nutritionGoalOptions: SelectOption[] = [
    { value: '', label: t('main.contact.form.nutritionGoalOptions.placeholder') },
    { value: 'weightLoss', label: t('main.contact.form.nutritionGoalOptions.weightLoss') },
    { value: 'muscleGain', label: t('main.contact.form.nutritionGoalOptions.muscleGain') },
    { value: 'healthImprovement', label: t('main.contact.form.nutritionGoalOptions.healthImprovement') },
    { value: 'sportsPerformance', label: t('main.contact.form.nutritionGoalOptions.sportsPerformance') },
    { value: 'other', label: t('main.contact.form.nutritionGoalOptions.other') }
  ];

  const diseaseOptions: SelectOption[] = [
    { value: '', label: t('main.contact.form.diseaseOptions.placeholder') },
    { value: 'none', label: t('main.contact.form.diseaseOptions.none') },
    { value: 'hypertension', label: t('main.contact.form.diseaseOptions.hypertension') },
    { value: 'diabetes', label: t('main.contact.form.diseaseOptions.diabetes') },
    { value: 'heartDisease', label: t('main.contact.form.diseaseOptions.heartDisease') },
    { value: 'thyroid', label: t('main.contact.form.diseaseOptions.thyroid') },
    { value: 'other', label: t('main.contact.form.diseaseOptions.other') }
  ];

  const dailyTrainingOptions: SelectOption[] = [
    { value: '', label: t('main.contact.form.dailyTrainingOptions.placeholder') },
    { value: 'sedentary', label: t('main.contact.form.dailyTrainingOptions.sedentary') },
    { value: 'light', label: t('main.contact.form.dailyTrainingOptions.light') },
    { value: 'moderate', label: t('main.contact.form.dailyTrainingOptions.moderate') },
    { value: 'active', label: t('main.contact.form.dailyTrainingOptions.active') },
    { value: 'veryActive', label: t('main.contact.form.dailyTrainingOptions.veryActive') }
  ];

  const bloodTestOptions: SelectOption[] = [
    { value: '', label: t('main.contact.form.bloodTestOptions.placeholder') },
    { value: 'yes', label: t('main.contact.form.bloodTestOptions.yes') },
    { value: 'no', label: t('main.contact.form.bloodTestOptions.no') },
    { value: 'planned', label: t('main.contact.form.bloodTestOptions.planned') }
  ];

  const trainingTypeOptions: SelectOption[] = [
    { value: '', label: t('main.contact.form.trainingTypeOptions.placeholder') },
    { value: 'online', label: t('main.contact.form.trainingTypeOptions.online') },
    { value: 'private', label: t('main.contact.form.trainingTypeOptions.private') }
  ];

  const isNutrition = formData.service === 'nutrition';
  const isTraining = formData.service === 'training';
  const showNutritionFields = isNutrition;
  const showTrainingFields = isTraining;

  // Auto-scroll to message when questionnaire key fields are filled
  useEffect(() => {
    const hasNutritionGoal = showNutritionFields && formData.nutritionGoal;
    const hasTrainingType = showTrainingFields && formData.trainingType;
    
    if (hasNutritionGoal || hasTrainingType) {
      setTimeout(() => {
        messageRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        messageRef.current?.focus();
      }, 300);
    }
  }, [formData.nutritionGoal, formData.trainingType, showNutritionFields, showTrainingFields]);

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-[800px] flex flex-col gap-[30px] mb-[50px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
    >
      {/* Basic Information */}
      <div className="flex flex-col md:flex-row gap-[30px]">
        <FormInput
          id="firstName"
          name="firstName"
          label={t('main.contact.form.firstName')}
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
          autoComplete="given-name"
        />
        <FormInput
          id="lastName"
          name="lastName"
          label={t('main.contact.form.lastName')}
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
          autoComplete="family-name"
        />
      </div>

      <FormInput
        id="email"
        name="email"
        label={t('main.contact.form.email')}
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        autoComplete="email"
      />

      <FormSelect
        id="service"
        name="service"
        label={t('main.contact.form.service')}
        value={formData.service}
        onChange={handleChange}
        options={serviceOptions}
        required
      />

      {/* Conditional Nutrition Fields */}
      {showNutritionFields && (
        <motion.div
          className="flex flex-col gap-[30px] p-6 bg-[#f7f0ec]/50 rounded-lg border-l-4 border-[#6b4f4f]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-h5 text-[#6b4f4f] mb-2">
            {t('main.contact.form.nutritionDetails')}
          </h3>
          
          <p className="text-sm text-[#6b4f4f]/70 -mt-4 mb-2">
            {t('main.contact.form.nutritionDetailsNote')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-[30px]">
            <FormInput
              id="age"
              name="age"
              label={t('main.contact.form.age')}
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g., 25"
            />
            <FormInput
              id="height"
              name="height"
              label={t('main.contact.form.height')}
              type="number"
              value={formData.height}
              onChange={handleChange}
              placeholder="cm"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-[30px]">
            <FormInput
              id="weight"
              name="weight"
              label={t('main.contact.form.weight')}
              type="number"
              value={formData.weight}
              onChange={handleChange}
              placeholder="kg"
            />
            <div className="flex-1">
              <FormInput
                id="bodyFat"
                name="bodyFat"
                label={t('main.contact.form.bodyFat')}
                type="number"
                value={formData.bodyFat}
                onChange={handleChange}
                placeholder="%"
              />
              <p className="text-xs text-[#6b4f4f]/60 mt-1">{t('main.contact.form.optional')}</p>
            </div>
          </div>

          <FormSelect
            id="diseases"
            name="diseases"
            label={t('main.contact.form.diseases')}
            value={formData.diseases}
            onChange={handleChange}
            options={diseaseOptions}
          />
          
          {formData.diseases === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormInput
                id="diseasesOther"
                name="diseasesOther"
                label={t('main.contact.form.diseasesOther')}
                type="text"
                value={formData.diseasesOther}
                onChange={handleChange}
                placeholder={t('main.contact.form.diseasesOtherPlaceholder')}
              />
            </motion.div>
          )}

          <FormSelect
            id="dailyTraining"
            name="dailyTraining"
            label={t('main.contact.form.dailyTraining')}
            value={formData.dailyTraining}
            onChange={handleChange}
            options={dailyTrainingOptions}
          />

          <FormSelect
            id="bloodTest"
            name="bloodTest"
            label={t('main.contact.form.bloodTest')}
            value={formData.bloodTest}
            onChange={handleChange}
            options={bloodTestOptions}
          />

          <FormSelect
            id="nutritionGoal"
            name="nutritionGoal"
            label={t('main.contact.form.nutritionGoal')}
            value={formData.nutritionGoal}
            onChange={handleChange}
            options={nutritionGoalOptions}
          />
        </motion.div>
      )}

      {/* Conditional Training Fields */}
      {showTrainingFields && (
        <motion.div
          className="flex flex-col gap-[30px] p-6 bg-[#f7f0ec]/50 rounded-lg border-l-4 border-[#6b4f4f]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-h5 text-[#6b4f4f] mb-2">
            {t('main.contact.form.trainingDetails')}
          </h3>
          
          <p className="text-sm text-[#6b4f4f]/70 -mt-4 mb-2">
            {t('main.contact.form.trainingDetailsNote')}
          </p>

          <FormSelect
            id="trainingType"
            name="trainingType"
            label={t('main.contact.form.trainingType')}
            value={formData.trainingType}
            onChange={handleChange}
            options={trainingTypeOptions}
          />
        </motion.div>
      )}

      <FormTextarea
        ref={messageRef}
        id="message"
        name="message"
        label={t('main.contact.form.message')}
        value={formData.message}
        onChange={handleChange}
        required
      />

      {/* Consent checkbox (GDPR) */}
      <FormCheckbox
        id="consent"
        name="consent"
        label={t('main.contact.form.consent')}
        checked={Boolean((formData as any).consent)}
        onChange={handleChange as any}
        required
      />

      {/* Honeypot field */}
      <input
        type="text"
        name="gotcha"
        value={(formData as any).gotcha || ''}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      <motion.button 
        type="submit" 
        className="py-[15px] px-[30px] bg-[#6b4f4f] text-white text-body-lg border-none rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-[#5a3f3f] self-center disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={Boolean(isSubmitting)}
      >
        {isSubmitting ? t('common.sending', 'Sending...') : t('main.contact.form.submit')}
      </motion.button>

      {status?.message && (
        <p className={`text-center mt-2 ${status.ok ? 'text-green-700' : 'text-red-700'}`}>{status.message}</p>
      )}
    </motion.form>
  );
}

export default ContactForm;
