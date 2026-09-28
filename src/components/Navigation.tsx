'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onOpenBooking?: () => void;
}

export default function Navigation({ onOpenBooking }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.to('.menu-overlay', { opacity: 1, pointerEvents: 'auto', duration: 0.5, ease: 'power2.out' });
      gsap.fromTo('.menu-link', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );
    } else {
      gsap.to('.menu-overlay', { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.inOut' });
    }
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 py-6 px-8 md:px-14 flex justify-between items-center mix-blend-difference text-white">
        <a href="#" className="font-serif text-xl tracking-tight text-white hover:opacity-80 transition-opacity">
          Apex <span className="italic font-light">Residency</span>
        </a>
        
        <div className="flex items-center gap-6">
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center font-sans text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border border-white/40 hover:bg-white hover:text-black transition-all duration-300"
            >
              Book a Viewing
            </button>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 flex items-center justify-center p-2"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`block h-[1px] bg-white transition-all duration-300 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-8 group-hover:w-6'}`} />
              <span className={`block h-[1px] bg-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'w-6 group-hover:w-8'}`} />
              <span className={`block h-[1px] bg-white transition-all duration-300 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-4 group-hover:w-8'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay */}
      <div className="menu-overlay fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-3xl opacity-0 pointer-events-none flex flex-col justify-center items-center">
        <ul className="flex flex-col gap-8 text-center">
          {['Portfolio', 'Developments', 'Journal', 'Contact'].map((item) => (
            <li key={item} className="menu-link overflow-hidden">
              <a 
                href={item === 'Portfolio' || item === 'Developments' ? '#residences' : '#hero'} 
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-7xl font-outfit font-medium text-white/80 hover:text-white transition-colors tracking-tight"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-link absolute bottom-12 font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
          Apex Residency © 2026
        </div>
      </div>
    </>
  );
}
