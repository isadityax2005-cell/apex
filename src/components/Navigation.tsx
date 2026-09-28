'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onOpenBooking?: () => void;
  lightingMode?: 'day' | 'night';
  onToggleLighting?: (mode: 'day' | 'night') => void;
}

export default function Navigation({ 
  onOpenBooking, 
  lightingMode = 'day', 
  onToggleLighting 
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <nav 
        className={`fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center text-white transition-all duration-500 ${
          scrolled 
            ? 'bg-[#101312]/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
            : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex flex-col group">
          <span className="font-serif text-xl tracking-[0.08em] text-[#EFECE6] group-hover:opacity-80 transition-opacity uppercase font-normal">
            Apex <span className="italic font-light">Residency</span>
          </span>
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-white/50">
            Mumbai · India
          </span>
        </a>

        {/* Center: ERA By Day / By Night Switcher */}
        {onToggleLighting && (
          <div 
            className="flex items-center p-1 rounded-full border border-white/20 shadow-xl"
            style={{ 
              background: 'rgba(20, 24, 23, 0.65)', 
              backdropFilter: 'blur(16px)', 
              WebkitBackdropFilter: 'blur(16px)' 
            }}
          >
            <button
              onClick={() => onToggleLighting('day')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                lightingMode === 'day' 
                  ? 'bg-white text-[#1A1D1C] font-semibold shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              By Day
            </button>
            <button
              onClick={() => onToggleLighting('night')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                lightingMode === 'night' 
                  ? 'bg-white text-[#1A1D1C] font-semibold shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              By Night
            </button>
          </div>
        )}
        
        {/* Right Controls */}
        <div className="flex items-center gap-5">
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center font-sans text-[10px] tracking-[0.22em] uppercase px-5 py-2.5 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              Book a Viewing
            </button>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`block h-[1px] bg-white transition-all duration-300 ease-out ${isOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-7 group-hover:w-5'}`} />
              <span className={`block h-[1px] bg-white transition-all duration-300 ease-out ${isOpen ? 'opacity-0' : 'w-5 group-hover:w-7'}`} />
              <span className={`block h-[1px] bg-white transition-all duration-300 ease-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-3 group-hover:w-7'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Fullscreen Overlay */}
      <div className="menu-overlay fixed inset-0 z-40 bg-[#0A0D0C]/95 backdrop-blur-3xl opacity-0 pointer-events-none flex flex-col justify-center items-center">
        <ul className="flex flex-col gap-8 text-center">
          {['The Residences', 'The Geography', 'Specifications', 'Institutional Governance', 'Inquiries'].map((item) => {
            const anchor = item === 'The Residences' ? '#residences' 
              : item === 'The Geography' ? '#location'
              : item === 'Specifications' ? '#residences'
              : item === 'Institutional Governance' ? '#vision'
              : '#hero';
            return (
              <li key={item} className="menu-link overflow-hidden">
                <a 
                  href={anchor} 
                  onClick={() => setIsOpen(false)}
                  className="text-4xl md:text-6xl font-serif font-light text-white/80 hover:text-white transition-colors tracking-wide"
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="menu-link absolute bottom-12 font-sans text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Apex Residency · New Golden Mile, Mumbai © 2026
        </div>
      </div>
    </>
  );
}
