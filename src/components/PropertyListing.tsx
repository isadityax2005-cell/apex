'use client';

import { useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import gsap from 'gsap';

const properties = [
  {
    id: 'bandra',
    title: 'Bandra Villa',
    type: 'Villa',
    price: '$4.2M',
    specs: '6 Beds · 7 Baths · 8,500 sqft',
    desc: 'An architectural masterpiece overlooking the Arabian Sea. Featuring minimalist concrete forms and expansive glass facades.',
    images: {
      ext: '/properties/bandra_ext.jpg',
      int: '/properties/bandra_living.jpg',
      kit: '/properties/bandra_kitchen.jpg',
      bath: '/properties/bandra_bathroom.jpg'
    }
  },
  {
    id: 'juhu',
    title: 'Juhu Mansion',
    type: 'Mansion',
    price: '$8.5M',
    specs: '8 Beds · 10 Baths · 12,000 sqft',
    desc: 'Unprecedented luxury in Mumbai\'s most exclusive neighborhood. Complete with private beachfront access and infinity pool.',
    images: {
      ext: '/properties/juhu_ext.jpg',
      int: '/properties/juhu_living.jpg',
      kit: '/properties/juhu_kitchen.jpg',
      bath: '/properties/juhu_bath.jpg'
    }
  },
  {
    id: 'worli',
    title: 'Worli Penthouse',
    type: 'Penthouse',
    price: '$5.9M',
    specs: '4 Beds · 5 Baths · 6,200 sqft',
    desc: 'A brutalist sanctuary in the sky. Panoramic city views meets high-end custom millwork and marble interiors.',
    images: {
      ext: '/properties/worli_ext.jpg',
      int: '/properties/worli_int.jpg',
      kit: '/properties/worli_kit.jpg',
      bath: '/properties/worli_bath.jpg'
    }
  }
];

export default function PropertyListing() {
  const selectedPropertyId = useAppStore((state) => state.selectedPropertyId);
  const setSelectedPropertyId = useAppStore((state) => state.setSelectedPropertyId);
  const selectedProperty = properties.find(p => p.id === selectedPropertyId) || null;
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPropertyId && drawerRef.current) {
      // Start hidden to the right
      gsap.set(drawerRef.current, { x: '100%' });
      // Animate in
      gsap.to(drawerRef.current, { x: '0%', duration: 1.0, ease: 'power4.out' });
    }
  }, [selectedPropertyId]);

  const closeDrawer = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, { 
        x: '100%', 
        duration: 0.8, 
        ease: 'power3.inOut',
        onComplete: () => setSelectedPropertyId(null)
      });
    }
  };

  // Keep it in the DOM but hidden when not selected so GSAP can animate it out
  return (
    <div 
      ref={drawerRef}
      className={`fixed top-0 right-0 w-full md:w-[45vw] h-screen bg-[#050505]/90 backdrop-blur-3xl z-50 border-l border-white/5 overflow-y-auto transform translate-x-full ${!selectedPropertyId && !selectedProperty ? 'hidden' : ''}`}
    >
      {selectedProperty && (
        <div className="p-12 md:p-16 flex flex-col min-h-screen">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-16">
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-4">
                [ {selectedProperty.type} ]
              </p>
              <h2 className="text-4xl md:text-5xl font-outfit font-medium text-white tracking-tight">
                {selectedProperty.title}
              </h2>
            </div>
            <button 
              onClick={closeDrawer}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-white/60 transition-colors"
            >
              <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors">✕</span>
            </button>
          </div>

          {/* Specs & Desc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 border-t border-b border-white/10 py-8">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mb-2">Price</p>
              <p className="font-outfit text-2xl text-white">{selectedProperty.price}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mb-2">Specifications</p>
              <p className="font-outfit text-lg text-white/80">{selectedProperty.specs}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-white/50 leading-relaxed text-sm max-w-md">
                {selectedProperty.desc}
              </p>
            </div>
          </div>

          {/* Editorial Image Gallery */}
          <div className="space-y-4">
            <p className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase mb-6">Gallery</p>
            
            <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-zinc-900">
              <img src={selectedProperty.images.ext} alt="Exterior" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-sm overflow-hidden bg-zinc-900 group">
                <img src={selectedProperty.images.int} alt="Interior" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="aspect-square rounded-sm overflow-hidden bg-zinc-900 group">
                  <img src={selectedProperty.images.kit} alt="Kitchen" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="aspect-square rounded-sm overflow-hidden bg-zinc-900 group">
                  <img src={selectedProperty.images.bath} alt="Bathroom" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between pb-12">
            <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-outfit font-medium text-sm tracking-wide hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all duration-300">
              Inquire Now
            </button>
            <p className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
              Apex Residency EXCLUSIVE
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
