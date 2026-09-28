'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Move, Shield, Waves, Sparkles, Building, Trees } from 'lucide-react';
import { TOTAL_UNITS } from '@/data/apartments';

interface Hotspot {
  id: string;
  name: string;
  category: string;
  units: string;
  x: number;
  y: number;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'block-a',
    name: 'Block A · Sea-Face Sky Villas',
    category: 'Residences',
    units: '8 Oceanfront Residences',
    x: 480,
    y: 340,
    description: 'Direct Arabian Sea frontage with double-height glass pavilions and private elevator vestibules.',
  },
  {
    id: 'block-b',
    name: 'Block B · Coastal Pavilion Suites',
    category: 'Residences',
    units: '8 Garden & Terrace Suites',
    x: 880,
    y: 280,
    description: 'Verdant garden integration featuring private outdoor courtyards and aerothermal climate control.',
  },
  {
    id: 'block-c',
    name: 'Block C · Solarium Duplex Penthouses',
    category: 'Residences',
    units: '8 Duplex Penthouses',
    x: 1240,
    y: 380,
    description: 'Crowning residences with 150m² rooftop solariums, private jacuzzi pre-installations, and 360° views.',
  },
  {
    id: 'pool',
    name: 'Horizon Saltwater Lap Pool',
    category: 'Central Amenity',
    units: '25m Heated Pool & Cabanas',
    x: 860,
    y: 560,
    description: 'Submerged loungers, Finnish cedar sauna, thermal rain showers, and biophilic poolside flora.',
  },
  {
    id: 'gate',
    name: 'Private Gatehouse & Concierge',
    category: 'Security & Access',
    units: '24/7 Biometric Entry',
    x: 240,
    y: 620,
    description: 'Triple-tier security perimeter, subterranean EV garage ramp, and dedicated delivery reception.',
  },
  {
    id: 'gardens',
    name: 'Coastal Biophilic Promenade',
    category: 'Landscaping',
    units: 'Pedestrian-Only Trail',
    x: 1380,
    y: 640,
    description: 'Lush indigenous banyan trees, frangipani groves, and illuminated barefoot walking circuits.',
  },
];

