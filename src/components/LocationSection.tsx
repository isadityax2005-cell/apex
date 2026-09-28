'use client';

import { MapPin, Navigation, Compass, Waves } from 'lucide-react';

const LANDMARKS = [
  { name: 'Bandra-Worli Sea Link', time: '3 min', type: 'Direct Access' },
  { name: 'BKC Financial Center', time: '14 min', type: 'Executive Corridor' },
  { name: 'Chhatrapati Shivaji Intl Airport', time: '22 min', type: 'Private Aviation Terminal' },
  { name: 'Worli Royal Yacht Club & Marina', time: '6 min', type: 'Waterfront Berth' },
  { name: 'Taj Lands End & Coastline', time: '8 min', type: 'Private Dining' },
  { name: 'Juhu Beachfront Sanctuary', time: '0 min', type: 'Direct Beach Walkway' },
];

export default function LocationSection() {
  return (
    <section id="location" className="relative py-32 px-8 md:px-14 overflow-hidden bg-[#1B1E1D] text-[#EFECE6]">
      {/* Drifting Clouds / Fog Ambient Marquee Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="flex w-[200%] h-full animate-[marquee_45s_linear_infinite]">
          <div className="w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent blur-3xl" />
          <div className="w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent blur-3xl" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 mb-20 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">02 — The Geography</p>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
              New Golden <br />
              <span className="italic font-light">Mile, Mumbai</span>
            </h2>
          </div>
          <div>
            <p className="font-sans text-lg md:text-xl opacity-70 leading-relaxed max-w-2xl mb-8">
              Stretching seamlessly across the Arabian Sea coastline from Worli's sky-high horizons, through Bandra's private lanes, to Juhu's tranquil beachfront. Apex Residency anchors Mumbai's most prestigious coastal addresses.
            </p>
            <div className="flex items-center gap-6 font-sans text-xs tracking-widest uppercase opacity-45">
              <span className="flex items-center gap-1.5"><Compass size={14} /> 18.9986° N, 72.8174° E</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><Waves size={14} /> Arabian Sea Shoreline</span>
            </div>
          </div>
        </div>

        {/* Coastal Map & Connection Track */}
        <div className="rounded-3xl p-8 md:p-14 border border-white/10 mb-16 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)' }}>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Three Nodes Connecting Track */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs tracking-widest uppercase opacity-40">01 / South Sanctum</span>
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </div>
              <h3 className="font-serif text-3xl mb-2 text-white">Worli</h3>
              <p className="font-serif text-sm italic opacity-60 mb-4">The Penthouse · 6,200 sq.ft</p>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-4">
                Elevated high above the Arabian Sea with panoramic 270° views spanning the Bandra-Worli Sea Link and city skyline.
              </p>
              <div className="text-[11px] font-mono tracking-wider opacity-40 uppercase pt-3 border-t border-white/10">
                Sea Link: 03 Mins
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs tracking-widest uppercase opacity-40">02 / Central Haven</span>
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </div>
              <h3 className="font-serif text-3xl mb-2 text-white">Bandra</h3>
              <p className="font-serif text-sm italic opacity-60 mb-4">The Villa · 8,500 sq.ft</p>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-4">
                Enclosed private Mediterranean compound draped in bougainvillea, minutes from private members' clubs and Carter Road promenade.
              </p>
              <div className="text-[11px] font-mono tracking-wider opacity-40 uppercase pt-3 border-t border-white/10">
                BKC Hub: 14 Mins
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs tracking-widest uppercase opacity-40">03 / Beachfront</span>
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </div>
              <h3 className="font-serif text-3xl mb-2 text-white">Juhu</h3>
              <p className="font-serif text-sm italic opacity-60 mb-4">The Mansion · 12,000 sq.ft</p>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-4">
                Direct private tidal access to Juhu Beach. An architectural brutalist monolith in raw board-formed concrete and teak.
              </p>
              <div className="text-[11px] font-mono tracking-wider opacity-40 uppercase pt-3 border-t border-white/10">
                Private Flight Terminal: 20 Mins
              </div>
            </div>
          </div>
        </div>

        {/* Travel Distances Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {LANDMARKS.map((lm) => (
            <div key={lm.name} className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <p className="font-serif text-2xl text-white mb-1">{lm.time}</p>
              <p className="font-sans text-xs text-white/90 font-medium mb-1 leading-snug">{lm.name}</p>
              <p className="font-sans text-[10px] tracking-wider uppercase opacity-40">{lm.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
