'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CookieBanner from '@/components/CookieBanner';
import BougainvilleaDrift from '@/components/BougainvilleaDrift';
import BookCallModal from '@/components/BookCallModal';
import LocationSection from '@/components/LocationSection';
import MasterPlanViewer from '@/components/MasterPlanViewer';
import TypologyCards from '@/components/TypologyCards';
import AmenitiesTabs from '@/components/AmenitiesTabs';
import SpaceToLiveIn from '@/components/SpaceToLiveIn';
import ArchitectureAndDeveloper from '@/components/ArchitectureAndDeveloper';

const REASONS = [
  {
    number: '01',
    kicker: 'Designed as a community, not a complex',
    title: 'Real-Life Location',
    desc: 'Nestled on the New Golden Mile between sandy Mediterranean beaches, world-renowned golf clubs, and international wellness retreats. Everything you need for daily life is within effortless reach.',
    image: '/properties/bandra_ext.jpg',
  },
  {
    number: '02',
    kicker: 'Designed as a community, not a complex',
    title: 'Built to Stay',
    desc: 'Echoing the timeless spirit of Marbella’s golden age with authentic natural stone facades, warm terracotta pavers, robust structural durability, and low-maintenance biophilic landscaping.',
    image: '/properties/worli_living.jpg',
  },
  {
    number: '03',
    kicker: 'Designed as a community, not a complex',
    title: 'Boutique Concept',
    desc: 'A limited collection of only 25 residences ensuring absolute privacy, acoustic tranquility, and an authentic neighborhood ambiance surrounded by lush subtropical gardens.',
    image: '/properties/juhu_living.jpg',
  },
];

