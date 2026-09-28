'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('era_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem('era_cookie_consent', accepted ? 'accepted' : 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50 p-5 rounded-2xl border border-white/15 bg-[#171A19]/95 text-[#EFECE6] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-start gap-3.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#C5A880]">
              <Shield size={16} />
            </div>
            <div>
              <p className="font-sans text-xs leading-relaxed opacity-85">
                This website uses cookies to ensure you get the best experience on website.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
            <button
              onClick={() => handleChoice(false)}
              className="px-4 py-2 rounded-full font-sans text-[11px] tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="px-5 py-2 rounded-full font-sans text-[11px] tracking-widest uppercase bg-[#EFECE6] text-[#171A19] font-semibold hover:bg-white transition-all cursor-pointer shadow-md"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
