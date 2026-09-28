'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RotateCcw, SlidersHorizontal, Bed, Maximize2, Compass } from 'lucide-react';
import { APARTMENTS, Apartment, TOTAL_UNITS } from '@/data/apartments';

interface ApartmentsCatalogProps {
  initialType?: string;
  initialBeds?: string;
  initialSort?: string;
}

export default function ApartmentsCatalog({
  initialType = 'all',
  initialBeds = 'all',
  initialSort = 'relevant',
}: ApartmentsCatalogProps) {
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedBeds, setSelectedBeds] = useState<string>(initialBeds);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);

  // Sync state to URL query string without reloading or re-triggering SSR
  const updateQuery = (newType: string, newBeds: string, newSort: string) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (newType !== 'all') params.set('type', newType);
    if (newBeds !== 'all') params.set('beds', newBeds);
    if (newSort !== 'relevant') params.set('sort', newSort);

    const queryStr = params.toString();
    const newUrl = `/apartments${queryStr ? `?${queryStr}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    updateQuery(type, selectedBeds, selectedSort);
  };

  const handleBedsChange = (beds: string) => {
    setSelectedBeds(beds);
    updateQuery(selectedType, beds, selectedSort);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    updateQuery(selectedType, selectedBeds, sort);
  };

  const resetFilters = () => {
    setSelectedType('all');
    setSelectedBeds('all');
    setSelectedSort('relevant');
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/apartments');
    }
  };

  // Filter and sort items
  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter((apt) => {
      const matchType = selectedType === 'all' || apt.type === selectedType;
      const matchBeds = selectedBeds === 'all' || apt.bedrooms.toString() === selectedBeds;
      return matchType && matchBeds;
    }).sort((a, b) => {
      if (selectedSort === 'smallest') {
        return a.interiorM2 - b.interiorM2;
      }
      if (selectedSort === 'largest') {
        return b.interiorM2 - a.interiorM2;
      }
      return 0;
    });
  }, [selectedType, selectedBeds, selectedSort]);

  return (
    <div className="pt-28 md:pt-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header with Title and Dynamic Count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-10">
        <div>
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-2">
            The {TOTAL_UNITS} Private Residences
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white">
            Apartments{' '}
            <span className="font-sans text-2xl md:text-3xl text-white/40 align-super">
              ({filteredApartments.length})
            </span>
          </h1>
        </div>

        <p className="font-sans text-xs uppercase tracking-widest opacity-50 max-w-xs leading-relaxed">
          Ground floor garden homes, single-level apartments, and panoramic duplex penthouses along Mumbai’s New Golden Mile.
        </p>
      </div>

      {/* Interactive Filter Suite */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#171A19] border border-white/10 mb-12 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Typology Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-[11px] uppercase tracking-widest text-[#C5A880] mr-2 flex items-center gap-1.5 font-semibold">
              <SlidersHorizontal size={13} /> Typology:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'ground-floor-basement', label: 'Ground Floor + Basement' },
              { id: 'ground-floor', label: 'Ground Floor' },
              { id: 'penthouse-duplex', label: 'Penthouse Duplex' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => handleTypeChange(t.id)}
                className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-[#EFECE6] text-[#121514] font-semibold shadow-md'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Reset Button */}
          {(selectedType !== 'all' || selectedBeds !== 'all' || selectedSort !== 'relevant') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase text-[#D9383A] hover:underline cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Second Row: Bedrooms & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-5 border-t border-white/10 text-xs font-sans">
          {/* Bedrooms Filter */}
          <div className="flex items-center gap-2">
            <span className="opacity-50 uppercase tracking-widest mr-2 flex items-center gap-1.5">
              <Bed size={14} /> Bedrooms:
            </span>
            {['all', '2', '3'].map((b) => (
              <button
                key={b}
                onClick={() => handleBedsChange(b)}
                className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedBeds === b
                    ? 'bg-white/20 text-white font-semibold border border-white/30'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {b === 'all' ? 'All' : `${b} Bed`}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="opacity-50 uppercase tracking-widest mr-2 flex items-center gap-1.5">
              <Maximize2 size={14} /> Sort By:
            </span>
            {[
              { id: 'relevant', label: 'Relevant' },
              { id: 'smallest', label: 'Smallest Area' },
              { id: 'largest', label: 'Largest Area' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => handleSortChange(s.id)}
                className={`px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedSort === s.id
                    ? 'bg-white/20 text-white font-semibold border border-white/30'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Apartment Cards with layout animation */}
      {filteredApartments.length === 0 ? (
        <div className="py-24 text-center p-12 rounded-3xl bg-[#171A19] border border-white/10 my-8">
          <p className="font-serif text-3xl mb-3 text-white">Nothing Found</p>
          <p className="font-sans text-sm opacity-65 max-w-md mx-auto mb-6 leading-relaxed">
            We didn&apos;t find any residences matching your active filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence>
            {filteredApartments.map((apt) => (
              <motion.div
                key={apt.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/apartments/${apt.id}`}
                  className="group rounded-3xl bg-[#171A19] border border-white/10 overflow-hidden hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full"
                >
                  <div>
                    {/* Photo & Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                      <img
                        src={apt.heroImage}
                        alt={`${apt.unitNumber} - ${apt.typeLabel}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-white border border-white/15">
                          {apt.unitNumber}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase border border-emerald-500/30">
                          {apt.status}
                        </span>
                      </div>

                      <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-sans tracking-widest uppercase text-[#C5A880] border border-white/15">
                        Handover: {apt.completion}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-7">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#C5A880] font-semibold">
                          {apt.typeLabel}
                        </span>
                        <span className="font-sans text-xs opacity-50">{apt.block}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#C5A880] transition-colors">
                        {apt.unitNumber} · {apt.floor}
                      </h3>

                      {/* Numerical Spec Strip */}
                      <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10 text-xs font-sans mb-6">
                        <div>
                          <p className="opacity-45 uppercase text-[10px] tracking-wider mb-0.5">Bedrooms</p>
                          <p className="text-white font-medium">{apt.bedrooms} Bed · {apt.bathrooms} Bath</p>
                        </div>
                        <div>
                          <p className="opacity-45 uppercase text-[10px] tracking-wider mb-0.5">Interior Area</p>
                          <p className="text-white font-medium">
                            {Math.round(apt.interiorM2 * 10.7639).toLocaleString()} sq ft{' '}
                            <span className="opacity-50 text-[10px]">({apt.interiorM2} m²)</span>
                          </p>
                        </div>
                        <div>
                          <p className="opacity-45 uppercase text-[10px] tracking-wider mb-0.5">Terrace</p>
                          <p className="text-white font-medium">
                            {Math.round(apt.terraceM2 * 10.7639).toLocaleString()} sq ft{' '}
                            <span className="opacity-50 text-[10px]">({apt.terraceM2} m²)</span>
                          </p>
                        </div>
                        <div>
                          <p className="opacity-45 uppercase text-[10px] tracking-wider mb-0.5">Total Area</p>
                          <p className="text-white font-medium">
                            {Math.round((apt.interiorM2 + apt.terraceM2) * 10.7639).toLocaleString()} sq ft{' '}
                            <span className="opacity-50 text-[10px]">({apt.interiorM2 + apt.terraceM2} m²)</span>
                          </p>
                        </div>
                      </div>

                      {/* Key features bullets */}
                      <div className="space-y-2 mb-6">
                        {apt.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-sans opacity-70">
                            <span className="w-1 h-1 rounded-full bg-[#C5A880] flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer & Price */}
                  <div className="px-7 py-5 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase opacity-45">Price Guide</p>
                      <p className="font-serif text-xl text-white font-medium">{apt.price}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#C5A880] group-hover:text-black transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Editorial Marketing Blocks (Page 4 brief) */}
      <section className="border-t border-white/10 pt-20 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-2">
            Refined Living Specifications
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-white">
            Architecture Designed for Longevity
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Privacy Guaranteed
              </span>
              <h4 className="font-serif text-2xl text-white mb-4">Strictly {TOTAL_UNITS} Residences</h4>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-6">
                An ultra-limited residential collective ensures absolute calm, no overcrowded common areas, and personalized concierge attention.
              </p>
            </div>
            <img src="/properties/worli_living.jpg" alt="Privacy guaranteed" className="rounded-xl h-36 w-full object-cover" />
          </div>

          <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Climate Technology
              </span>
              <h4 className="font-serif text-2xl text-white mb-4">Aerothermal Energy Efficiency</h4>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-6">
                Underfloor heating, zone-controlled ducted air conditioning, and centralized solar-assisted aerothermal generation.
              </p>
            </div>
            <img src="/properties/bandra_int.jpg" alt="Climate technology" className="rounded-xl h-36 w-full object-cover" />
          </div>

          <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Your Private Sanctuary
              </span>
              <h4 className="font-serif text-2xl text-white mb-4">Walking Paths Connect</h4>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-6">
                Pedestrian-only landscaped trails weave between private residences, swimming pools, and the Arabian Sea coastline.
              </p>
            </div>
            <img src="/properties/juhu_pool.jpg" alt="Private sanctuary" className="rounded-xl h-36 w-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
