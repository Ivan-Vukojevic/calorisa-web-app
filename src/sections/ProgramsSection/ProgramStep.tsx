import { motion } from 'framer-motion';

interface Section {
  id: string;
  number: number;
  heading: string;
  description: React.ReactNode;
  position: string;
}

interface ProgramStepProps {
  step: Section;
  index: number;
  sectionsLength: number;
}

function ProgramStep({ step, index, sectionsLength }: ProgramStepProps): JSX.Element {
  return (
    <div className="relative mb-12 sm:mb-16 last:mb-0">
      {/* Connecting Line Animation - Desktop Only */}
      {index < sectionsLength - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-0.5 h-32 bg-[#f7f0ec] origin-top"
          style={{ top: "100%", zIndex: 0 }}
        />
      )}

      {/* Mobile: Vertical Layout, Desktop: Alternating Layout */}
      <div className={`flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 ${step.position === "right" ? "lg:flex-row-reverse" : ""}`}>
        {/* Card */}
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 30,
            x: 0
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            x: 0,
            scale: 1
          }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2,
            ease: "easeOut"
          }}
          className="w-full lg:flex-1 bg-white rounded-lg p-6 sm:p-8 shadow-lg relative lg:max-w-[550px]"
        >
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <div
            style={{ color: "#8a7a72" }}
            className="text-xs sm:text-sm tracking-wider mb-4 font-semibold"
          >
            STEP {step.number}
          </div>
          
          <h3 className="mb-3 sm:mb-4 text-[#3a3a3a] text-lg sm:text-xl font-bold leading-snug uppercase tracking-wide">
            {step.heading}
          </h3>
          
          <p
            className="text-[#6a6a6a] text-sm sm:text-base leading-relaxed"
          >
            {step.description}
          </p>
        </motion.div>

        {/* Animated Number Circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.2 + 0.1,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.2,
            rotate: 360,
            transition: { duration: 0.6 }
          }}
          className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-[var(--brand)] bg-white flex items-center justify-center relative z-10 order-first lg:order-none"
          style={{
            boxShadow: "0 4px 10px rgba(107, 79, 79, 0.2)"
          }}
        >
          <span className="text-[var(--brand)] text-xl sm:text-2xl lg:text-3xl font-bold">
            {step.number}
          </span>
        </motion.div>

        {/* Spacer for opposite side - Desktop Only */}
        <div className="hidden lg:block lg:flex-1 lg:max-w-[450px]" />
      </div>
    </div>
  );
}

export default ProgramStep;
