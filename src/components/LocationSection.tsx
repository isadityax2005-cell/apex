'use client';

import { Compass, Waves, MapPin, Navigation, Car, Plane, Utensils } from 'lucide-react';

const DESTINATIONS = [
  { name: 'Laguna Village & Beach Club', time: '3 min', icon: Waves },
  { name: 'Estepona Old Town & Marina', time: '6 min', icon: Navigation },
  { name: 'Los Flamingos Golf Club', time: '8 min', icon: Car },
  { name: 'Puerto Banús & Luxury Marina', time: '14 min', icon: Utensils },
  { name: 'Marbella Old Town & Golden Mile', time: '18 min', icon: MapPin },
  { name: 'Málaga International Airport (AGP)', time: '45 min', icon: Plane },
];

export default function LocationSection() {
  return (
    <section id="location" className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden bg-[#161918] text-[#EFECE6]">
      {/* Layered Drifting Clouds / Fog Parallax Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="flex w-[200%] h-full animate-[marquee_50s_linear_infinite]">
          <div className="w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent blur-3xl" />
          <div className="w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent blur-3xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
            <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Location & Connection</p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
            The coast you wanted <br className="hidden sm:inline" />
            <span className="italic font-light">yours this year</span>
          </h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
            New Golden Mile, Estepona, Costa del Sol, Spain
          </p>
        </div>

        {/* Animated SVG Route Map & Landmarks Grid */}
        <div className="rounded-3xl p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-xl mb-12">
          {/* Animated Route Graphic */}
          <div className="relative w-full h-44 sm:h-56 mb-12 overflow-hidden rounded-2xl bg-black/30 border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-sans opacity-70">
              <span className="flex items-center gap-2 text-[#C5A880]">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
                Apex Residency · Sea Face
              </span>
              <span>Mediterranean A-7 Coastal Arterial</span>
              <span className="text-white">Puerto Banús / Marbella</span>
            </div>

            {/* SVG Connecting Track with Animated Dash Line */}
            <div className="relative w-full my-4">
              <svg viewBox="0 0 800 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
                {/* Background track */}
                <path d="M20 30 Q200 10 400 30 T780 30" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                {/* Animated golden flow */}
                <path
                  d="M20 30 Q200 10 400 30 T780 30"
                  stroke="#C5A880"
                  strokeWidth="3"
                  strokeDasharray="12 12"
                  className="animate-[dash_15s_linear_infinite]"
                />
                {/* Waypoint nodes */}
                <circle cx="20" cy="30" r="6" fill="#C5A880" />
                <circle cx="220" cy="22" r="5" fill="white" />
                <circle cx="400" cy="30" r="5" fill="white" />
                <circle cx="580" cy="38" r="5" fill="white" />
                <circle cx="780" cy="30" r="6" fill="#C5A880" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-sans opacity-50 uppercase tracking-widest">
              <span>Estepona Port</span>
              <span>Costalita Beach</span>
              <span>Guadalmina</span>
              <span>San Pedro</span>
              <span>Marbella Club</span>
            </div>
          </div>

          {/* Landmarks Travel Time Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DESTINATIONS.map((dest, i) => {
              const Icon = dest.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A880]/50 transition-colors">
                  <Icon size={16} className="text-[#C5A880] mb-2" />
                  <p className="font-serif text-2xl text-white font-medium mb-1">{dest.time}</p>
                  <p className="font-sans text-[11px] opacity-65 leading-tight">{dest.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic Coordinates & Coastal Air */}
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-sans opacity-50 uppercase tracking-widest pt-4">
          <span className="flex items-center gap-2">
            <Compass size={14} className="text-[#C5A880]" />
            <span>36.4328° N, 5.1432° W</span>
          </span>
          <span>·</span>
          <span>Avg 320 Days of Annual Sunshine</span>
          <span>·</span>
          <span>Walking Distance to Sandy Beaches & Chiringuitos</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -200;
          }
        }
      `}</style>
    </section>
  );
}
