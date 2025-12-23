import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { quizQuestions } from '../data/quizData';
import { ChristmasVibe } from '../types';

interface QuizProps {
  onComplete: (answers: ChristmasVibe[]) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<ChristmasVibe[]>([]);

  const handleNext = () => {
    if (selectedOption === null) return;

    const selectedVibe =
      quizQuestions[currentQuestion].options[selectedOption].vibe;
    const newAnswers = [...answers, selectedVibe];

    if (currentQuestion === quizQuestions.length - 1) {
      onComplete(newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
            <span>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-red-600 to-green-600"
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion}
            question={quizQuestions[currentQuestion].question}
            options={quizQuestions[currentQuestion].options}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
          />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all ${
              selectedOption === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {currentQuestion === quizQuestions.length - 1
              ? 'See My Result'
              : 'Next'}
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
