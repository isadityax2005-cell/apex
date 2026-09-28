'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Move } from 'lucide-react';

export default function MasterPlanViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="masterplan" className="py-28 md:py-36 px-6 md:px-12 bg-[#121514] text-[#EFECE6] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Master Architecture</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
            Boutique Enclave <span className="italic font-light">Master Plan</span>
          </h2>
          <p className="font-sans text-xs tracking-widest uppercase opacity-55 max-w-xs leading-relaxed">
            Drag to pan through the 25 residences, private walking paths, and wellness amenities.
          </p>
        </div>
      </div>

      {/* Pannable / Draggable Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsDragging(false);
        }}
        className="max-w-7xl mx-auto h-[550px] md:h-[680px] rounded-3xl border border-white/15 overflow-hidden relative select-none cursor-grab active:cursor-grabbing bg-[#0A0D0C]"
      >
        {/* Custom Drag Floating Cursor */}
        {isHovered && (
          <motion.div
            className="hidden md:flex pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/40 bg-black/60 backdrop-blur-md items-center justify-center text-white text-[10px] font-sans tracking-widest uppercase shadow-2xl flex-col gap-1"
            style={{ left: cursorPos.x, top: cursorPos.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isDragging ? 0.9 : 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            <Move size={14} className="opacity-80" />
            <span>Drag</span>
          </motion.div>
        )}

        {/* Draggable Canvas */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.15}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="relative w-[1800px] h-[1000px] cursor-grab active:cursor-grabbing"
          style={{ x: -250, y: -150 }}
        >
          {/* Master Plan Map Graphic */}
          <img
            src="/hero.png"
            alt="Apex Residency Master Plan"
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Master Plan Key Annotations */}
          <div className="absolute left-[32%] top-[38%] p-3.5 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-md text-left shadow-2xl">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#C5A880] block font-semibold">Block 01</span>
            <span className="font-serif text-sm text-white">8 Private Residences & Solariums</span>
          </div>

          <div className="absolute left-[54%] top-[28%] p-3.5 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-md text-left shadow-2xl">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#C5A880] block font-semibold">Block 02</span>
            <span className="font-serif text-sm text-white">9 Boutique Garden Residences</span>
          </div>

          <div className="absolute left-[72%] top-[45%] p-3.5 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-md text-left shadow-2xl">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#C5A880] block font-semibold">Block 03</span>
            <span className="font-serif text-sm text-white">8 Duplex Penthouses</span>
          </div>

          <div className="absolute left-[44%] top-[60%] p-4 rounded-2xl bg-[#C5A880]/90 text-[#121514] font-semibold text-left shadow-2xl">
            <span className="font-sans text-[9px] uppercase tracking-widest block opacity-75">Central Amenity</span>
            <span className="font-serif text-base">Saltwater Lap Pool & Mediterranean Gardens</span>
          </div>

          <div className="absolute left-[20%] top-[70%] p-3.5 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-md text-left shadow-2xl">
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#D9383A] block font-semibold">Gated Entrance</span>
            <span className="font-serif text-sm text-white">24/7 Concierge & Security Gate</span>
          </div>
        </motion.div>

        {/* Bottom Helper Bar */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-sans tracking-widest uppercase text-white/70">
            <Compass size={14} className="text-[#C5A880]" />
            <span>North Orientation · 100m to Shoreline</span>
          </div>
          <div className="md:hidden px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-sans tracking-widest uppercase text-white/80">
            Swipe to explore
          </div>
        </div>
      </div>
    </section>
  );
}
