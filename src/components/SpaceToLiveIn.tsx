'use client';

import Link from 'next/link';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

const INTERIOR_GALLERY = [
  { src: '/properties/worli_kitchen.jpg', title: 'Open-Concept Kitchen', caption: 'Silestone & Gaggenau Suite' },
  { src: '/properties/worli_bedroom.jpg', title: 'Master Suite', caption: 'Motorized Acoustic Shutters' },
  { src: '/properties/worli_bathroom.jpg', title: 'Porcelanosa Bath', caption: 'Underfloor Radiant Heating' },
  { src: '/properties/bandra_living.jpg', title: 'Sunlit Living Salon', caption: 'Schneider DLIFE Automation' },
];

export default function SpaceToLiveIn() {
  return (
    <section id="interiors" className="py-28 md:py-36 px-6 md:px-12 bg-[#121514] text-[#EFECE6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Interiors & Technology</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
            The Space to <br className="hidden sm:inline" />
            <span className="italic font-light">Live in</span>
          </h2>
          <Link
            href="/apartments"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-full bg-[#EFECE6] text-[#121514] font-semibold hover:bg-white transition-all shadow-xl"
          >
            <span>View Available Apartments</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Main Large Image */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[16/11]">
            <img
              src="/properties/worli_living.jpg"
              alt="The space to live in"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-1">
                Refined Materiality
              </span>
              <p className="font-serif text-2xl text-white">Acoustic Stillness & Natural Light</p>
            </div>
          </div>

          {/* Specs & Optional Upgrades */}
          <div className="lg:col-span-5 space-y-8">
            {/* Standard Core Specifications */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-4 font-semibold">
                Integrated Base Specifications
              </span>
              <div className="space-y-3.5 text-xs font-sans">
                {[
                  'Underfloor heating in primary bathrooms',
                  'Individual aerothermal climate automation',
                  'Biometric smart locks & digital video entry',
                  'Electric aluminium thermal shutters',
                  'Schneider Electric DLIFE designer switches',
                ].map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 opacity-85">
                    <Check size={15} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional Bespoke Upgrades */}
            <div className="p-8 rounded-3xl bg-[#1C201F] border border-[#C5A880]/30 shadow-lg">
              <div className="flex items-center gap-2 mb-4 text-[#C5A880]">
                <Sparkles size={16} />
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-semibold">
                  Optional Bespoke Upgrades
                </span>
              </div>
              <ul className="space-y-3.5 text-xs font-sans">
                {[
                  'Private heated jacuzzi installation on solarium',
                  'High-amp EV charging wallbox installation in garage bay',
                  'Rooftop photovoltaic solar panels with smart inverter',
                  'Outdoor summer kitchen with integrated gas grill & sink',
                ].map((upgrade, i) => (
                  <div key={i} className="flex items-start gap-2.5 opacity-85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0 mt-1.5" />
                    <span>{upgrade}</span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Gallery of 4 Interior Images */}
        <div>
          <span className="font-sans text-[11px] uppercase tracking-widest opacity-50 block mb-6">
            Interior Details Gallery
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTERIOR_GALLERY.map((photo, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg text-white mb-1">{photo.title}</h4>
                  <p className="font-sans text-[11px] opacity-60 uppercase tracking-wider">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
