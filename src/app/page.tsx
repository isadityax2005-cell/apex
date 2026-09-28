'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowRight, Check, Compass, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BookingModal from '@/components/BookingModal';
import HotspotPin from '@/components/HotspotPin';
import CircularCtaButton from '@/components/CircularCtaButton';
import LocationSection from '@/components/LocationSection';
import ProjectAccordion from '@/components/ProjectAccordion';

const PROPERTIES = [
  {
    id: 'worli',
    name: 'The Penthouse',
    tagline: 'Sky-High Sanctum',
    location: 'Worli, Mumbai',
    price: '48 Cr',
    beds: 4,
    baths: 5,
    sqft: '6,200',
    description: 'Floating above the Arabian Sea, this ultra-luxury penthouse redefines altitude living. Panoramic 270-degree views of the sea link, private infinity pool, and six-star amenities.',
    hero: '/properties/worli_ext.jpg',
    photos: [
      { src: '/properties/worli_ext.jpg', label: 'Exterior' },
      { src: '/properties/worli_living.jpg', label: 'Living Room' },
      { src: '/properties/worli_bedroom.jpg', label: 'Master Bedroom' },
      { src: '/properties/worli_kitchen.jpg', label: 'Kitchen' },
      { src: '/properties/worli_bathroom.jpg', label: 'Spa Bathroom' },
      { src: '/properties/worli_terrace.jpg', label: 'Rooftop Terrace' },
    ],
    amenitiesImg: '/properties/worli_amenities.jpg',
    amenities: ['Private Infinity Pool', 'Home Cinema', 'Technogym Studio', 'Concierge 24/7', 'Wine Cellar', 'Helipad Access', 'Indoor Lap Pool', 'Cigar Lounge'],
  },
  {
    id: 'bandra',
    name: 'The Villa',
    tagline: 'Mediterranean Soul',
    location: 'Bandra, Mumbai',
    price: '32 Cr',
    beds: 6,
    baths: 7,
    sqft: '8,500',
    description: 'A whitewashed Mediterranean villa in the heart of Bandra. Bougainvillea-draped archways, private garden, and a cobalt pool — this is Mumbai\'s most romantic address.',
    hero: '/properties/bandra_ext.jpg',
    photos: [
      { src: '/properties/bandra_ext.jpg', label: 'Exterior' },
      { src: '/properties/bandra_living.jpg', label: 'Living Room' },
      { src: '/properties/bandra_bedroom.jpg', label: 'Master Bedroom' },
      { src: '/properties/bandra_kitchen.jpg', label: 'Chef Kitchen' },
      { src: '/properties/bandra_bathroom.jpg', label: 'Spa Bathroom' },
      { src: '/properties/bandra_pool.jpg', label: 'Private Pool & Garden' },
    ],
    amenitiesImg: '/properties/bandra_amenities.jpg',
    amenities: ['Private Garden Pool', 'Hammam Spa', 'Home Gym', 'Outdoor Cinema', 'Wine Room', 'Yoga Deck', 'Staff Quarters', 'Private Gate'],
  },
  {
    id: 'juhu',
    name: 'The Mansion',
    tagline: 'Beachfront Grandeur',
    location: 'Juhu, Mumbai',
    price: '75 Cr',
    beds: 8,
    baths: 9,
    sqft: '12,000',
    description: 'A brutalist masterpiece directly on Juhu Beach. Three dramatic storeys of warm concrete and teak rise above the sand with direct beach access and tidal terraces.',
    hero: '/properties/juhu_ext.jpg',
    photos: [
      { src: '/properties/juhu_ext.jpg', label: 'Exterior' },
      { src: '/properties/juhu_living.jpg', label: 'Grand Living Hall' },
      { src: '/properties/juhu_bedroom.jpg', label: 'Master Suite' },
      { src: '/properties/juhu_kitchen.jpg', label: 'Chef Kitchen' },
      { src: '/properties/juhu_pool.jpg', label: 'Beachfront Infinity Pool' },
      { src: '/properties/juhu_bath.jpg', label: 'Marble Spa Bath' },
    ],
    amenitiesImg: '/properties/juhu_pool.jpg',
    amenities: ['Direct Beach Access', 'Infinity Pool', 'Home Theater', 'Gym Spa', 'Bespoke Outdoor Kitchen', 'Concierge 24/7', 'Security Room', 'EV Garage'],
  },
];

