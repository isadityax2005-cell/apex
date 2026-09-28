'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { useGSAP } from '@gsap/react';

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
import HotspotPin from '@/components/HotspotPin';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import BlurText from '@/components/react-bits/BlurText';
import SplitText from '@/components/react-bits/SplitText';

const REASONS = [
  {
    number: '01',
    kicker: 'Designed as a community, not a complex',
    title: 'Real-Life Coastal Location',
    desc: 'Nestled on Mumbai’s coveted New Golden Mile between pristine seafront promenades, world-renowned coastal clubs, and serene private enclaves. Everything you need for refined daily life is within effortless reach.',
    image: '/properties/bandra_ext.jpg',
  },
  {
    number: '02',
    kicker: 'Designed as a community, not a complex',
    title: 'Built to Endure',
    desc: 'Echoing the timeless spirit of bespoke modernism with authentic natural travertine stone, hand-fluted marble, acoustic curtain facades, and low-maintenance biophilic coastal gardens.',
    image: '/properties/worli_living.jpg',
  },
  {
    number: '03',
    kicker: 'Designed as a community, not a complex',
    title: 'Boutique Concept',
    desc: 'A strictly limited collection of only 24 residences ensuring absolute privacy, acoustic tranquility, and an authentic neighborhood ambiance surrounded by lush subtropical landscapes.',
    image: '/properties/juhu_living.jpg',
  },
];

