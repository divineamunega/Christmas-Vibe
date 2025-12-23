import { motion } from 'framer-motion';
import { Share2, Sparkles } from 'lucide-react';
import { VibeResult } from '../types';

interface ResultScreenProps {
  result: VibeResult;
  onMakeWish: () => void;
}

export function ResultScreen({ result, onMakeWish }: ResultScreenProps) {
  const handleShare = async () => {
    const shareText = `I just discovered my Christmas vibe 🎄✨ I got ${result.vibe}! What's yours?\n\nCheck yours at ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "What's Your Christmas Vibe?",
          text: shareText,
        });
      } catch (error) {
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Share text copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-red-200"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-center mb-6"
        >
          <div className="text-8xl mb-4">{result.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
            {result.vibe}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center"
        >
          {result.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-lg flex items-center justify-center gap-2"
          >
            <Share2 size={24} />
            Share My Christmas Vibe
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onMakeWish}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-lg flex items-center justify-center gap-2"
          >
            <Sparkles size={24} />
            Make a Christmas Wish ✨
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>May your Christmas be filled with joy and magic! 🎄</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
