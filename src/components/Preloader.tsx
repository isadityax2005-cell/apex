'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Check if preloader has already played this session
    const hasLoaded = sessionStorage.getItem('apex_preloader_shown');
    if (hasLoaded) {
      setDone(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('apex_preloader_shown', 'true');
      onComplete?.();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#121514] text-[#EFECE6] flex flex-col items-center justify-center pointer-events-none select-none px-6"
        >
          {/* Subtle glowing ambient pulse */}
          <div className="absolute w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md">
            {/* Top Label */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C5A880] mb-4"
            >
              Mumbai · New Golden Mile
            </motion.p>

            {/* Line Art Landscape SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-44 h-24 mb-6"
            >
              <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Sun */}
                <circle cx="100" cy="45" r="18" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                {/* Coastal Mountains */}
                <path d="M10 85L60 35L105 75L145 42L190 85" stroke="#EFECE6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                {/* Horizon Water Line */}
                <line x1="20" y1="88" x2="180" y2="88" stroke="#C5A880" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                <line x1="45" y1="93" x2="155" y2="93" stroke="#EFECE6" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
              </svg>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-serif text-5xl sm:text-6xl uppercase tracking-[0.18em] leading-tight text-white mb-4"
            >
              Apex <span className="italic font-light">Residency</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-serif text-lg italic opacity-75 text-[#C5A880]"
            >
              A place to return to.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
