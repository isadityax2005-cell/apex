'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowUpRight } from 'lucide-react';

interface HotspotPinProps {
  x: string; // percentage, e.g. "45%"
  y: string; // percentage, e.g. "30%"
  title: string;
  tag: string;
  description: string;
  align?: 'left' | 'right';
}

export default function HotspotPin({ x, y, title, tag, description, align = 'right' }: HotspotPinProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Pulse Beacon */}
      <div className="relative cursor-pointer group">
        <span className="absolute -inset-1.5 rounded-full bg-[#D4AF37]/30 animate-ping opacity-60" />
        <button
          onClick={() => setOpen(!open)}
          aria-label={`View ${title} hotspot`}
          className="relative w-7 h-7 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-115 group-hover:bg-[#D4AF37] group-hover:text-black shadow-lg"
          style={{
            background: 'rgba(20, 24, 23, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(212, 175, 55, 0.75)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)',
          }}
        >
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
            <Plus size={13} className="stroke-[2.5]" />
          </motion.div>
        </button>
      </div>

      {/* Floating Glass Tooltip Card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-full mb-3 w-64 p-5 rounded-2xl text-left pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/25 text-[#EFECE6] ${
              align === 'right' ? 'left-0' : 'right-0'
            }`}
            style={{
              background: 'rgba(23, 26, 25, 0.75)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">{tag}</span>
              <ArrowUpRight size={13} className="opacity-50" />
            </div>
            <h4 className="font-serif text-lg leading-tight mb-2 text-white">{title}</h4>
            <p className="font-sans text-xs opacity-75 leading-relaxed">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
