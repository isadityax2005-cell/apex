'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import MenuOverlay from './MenuOverlay';
import BookCallModal from './BookCallModal';

interface HeaderProps {
  breadcrumb?: { label: string; href?: string }[];
  lightingMode?: 'day' | 'night';
  onToggleLighting?: (mode: 'day' | 'night') => void;
}

export default function Header({ breadcrumb, lightingMode, onToggleLighting }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-400 ${
          scrolled || !isHome
            ? 'bg-[#121514]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-4 px-6 md:px-12'
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 px-6 md:px-12'
        } text-[#EFECE6]`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand or Breadcrumb */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col group flex-shrink-0">
              <span className="font-serif text-xl tracking-wider uppercase text-white group-hover:opacity-85 transition-opacity font-normal">
                Apex <span className="italic font-light">Residency</span>
              </span>
              <span className="font-sans text-[8.5px] tracking-[0.3em] uppercase text-white/50">
                Mumbai · New Golden Mile
              </span>
            </Link>

            {/* Breadcrumb on inner pages */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-2 text-xs font-sans opacity-60 border-l border-white/15 pl-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                {breadcrumb.map((crumb, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <span className="opacity-40">/</span>
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-white transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white font-medium">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>

          {/* Center: By Day / By Night Switcher if available */}
          {onToggleLighting && isHome && (
            <div
              className="hidden md:flex items-center p-1 rounded-full border border-white/20 shadow-xl"
              style={{
                background: 'rgba(20, 24, 23, 0.65)',
                backdropFilter: 'blur(16px)',
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

          {/* Right Action Suite */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/apartments"
              className="hidden sm:inline-flex items-center font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full bg-[#EFECE6] text-[#121514] font-semibold hover:bg-white transition-all shadow-md"
            >
              Select an Apartment
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:inline-flex items-center font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 rounded-full border border-white/30 hover:border-white hover:bg-white/10 transition-all font-medium cursor-pointer"
            >
              Book a call
            </button>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
            >
              Contact
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-all font-sans text-xs tracking-widest uppercase cursor-pointer"
              aria-label="Open navigation menu"
            >
              <span className="hidden sm:inline">Menu</span>
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenBooking={() => setModalOpen(true)}
      />

      {/* Book Call Modal */}
      <BookCallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
