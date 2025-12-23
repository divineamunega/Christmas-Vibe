import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Star } from 'lucide-react';

interface ResultLoaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  { text: 'Determining your Christmas vibe...', icon: Sparkles, duration: 1500 },
  { text: 'Analyzing your festive personality...', icon: Gift, duration: 1500 },
  { text: 'Your result is almost here...', icon: Star, duration: 1500 },
];

export function ResultLoader({ onComplete }: ResultLoaderProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = loadingMessages.reduce((sum, msg) => sum + msg.duration, 0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / totalDuration) * 50;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (currentMessage < loadingMessages.length) {
      const timer = setTimeout(() => {
        if (currentMessage === loadingMessages.length - 1) {
          setTimeout(onComplete, loadingMessages[currentMessage].duration);
        }
        setCurrentMessage(currentMessage + 1);
      }, loadingMessages[currentMessage].duration);

      return () => clearTimeout(timer);
    }
  }, [currentMessage, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-green-600 to-red-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-12">
            <AnimatePresence mode="wait">
              {currentMessage < loadingMessages.length && (
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-4"
                >
                  {(() => {
                    const Icon = loadingMessages[currentMessage].icon;
                    return (
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Icon size={64} className="text-white" />
                      </motion.div>
                    );
                  })()}
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {loadingMessages[currentMessage].text}
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <p className="text-white text-lg font-medium">
              {Math.round(progress)}%
            </p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mt-12 text-white text-xl"
          >
            Here you go 🎄✨
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
