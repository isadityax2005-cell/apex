'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

interface NavigationProps {
  onOpenBooking?: () => void;
  lightingMode?: 'day' | 'night';
  onToggleLighting?: (mode: 'day' | 'night') => void;
}

const BRAND_STATEMENTS = [
  'A private coastal sanctuary crafted between Arabian Sea tides and Mumbai light.',
  'Strictly 24 bespoke residences designed for generational privacy.',
  'Unrivaled waterfront frontage along Mumbai’s New Golden Mile.',
];

const NAV_LINKS = [
  { label: 'The Residences', href: '/apartments' },
  { label: 'Master Plan', href: '/#masterplan' },
  { label: 'Amenities', href: '/#amenities' },
  { label: 'Location & Axis', href: '/#location' },
  { label: 'Private Inquiries', href: '/contact' },
];

export default function Navigation({ 
  onOpenBooking, 
  lightingMode = 'day', 
  onToggleLighting 
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statementIndex, setStatementIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Statement rotation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % BRAND_STATEMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Menu animation with circle clip-path and Lenis lock
  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis : undefined;

    if (isOpen) {
      lenis?.stop();
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
        gsap.fromTo(
          overlayRef.current,
          { clipPath: 'circle(0% at calc(100% - 48px) 36px)', opacity: 1, pointerEvents: 'auto' },
          { clipPath: 'circle(150% at calc(100% - 48px) 36px)', duration: 0.9, ease: 'expo.inOut' }
        );
      }
      if (linksContainerRef.current) {
        const linkItems = linksContainerRef.current.querySelectorAll('.menu-link-inner');
        gsap.killTweensOf(linkItems);
        gsap.fromTo(
          linkItems,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
        );
      }
    } else {
      lenis?.start();
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
        gsap.to(overlayRef.current, {
          clipPath: 'circle(0% at calc(100% - 48px) 36px)',
          duration: 0.7,
          ease: 'expo.inOut',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.pointerEvents = 'none';
            }
          },
        });
      }
    }

    return () => {
      lenis?.start();
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center text-white transition-all duration-500 ${
          scrolled 
            ? 'bg-[#101312]/85 backdrop-blur-xl border-b border-white/10 shadow-lg' 
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent'
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col group">
          <span className="font-serif text-xl tracking-[0.08em] text-[#EFECE6] group-hover:opacity-80 transition-opacity uppercase font-normal">
            Apex <span className="italic font-light">Residency</span>
          </span>
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-white/50">
            Mumbai · India
          </span>
        </Link>

        {/* Center: Apex By Day / By Night Switcher */}
        {onToggleLighting && (
          <div 
            className="flex items-center p-1 rounded-full border border-white/20 shadow-xl"
            style={{ 
              background: 'rgba(20, 24, 23, 0.75)', 
              backdropFilter: 'blur(16px)', 
              WebkitBackdropFilter: 'blur(16px)' 
            }}
          >
            <button
              onClick={() => onToggleLighting('day')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                lightingMode === 'day' 
                  ? 'bg-white text-[#1A1D1C] font-semibold shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              By Day
            </button>
            <button
              onClick={() => onToggleLighting('night')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
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
              className="hidden sm:inline-flex items-center font-sans text-[10px] tracking-[0.22em] uppercase px-5 py-2.5 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-medium cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              Book a Call
            </button>
          )}

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="group relative z-50 flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
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

      {/* Fullscreen Overlay with Circle Clip-Path Growth */}
      <div 
        ref={overlayRef}
        style={{ clipPath: 'circle(0% at calc(100% - 48px) 36px)', pointerEvents: 'none' }}
        className="menu-overlay fixed inset-0 z-40 bg-[#0B0E0D]/98 backdrop-blur-3xl flex flex-col justify-between p-8 md:p-16"
      >
        {/* Overlay Header */}
        <div className="flex justify-between items-center text-xs font-sans tracking-[0.3em] uppercase opacity-40">
          <span>Apex Residency · Navigation</span>
          <span>Mumbai · 24 Residences</span>
        </div>

        {/* Links list */}
        <div className="my-auto py-8">
          <ul ref={linksContainerRef} className="flex flex-col gap-5 md:gap-7 text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="overflow-hidden py-1">
                <div className="menu-link-inner">
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="inline-block text-3xl sm:text-5xl md:text-6xl font-serif font-light text-white/85 hover:text-white transition-colors tracking-wide hover:italic"
                  >
                    {link.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Rotating Brand Statements & Footer */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="text-[#C5A880] italic font-serif text-sm md:text-base max-w-xl text-center md:text-left transition-opacity duration-500">
            &ldquo;{BRAND_STATEMENTS[statementIndex]}&rdquo;
          </div>
          <div className="tracking-[0.25em] text-white/40 uppercase text-[10px]">
            Apex Residency · Worli Sea Face © 2026
          </div>
        </div>
      </div>
    </>
  );
}
