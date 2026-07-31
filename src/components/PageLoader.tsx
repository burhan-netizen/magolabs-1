import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const MESSAGES = [
  'Designing bespoke digital experiences...',
  'Analyzing search engine visibility...',
  'Crafting high-converting copywriting...',
  'Scaling local Google Business profiles...',
  'Optimizing pixel-perfect layouts...',
  'Assembling premium creative engineering...',
];

export default function PageLoader() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Pick a random creative slogan for the load sequence
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    setMessage(MESSAGES[randomIndex]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#1A1A1A] select-none pointer-events-auto"
    >
      <div className="w-full max-w-xs px-6 text-center space-y-6">
        {/* Brand Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] font-sans font-bold text-neutral-900 dark:text-white">
            Mago Labs
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-blue-600 dark:text-blue-400 mt-1.5 font-medium">
            Creative Service
          </span>
        </motion.div>

        {/* Premium Sleek Horizontal Progress Bar */}
        <div className="relative h-[2px] w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ left: '-100%', width: '100%' }}
            animate={{ left: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            }}
            className="absolute top-0 bottom-0 bg-blue-600 dark:bg-blue-500 rounded-full"
          />
        </div>

        {/* Creative Slogan Scribing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-xs font-mono text-neutral-500 dark:text-neutral-400 tracking-wide leading-relaxed min-h-[1.5rem]"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}
