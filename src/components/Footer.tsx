'use client';

import Link from 'next/link';
import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1110] text-[#EFECE6] border-t border-white/10 relative overflow-hidden">
      {/* CLOSING CTA BLOCK */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden flex items-center justify-center text-center">
        {/* Full-bleed background image with dark vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/properties/worli_living.jpg"
            alt="Perfect sea views from rooftop terraces"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1110] via-[#0E1110]/70 to-[#0E1110]" />
        </div>

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <span className="w-16 h-[2px] bg-[#D9383A] mb-8" />
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white font-normal">
            Perfect sea views — <br className="hidden sm:inline" />
            <span className="italic font-light">From rooftop terraces</span>
          </h2>
          <p className="font-sans text-sm md:text-base opacity-75 max-w-xl mb-10 leading-relaxed">
            A short conversation is enough to understand which apartment fits your use case...
          </p>
          <Link
            href="/apartments"
            className="px-8 py-4 rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold bg-[#EFECE6] text-[#0E1110] hover:bg-white hover:scale-105 transition-all shadow-2xl"
          >
            View Available Apartments
          </Link>
        </div>
      </section>

      {/* FOOTER METADATA & LINKS */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Address */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="font-serif text-3xl uppercase tracking-wider text-white mb-4 block">
                Apex <span className="italic font-light">Residency</span>
              </Link>
              <p className="font-sans text-xs uppercase tracking-[0.3em] opacity-50 mb-6">
                Mumbai · New Golden Mile · Coastal Sanctuary
              </p>
              <div className="space-y-2.5 text-sm opacity-70 font-sans">
                <a
                  href="https://maps.google.com/?q=Worli+Sea+Face,+Mumbai,+Maharashtra,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white transition-colors"
                >
                  <MapPin size={16} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                  <span>Sales Pavilion: Apex Tower, New Golden Mile, Worli Sea Face, Mumbai 400018</span>
                </a>
                <a
                  href="tel:+912269888800"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone size={16} className="text-[#C5A880] flex-shrink-0" />
                  <span>+91 (22) 6988-8800</span>
                </a>
                <a
                  href="mailto:concierge@apexresidency.com"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-[#C5A880] flex-shrink-0" />
                  <span>concierge@apexresidency.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-sm font-sans">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-4">
                Apartments
              </span>
              <ul className="space-y-3 opacity-65">
                <li>
                  <Link href="/apartments?type=ground-floor-basement" className="hover:text-white transition-colors">
                    Ground Floor + Basement
                  </Link>
                </li>
                <li>
                  <Link href="/apartments?type=ground-floor" className="hover:text-white transition-colors">
                    Ground Floor
                  </Link>
                </li>
                <li>
                  <Link href="/apartments?type=penthouse-duplex" className="hover:text-white transition-colors">
                    Penthouse Duplex
                  </Link>
                </li>
                <li>
                  <Link href="/apartments" className="hover:text-white transition-colors">
                    Full 24-Unit Catalog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-4">
                Project
              </span>
              <ul className="space-y-3 opacity-65">
                <li>
                  <Link href="/#concept" className="hover:text-white transition-colors">
                    The Concept
                  </Link>
                </li>
                <li>
                  <Link href="/#location" className="hover:text-white transition-colors">
                    New Golden Mile
                  </Link>
                </li>
                <li>
                  <Link href="/#masterplan" className="hover:text-white transition-colors">
                    Master Plan
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact & Sales
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Icons & To Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-4">
                Follow APEX
              </span>
              <div className="flex items-center gap-4 text-white/60">
                <a
                  href="https://instagram.com/apexresidency_mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/apexresidencymumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/apex-residency-mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-8 md:mt-0 flex items-center gap-2 text-xs font-sans tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              <span>To Top</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                <ArrowUp size={14} />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans opacity-45">
          <p>© 2026 Apex Residency Mumbai. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <span>MahaRERA: P51900084920</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
