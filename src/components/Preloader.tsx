'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const mountainPathRef = useRef<SVGPathElement>(null);
  const waterLineRef = useRef<SVGLineElement>(null);
  const sunCircleRef = useRef<SVGCircleElement>(null);
  const brandTitleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Check if preloader has already played this session
    const hasLoaded = sessionStorage.getItem('apex_preloader_shown');
    if (hasLoaded) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const lenis = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis : undefined;
    lenis?.stop();

    // Setup SVG path lengths for stroke draw
    if (mountainPathRef.current) {
      const len = mountainPathRef.current.getTotalLength();
      gsap.set(mountainPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
    }
    if (waterLineRef.current) {
      const len = 160;
      gsap.set(waterLineRef.current, { strokeDasharray: len, strokeDashoffset: len });
    }
    if (sunCircleRef.current) {
      const len = 2 * Math.PI * 18;
      gsap.set(sunCircleRef.current, { strokeDasharray: len, strokeDashoffset: len });
    }

    const masterTl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('apex_preloader_shown', 'true');
        setVisible(false);
        lenis?.start();
        onComplete?.();
      },
    });

    const counterObj = { val: 0 };

    masterTl
      // 1. Counter 0 -> 100
      .to(counterObj, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(counterObj.val).toString().padStart(2, '0');
          }
        },
      })
      // 2. Draw brand line SVG
      .to(
        [mountainPathRef.current, waterLineRef.current, sunCircleRef.current],
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
        },
        0.2
      )
      // 3. Reveal Brand text
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.4
      )
      .fromTo(
        brandTitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.6
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.8, y: 0, duration: 0.6, ease: 'power2.out' },
        0.8
      )
      // 4. Brief pause at 100%
      .to({}, { duration: 0.2 })
      // 5. Curtain wipe clip-path inset(0) -> inset(0 0 100% 0)
      .to(containerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 1.0,
        ease: 'expo.inOut',
      });

    return () => {
      masterTl.kill();
      lenis?.start();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      className="fixed inset-0 z-[200] bg-[#0E1110] text-[#EFECE6] flex flex-col items-center justify-between pointer-events-auto select-none p-8 md:p-14"
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-xs font-sans tracking-[0.3em] uppercase opacity-40">
        <span>Apex Residency</span>
        <span>Mumbai · New Golden Mile</span>
      </div>

      {/* Center Brand & SVG Line Reveal */}
      <div className="flex flex-col items-center text-center max-w-lg my-auto">
        <p ref={subtitleRef} className="font-sans text-[11px] tracking-[0.4em] uppercase text-[#C5A880] mb-5">
          Worli Sea Face · 24 Residences
        </p>

        {/* Line Art Landscape SVG with stroke draw */}
        <div className="w-48 h-24 mb-6">
          <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Sun */}
            <circle
              ref={sunCircleRef}
              cx="100"
              cy="45"
              r="18"
              stroke="#C5A880"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.8"
            />
            {/* Coastal Crests */}
            <path
              ref={mountainPathRef}
              d="M10 85L60 35L105 75L145 42L190 85"
              stroke="#EFECE6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Shoreline Water Line */}
            <line
              ref={waterLineRef}
              x1="20"
              y1="88"
              x2="180"
              y2="88"
              stroke="#C5A880"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h1
          ref={brandTitleRef}
          className="font-serif text-5xl sm:text-6xl md:text-7xl uppercase tracking-[0.15em] leading-tight text-white mb-4"
        >
          Apex <span className="italic font-light">Residency</span>
        </h1>

        {/* Tagline */}
        <p ref={taglineRef} className="font-serif text-xl italic text-[#C5A880]">
          A place to return to.
        </p>
      </div>

      {/* Bottom Counter */}
      <div className="w-full flex justify-between items-end border-t border-white/10 pt-6">
        <div className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40">
          Curated Architectural Living
        </div>
        <div className="flex items-baseline gap-1 font-mono text-2xl sm:text-3xl text-white font-light tabular-nums">
          <span ref={counterRef}>00</span>
          <span className="text-xs text-[#C5A880] font-sans uppercase tracking-widest">%</span>
        </div>
      </div>
    </div>
  );
}
