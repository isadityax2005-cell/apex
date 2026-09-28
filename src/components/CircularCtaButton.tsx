'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface CircularCtaButtonProps {
  label: string;
  onClick?: () => void;
  size?: number;
  className?: string;
}

export default function CircularCtaButton({ label, onClick, size = 150, className = '' }: CircularCtaButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={label}
    >
      {/* Outer Rotating SVG Ring */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-1000 ease-out group-hover:rotate-180"
        viewBox="0 0 208 208"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base circle border */}
        <circle cx="104" cy="104" r="102" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />
        
        {/* Accent animated arcs */}
        <motion.circle
          cx="104"
          cy="104"
          r="102"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="90 230"
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.circle
          cx="104"
          cy="104"
          r="102"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="45 275"
          animate={{ rotate: hovered ? -360 : 0 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        />
      </svg>

      {/* Glass Center Disc */}
      <div
        className="w-[78%] h-[78%] rounded-full flex flex-col items-center justify-center text-center p-3 transition-transform duration-500 group-hover:scale-95 shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <div className="overflow-hidden h-7 flex flex-col items-center justify-center">
          <motion.span
            animate={{ y: hovered ? -24 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block font-sans text-[11px] uppercase tracking-[0.2em] font-medium leading-none"
          >
            {label}
          </motion.span>
          <motion.span
            animate={{ y: hovered ? -12 : 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="block font-sans text-[11px] uppercase tracking-[0.2em] font-medium leading-none text-white italic"
          >
            {label}
          </motion.span>
        </div>
        <ArrowUpRight size={14} className="mt-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-70 group-hover:opacity-100" />
      </div>
    </button>
  );
}
