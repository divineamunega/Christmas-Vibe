import { motion } from 'framer-motion';
import { QuizOption } from '../types';

interface QuestionCardProps {
  question: string;
  options: QuizOption[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  options,
  selectedOption,
  onSelect,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-8 text-center">
        {question}
      </h2>

      <div className="grid gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(index)}
            className={`p-6 rounded-2xl border-3 transition-all text-left ${
              selectedOption === index
                ? 'bg-red-600 text-white border-red-700 shadow-lg'
                : 'bg-white border-gray-200 hover:border-red-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{option.emoji}</span>
              <span
                className={`text-lg font-medium ${
                  selectedOption === index ? 'text-white' : 'text-gray-700'
                }`}
              >
                {option.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