function PropertyCarousel({ photos }: { photos: { src: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((i: number) => {
    const next = (i + photos.length) % photos.length;
    setActive(next);
  }, [photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) go(active + 1);
      else go(active - 1);
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative w-full overflow-hidden select-none group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/10">
        <div 
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
          style={{ 
            width: `${photos.length * 100}%`,
            transform: `translateX(-${(active * 100) / photos.length}%)`,
            willChange: 'transform'
          }}
        >
          {photos.map((p, i) => (
            <div key={i} className="relative flex-shrink-0 h-full" style={{ width: `${100 / photos.length}%` }}>
              <img 
                src={p.src} 
                alt={p.label} 
                className="w-full h-full object-cover select-none pointer-events-none" 
                draggable={false}
              />
              <div 
                className="absolute bottom-4 left-4 z-10" 
                style={{ 
                  background: 'rgba(255,255,255,0.18)', 
                  backdropFilter: 'blur(16px) saturate(180%)', 
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)', 
                  border: '1px solid rgba(255,255,255,0.3)', 
                  borderRadius: '9999px', 
                  padding: '6px 16px',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
                }}
              >
                <span className="font-sans text-xs tracking-widest uppercase text-white font-medium drop-shadow-sm">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev button */}
      <button 
        type="button"
        onClick={() => go(active - 1)} 
        aria-label="Previous photo" 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer shadow-lg" 
        style={{ 
          background: 'rgba(255,255,255,0.2)', 
          backdropFilter: 'blur(16px) saturate(180%)', 
          WebkitBackdropFilter: 'blur(16px) saturate(180%)', 
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)'
        }}
      >
        &#8249;
      </button>

      {/* Next button */}
      <button 
        type="button"
        onClick={() => go(active + 1)} 
        aria-label="Next photo" 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer shadow-lg" 
        style={{ 
          background: 'rgba(255,255,255,0.2)', 
          backdropFilter: 'blur(16px) saturate(180%)', 
          WebkitBackdropFilter: 'blur(16px) saturate(180%)', 
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)'
        }}
      >
        &#8250;
      </button>

      {/* Slide dots */}
      <div 
        className="absolute bottom-4 right-4 flex items-center gap-2 z-20 px-3 py-1.5 rounded-full" 
        style={{ 
          background: 'rgba(0,0,0,0.3)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)'
        }}
      >
        {photos.map((_, i) => (
          <button 
            type="button"
            key={i} 
            onClick={() => go(i)} 
            aria-label={`Slide ${i+1}`} 
            className={`transition-all duration-300 rounded-full cursor-pointer ${i === active ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`} 
          />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ 
  property, 
  index, 
  onBook 
}: { 
  property: typeof PROPERTIES[0]; 
  index: number; 
  onBook: (residenceName: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className={`property-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} rounded-3xl overflow-hidden border border-[#2C302E]/10 bg-[#242726] shadow-xl`}>
      <div className="w-full md:w-3/5">
        <PropertyCarousel photos={property.photos} />
      </div>

      <div className="w-full md:w-2/5 bg-[#202322] text-[#EFECE6] p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">{property.location}</p>
            <span className="font-sans text-[11px] px-3 py-1 rounded-full border border-white/15 bg-white/5 uppercase tracking-widest text-[#D4AF37]">
              Residence 0{index + 1}
            </span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl leading-tight mb-1">{property.name}</h3>
          <p className="font-serif text-lg italic opacity-60 mb-6">{property.tagline}</p>
          <p className="font-sans text-sm opacity-70 leading-relaxed mb-8">{property.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8 border-t border-white/10 pt-6">
            {[{ label: 'Bedrooms', value: property.beds }, { label: 'Bathrooms', value: property.baths }, { label: 'Sq. Ft.', value: property.sqft }].map(s => (
              <div key={s.label}>
                <p className="font-serif text-2xl md:text-3xl text-white">{s.value}</p>
                <p className="font-sans text-[11px] opacity-45 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-6 pt-4 border-t border-white/10">
            <div>
              <p className="font-sans text-xs opacity-50 uppercase tracking-widest mb-1">Starting from</p>
              <p className="font-serif text-3xl md:text-4xl text-white">&#8377;{property.price}</p>
            </div>
            <button 
              onClick={() => setExpanded(v => !v)} 
              className="font-sans text-xs tracking-widest uppercase border border-white/30 px-5 py-2.5 rounded-full hover:bg-[#EFECE6] hover:text-[#2C302E] transition-all duration-300"
            >
              {expanded ? 'Hide Details' : 'Amenities'}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
            <div className="border-t border-white/10 pt-5">
              <img src={property.amenitiesImg} alt="Amenities" className="w-full h-36 object-cover rounded-xl mb-4" />
              <p className="font-sans text-xs uppercase tracking-widest opacity-50 mb-3">Signature Amenities</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {property.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                    <span className="font-sans text-xs opacity-75">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => onBook(`${property.name} (${property.location})`)}
            className="group relative w-full px-8 py-4 border border-white/30 rounded-full overflow-hidden transition-all"
          >
            <span className="relative z-10 font-sans text-xs tracking-widest uppercase group-hover:text-[#2C302E] transition-colors duration-300 font-medium">
              Book a Private Viewing
            </span>
            <div className="absolute inset-0 bg-[#EFECE6] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ApexResidencyPage() {
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedResidence, setSelectedResidence] = useState('The Penthouse (Worli, Mumbai)');

  const openBookingFor = (name: string) => {
    setSelectedResidence(name);
    setBookingOpen(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ onComplete: () => setPreloaderDone(true) });
    tl.to('.preloader-arch', { scaleY: 1, transformOrigin: 'top center', duration: 1.4, ease: 'power3.inOut' })
      .to('.preloader-overlay', { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.3')
      .fromTo('.reveal-char', { y: 100, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 1.0, ease: 'power4.out' }, '-=0.6');

    if (heroImgRef.current) {
      gsap.to(heroImgRef.current, { 
        y: '25%', 
        ease: 'none', 
        scrollTrigger: { 
          trigger: '#hero', 
          start: 'top top', 
          end: 'bottom top', 
          scrub: true 
        } 
      });
    }

    gsap.utils.toArray<HTMLElement>('.property-card').forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main className="bg-[#EFECE6] text-[#2C302E] min-h-screen overflow-x-hidden selection:bg-[#2C302E] selection:text-[#EFECE6]">
      {/* GLOBAL NAVIGATION */}
      <Navigation 
        onOpenBooking={() => openBookingFor('The Penthouse (Worli, Mumbai)')} 
        lightingMode={lightingMode}
        onToggleLighting={setLightingMode}
      />

      {/* BOOKING MODAL */}
      <BookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
        defaultResidence={selectedResidence} 
      />

      {/* PRELOADER */}
      <div className={`preloader-overlay fixed inset-0 z-[200] bg-[#1E2120] flex items-center justify-center pointer-events-none ${preloaderDone ? 'hidden' : ''}`}>
        <div className="relative flex flex-col items-center gap-6 text-[#EFECE6]">
          <div className="preloader-arch w-40 h-64 border border-white/10 rounded-t-full absolute top-1/2 -translate-y-1/2" style={{ transform: 'translateY(-50%) scaleY(0)', transformOrigin: 'top center' }} />
          <p className="font-serif text-sm italic opacity-60 relative z-10">New Golden Mile</p>
          <h1 className="font-serif text-5xl md:text-6xl uppercase tracking-[0.15em] text-center leading-tight relative z-10">
            Apex<br/>Residency
          </h1>
          <p className="font-sans text-xs tracking-[0.4em] uppercase opacity-40 relative z-10">Mumbai · India</p>
        </div>
      </div>

      {/* HERO SECTION WITH DAY/NIGHT LIGHTING & HOTSPOT PINS */}
      <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-14">
        {/* Dynamic Architectural Background Image with Day/Night lighting shift */}
        <div className="absolute inset-0 z-0 bg-[#0e1110] overflow-hidden">
          <img 
            ref={heroImgRef} 
            src="/hero.png" 
            alt="Apex Residency Architectural Masterpiece" 
            className={`w-full h-[120%] object-cover object-center transition-all duration-1000 ${
              lightingMode === 'night' 
                ? 'brightness-[0.72] contrast-[1.15] saturate-[0.82] hue-rotate-[205deg]' 
                : 'brightness-[1.0] contrast-[1.0] saturate-[1.0]'
            }`} 
          />
          {/* Day / Night atmospheric overlays */}
          <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            lightingMode === 'night' 
              ? 'bg-gradient-to-t from-[#0A0C0B]/90 via-[#0D1524]/40 to-transparent' 
              : 'bg-gradient-to-t from-[#0E1110]/70 via-transparent to-transparent'
          }`} />
        </div>

        {/* ERA RESIDENCY REFINED HOTSPOT PINS */}
        <HotspotPin 
          x="54%" 
          y="46%" 
          tag="Level 72" 
          title="Cantilevered Sky Pool" 
          description="20m heated infinity pool with structural glass bottom, cantilevered 280 meters above the Arabian Sea." 
          align="left"
        />
        <HotspotPin 
          x="66%" 
          y="24%" 
          tag="Rooftop Deck" 
          title="VIP Helipad Transit" 
          description="Private flight landing clearance with direct biometric elevator descent into the triplex penthouse." 
          align="left"
        />

        {/* ACCESSIBLE SEO HEADING (visually hidden to avoid clashing with the baked-in editorial title) */}
        <h1 className="sr-only">
          The Apex Residency — Where The Sky Meets The Sea. Luxury Coastal Residences in Worli, Bandra, and Juhu, Mumbai.
        </h1>

        {/* BOTTOM ACTION DOCK */}
        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#residences" 
              className="px-8 py-4 rounded-full text-[#EFECE6] font-sans text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#141716] shadow-2xl flex items-center gap-3 font-medium group" 
              style={{ 
                background: 'rgba(20, 24, 23, 0.7)', 
                backdropFilter: 'blur(20px)', 
                WebkitBackdropFilter: 'blur(20px)', 
                border: '1px solid rgba(255, 255, 255, 0.3)' 
              }}
            >
              <span>Explore The Residences</span>
              <span className="text-white/40 group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>

            <button
              onClick={() => openBookingFor('The Penthouse (Worli, Mumbai)')}
              className="px-8 py-4 rounded-full text-[#EFECE6] font-sans text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105 hover:bg-white/20 shadow-2xl font-medium"
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(16px)', 
                WebkitBackdropFilter: 'blur(16px)', 
                border: '1px solid rgba(255, 255, 255, 0.22)' 
              }}
            >
              Schedule Private Viewing
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div 
            className="hidden md:flex items-center gap-6 px-7 py-3.5 rounded-full text-[11px] font-sans tracking-[0.2em] uppercase text-white/75 shadow-xl"
            style={{
              background: 'rgba(15, 18, 17, 0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              3 Coastal Estates
            </span>
            <span className="opacity-30">·</span>
            <span>From &#8377;48 Cr</span>
            <span className="opacity-30">·</span>
            <span className="text-[#D4AF37]">MahaRERA: P51900084920</span>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute right-8 bottom-6 hidden lg:flex flex-col items-center gap-2.5 text-[#EFECE6]/40 pointer-events-none">
          <div className="w-px h-12 bg-white/25" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          <p className="font-sans text-[8px] tracking-[0.35em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</p>
        </div>
      </section>

      {/* 01 — THE VISION & EDITORIAL RED LINE ACCENT */}
      <section id="vision" className="py-36 px-8 md:px-14 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start mb-24">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-45">01 — The Vision</p>
            </div>
          </div>
          <div>
            {/* Era Residency Signature Crimson Red Stroke */}
            <div className="w-20 h-[3px] bg-[#D9383A] mb-8" />
            
            <blockquote className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-[1.18] mb-10 text-[#1B1E1D]">
              "Designed as a sanctuary, not merely an address. Sculpted for stillness, proportion, and ocean light in an unquiet world."
            </blockquote>
            
            <p className="font-sans text-base md:text-lg opacity-70 leading-relaxed max-w-2xl mb-12">
              Apex Residency presents Mumbai’s most coveted addresses along the New Golden Mile — a sky sanctuary above the clouds in Worli, a Mediterranean villa enclave in Bandra, and an expansive beachfront estate in Juhu. Each residence is an irreplaceable architectural statement.
            </p>

            <div className="grid grid-cols-3 gap-8 border-t border-[#2C302E]/15 pt-10">
              {[{ n: '3', label: 'Prime Coastal Enclaves' }, { n: '48Cr+', label: 'Starting Price' }, { n: '100%', label: 'Bespoke Craftsmanship' }].map(s => (
                <div key={s.label}>
                  <p className="font-serif text-3xl md:text-5xl mb-2">&#8377;{s.n}</p>
                  <p className="font-sans text-[11px] uppercase tracking-widest opacity-50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 CORE PILLARS OF PHILOSOPHY (JUST LIKE ERA RESIDENCE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 md:p-10 rounded-3xl bg-[#E6E2D8] border border-[#2C302E]/10 flex flex-col justify-between h-full">
            <div>
              <span className="font-sans text-xs tracking-widest uppercase opacity-40 block mb-6">Pillar 01</span>
              <h3 className="font-serif text-3xl leading-snug mb-4">Unrivaled Ocean Frontage</h3>
              <p className="font-sans text-sm opacity-70 leading-relaxed">
                270-degree uninterrupted horizons of the Arabian Sea. Cantilevered terraces engineered to blur the boundary between maritime breezes and indoor stillness.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#2C302E]/10 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
              <Compass size={14} /> Full West Horizon
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-[#E6E2D8] border border-[#2C302E]/10 flex flex-col justify-between h-full">
            <div>
              <span className="font-sans text-xs tracking-widest uppercase opacity-40 block mb-6">Pillar 02</span>
              <h3 className="font-serif text-3xl leading-snug mb-4">Biophilic Mastercraft</h3>
              <p className="font-sans text-sm opacity-70 leading-relaxed">
                Hand-honed Kota limestone, sustainable aged teak, and triple-pane acoustic glazing create an insulated acoustic haven in the heart of Mumbai.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#2C302E]/10 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
              <Sparkles size={14} /> Natural Materials
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-3xl bg-[#E6E2D8] border border-[#2C302E]/10 flex flex-col justify-between h-full">
            <div>
              <span className="font-sans text-xs tracking-widest uppercase opacity-40 block mb-6">Pillar 03</span>
              <h3 className="font-serif text-3xl leading-snug mb-4">Six-Star Sovereign Service</h3>
              <p className="font-sans text-sm opacity-70 leading-relaxed">
                Dedicated round-the-clock concierge, sommelier cellar curation, private valet motor-court, and seamless access to rooftop helipad transit.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#2C302E]/10 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
              <ShieldCheck size={14} /> Private Staffing
            </div>
          </div>
        </div>
      </section>

      {/* 02 — THE RESIDENCES SHOWCASE */}
      <section id="residences" className="py-28 px-8 md:px-14 bg-[#1E2221] text-[#EFECE6]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-20 border-b border-white/10 pb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
                <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-45">The Collection</p>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl">
                The <span className="italic font-light">Residences</span>
              </h2>
            </div>
            <p className="font-sans text-xs tracking-widest uppercase opacity-50 max-w-xs leading-relaxed">
              Three singular architectural masterpieces along the coastline. Limited strictly to discerning generational patrons.
            </p>
          </div>

          <div className="flex flex-col gap-14">
            {PROPERTIES.map((p, i) => (
              <PropertyCard 
                key={p.id} 
                property={p} 
                index={i} 
                onBook={openBookingFor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 03 — THE GEOGRAPHY & LOCATION (WITH MARQUEE CLOUDS & DISTANCE MATRIX) */}
      <LocationSection />

      {/* 04 — INTERIOR CRAFTSMANSHIP & BESPOKE UPGRADES (ERA ASYMMETRICAL SPLIT) */}
      <section className="py-32 px-8 md:px-14 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-45">03 — Craftsmanship & Engineering</p>
        </div>
        <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] mb-16">
          Uncompromising <span className="italic font-light">Specifications</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Base Engineering */}
          <div className="p-10 md:p-14 rounded-3xl bg-[#E6E2D8] border border-[#2C302E]/10">
            <span className="font-sans text-xs uppercase tracking-widest opacity-40 block mb-3">Standard Across All Residences</span>
            <h3 className="font-serif text-3xl md:text-4xl mb-8">Swiss-Grade Acoustic & Structural Architecture</h3>
            
            <div className="space-y-6">
              {[
                { title: 'Triple-Pane Acoustic Envelope', desc: 'Saint-Gobain acoustic laminated glazing reducing external decibels by 44dB.' },
                { title: 'Italian Millwork & Poliform Kitchens', desc: 'Custom dark smoked oak cabinetry with integrated Gaggenau appliances.' },
                { title: 'Dornbracht & Boffi Bathrooms', desc: 'Brushed platinum water fixtures with freestanding stone soaking tubs.' },
                { title: 'Lutron Circadian Lighting', desc: 'HomeWorks system adjusting interior color temperature synchronized with natural coastal sun cycles.' },
                { title: 'Daikin Hospital-Grade VRV Air Systems', desc: 'Continuous HEPA filtration and climate moderation for optimal particulate purification.' },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-[#2C302E]/10 pb-5">
                  <h4 className="font-serif text-xl mb-1 flex items-center gap-2">
                    <Check size={16} className="text-[#D9383A]" /> {item.title}
                  </h4>
                  <p className="font-sans text-xs opacity-65 leading-relaxed pl-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bespoke Upgrades (Era Residence Feature) */}
          <div className="p-10 md:p-14 rounded-3xl bg-[#232726] text-[#EFECE6] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF37] block mb-3">Atelier Custom Commissions</span>
              <h3 className="font-serif text-3xl md:text-4xl mb-8 text-white">Bespoke Architectural Upgrades</h3>
              
              <div className="space-y-6">
                {[
                  { title: 'Sub-Zero Sommelier Wine Cellar', desc: 'Custom climate-controlled display vault accommodating 600+ Grand Cru bottles with fingerprint access.' },
                  { title: 'Private Turkish Hammam & Cryo Plunge', desc: 'Integrated spa sanctuary clad in backlit white onyx with heated marble slab.' },
                  { title: 'Steinway Lyngdorf Audiophile Cinema', desc: 'Custom acoustic dampening with 4K laser projection and discreet in-wall surround speakers.' },
                  { title: 'Helipad VIP Flight Corridor Clearance', desc: 'Priority private helicopter charter booking directly linked to the rooftop helipad.' },
                  { title: 'Reinforced Vault & Security Safe Room', desc: 'Biometric multi-point blast-resistant door with independent air filtration and telecom link.' },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-5">
                    <h4 className="font-serif text-xl mb-1 text-white flex items-center gap-2">
                      <Sparkles size={15} className="text-[#D4AF37]" /> {item.title}
                    </h4>
                    <p className="font-sans text-xs opacity-70 leading-relaxed pl-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="font-sans text-xs tracking-widest uppercase opacity-50">Customized upon request</span>
              <button 
                onClick={() => openBookingFor('Bespoke Architectural Consultation')}
                className="font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#EFECE6] transition-all"
              >
                Inquire With Atelier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — PROJECT GOVERNANCE & LICENSING ACCORDION */}
      <section className="py-28 px-8 md:px-14 bg-[#171918] text-[#EFECE6]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
              <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-45">04 — Project Details</p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Institutional <br />
              <span className="italic font-light">Governance</span>
            </h2>
            <p className="font-sans text-sm opacity-65 leading-relaxed max-w-sm mb-8">
              Explore the full statutory credentials, architectural ateliers, MahaRERA filings, and scheduled 2026 delivery timeline.
            </p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37]">
              <Award size={16} /> Ultra-Grade Compliant
            </div>
          </div>

          <div>
            <ProjectAccordion />
          </div>
        </div>
      </section>

      {/* PRE-FOOTER HORIZON BANNER WITH CIRCULAR ROTATING CTA */}
      <section className="relative py-44 px-8 md:px-14 bg-[#111312] text-[#EFECE6] overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/properties/worli_terrace.jpg" 
            alt="Horizon Vista" 
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111312] via-transparent to-[#111312]" />
        </div>

        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          <div className="w-16 h-[2px] bg-[#D9383A] mb-8" />
          <h2 className="font-serif text-4xl md:text-7xl leading-tight mb-8">
            Claim Your Place in <br />
            <span className="italic font-light">The Horizon</span>
          </h2>
          <p className="font-sans text-base md:text-lg opacity-75 max-w-xl mb-12 leading-relaxed">
            Private physical walkthroughs and VIP helicopter site landings are arranged on an invitation-only basis with our client directors.
          </p>
          <CircularCtaButton 
            label="Schedule Viewing" 
            onClick={() => openBookingFor('The Penthouse (Worli, Mumbai)')}
            size={170}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B0D0C] text-[#EFECE6] py-24 px-8 md:px-14 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20 pb-16 border-b border-white/10">
            <div>
              <h2 className="font-serif text-5xl mb-3 tracking-tight">
                Apex <span className="italic font-light">Residency</span>
              </h2>
              <p className="font-sans text-xs opacity-50 uppercase tracking-[0.3em] mb-6">New Golden Mile · Mumbai · India</p>
              <p className="font-sans text-xs opacity-40 max-w-xs leading-relaxed">
                Architectural excellence crafted for generational endurance. Registered MahaRERA Project P51900084920.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm">
              <div className="flex flex-col gap-3.5">
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase opacity-40 font-semibold mb-2">The Estates</span>
                <a href="#residences" className="opacity-70 hover:opacity-100 transition-opacity">The Penthouse (Worli)</a>
                <a href="#residences" className="opacity-70 hover:opacity-100 transition-opacity">The Villa (Bandra)</a>
                <a href="#residences" className="opacity-70 hover:opacity-100 transition-opacity">The Mansion (Juhu)</a>
                <a href="#location" className="opacity-70 hover:opacity-100 transition-opacity">The Geography</a>
              </div>
              <div className="flex flex-col gap-3.5">
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase opacity-40 font-semibold mb-2">Private Client</span>
                <button onClick={() => openBookingFor('Brochure Request')} className="text-left opacity-70 hover:opacity-100 transition-opacity">Request Prospectus</button>
                <button onClick={() => openBookingFor('Private Viewing')} className="text-left opacity-70 hover:opacity-100 transition-opacity">Book VIP Viewing</button>
                <a href="#vision" className="opacity-70 hover:opacity-100 transition-opacity">Atelier Philosophy</a>
                <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">Architectural Plans</a>
              </div>
              <div className="flex flex-col gap-3.5">
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase opacity-40 font-semibold mb-2">Inquiries</span>
                <span className="opacity-70">vip@apex-residency.com</span>
                <span className="opacity-70">+91 (22) 8900 1200</span>
                <span className="opacity-70">Worli Sea Face, Mumbai 400018</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 opacity-40 text-xs font-sans">
            <p>© 2026 Apex Residency by Sovereign Heritage Group. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Legal Terms</a>
              <a href="#" className="hover:underline">MahaRERA Certifications</a>
              <a href="#" className="hover:underline">Privacy Charter</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
