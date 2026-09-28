'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const TYPOLOGIES = [
  {
    id: 'ground-floor-basement',
    number: '01',
    title: 'Ground floor + basement',
    beds: '3 Bedrooms',
    area: '178 – 202 m²',
    tagline: 'Private garden terraces & subterranean multipurpose level',
    image: '/properties/worli_living.jpg',
    description: 'Generous ground-floor living with direct access to private gardens and an expansive finished basement level suited for a wine vault, private cinema, or wellness suite.',
    query: 'ground-floor-basement',
  },
  {
    id: 'ground-floor',
    number: '02',
    title: 'Ground Floor',
    beds: '2 Bedrooms',
    area: '97 – 104 m²',
    tagline: 'Seamless single-level living & garden connection',
    image: '/properties/bandra_living.jpg',
    description: 'Refined single-story residences featuring luminous open-concept entertaining areas, double-glazed acoustic facades, and covered terraces overlooking the swimming pool.',
    query: 'ground-floor',
  },
  {
    id: 'penthouse-duplex',
    number: '03',
    title: 'Penthouse duplex',
    beds: '2 – 3 Bedrooms',
    area: '124 – 243 m²',
    tagline: 'Panoramic rooftop solariums & sunset sea views',
    image: '/properties/worli_terrace.jpg',
    description: 'Elevated duplex penthouses crowned by monumental private rooftop solariums with pre-installation for jacuzzi and summer kitchens, commanding 360° coastal panoramas.',
    query: 'penthouse-duplex',
  },
];

export default function TypologyCards() {
  const [activeSlide, setActiveSlide] = useState(0);

  const prev = () => setActiveSlide((cur) => (cur === 0 ? TYPOLOGIES.length - 1 : cur - 1));
  const next = () => setActiveSlide((cur) => (cur === TYPOLOGIES.length - 1 ? 0 : cur + 1));

  return (
    <section id="typologies" className="py-28 md:py-36 px-6 md:px-12 bg-[#1B1E1D] text-[#EFECE6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Residences Typology</p>
        </div>

        {/* Section Header with 00 Counter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
              Curated <span className="italic font-light">Living Typologies</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
              0{activeSlide + 1} / 0{TYPOLOGIES.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous typology"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next typology"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TYPOLOGIES.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                idx === activeSlide
                  ? 'bg-[#222625] border-[#C5A880]/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[1.02]'
                  : 'bg-white/5 border-white/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-white border border-white/15">
                    {item.number}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{item.title}</h3>
                  <div className="flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-[#C5A880] mb-4">
                    <span>{item.beds}</span>
                    <span>·</span>
                    <span>Up to {item.area}</span>
                  </div>
                  <p className="font-serif text-sm italic opacity-60 mb-4">{item.tagline}</p>
                  <p className="font-sans text-xs opacity-70 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="p-8 pt-0 border-t border-white/10 mt-6">
                <Link
                  href={`/apartments?type=${item.query}`}
                  className="mt-6 w-full py-3.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all font-sans text-[11px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 group"
                >
                  <span>Explore {item.title}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Range Statement Banner (Page 3 of Brief) */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-[#141716] border border-white/10 text-center max-w-4xl mx-auto shadow-xl">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl italic font-light text-[#EFECE6] leading-relaxed">
            &ldquo;Residences range from 104 to 244 sq.m., offering spacious single level and duplex layouts with generous terraces and rooftop solariums.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
