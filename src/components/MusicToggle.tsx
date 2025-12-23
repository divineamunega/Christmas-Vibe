import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export function MusicToggle() {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('christmas-music-muted');
    return saved ? JSON.parse(saved) : false;
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('christmas-music-muted', JSON.stringify(isMuted));

    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/christmas-music.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-4 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </motion.button>
    </>
  );
}
