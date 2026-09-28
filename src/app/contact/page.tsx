'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import BougainvilleaDrift from '@/components/BougainvilleaDrift';
import BookCallModal from '@/components/BookCallModal';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen">
      <CookieBanner />
      <BougainvilleaDrift />
      <Header breadcrumb={[{ label: 'Contact' }]} />

      <BookCallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultResidence="Direct Contact Request"
      />

      <div className="pt-28 md:pt-36 px-6 md:px-12 max-w-7xl mx-auto pb-24">
        {/* Title Header */}
        <div className="max-w-3xl mb-16 border-b border-white/10 pb-10">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-2">
            Sales & Advisory Atelier
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-6">
            Contact Us
          </h1>
          <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">
            Our private client directors are available for scheduled sales office appointments, on-site construction previews, and comprehensive brochure deliveries.
          </p>
        </div>

        {/* Contact Details & Stylized Map Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left Details Suite */}
          <div className="lg:col-span-6 space-y-8">
            {/* Sales Office Card */}
            <div className="p-8 md:p-10 rounded-3xl bg-[#171A19] border border-white/10 shadow-xl space-y-6">
              <h2 className="font-serif text-2xl text-white">Sales & Exhibition Atelier</h2>

              <div className="space-y-5 text-sm font-sans">
                <div className="flex items-start gap-3.5">
                  <MapPin size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-white">Apex Tower, Worli Sea Face, Mumbai 400018, Maharashtra, India</p>
                    <p className="text-xs text-[#C5A880] mt-0.5">New Golden Mile · Waterfront Promenade</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Working Hours</p>
                    <p className="text-white">Monday – Sunday: 09:00 – 21:00 IST</p>
                    <p className="text-xs opacity-60 mt-0.5">Private previews strictly by advance appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Direct Concierge Line</p>
                    <a href="tel:+912269888800" className="text-white hover:text-[#C5A880] transition-colors font-medium">
                      +91 (22) 6988-8800
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Electronic Inquiries</p>
                    <a href="mailto:concierge@apexresidency.com" className="text-white hover:text-[#C5A880] transition-colors">
                      concierge@apexresidency.com
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Fast Track Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/912269888800?text=Hello%20Apex%20Residency%20team,%20I%20would%20like%20to%20inquire%20about%20the%2024%20private%20residences."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full font-sans text-xs tracking-widest uppercase font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3.5 rounded-full font-sans text-xs tracking-widest uppercase font-semibold bg-white text-[#121514] hover:bg-[#EFECE6] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Book a call</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Regulatory & Institutional Credentials */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-white mb-1">MahaRERA Registered</h3>
                <p className="font-sans text-xs opacity-60">Registration No: P51900084920 · MCGM Clearances</p>
              </div>
              <a
                href="https://maharera.mahaonline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/20 text-xs font-sans uppercase tracking-widest hover:border-white transition-colors flex items-center gap-1.5"
              >
                <span>Verify</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Right Stylized SVG Map Graphic of Mumbai Coast */}
          <div className="lg:col-span-6 rounded-3xl bg-[#141816] border border-white/10 p-8 md:p-10 shadow-2xl overflow-hidden relative flex flex-col justify-between min-h-[560px]">
            {/* Stylized SVG Map of Mumbai Coastline & Worli Sea Face */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <svg viewBox="0 0 600 600" className="w-full h-full opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Arabian Sea Water Background */}
                <rect width="600" height="600" fill="#0C100F" />
                {/* Sea depth gradient */}
                <path d="M0 0 L320 0 C280 200 240 350 200 600 L0 600 Z" fill="#0E1B1E" fillOpacity="0.8" />
                
                {/* Mumbai Coastline Path (Worli Peninsula, Bandra Bay, Mahim Bay) */}
                <path
                  d="M320 0 C300 120 280 180 260 250 C240 320 260 400 220 480 C190 540 210 600 210 600 L600 600 L600 0 Z"
                  fill="#161D1A"
                  stroke="#C5A880"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />

                {/* Grid coordinates lines */}
                <line x1="0" y1="200" x2="600" y2="200" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="0" y1="400" x2="600" y2="400" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="600" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                <line x1="400" y1="0" x2="400" y2="600" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

                {/* Bandra-Worli Sea Link Arc */}
                <path
                  d="M260 250 C180 220 160 140 280 90"
                  stroke="#C5A880"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />
                <text x="140" y="170" fill="#C5A880" fontSize="9" letterSpacing="0.15em" fontFamily="sans-serif" fillOpacity="0.7">
                  SEA LINK
                </text>

                {/* Coastal Road Freeway */}
                <path
                  d="M260 250 C240 320 250 390 220 480"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />

                {/* Landmarks Text */}
                <text x="350" y="100" fill="#FFFFFF" fillOpacity="0.3" fontSize="10" letterSpacing="0.2em" fontFamily="sans-serif">
                  BANDRA WEST
                </text>
                <text x="380" y="340" fill="#FFFFFF" fillOpacity="0.3" fontSize="10" letterSpacing="0.2em" fontFamily="sans-serif">
                  LOWER PAREL
                </text>
                <text x="320" y="520" fill="#FFFFFF" fillOpacity="0.3" fontSize="10" letterSpacing="0.2em" fontFamily="sans-serif">
                  NARIMAN POINT
                </text>
                <text x="60" y="320" fill="#C5A880" fillOpacity="0.3" fontSize="11" letterSpacing="0.3em" fontFamily="sans-serif">
                  ARABIAN SEA
                </text>

                {/* Apex Residency Pin Location (Worli Sea Face) */}
                <circle cx="260" cy="250" r="28" fill="#C5A880" fillOpacity="0.15" />
                <circle cx="260" cy="250" r="16" fill="#C5A880" fillOpacity="0.3" />
                <circle cx="260" cy="250" r="7" fill="#C5A880" />
                <circle cx="260" cy="250" r="3" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Top Pin Badge */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="px-4 py-2 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Atelier · Daily 09:00 – 21:00 IST
                </span>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Center Map Card */}
            <div className="relative z-10 my-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border border-[#C5A880]/60 bg-black/80 backdrop-blur-md flex items-center justify-center text-[#C5A880] mb-4 shadow-2xl">
                <MapPin size={26} />
              </div>
              <h3 className="font-serif text-3xl text-white mb-2">Apex Residency Experience Atelier</h3>
              <p className="font-sans text-xs text-white/70 max-w-sm">
                Apex Tower, New Golden Mile, Worli Sea Face, Mumbai 400018
              </p>
              <p className="font-mono text-[10px] text-[#C5A880] mt-1 tracking-wider">
                18.9986° N, 72.8152° E
              </p>
            </div>

            {/* Bottom Direct CTA */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="https://maps.google.com/?q=Worli+Sea+Face,+Mumbai,+Maharashtra,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans tracking-widest uppercase text-[#C5A880] hover:underline flex items-center gap-1.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white transition-all shadow-xl cursor-pointer"
              >
                Book a call now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
