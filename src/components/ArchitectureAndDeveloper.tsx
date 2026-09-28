'use client';

import { Award, ShieldCheck, Video, ArrowRight, ExternalLink } from 'lucide-react';

interface ArchitectureAndDeveloperProps {
  onOpenBooking: () => void;
}

export default function ArchitectureAndDeveloper({ onOpenBooking }: ArchitectureAndDeveloperProps) {
  return (
    <>
      {/* 12. ARCHITECTURE SECTION */}
      <section id="architecture" className="py-28 md:py-36 px-6 md:px-12 bg-[#171A19] text-[#EFECE6] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Architectural Atelier</p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-6">
              Contemporary <br />
              <span className="italic font-light">Lines & Warmth</span>
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest text-[#C5A880] mb-8 font-semibold">
              Architecture Team · Era Residence
            </p>
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#171A19] hover:bg-white transition-all shadow-lg cursor-pointer"
            >
              <span>Book a call now</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="w-16 h-[2px] bg-[#D9383A] mb-4" />
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic font-light leading-relaxed text-white/95">
              &ldquo;The architecture of ERA Residence unites clean contemporary lines with the warmth of traditional Mediterranean living. Natural limestone, timber accents, and filtered sea light create homes designed to endure.&rdquo;
            </blockquote>
            <p className="font-sans text-sm md:text-base opacity-70 leading-relaxed pt-4">
              Carefully calibrated cantilevers shield interiors from the midday Andalusian sun while inviting soft coastal reflections across expansive travertine terraces.
            </p>
          </div>
        </div>
      </section>

      {/* 13. DEVELOPER & STATUS SECTION */}
      <section id="developer" className="py-24 px-6 md:px-12 bg-[#121514] text-[#EFECE6] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Developer credentials */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-2 font-semibold">
                Developer & Delivery
              </span>
              <h3 className="font-serif text-2xl text-white mb-2">ERA Capital Developments</h3>
              <p className="font-sans text-xs opacity-65 leading-relaxed mb-6">
                Specializing in prime residential enclaves along the Costa del Sol with over 20 years of institutional development leadership.
              </p>
              <div className="flex items-center gap-2 text-xs font-sans text-emerald-400">
                <ShieldCheck size={16} />
                <span>Full Bank Guarantee Protected</span>
              </div>
            </div>

            {/* License & Construction Status */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-2 font-semibold">
                Regulatory Clearance
              </span>
              <h3 className="font-serif text-2xl text-white mb-2">License Obtained</h3>
              <p className="font-sans text-xs opacity-65 leading-relaxed mb-6">
                Full municipal building license granted by Estepona Town Hall. Construction underway with milestone delivery scheduled for 4Q 2026.
              </p>
              <div className="flex items-center gap-2 text-xs font-sans text-[#C5A880]">
                <Award size={16} />
                <span>Handover: 4Q 2026 Confirmed</span>
              </div>
            </div>

            {/* Live Stream & Site Webcam */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-2 font-semibold">
                  Transparency
                </span>
                <h3 className="font-serif text-2xl text-white mb-2">Live Construction Stream</h3>
                <p className="font-sans text-xs opacity-65 leading-relaxed mb-4">
                  Watch live progress of the structural works, garden shaping, and swimming pool excavation in real-time.
                </p>
              </div>

              <a
                href="#developer"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Construction webcam live stream is currently active for registered reservation holders.');
                }}
                className="inline-flex items-center justify-between px-5 py-3 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all font-sans text-xs tracking-widest uppercase cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Video size={14} className="text-red-400 animate-pulse" />
                  <span>View Live Stream</span>
                </span>
                <ExternalLink size={13} className="opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
