'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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

function PropertyCard({ property, index }: { property: typeof PROPERTIES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className={`property-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} rounded-3xl overflow-hidden border border-[#2C302E]/10`}>
      <div className="w-full md:w-3/5">
        <PropertyCarousel photos={property.photos} />
      </div>

      <div className="w-full md:w-2/5 bg-[#2C302E] text-[#EFECE6] p-8 md:p-12 flex flex-col">
        <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50 mb-3">{property.location}</p>
        <h3 className="font-serif text-5xl md:text-6xl leading-none mb-1">{property.name}</h3>
        <p className="font-serif text-xl italic opacity-60 mb-8">{property.tagline}</p>
        <p className="font-sans text-sm opacity-70 leading-relaxed mb-8">{property.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-8 border-t border-white/10 pt-8">
          {[{ label: 'Bedrooms', value: property.beds }, { label: 'Bathrooms', value: property.baths }, { label: 'Sq. Ft.', value: property.sqft }].map(s => (
            <div key={s.label}>
              <p className="font-serif text-3xl">{s.value}</p>
              <p className="font-sans text-xs opacity-50 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-sans text-xs opacity-50 uppercase tracking-widest mb-1">Starting at</p>
            <p className="font-serif text-4xl">&#8377;{property.price}</p>
          </div>
          <button onClick={() => setExpanded(v => !v)} className="font-sans text-xs tracking-widest uppercase border border-white/30 px-5 py-3 rounded-full hover:bg-[#EFECE6] hover:text-[#2C302E] transition-all duration-500">
            {expanded ? 'Hide' : 'Amenities'}
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-700 ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-white/10 pt-6 mb-6">
            <img src={property.amenitiesImg} alt="Amenities" className="w-full h-36 object-cover rounded-xl mb-5" />
            <p className="font-sans text-xs uppercase tracking-widest opacity-50 mb-4">World-Class Amenities</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {property.amenities.map(a => (
                <div key={a} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                  <span className="font-sans text-xs opacity-70">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="group relative w-full mt-auto px-8 py-4 border border-white/30 rounded-full overflow-hidden">
          <span className="relative z-10 font-sans text-xs tracking-widest uppercase group-hover:text-[#2C302E] transition-colors duration-500">
            Book a Private Viewing
          </span>
          <div className="absolute inset-0 bg-[#EFECE6] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0" />
        </button>
      </div>
    </div>
  );
}

export default function ApexResidencyPage() {
  const heroImgRef = useRef<HTMLImageElement>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ onComplete: () => setPreloaderDone(true) });
    tl.to('.preloader-arch', { scaleY: 1, transformOrigin: 'top center', duration: 1.6, ease: 'power3.inOut' })
      .to('.preloader-overlay', { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, '-=0.4')
      .fromTo('.reveal-char', { y: 120, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 1.2, ease: 'power4.out' }, '-=0.9');

    if (heroImgRef.current) {
      gsap.to(heroImgRef.current, { y: '30%', ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    gsap.utils.toArray<HTMLElement>('.property-card').forEach((card) => {
      gsap.fromTo(card, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' } });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <main className="bg-[#EFECE6] text-[#2C302E] min-h-screen overflow-x-hidden">

      {/* PRELOADER */}
      <div className={`preloader-overlay fixed inset-0 z-[200] bg-[#2C302E] flex items-center justify-center pointer-events-none ${preloaderDone ? 'hidden' : ''}`}>
        <div className="relative flex flex-col items-center gap-6 text-[#EFECE6]">
          <div className="preloader-arch w-40 h-64 border border-white/10 rounded-t-full absolute top-1/2 -translate-y-1/2" style={{ transform: 'translateY(-50%) scaleY(0)', transformOrigin: 'top center' }} />
          <p className="font-serif text-sm italic opacity-60 relative z-10">New Golden Mile</p>
          <h1 className="font-serif text-6xl uppercase tracking-[0.15em] text-center leading-tight relative z-10">
            Apex<br/>Residency
          </h1>
          <p className="font-sans text-xs tracking-[0.4em] uppercase opacity-40 relative z-10">Mumbai · India</p>
        </div>
      </div>


      {/* HERO */}
      <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-28 px-8 md:px-14">
        <div className="absolute inset-0 z-0 bg-zinc-900">
          <img ref={heroImgRef} src="/properties/worli_ext.jpg" alt="Apex Residency" className="w-full h-[130%] object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C302E]/80 via-[#2C302E]/20 to-transparent" />
        </div>

        <div className="relative z-10 text-[#EFECE6]">
          <div className="overflow-hidden mb-3">
            <p className="reveal-char font-sans text-xs tracking-[0.4em] uppercase opacity-70">New Golden Mile, Mumbai</p>
          </div>
          <h1 className="font-serif leading-[0.85] tracking-[-0.02em]">
            <span className="block text-[clamp(4rem,13vw,11rem)] overflow-hidden">
              <span className="reveal-char inline-block">Apex</span>
            </span>
            <span className="block text-[clamp(4rem,13vw,11rem)] italic font-light overflow-hidden">
              <span className="reveal-char inline-block">Residency</span>
            </span>
          </h1>
          <div className="mt-8 flex flex-col md:flex-row gap-6 md:items-center">
            <p className="reveal-char font-serif text-xl md:text-2xl italic opacity-75 max-w-sm">A place to return to.</p>
            <a href="#residences" className="reveal-char self-start px-8 py-4 rounded-full text-[#EFECE6] font-sans text-xs tracking-widest uppercase hover:scale-105 transition-transform" style={{ background: 'rgba(239,236,230,0.15)', backdropFilter: 'blur(16px) saturate(180%)', WebkitBackdropFilter: 'blur(16px) saturate(180%)', border: '1px solid rgba(239,236,230,0.25)' }}>
              View Residences
            </a>
          </div>
        </div>

        <div className="absolute right-8 bottom-10 flex flex-col items-center gap-3 text-[#EFECE6]/50">
          <div className="w-px h-16 bg-white/30" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          <p className="font-sans text-[10px] tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-40 px-8 md:px-14 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <p className="font-sans text-xs tracking-[0.25em] uppercase opacity-40 border-t border-[#2C302E]/20 pt-3">01 — The Vision</p>
        </div>
        <div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-12">
            Three iconic properties.<br/>
            <span className="italic font-light">One philosophy of living.</span>
          </h2>
          <p className="font-sans text-lg opacity-65 leading-relaxed max-w-xl mb-10">
            Apex Residency presents Mumbai's most coveted addresses — a penthouse above the clouds in Worli, a Mediterranean villa in Bandra, and a beachfront mansion in Juhu. Each residence is a singular statement.
          </p>
          <div className="grid grid-cols-3 gap-8">
            {[{ n: '3', label: 'Iconic Buildings' }, { n: '48Cr+', label: 'Starting Price' }, { n: '100%', label: 'Bespoke Finish' }].map(s => (
              <div key={s.label}>
                <p className="font-serif text-4xl md:text-5xl mb-2">&#8377;{s.n}</p>
                <p className="font-sans text-xs uppercase tracking-widest opacity-50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="residences" className="py-24 px-8 md:px-14" style={{ background: '#F7F4EE' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="font-serif text-4xl md:text-6xl">The <span className="italic font-light">Residences</span></h2>
            <p className="font-sans text-xs tracking-widest uppercase opacity-40">3 Properties</p>
          </div>
          <div className="flex flex-col gap-10">
            {PROPERTIES.map((p, i) => (<PropertyCard key={p.id} property={p} index={i} />))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C302E] text-[#EFECE6] py-24 px-8 md:px-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16 pb-16 border-b border-white/10">
            <div>
              <h2 className="font-serif text-5xl mb-4">Apex <span className="italic font-light">Residency</span></h2>
              <p className="font-sans text-sm opacity-40 uppercase tracking-widest">Mumbai · India</p>
            </div>
            <div className="flex gap-16 text-sm">
              <div className="flex flex-col gap-4 opacity-50">
                {['Select a Residence', 'Download Brochure', 'Location'].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}
              </div>
              <div className="flex flex-col gap-4 opacity-50">
                {['Book a Call', 'Contact Us', 'Instagram'].map(l => <a key={l} href="#" className="hover:opacity-100 transition-opacity">{l}</a>)}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center opacity-25">
            <p className="font-sans text-xs">© 2026 Apex Residency. All rights reserved.</p>
            <p className="font-sans text-xs">Privacy · Terms</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
