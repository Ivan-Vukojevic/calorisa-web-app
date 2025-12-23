import { motion } from 'framer-motion';

interface Feedback {
  name: string;
  feedback: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
  index: number;
  hoveredCard: number | null;
  onHoverStart: (index: number) => void;
  onHoverEnd: (index: number | null) => void;
}

function FeedbackCard({ 
  feedback, 
  index, 
  hoveredCard, 
  onHoverStart, 
  onHoverEnd 
}: FeedbackCardProps): JSX.Element {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 w-full md:w-[360px] lg:w-[380px] text-center flex flex-col justify-between min-h-[380px] transition-shadow duration-300" 
      key={`feedback-${feedback.name}-${index}`}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      onHoverStart={() => onHoverStart(index)}
      onHoverEnd={() => onHoverEnd(null)}
    >
      {/* Quote Mark - fixed in center */}
      <div 
        className="flex justify-center items-center text-[5rem] font-bold leading-none mb-4 text-[#6b4f4f]"
      >
        "
      </div>

      {/* Animated Feedback Text with better readability */}
      <motion.p 
        className="text-[0.95rem] leading-relaxed text-[#4f4f4f] mb-6 italic flex-grow px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.7, 
          delay: index * 0.15 + 0.4
        }}
      >
        {feedback.feedback}
      </motion.p>

      {/* Animated Name with fixed underline */}
      <motion.div
        className="relative mt-auto"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.15 + 0.6
        }}
      >
        <h3 className="text-[#6b4f4f] text-sm font-bold tracking-wider uppercase mb-2">
          — {feedback.name}
        </h3>
        
        {/* Animated Underline - fixed width */}
        <motion.div
          className="mx-auto h-0.5 bg-[#6b4f4f] w-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default FeedbackCard;
