'use client';

import { useEffect, useRef } from 'react';
import { Compass, Waves, MapPin, Navigation, Car, Plane, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DESTINATIONS = [
  { name: 'Bandra-Worli Sea Link', time: '3 min', icon: Waves },
  { name: 'Lower Parel Financial Hub', time: '8 min', icon: Building2 },
  { name: 'Willingdon Sports Club & Golf', time: '10 min', icon: Navigation },
  { name: 'Bandra Kurla Complex (BKC)', time: '14 min', icon: Car },
  { name: 'Juhu Beach & Bandstand', time: '18 min', icon: MapPin },
  { name: 'Mumbai International Airport (BOM)', time: '22 min', icon: Plane },
];

const WAYPOINTS = [
  { name: 'Worli Sea Face', label: 'Apex Residency', offset: '0%', cx: 40, cy: 35 },
  { name: 'Sea Link Entry', label: '3 min', offset: '20%', cx: 180, cy: 22 },
  { name: 'Lower Parel Hub', label: '8 min', offset: '40%', cx: 340, cy: 38 },
  { name: 'BKC Financial Center', label: '14 min', offset: '60%', cx: 500, cy: 18 },
  { name: 'Juhu & Bandra', label: '18 min', offset: '80%', cx: 650, cy: 36 },
  { name: 'Mumbai Airport (BOM)', label: '22 min', offset: '100%', cx: 760, cy: 26 },
];

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);
  const cloud3Ref = useRef<HTMLDivElement>(null);
  const cloud4Ref = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrub route path stroke-dashoffset
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.8,
            onUpdate: (self) => {
              // Reveal waypoint labels at progress marks
              if (labelsRef.current) {
                const nodes = labelsRef.current.querySelectorAll('.waypoint-node');
                nodes.forEach((node, index) => {
                  const threshold = index / (nodes.length - 1);
                  if (self.progress >= threshold * 0.9) {
                    node.classList.add('opacity-100', 'scale-100');
                    node.classList.remove('opacity-30', 'scale-90');
                  } else {
                    node.classList.remove('opacity-100', 'scale-100');
                    node.classList.add('opacity-30', 'scale-90');
                  }
                });
              }
            },
          },
        });
      }

      // 2. 4 Cloud Layers with varied parallax speeds (0.2 / 0.35 / 0.5 / 0.7)
      if (cloud1Ref.current) {
        gsap.to(cloud1Ref.current, {
          xPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.2,
          },
        });
      }
      if (cloud2Ref.current) {
        gsap.to(cloud2Ref.current, {
          xPercent: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.35,
          },
        });
      }
      if (cloud3Ref.current) {
        gsap.to(cloud3Ref.current, {
          xPercent: 42,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
      if (cloud4Ref.current) {
        gsap.to(cloud4Ref.current, {
          xPercent: -55,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden bg-[#161918] text-[#EFECE6]"
    >
      {/* 4 Drifting Cloud Layers with Parallax Scrub */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Cloud Layer 1 - Deep soft mist */}
        <div
          ref={cloud1Ref}
          className="absolute -top-24 -left-1/4 w-[150%] h-[320px] opacity-15 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl pointer-events-none"
        />
        {/* Cloud Layer 2 - Mid altitude ocean haze */}
        <div
          ref={cloud2Ref}
          className="absolute top-1/3 -right-1/4 w-[160%] h-[400px] opacity-20 bg-[radial-gradient(ellipse_at_center,_rgba(197,168,128,0.12),_transparent_70%)] blur-2xl pointer-events-none"
        />
        {/* Cloud Layer 3 - Foreground coastal cumulus */}
        <div
          ref={cloud3Ref}
          className="absolute bottom-12 -left-1/3 w-[170%] h-[300px] opacity-10 bg-gradient-to-tr from-white/15 via-white/5 to-transparent blur-3xl pointer-events-none"
        />
        {/* Cloud Layer 4 - Fast drifting sea vapor */}
        <div
          ref={cloud4Ref}
          className="absolute -bottom-20 -right-1/4 w-[150%] h-[260px] opacity-15 bg-gradient-to-l from-white/10 via-transparent to-transparent blur-2xl pointer-events-none"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
            <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Mumbai Strategic Axis</p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight">
            The coast you wanted <br className="hidden sm:inline" />
            <span className="italic font-light">yours this year</span>
          </h2>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
            New Golden Mile · Worli Sea Face · Arabian Sea Promenade, Mumbai
          </p>
        </div>

        {/* Animated SVG Route Map & Landmarks Grid */}
        <div className="rounded-3xl p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-xl mb-12 shadow-2xl">
          {/* Animated Route Graphic */}
          <div className="relative w-full h-48 sm:h-60 mb-12 overflow-hidden rounded-2xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-sans opacity-70">
              <span className="flex items-center gap-2 text-[#C5A880] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
                Apex Residency · Worli Sea Face
              </span>
              <span className="hidden sm:inline opacity-60">Bandra-Worli Sea Link & Coastal Road Freeway</span>
              <span className="text-white font-medium">BOM Int&apos;l Airport · 22 min</span>
            </div>

            {/* SVG Connecting Track with Scrub Dash Line */}
            <div className="relative w-full my-3">
              <svg viewBox="0 0 800 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-14">
                {/* Background track guide */}
                <path d="M40 35 Q180 15 340 35 T760 26" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
                {/* Scrubbed golden path */}
                <path
                  ref={pathRef}
                  d="M40 35 Q180 15 340 35 T760 26"
                  stroke="#C5A880"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Waypoint nodes */}
                {WAYPOINTS.map((wp, i) => (
                  <g key={i}>
                    <circle cx={wp.cx} cy={wp.cy} r={i === 0 ? 6 : 4.5} fill={i === 0 ? '#C5A880' : 'white'} />
                    {i === 0 && <circle cx={wp.cx} cy={wp.cy} r={10} stroke="#C5A880" strokeWidth="1.5" strokeOpacity="0.5" />}
                  </g>
                ))}
              </svg>
            </div>

            {/* Dynamic Labels beneath waypoints */}
            <div ref={labelsRef} className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[10px] font-sans uppercase tracking-wider text-center">
              {WAYPOINTS.map((wp, i) => (
                <div key={i} className="waypoint-node transition-all duration-500 opacity-30 scale-90">
                  <span className="text-white/90 block font-medium truncate">{wp.name}</span>
                  <span className="text-[#C5A880] text-[9px] block">{wp.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Landmarks Travel Time Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DESTINATIONS.map((dest, i) => {
              const Icon = dest.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A880]/50 transition-all hover:-translate-y-0.5"
                >
                  <Icon size={16} className="text-[#C5A880] mb-3" />
                  <p className="font-serif text-2xl text-white font-medium mb-1">{dest.time}</p>
                  <p className="font-sans text-[11px] opacity-70 leading-tight">{dest.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Geographic Coordinates & Coastal Air */}
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-sans opacity-50 uppercase tracking-widest pt-4 border-t border-white/10">
          <span className="flex items-center gap-2">
            <Compass size={14} className="text-[#C5A880]" />
            <span>18.9986° N, 72.8152° E</span>
          </span>
          <span>·</span>
          <span>Worli Sea Face Waterfront Promenade</span>
          <span>·</span>
          <span>Direct Access to Bandra-Worli Sea Link & Coastal Freeway</span>
        </div>
      </div>
    </section>
  );
}