export default function MasterPlanViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="masterplan" className="py-28 md:py-36 px-6 md:px-12 bg-[#101312] text-[#EFECE6] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Master Architecture</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
            Boutique Enclave <span className="italic font-light">Master Plan</span>
          </h2>
          <p className="font-sans text-xs tracking-widest uppercase opacity-55 max-w-sm leading-relaxed">
            Interactive site diagram across strictly {TOTAL_UNITS} residences, private coastal walkways, and wellness pavilions.
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
        className="max-w-7xl mx-auto h-[560px] md:h-[680px] rounded-3xl border border-white/15 overflow-hidden relative select-none cursor-grab active:cursor-grabbing bg-[#090C0B]"
      >
        {/* Custom Drag Floating Cursor Pill */}
        {isHovered && (
          <motion.div
            className="hidden md:flex pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full border border-white/30 bg-black/75 backdrop-blur-md items-center justify-center text-white text-[10px] font-sans tracking-widest uppercase shadow-2xl gap-2"
            style={{ left: cursorPos.x, top: cursorPos.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isDragging ? 0.92 : 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Move size={12} className="text-[#C5A880]" />
            <span>Drag Plan</span>
          </motion.div>
        )}

        {/* Draggable Canvas with Inertia */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 25, power: 0.2 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="relative w-[1800px] h-[900px] cursor-grab active:cursor-grabbing"
          style={{ x: -200, y: -100 }}
        >
          {/* Architectural Master Plan Graphic */}
          <svg
            viewBox="0 0 1800 900"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Grid pattern */}
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
              </pattern>
              {/* Water gradient */}
              <linearGradient id="seaGrad" x1="0" y1="0" x2="1800" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0B1A1E" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0E2328" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0B1A1E" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Background Grid */}
            <rect width="1800" height="900" fill="#0C0F0E" />
            <rect width="1800" height="900" fill="url(#grid)" />

            {/* Arabian Sea Waterfront Zone (Top Edge) */}
            <path
              d="M0 0 L1800 0 L1800 140 C1400 160 1000 130 600 150 C300 165 0 140 0 140 Z"
              fill="url(#seaGrad)"
            />
            <path
              d="M0 140 C300 165 600 150 1000 130 C1400 160 1800 140 1800 140"
              stroke="#C5A880"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />
            <text x="900" y="80" textAnchor="middle" fill="#C5A880" fillOpacity="0.4" fontSize="14" letterSpacing="0.4em" fontFamily="sans-serif">
              ARABIAN SEA SHORELINE · 100M DIRECT ACCESS
            </text>

            {/* Perimeter Enclave Boundary */}
            <rect
              x="120"
              y="180"
              width="1560"
              height="640"
              rx="32"
              fill="#121715"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2"
            />

            {/* Internal Walkway Network (No Cars) */}
            <path
              d="M200 680 C350 680 400 520 600 520 C800 520 850 420 1100 420 C1350 420 1450 600 1600 680"
              stroke="rgba(197, 168, 128, 0.25)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M200 680 C350 680 400 520 600 520 C800 520 850 420 1100 420 C1350 420 1450 600 1600 680"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2"
              strokeDasharray="4 8"
            />

            {/* Block A Footprint (Sea-Face Sky Villas) */}
            <g transform="translate(360, 240)">
              <rect width="240" height="200" rx="16" fill="#18201D" stroke="#C5A880" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="30" y1="0" x2="30" y2="200" stroke="rgba(255,255,255,0.06)" />
              <line x1="120" y1="0" x2="120" y2="200" stroke="rgba(255,255,255,0.06)" />
              <line x1="210" y1="0" x2="210" y2="200" stroke="rgba(255,255,255,0.06)" />
              <text x="120" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="serif" fontWeight="500">
                BLOCK A
              </text>
              <text x="120" y="128" textAnchor="middle" fill="#C5A880" fontSize="10" letterSpacing="0.2em" fontFamily="sans-serif">
                8 SKY VILLAS
              </text>
            </g>

            {/* Block B Footprint (Coastal Pavilion Suites) */}
            <g transform="translate(760, 200)">
              <rect width="240" height="200" rx="16" fill="#18201D" stroke="#C5A880" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="30" y1="0" x2="30" y2="200" stroke="rgba(255,255,255,0.06)" />
              <line x1="120" y1="0" x2="120" y2="200" stroke="rgba(255,255,255,0.06)" />
              <line x1="210" y1="0" x2="210" y2="200" stroke="rgba(255,255,255,0.06)" />
              <text x="120" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="serif" fontWeight="500">
                BLOCK B
              </text>
              <text x="120" y="128" textAnchor="middle" fill="#C5A880" fontSize="10" letterSpacing="0.2em" fontFamily="sans-serif">
                8 SUITES
              </text>
            </g>

            {/* Block C Footprint (Duplex Penthouses) */}
            <g transform="translate(1120, 260)">
              <rect width="240" height="220" rx="16" fill="#18201D" stroke="#C5A880" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="30" y1="0" x2="30" y2="220" stroke="rgba(255,255,255,0.06)" />
              <line x1="120" y1="0" x2="120" y2="220" stroke="rgba(255,255,255,0.06)" />
              <line x1="210" y1="0" x2="210" y2="220" stroke="rgba(255,255,255,0.06)" />
              <text x="120" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="serif" fontWeight="500">
                BLOCK C
              </text>
              <text x="120" y="138" textAnchor="middle" fill="#C5A880" fontSize="10" letterSpacing="0.2em" fontFamily="sans-serif">
                8 PENTHOUSES
              </text>
            </g>

            {/* Centerpiece 25m Saltwater Lap Pool */}
            <g transform="translate(700, 500)">
              <rect width="320" height="110" rx="24" fill="#0E2C33" stroke="#2DD4BF" strokeWidth="1.5" strokeOpacity="0.4" />
              <rect x="20" y="20" width="280" height="70" rx="14" fill="#15434D" fillOpacity="0.6" />
              <text x="160" y="60" textAnchor="middle" fill="#2DD4BF" fontSize="12" letterSpacing="0.25em" fontFamily="sans-serif">
                25M SALTWATER OASIS
              </text>
            </g>

            {/* Biophilic Gardens Zones */}
            <circle cx="620" cy="640" r="45" fill="#1A2D22" fillOpacity="0.7" stroke="#4ADE80" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="1120" cy="620" r="55" fill="#1A2D22" fillOpacity="0.7" stroke="#4ADE80" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="1450" cy="520" r="40" fill="#1A2D22" fillOpacity="0.7" stroke="#4ADE80" strokeWidth="1" strokeOpacity="0.3" />

            {/* Gatehouse / EV Subterranean Ramp */}
            <g transform="translate(180, 580)">
              <rect width="110" height="90" rx="12" fill="#24211D" stroke="#D9383A" strokeWidth="1.5" strokeOpacity="0.5" />
              <text x="55" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="serif">GATEWAY</text>
              <text x="55" y="66" textAnchor="middle" fill="#D9383A" fontSize="9" letterSpacing="0.1em" fontFamily="sans-serif">24/7 SECURE</text>
            </g>
          </svg>

          {/* Interactive Hotspot Buttons on the Diagram */}
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                }}
                className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#121514] border border-[#C5A880] text-[#C5A880] hover:scale-125 transition-transform duration-300 shadow-xl cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
              </button>

              {/* Tooltip Card on Hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-xl text-left pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl z-30">
                <span className="text-[9px] font-sans tracking-widest uppercase text-[#C5A880] block font-semibold">
                  {spot.category}
                </span>
                <p className="font-serif text-sm text-white font-medium mb-1">{spot.name}</p>
                <p className="font-sans text-[10px] text-white/60 leading-relaxed">{spot.units}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Selected Hotspot Drawer / Banner */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="absolute bottom-6 left-6 right-6 z-30 p-5 rounded-2xl bg-[#141816]/95 border border-[#C5A880]/40 backdrop-blur-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#C5A880] font-semibold">
                    {activeHotspot.category} · {activeHotspot.units}
                  </span>
                </div>
                <h4 className="font-serif text-xl text-white">{activeHotspot.name}</h4>
                <p className="font-sans text-xs text-white/70 max-w-xl mt-1">{activeHotspot.description}</p>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="px-4 py-2 rounded-full border border-white/20 text-xs font-sans uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Helper Bar */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-xs font-sans tracking-widest uppercase text-white/70 pointer-events-none">
          <Compass size={14} className="text-[#C5A880]" />
          <span>Arabian Sea Facing · Strictly {TOTAL_UNITS} Residences</span>
        </div>
      </div>
    </section>
  );
}
