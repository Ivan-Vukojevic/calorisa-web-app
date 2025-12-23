import { useState } from 'react';
import FeedbackCard from './FeedbackCard';

interface Feedback {
  name: string;
  feedback: string;
}

interface FeedbackGridProps {
  feedbackData: Feedback[];
}

function FeedbackGrid({ feedbackData }: FeedbackGridProps): JSX.Element {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="hidden md:flex flex-wrap gap-8 justify-center relative z-10 max-w-7xl">
      {feedbackData.map((feedback, index) => (
        <FeedbackCard
          key={`feedback-${feedback.name}-${index}`}
          feedback={feedback}
          index={index}
          hoveredCard={hoveredCard}
          onHoverStart={setHoveredCard}
          onHoverEnd={setHoveredCard}
        />
      ))}
    </div>
  );
}

export default FeedbackGrid;
