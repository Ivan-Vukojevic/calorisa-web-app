import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProgramsFaqButton(): JSX.Element {
  return (
    <Link to="/faq">
      <motion.div
        className="fixed bottom-4 right-8 md:bottom-8 md:right-8 z-50"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Strawberry SVG Button */}
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 100 100" 
          className="drop-shadow-2xl cursor-pointer"
        >
          {/* Glow effect */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Strawberry body */}
          <path
            d="M 50 85 C 35 85 25 75 25 60 C 25 45 30 30 50 20 C 70 30 75 45 75 60 C 75 75 65 85 50 85 Z"
            fill="#FFF1E6"
            stroke="#6b4f4f"
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* FAQ text */}
          {/* eslint-disable-next-line react/forbid-dom-props */}
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fill="#6b4f4f"
            fontSize="18"
            fontWeight="bold"
            className="pointer-events-none"
          >
            FAQ
          </text>
        </svg>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#6b4f4f] text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Frequently Asked Questions
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default ProgramsFaqButton;
