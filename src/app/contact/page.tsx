'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
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

        {/* Contact Details & Map Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left Details Suite */}
          <div className="lg:col-span-6 space-y-8">
            {/* Sales Office Card */}
            <div className="p-8 md:p-10 rounded-3xl bg-[#171A19] border border-white/10 shadow-xl space-y-6">
              <h2 className="font-serif text-2xl text-white">Sales & Exhibition Office</h2>

              <div className="space-y-5 text-sm font-sans">
                <div className="flex items-start gap-3.5">
                  <MapPin size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Address</p>
                    <p className="text-white">Avenida Litoral, 29680 Estepona, Malaga, Spain</p>
                    <p className="text-xs opacity-60 mt-0.5">New Golden Mile, Costa del Sol</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Working Hours</p>
                    <p className="text-white">Monday – Sunday: 09:00 – 21:00</p>
                    <p className="text-xs opacity-60 mt-0.5">Visits by advance appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Direct Line</p>
                    <a href="tel:+34655408648" className="text-white hover:text-[#C5A880] transition-colors font-medium">
                      +34 (655) 408-648
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail size={18} className="text-[#C5A880] flex-shrink-0 mt-1" />
                  <div>
                    <p className="opacity-50 text-xs uppercase tracking-wider mb-0.5">Electronic Inquiries</p>
                    <a href="mailto:info@era-residence.com" className="text-white hover:text-[#C5A880] transition-colors">
                      info@era-residence.com
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Fast Track Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/34655408648?text=Hello%20ERA%20Residence%20team,%20I%20would%20like%20to%20receive%20more%20information."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full font-sans text-xs tracking-widest uppercase font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-lg"
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

            {/* Social Media Channels */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-white mb-1">Stay Connected</h3>
                <p className="font-sans text-xs opacity-60">Follow official architectural and construction updates.</p>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/15 transition-all"
                  aria-label="Instagram"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/15 transition-all"
                  aria-label="Facebook"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Stylized Map Block (Page 4 brief: 'sales office - Daily 09:00 - 21:00') */}
          <div className="lg:col-span-6 rounded-3xl bg-[#171A19] border border-white/10 p-8 md:p-10 shadow-xl overflow-hidden relative flex flex-col justify-between min-h-[520px]">
            {/* Map Background Render */}
            <div className="absolute inset-0 z-0">
              <img
                src="/properties/worli_terrace.jpg"
                alt="Estepona Costa del Sol Map"
                className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A19] via-[#171A19]/80 to-transparent" />
            </div>

            {/* Top Pin Badge */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="px-4 py-2 rounded-full bg-black/75 border border-white/20 backdrop-blur-md">
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Sales Office · Daily 09:00 – 21:00
                </span>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Center Map Reticle Graphic */}
            <div className="relative z-10 my-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border border-[#C5A880]/60 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#C5A880] mb-4 shadow-2xl">
                <MapPin size={32} />
              </div>
              <h3 className="font-serif text-3xl text-white mb-2">ERA Residence Sales Lounge</h3>
              <p className="font-sans text-xs opacity-75 max-w-sm">
                Avenida Litoral, 29680 Estepona · Frontline Mediterranean Corridor
              </p>
            </div>

            {/* Bottom Direct CTA */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href="https://maps.google.com/?q=Avenida+Litoral,+29680+Estepona,+Malaga,+Spain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans tracking-widest uppercase text-[#C5A880] hover:underline"
              >
                Open in Google Maps →
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