export default function HomePage() {
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
  const [reasonIndex, setReasonIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const prevReason = () => setReasonIndex((cur) => (cur === 0 ? REASONS.length - 1 : cur - 1));
  const nextReason = () => setReasonIndex((cur) => (cur === REASONS.length - 1 ? 0 : cur + 1));

  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen selection:bg-[#C5A880] selection:text-[#121514] relative">
      {/* Global Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Persistent Cookie Banner */}
      <CookieBanner />

      {/* Floating Bougainvillea Flower Petals */}
      <BougainvilleaDrift />

      {/* Global Header */}
      <Header
        lightingMode={lightingMode}
        onToggleLighting={setLightingMode}
      />

      {/* Book a Call Modal */}
      <BookCallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultResidence="General Inquiry · ERA Residence"
      />

      {/* 1. HERO SECTION (ERA RESIDENCE BENCHMARK) */}
      <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-12">
        {/* Day / Night Image Crossfade */}
        <div className="absolute inset-0 z-0 bg-[#0E1110]">
          <AnimatePresence mode="wait">
            <motion.img
              key={lightingMode}
              src={lightingMode === 'day' ? '/hero.png' : '/properties/worli_ext.jpg'}
              alt="ERA Residence Estepona"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className={`w-full h-full object-cover object-center ${
                lightingMode === 'night' ? 'brightness-75 contrast-110 saturate-90' : 'brightness-95'
              }`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121514] via-[#121514]/30 to-black/40 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between h-[80%] pt-20">
          {/* Top Estepona Tag */}
          <div className="flex items-center justify-between">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#C5A880] font-semibold">
              Estepona · Costa del Sol
            </p>
            {/* 00 Counter in Hero */}
            <div className="font-sans text-xs tracking-[0.3em] uppercase opacity-60">
              01 / 14
            </div>
          </div>

          {/* Center Brand & Interactive Headline */}
          <div className="max-w-4xl py-6">
            <h1 className="font-serif leading-[0.9] tracking-tight mb-6">
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-normal text-white">
                Era <span className="italic font-light">Residence</span>
              </span>
            </h1>

            {/* Headline with interactive 'by day' / 'by night' switches */}
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white/90 font-light leading-snug">
              A place{' '}
              <button
                onClick={() => setLightingMode('day')}
                className={`transition-all underline decoration-1 underline-offset-8 cursor-pointer ${
                  lightingMode === 'day' ? 'text-[#C5A880] decoration-[#C5A880] font-normal' : 'text-white/50 decoration-white/30 hover:text-white'
                }`}
              >
                by day
              </button>{' '}
              /{' '}
              <button
                onClick={() => setLightingMode('night')}
                className={`transition-all underline decoration-1 underline-offset-8 cursor-pointer ${
                  lightingMode === 'night' ? 'text-[#C5A880] decoration-[#C5A880] font-normal' : 'text-white/50 decoration-white/30 hover:text-white'
                }`}
              >
                by night
              </button>{' '}
              to return to.
            </p>
          </div>

          {/* Bottom Action Dock & Scroll Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/15 pt-6">
            <div className="flex items-center gap-4">
              <Link
                href="/apartments"
                className="px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white transition-all shadow-xl flex items-center gap-2 group"
              >
                <span>View available apartments</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center gap-6 text-xs font-sans opacity-50 uppercase tracking-widest">
              <span>Boutique Community of 25 Residences</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline">From €490,000</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRO / 3 REASONS TO CHOOSE ERA (WITH 00/00 COUNTER) */}
      <section id="reasons" className="py-28 md:py-36 px-6 md:px-12 bg-[#171A19] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
            <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Three Reasons to Choose Era</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div>
              <p className="font-serif text-lg italic text-[#C5A880] mb-2">A place to live — to return year after year</p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
                Three reasons <span className="italic font-light">to choose Era</span>
              </h2>
            </div>

            {/* 00/00 Animated Counter */}
            <div className="flex items-center gap-6">
              <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
                0{reasonIndex + 1} / 0{REASONS.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReason}
                  aria-label="Previous reason"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextReason}
                  aria-label="Next reason"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Card Slider / Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#111413] rounded-3xl border border-white/10 p-8 md:p-14 overflow-hidden shadow-2xl">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-sans tracking-widest uppercase text-[#C5A880] mb-6">
                  {REASONS[reasonIndex].kicker}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white mb-6">
                  {REASONS[reasonIndex].title}
                </h3>
                <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed mb-8">
                  {REASONS[reasonIndex].desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-xs font-sans opacity-50 uppercase tracking-widest">
                <span>Reason {REASONS[reasonIndex].number}</span>
                <span>·</span>
                <span>Costa del Sol Sanctuary</span>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden bg-black/40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={reasonIndex}
                  src={REASONS[reasonIndex].image}
                  alt={REASONS[reasonIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover object-center absolute inset-0"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATEMENT SECTION (PAGE 3 BRIEF) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#121514] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="w-16 h-[2px] bg-[#D9383A] mx-auto block mb-8" />
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-5xl italic font-light leading-snug text-white mb-8">
            &ldquo;Instead of corridors, walking paths connect the apartments...&rdquo;
          </blockquote>
          <cite className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold not-italic">
            — Architecture Team, Era Residence
          </cite>
        </div>
      </section>

      {/* 4. THE CONCEPT SECTION */}
      <section id="concept" className="py-28 md:py-36 px-6 md:px-12 bg-[#161918] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3]">
            <img
              src="/properties/bandra_pool.jpg"
              alt="ERA Residences boutique community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">The Vision</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              ERA Residences is a boutique gated community of only 25 residences...
            </h2>
            <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">
              Designed as a true community rather than an impersonal complex. Lush botanical walking paths meander between natural stone facades, private garden suites, and sun-drenched rooftop solariums with views toward Gibraltar and the North African coast.
            </p>
            <div className="pt-6 border-t border-white/10 flex items-center gap-6">
              <div>
                <p className="font-serif text-4xl text-white">25</p>
                <p className="font-sans text-[11px] uppercase tracking-widest opacity-50 mt-1">Exclusive Residences</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="font-serif text-4xl text-white">100m</p>
                <p className="font-sans text-[11px] uppercase tracking-widest opacity-50 mt-1">To Mediterranean Shore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW GOLDEN MILE SECTION */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-[#1B1E1D] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Location Prestige</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Spain — New Golden Mile — <br />
              <span className="italic font-light">Between Marbella and Estepona</span>
            </h2>
            <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">
              Situated in the prestigious coastal strip between Estepona and Marbella. Surrounded by world-class championship golf courses (Los Flamingos, El Paraiso), Michelin-starred seaside dining, private beach clubs, and elite equestrian and tennis clubs.
            </p>
            <div className="pt-4">
              <Link
                href="/apartments"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white transition-all shadow-xl"
              >
                <span>View available apartments</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[16/11] order-1 lg:order-2">
            <img
              src="/properties/worli_terrace.jpg"
              alt="Spain New Golden Mile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 6. LOCATION MAP & DISTANCES */}
      <LocationSection />

      {/* 7. MASTER PLAN (PANNABLE ELEMENT) */}
      <MasterPlanViewer />

      {/* 8. TYPOLOGY CARDS & 9. RANGE STATEMENT */}
      <TypologyCards />

      {/* 10. AMENITIES TABS SWITCHER */}
      <AmenitiesTabs onOpenBooking={() => setModalOpen(true)} />

      {/* 11. THE SPACE TO LIVE IN (UPGRADES & GALLERY) */}
      <SpaceToLiveIn />

      {/* 12. ARCHITECTURE & 13. DEVELOPER / STATUS */}
      <ArchitectureAndDeveloper onOpenBooking={() => setModalOpen(true)} />

      {/* 14. CLOSING CTA BLOCK & FOOTER */}
      <Footer />
    </main>
  );
}
