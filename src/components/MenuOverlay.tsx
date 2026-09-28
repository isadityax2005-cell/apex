'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

const STATEMENTS = [
  {
    title: 'Crafted to Endure',
    desc: 'Natural stone facades, durability, easy maintenance.',
  },
  {
    title: 'Light & Flow',
    desc: 'Terraces, rooftop solariums, seamless indoor-outdoor living.',
  },
  {
    title: 'Your Private Sanctuary',
    desc: 'Meandering walking paths connect the apartments instead of corridors.',
  },
];

export default function MenuOverlay({ isOpen, onClose, onOpenBooking }: MenuOverlayProps) {
  const [statementIndex, setStatementIndex] = useState(0);

  // Rotate statements every 4.5 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % STATEMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[120] bg-[#101312]/98 text-[#EFECE6] backdrop-blur-3xl flex flex-col justify-between p-8 md:p-16 overflow-y-auto"
        >
          {/* Top Bar with Brand & Close */}
          <div className="flex justify-between items-center w-full max-w-7xl mx-auto border-b border-white/10 pb-6">
            <Link href="/" onClick={onClose} className="font-serif text-2xl tracking-wider uppercase text-white">
              Era <span className="italic font-light">Residence</span>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all font-sans text-xs tracking-widest uppercase cursor-pointer"
            >
              <span>Close</span>
              <X size={16} />
            </button>
          </div>

          {/* Center Links & Rotating Statement Split */}
          <div className="w-full max-w-7xl mx-auto py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Primary Nav Links */}
            <ul className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
              {[
                { label: 'Home', href: '/' },
                { label: 'Select an Apartment', href: '/apartments' },
                { label: 'Contact', href: '/contact' },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group inline-flex items-center gap-4 text-4xl sm:text-5xl md:text-6xl font-serif text-white/85 hover:text-white transition-colors tracking-tight"
                  >
                    <span className="font-sans text-xs tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:text-[#C5A880] transition-opacity">
                      0{index + 1}
                    </span>
                    <span className="group-hover:translate-x-3 transition-transform duration-300">
                      {item.label}
                    </span>
                    <ArrowRight size={28} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#C5A880]" />
                  </Link>
                </motion.li>
              ))}

              {/* Book a call trigger in menu */}
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="group inline-flex items-center gap-4 text-4xl sm:text-5xl md:text-6xl font-serif text-white/85 hover:text-white transition-colors tracking-tight text-left cursor-pointer"
                >
                  <span className="font-sans text-xs tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:text-[#C5A880] transition-opacity">
                    04
                  </span>
                  <span className="group-hover:translate-x-3 transition-transform duration-300">
                    Book a Call
                  </span>
                  <ArrowRight size={28} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#C5A880]" />
                </button>
              </motion.li>
            </ul>

            {/* Right Brand Statements Rotating Block */}
            <div className="lg:col-span-5 p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-6">
                The Living Philosophy
              </span>

              <div className="min-h-[140px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={statementIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h4 className="font-serif text-2xl md:text-3xl mb-3 text-white">
                      {STATEMENTS[statementIndex].title}
                    </h4>
                    <p className="font-sans text-sm opacity-70 leading-relaxed">
                      {STATEMENTS[statementIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress indicators */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10">
                {STATEMENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStatementIndex(i)}
                    aria-label={`Show statement ${i + 1}`}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      i === statementIndex ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans opacity-45">
            <p>New Golden Mile · Estepona, Costa del Sol, Spain</p>
            <p>© 2026 ERA Residence. All rights reserved.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