export default function HomePage() {
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
  const [reasonIndex, setReasonIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const statResidencesRef = useRef<HTMLParagraphElement>(null);
  const statShoreRef = useRef<HTMLParagraphElement>(null);

  const prevReason = () => setReasonIndex((cur) => (cur === 0 ? REASONS.length - 1 : cur - 1));
  const nextReason = () => setReasonIndex((cur) => (cur === REASONS.length - 1 ? 0 : cur + 1));

  // GSAP SCROLL & ENTRANCE ANIMATIONS
  useGSAP(
    () => {
      // 1. Hero background zoom-out on load and scrub parallax on scroll
      if (heroImageRef.current && heroRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.1 },
          { scale: 1.0, duration: 2.2, ease: 'power2.out' }
        );

        gsap.to(heroImageRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Floating Hotspot Pins gentle continuous motion
      gsap.to('.hero-hotspot-pin', {
        y: -8,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
        stagger: 0.35,
      });

      // 3. Staggered reveal for section headers (red lines & subtitles)
      const sections = document.querySelectorAll('.motion-section');
      sections.forEach((sec) => {
        const line = sec.querySelector('.accent-line');
        const header = sec.querySelector('.motion-header');
        const cards = sec.querySelectorAll('.motion-card');

        if (line) {
          gsap.fromTo(
            line,
            { width: 0, opacity: 0 },
            {
              width: 48,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 80%',
              },
            }
          );
        }

        if (header) {
          gsap.fromTo(
            header,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 80%',
              },
            }
          );
        }

        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 75%',
              },
            }
          );
        }
      });

      // 4. Animated Counters for Section 4 (The Concept)
      if (statResidencesRef.current && statShoreRef.current) {
        const resCounter = { val: 0 };
        gsap.to(resCounter, {
          val: 24,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top 75%',
            once: true,
          },
          onUpdate: () => {
            if (statResidencesRef.current) {
              statResidencesRef.current.innerText = Math.round(resCounter.val).toString();
            }
          },
        });

        const shoreCounter = { val: 0 };
        gsap.to(shoreCounter, {
          val: 100,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top 75%',
            once: true,
          },
          onUpdate: () => {
            if (statShoreRef.current) {
              statShoreRef.current.innerText = Math.round(shoreCounter.val) + 'm';
            }
          },
        });
      }
    },
    { scope: mainContainerRef }
  );

  return (
    <main
      ref={mainContainerRef}
      className="bg-[#121514] text-[#EFECE6] min-h-screen selection:bg-[#C5A880] selection:text-[#121514] relative"
    >
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
        defaultResidence="General Inquiry · Apex Residency"
      />

      {/* 1. HERO SECTION (APEX RESIDENCY MASTERWORK) */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-10 md:pb-14 px-6 md:px-12"
      >
        {/* Day / Night Image Crossfade with GSAP Scrub Parallax */}
        <div className="absolute inset-0 z-0 bg-[#0E1110] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              ref={heroImageRef}
              key={lightingMode}
              src={lightingMode === 'day' ? '/hero-day.jpg' : '/hero-night.jpg'}
              alt={lightingMode === 'day' ? 'Apex Residency Mumbai Daytime Coastal Masterpiece' : 'Apex Residency Mumbai Twilight Illumination'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              className="hero-bg-img w-full h-[115%] -top-[7%] absolute object-cover object-center"
            />
          </AnimatePresence>
          {/* Subtle gradient vignette to blend with dock */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121514] via-[#121514]/20 to-black/35 pointer-events-none" />
        </div>

        {/* INTERACTIVE ARCHITECTURAL HOTSPOT PINS ACCURATELY ALIGNED TO BUILDING */}
        <div className="hero-hotspot-pin">
          <HotspotPin
            x="56%"
            y="74%"
            tag="Sky Sanctuary"
            title="Cantilevered Infinity Pool"
            description="Suspended optical glass pool with salt-mineral filtration and uninterrupted Arabian Sea horizon views."
            align="right"
          />
        </div>

        <div className="hero-hotspot-pin">
          <HotspotPin
            x="77%"
            y="14%"
            tag="Aviation Transit"
            title="Private Rooftop Helipad"
            description="Dedicated landing clearance with biometric elevator descent directly into the master penthouse."
            align="left"
          />
        </div>

        <div className="hero-hotspot-pin">
          <HotspotPin
            x="82%"
            y="40%"
            tag="Interior Design"
            title="Double-Height Glass Suites"
            description="Triple-pane acoustic envelope with custom travertine columns, French oak millwork, and 2700K circadian lighting."
            align="left"
          />
        </div>

        {/* ACCESSIBLE SEO HEADING */}
        <h1 className="sr-only">
          The Apex Residency — Ultra-Luxury Coastal Residences in Worli, Bandra, and Juhu, Mumbai.
        </h1>

        {/* Hero Content Overlay (Positioned in the open sea negative space on the left) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col justify-between h-[82%] pt-20 pointer-events-none">
          {/* Top Bar Indicators */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#C5A880] font-semibold">
                Mumbai · New Golden Mile
              </p>
            </div>
            {/* 00 Counter in Hero */}
            <div className="font-sans text-xs tracking-[0.3em] uppercase opacity-70 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              01 / 14
            </div>
          </div>

          {/* Center Brand Subtitle with Interactive Day/Night Switch */}
          <div className="max-w-2xl py-4 pointer-events-auto">
            <div className="mb-3">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880]">
                Architecture by Studio Soma · Interiors by Liaigre
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[0.06em] text-white font-normal leading-[0.92] mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
              Apex <span className="italic font-light">Residency</span>
            </h1>

            {/* Headline with interactive toggles */}
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white/95 font-light leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              A place{' '}
              <button
                onClick={() => setLightingMode('day')}
                className={`transition-all underline decoration-1 underline-offset-8 cursor-pointer ${
                  lightingMode === 'day'
                    ? 'text-[#C5A880] decoration-[#C5A880] font-normal drop-shadow-[0_0_12px_rgba(197,168,128,0.5)]'
                    : 'text-white/50 decoration-white/30 hover:text-white'
                }`}
              >
                by day
              </button>{' '}
              /{' '}
              <button
                onClick={() => setLightingMode('night')}
                className={`transition-all underline decoration-1 underline-offset-8 cursor-pointer ${
                  lightingMode === 'night'
                    ? 'text-[#C5A880] decoration-[#C5A880] font-normal drop-shadow-[0_0_12px_rgba(197,168,128,0.5)]'
                    : 'text-white/50 decoration-white/30 hover:text-white'
                }`}
              >
                by night
              </button>{' '}
              to return to.
            </p>
          </div>

          {/* Bottom Action Dock & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/15 pt-6 pointer-events-auto">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/apartments"
                className="px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white hover:scale-105 transition-all shadow-2xl flex items-center gap-2 group"
              >
                <span>View available apartments</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <button
                onClick={() => setModalOpen(true)}
                className="px-7 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-medium border border-white/30 hover:border-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
              >
                Schedule Private Viewing
              </button>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-[11px] font-sans opacity-60 uppercase tracking-widest bg-black/40 px-5 py-3 rounded-full border border-white/10 backdrop-blur-md">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                24 Boutique Residences
              </span>
              <span>·</span>
              <span>From ₹45 Cr</span>
              <span className="hidden md:inline">·</span>
              <span className="hidden md:inline text-[#C5A880]">MahaRERA Registered</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRO / 3 REASONS TO CHOOSE APEX (WITH 00/00 COUNTER & SPOTLIGHT CARD) */}
      <section
        id="reasons"
        className="motion-section py-28 md:py-36 px-6 md:px-12 bg-[#171A19] border-t border-white/10 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="accent-line w-8 h-[2px] bg-[#D9383A] inline-block" />
            <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">
              Three Reasons to Choose Apex
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 motion-header">
            <div>
              <p className="font-serif text-lg italic text-[#C5A880] mb-2">
                A place to live — to return year after year
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
                Three reasons <span className="italic font-light">to choose Apex</span>
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

          {/* Active Card Slider / Showcase with React Bits SpotlightCard */}
          <SpotlightCard
            spotlightColor="rgba(197, 168, 128, 0.22)"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#111413] rounded-3xl border border-white/10 p-8 md:p-14 overflow-hidden shadow-2xl"
          >
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
                <span>Mumbai Coastal Sanctuary</span>
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
          </SpotlightCard>
        </div>
      </section>

      {/* 3. STATEMENT SECTION (WITH REACT BITS SPLITTEXT REVEAL) */}
      <section className="motion-section py-24 md:py-32 px-6 md:px-12 bg-[#121514] border-t border-white/10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="accent-line w-16 h-[2px] bg-[#D9383A] mx-auto block mb-8" />
          <div className="font-serif text-2xl sm:text-3xl md:text-5xl italic font-light leading-snug text-white mb-8">
            <SplitText
              text="Instead of corridors, walking paths connect the apartments..."
              className="text-white"
              delay={40}
              duration={1}
            />
          </div>
          <cite className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A880] font-semibold not-italic block">
            — Architecture Team, Apex Residency
          </cite>
        </div>
      </section>

      {/* 4. THE CONCEPT SECTION (WITH ANIMATED COUNTERS) */}
      <section
        id="concept"
        className="motion-section py-28 md:py-36 px-6 md:px-12 bg-[#161918] border-t border-white/10 relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[4/3] group">
            <img
              src="/properties/bandra_pool.jpg"
              alt="Apex Residency boutique community"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="lg:col-span-6 space-y-6 motion-header">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="accent-line w-8 h-[2px] bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">The Vision</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Apex Residency is a boutique coastal sanctuary of only 24 residences...
            </h2>
            <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">
              Designed as a true community rather than an impersonal complex. Lush botanical walking paths meander between natural travertine facades, private ground-floor garden suites, and sun-drenched rooftop solariums with uninterrupted panoramas across the Arabian Sea.
            </p>
            <div className="pt-6 border-t border-white/10 flex items-center gap-8">
              <div>
                <p ref={statResidencesRef} className="font-serif text-4xl sm:text-5xl text-white font-medium">
                  24
                </p>
                <p className="font-sans text-[11px] uppercase tracking-widest opacity-50 mt-1">
                  Exclusive Residences
                </p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p ref={statShoreRef} className="font-serif text-4xl sm:text-5xl text-white font-medium">
                  100m
                </p>
                <p className="font-sans text-[11px] uppercase tracking-widest opacity-50 mt-1">
                  To Arabian Shore
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW GOLDEN MILE SECTION */}
      <section className="motion-section py-28 md:py-36 px-6 md:px-12 bg-[#1B1E1D] border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1 motion-header">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="accent-line w-8 h-[2px] bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Location Prestige</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Mumbai — New Golden Mile — <br />
              <span className="italic font-light">Worli, Bandra & Juhu Coastline</span>
            </h2>
            <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed">
              Commanding the most prestigious coastal strip connecting South Mumbai to the Western Suburbs via the maritime Sea Link. Surrounded by private yacht clubs, Michelin-curated seaside dining, elite equestrian grounds, and serene natural parks.
            </p>
            <div className="pt-4">
              <Link
                href="/apartments"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white hover:scale-105 transition-all shadow-xl"
              >
                <span>View available apartments</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[16/11] order-1 lg:order-2 group">
            <img
              src="/properties/worli_terrace.jpg"
              alt="Mumbai New Golden Mile Seafront"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 6. LOCATION MAP & DISTANCES */}
      <LocationSection />

      {/* 7. MASTER PLAN (PANNABLE & ZOOMABLE ELEMENT) */}
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
