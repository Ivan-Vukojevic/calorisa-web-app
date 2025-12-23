import { useTranslation } from 'react-i18next';
import FeedbackTitle from './FeedbackTitle';
import FeedbackCarousel from './FeedbackCarousel';
import FeedbackGrid from './FeedbackGrid';

interface Feedback {
  name: string;
  feedback: string;
}

function FeedbackSection(): JSX.Element {
  const { t } = useTranslation();

  // Fetch feedback data from i18n and ensure it's an array
  const rawFeedback = t('main.feedback.feedbackData', { returnObjects: true });
  const feedbackData: Feedback[] = Array.isArray(rawFeedback) ? rawFeedback : [];

  return (
    <section className="flex flex-col items-center px-[20px] md:px-[20px] py-[40px] min-h-[60vh] h-auto bg-[#f5f5f5] relative overflow-hidden">
      <FeedbackTitle />
      <FeedbackCarousel feedbackData={feedbackData} />
      <FeedbackGrid feedbackData={feedbackData} />
    </section>
  );
}

export default FeedbackSection;
