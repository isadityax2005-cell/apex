'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, RotateCcw, SlidersHorizontal, Bed, Maximize2, Compass } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import BougainvilleaDrift from '@/components/BougainvilleaDrift';
import { APARTMENTS, Apartment } from '@/data/apartments';

function ApartmentsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter state
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBeds, setSelectedBeds] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('relevant');

  // Read initial query params
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const bedsParam = searchParams.get('beds');
    const sortParam = searchParams.get('sort');

    if (typeParam) setSelectedType(typeParam);
    if (bedsParam) setSelectedBeds(bedsParam);
    if (sortParam) setSelectedSort(sortParam);
  }, [searchParams]);

  // Sync state to URL query string
  const updateQuery = (newType: string, newBeds: string, newSort: string) => {
    const params = new URLSearchParams();
    if (newType !== 'all') params.set('type', newType);
    if (newBeds !== 'all') params.set('beds', newBeds);
    if (newSort !== 'relevant') params.set('sort', newSort);

    const queryStr = params.toString();
    router.replace(`/apartments${queryStr ? `?${queryStr}` : ''}`, { scroll: false });
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
    router.replace('/apartments', { scroll: false });
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
      return 0; // 'relevant' retains original order
    });
  }, [selectedType, selectedBeds, selectedSort]);

  return (
    <div className="pt-28 md:pt-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header with Title and Animated Count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/10 pb-10">
        <div>
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-2">
            The 25 Private Residences
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white">
            Apartments{' '}
            <span className="font-sans text-2xl md:text-3xl text-white/40 align-super">
              ({filteredApartments.length})
            </span>
          </h1>
        </div>

        <p className="font-sans text-xs uppercase tracking-widest opacity-50 max-w-xs leading-relaxed">
          Ground floor garden homes, single-level apartments, and panoramic duplex penthouses.
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

      {/* Grid of Apartment Cards */}
      {filteredApartments.length === 0 ? (
        /* Empty State (Page 4 brief) */
        <div className="py-24 text-center p-12 rounded-3xl bg-[#171A19] border border-white/10 my-8">
          <p className="font-serif text-3xl mb-3 text-white">Nothing Found</p>
          <p className="font-sans text-sm opacity-65 max-w-md mx-auto mb-6 leading-relaxed">
            We didn&apos;t find anything for your request. Please, try changing your search settings.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredApartments.map((apt) => (
            <Link
              key={apt.id}
              href={`/apartments/${apt.id}`}
              className="group rounded-3xl bg-[#171A19] border border-white/10 overflow-hidden hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
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
                    Completion: {apt.completion}
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
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/10 text-xs font-sans">
                    <div>
                      <p className="font-serif text-lg text-white">{apt.bedrooms}</p>
                      <p className="opacity-50 uppercase tracking-wider text-[10px]">Bedrooms</p>
                    </div>
                    <div>
                      <p className="font-serif text-lg text-white">{apt.interiorM2} m²</p>
                      <p className="opacity-50 uppercase tracking-wider text-[10px]">Interior</p>
                    </div>
                    <div>
                      <p className="font-serif text-lg text-emerald-400">+{apt.terraceM2} m²</p>
                      <p className="opacity-50 uppercase tracking-wider text-[10px]">Terrace</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and Action Button */}
              <div className="p-7 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                <div>
                  <p className="font-sans text-[10px] opacity-40 uppercase tracking-widest">Price</p>
                  <p className="font-serif text-xl text-white font-medium">{apt.price}</p>
                </div>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#EFECE6] group-hover:text-[#121514] transition-all">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Marketing Blocks Below Grid (Page 4 brief) */}
      <section className="border-t border-white/10 pt-20 mb-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Boutique Concept
              </span>
              <h4 className="font-serif text-2xl text-white mb-4">Strictly 25 Residences</h4>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-6">
                Limited inventory guarantees maximum exclusivity, high investment retention, and peaceful acoustic environments.
              </p>
            </div>
            <img src="/properties/bandra_ext.jpg" alt="Boutique concept" className="rounded-xl h-36 w-full object-cover" />
          </div>

          <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Built to Stay
              </span>
              <h4 className="font-serif text-2xl text-white mb-4">Generational Durability</h4>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-6">
                Hand-cut travertine stone facades, thermal acoustic glass, and low-maintenance biophilic landscaping.
              </p>
            </div>
            <img src="/properties/worli_living.jpg" alt="Built to stay" className="rounded-xl h-36 w-full object-cover" />
          </div>

          <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Your Private Sanctuary
              </span>
              <h4 className="font-serif text-2xl text-white mb-4">Walking Paths Connect</h4>
              <p className="font-sans text-xs opacity-70 leading-relaxed mb-6">
                Pedestrian-only landscaped trails weave between private residences, swimming pools, and the Mediterranean coastline.
              </p>
            </div>
            <img src="/properties/juhu_pool.jpg" alt="Private sanctuary" className="rounded-xl h-36 w-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ApartmentsPage() {
  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen">
      <CookieBanner />
      <BougainvilleaDrift />
      <Header breadcrumb={[{ label: 'Select an Apartment' }]} />
      
      <Suspense fallback={<div className="py-44 text-center font-serif text-xl">Loading catalog...</div>}>
        <ApartmentsContent />
      </Suspense>

      <Footer />
    </main>
  );
}
