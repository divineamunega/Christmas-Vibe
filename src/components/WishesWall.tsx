import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ChristmasWish } from '../types';

interface WishesWallProps {
  onBackHome: () => void;
}

export function WishesWall({ onBackHome }: WishesWallProps) {
  const [wishes, setWishes] = useState<ChristmasWish[]>([]);
  const [spotlightIndex, setSpotlightIndex] = useState<number | null>(null);
  const [clickedWish, setClickedWish] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishes();
  }, []);

  useEffect(() => {
    if (wishes.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * wishes.length);
        setSpotlightIndex(randomIndex);
        setTimeout(() => setSpotlightIndex(null), 3000);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [wishes]);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from('christmas_wishes')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setLoading(false);
    }
  };

  const playJingle = () => {
    const audio = new Audio();
    const frequency = 800;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      context.currentTime + 0.1
    );

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-green-900 to-red-900 p-4 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Christmas Wishes Wall 🎄
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Beautiful wishes from people around the world
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackHome}
            className="bg-white text-red-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
          >
            <Home size={20} />
            Back to Home
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="text-center text-white text-xl">
            Loading wishes...
          </div>
        ) : wishes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white text-xl bg-white/10 backdrop-blur-sm rounded-3xl p-12"
          >
            <p className="text-3xl mb-4">✨</p>
            <p>No wishes yet. Be the first to share your Christmas wish!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: spotlightIndex === index ? 1.1 : 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setClickedWish(wish.id);
                  setTimeout(() => setClickedWish(null), 1000);
                }}
                onMouseEnter={playJingle}
                className={`relative p-6 rounded-2xl backdrop-blur-sm cursor-pointer transition-all ${
                  spotlightIndex === index
                    ? 'bg-yellow-400/30 shadow-2xl ring-4 ring-yellow-300'
                    : clickedWish === wish.id
                    ? 'bg-white/30 shadow-xl ring-2 ring-white'
                    : 'bg-white/20 shadow-lg hover:bg-white/25'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">
                    {['🎁', '⭐', '❄️', '🎄', '✨', '🎅', '🔔', '🕊️'][
                      index % 8
                    ]}
                  </div>
                  <p className="text-white text-lg leading-relaxed flex-1">
                    {wish.wish_text}
                  </p>
                </div>
                {spotlightIndex === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 bg-yellow-400 text-red-700 font-bold px-3 py-1 rounded-full text-sm"
                  >
                    Featured ✨
                  </motion.div>
                )}
                {clickedWish === wish.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <Heart size={48} className="text-red-500 fill-red-500" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
