import { motion } from 'framer-motion';

interface HeaderGreetingProps {
  name: string;
}

export function HeaderGreeting({ name }: HeaderGreetingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-40 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-red-200"
    >
      <p className="text-lg font-semibold text-red-700">
        Merry Christmas, {name} 🎄
      </p>
    </motion.div>
  );
}
