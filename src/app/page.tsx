'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import ThreeCanvas from '@/components/ThreeCanvas';
import { scrollState } from '@/lib/store';
import { AnimatedText, RevealText } from '@/components/AnimatedText';
import PropertyListing from '@/components/PropertyListing';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mumbaiTriggered, setMumbaiTriggered] = useState(false);

  useGSAP(() => {
    // Pin the hero section — 600vh of scroll space drives the whole journey
    ScrollTrigger.create({
      trigger: '.hero-sequence',
      start: 'top top',
      end: '+=600%',
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    // Fade out intro text as scroll begins
    gsap.to('.intro-group', {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-sequence',
        start: 'top top',
        end: 'top -35%',
        scrub: 1,
      },
    });

    // Planet labels — each appears/disappears as camera flies by
    const labels = [
      { sel: '.lbl-neptune', show: '5%', hide: '15%' },
      { sel: '.lbl-saturn',  show: '18%', hide: '28%' },
      { sel: '.lbl-jupiter', show: '28%', hide: '38%' },
      { sel: '.lbl-earth',   show: '42%', hide: '60%' },
      { sel: '.lbl-atmos',   show: '65%', hide: '80%' },
      { sel: '.lbl-house',   show: '90%', hide: '100%' },
    ];

    labels.forEach(({ sel, show, hide }) => {
      gsap.fromTo(sel,
        { opacity: 0, x: -16 },
        {
          opacity: 1, x: 0,
          scrollTrigger: { trigger: '.hero-sequence', start: `top -${show}`, end: `top -${hide}`, scrub: 1 },
        }
      );
      gsap.to(sel, {
        opacity: 0,
        scrollTrigger: { trigger: '.hero-sequence', start: `top -${hide}`, end: `top -${parseFloat(hide) + 8}%`, scrub: 1 },
      });
    });

    // Mumbai final reveal
    gsap.fromTo('.mumbai-reveal', { opacity: 0 }, {
      opacity: 1,
      scrollTrigger: {
        trigger: '.hero-sequence',
        start: 'top -84%',
        end: 'top -92%',
        scrub: 1,
        onEnter: () => setMumbaiTriggered(true),
        onEnterBack: () => setMumbaiTriggered(true),
      },
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="relative bg-transparent text-white">
      {/* 3D Canvas */}
      <ThreeCanvas />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 py-6 px-8 md:px-14 flex justify-between items-center pointer-events-none">
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/60">Apex Properties</span>
        <span className="font-mono text-[11px] tracking-[0.15em] text-white/30">Mumbai · India</span>
      </nav>

      {/* ── PINNED HERO ── */}
      <section className="hero-sequence relative h-screen w-full pointer-events-none overflow-hidden z-10">

        {/* 1. INTRO */}
        <div className="intro-group absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/70 mb-8 drop-shadow-md">
            Global Real Estate · Est. 2024
          </p>
          <h1 className="text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.93] tracking-[-0.04em] font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 mb-8 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <AnimatedText text="Explore Our World." delay={0.4} />
          </h1>
          <p className="font-mono text-[10px] tracking-[0.25em] text-white/50 mt-2 drop-shadow-md">
            Scroll to launch ↓
          </p>
        </div>

        {/* 2. PLANET LABELS bottom-left */}
        <div className="absolute bottom-10 left-8 md:left-14 z-10 space-y-2">
          <div className="lbl-neptune opacity-0 font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">— Neptune</div>
          <div className="lbl-saturn  opacity-0 font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">— Saturn</div>
          <div className="lbl-jupiter opacity-0 font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">— Jupiter</div>
        </div>

        {/* 3. EARTH ARRIVAL — right side */}
        <div className="lbl-earth opacity-0 absolute top-1/2 -translate-y-1/2 right-8 md:right-14 z-10 text-right">
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/40 uppercase mb-1">Arriving at</p>
          <p className="font-mono text-[15px] tracking-[0.12em] text-white/80 uppercase">Earth</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-white/25 mt-2">3rd Rock · Milky Way</p>
        </div>

        {/* 4. ATMOSPHERE ENTRY — top center */}
        <div className="lbl-atmos opacity-0 absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <p className="font-mono text-[10px] tracking-[0.35em] text-white/50 uppercase">◆ Entering Atmosphere</p>
        </div>
        
        {/* House Label */}
        <div className="lbl-house opacity-0 absolute top-1/2 right-16 -translate-y-1/2 z-10 text-right">
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/40 uppercase mb-4">◆ Live Property Preview</p>
          <h2 className="text-4xl font-medium tracking-tight mb-2">3D Architectural Walkthrough</h2>
          <p className="text-sm text-white/50 max-w-xs ml-auto">Procedural real-time WebGL rendering of upcoming luxury listings.</p>
        </div>

        {/* 5. MUMBAI REVEAL — bottom left */}
        <div className="mumbai-reveal opacity-0 absolute inset-0 flex flex-col items-start justify-end pb-16 pl-8 md:pl-14 z-10">
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/40 uppercase mb-4">◆ Location Acquired</p>
          <div className="w-20 h-px bg-white/15 mb-6" />

          <RevealText
            lines={['Based in', 'Mumbai.']}
            className="text-[clamp(3.2rem,8.5vw,7rem)] leading-[0.93] tracking-[-0.04em] font-semibold text-white mb-5"
            delay={0.05}
            triggered={mumbaiTriggered}
          />

          <p className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase">
            Maharashtra · 19.07°N 72.87°E
          </p>
        </div>
      </section>

      {/* ── PROPERTY LISTINGS (Unpinned, scrolls up over the canvas) ── */}
      <PropertyListing />

      <footer className="py-10 px-8 md:px-14 border-t border-white/5 bg-[#000005] relative z-10 flex justify-between">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/20 uppercase">Apex Properties</span>
        <span className="font-mono text-[10px] text-white/20">© 2026</span>
      </footer>
    </main>
  );
}
