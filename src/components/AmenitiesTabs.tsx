'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Waves, Car, Dumbbell, Trees, ArrowRight } from 'lucide-react';

interface AmenitiesTabsProps {
  onOpenBooking: () => void;
}

const AMENITIES = [
  {
    id: 'gated',
    label: 'Gated Community',
    icon: ShieldCheck,
    title: 'Peace of Mind in a Private Enclave',
    image: '/properties/bandra_ext.jpg',
    description:
      'ERA Residence is fully enclosed with perimeter surveillance, video intercom access, and private 24/7 security. Walking paths lined with indigenous flora replace interior roadways, creating a tranquil sanctuary for families and guests.',
    specs: ['24/7 Monitored Access', 'Pedestrian-Only Walkways', 'Automated Perimeter Lighting', 'Private Resident Entry'],
  },
  {
    id: 'pool',
    label: 'Swimming Pool',
    icon: Waves,
    title: 'Saltwater Oasis & Thermal Wellness',
    image: '/properties/worli_amenities.jpg',
    description:
      'A centerpiece saltwater swimming pool featuring gentle submerged loungers, an integrated children’s shallow pool, outdoor jacuzzi, Finnish sauna, and sensory wellness rain showers nestled within sub-tropical landscaping.',
    specs: ['Saltwater Filtration System', 'Integrated Children Pool', 'Finnish Sauna & Jacuzzi', 'Thermal Wellness Showers'],
  },
  {
    id: 'parking',
    label: 'Parking Area',
    icon: Car,
    title: 'Subterranean Garage with Dedicated EV Infrastructure',
    image: '/properties/juhu_ext.jpg',
    description:
      'Secure underground parking with generous maneuvering bays, private storage vaults, and individual pre-installation for high-speed electric vehicle charging stations for each residence.',
    specs: ['Individual EV Pre-Installation', 'Private Underground Storage', 'Automated Number Plate Recognition', 'Direct Elevator Access'],
  },
  {
    id: 'spa',
    label: 'Spa & Gym',
    icon: Dumbbell,
    title: 'Exclusive Resident Fitness & Recovery Pavilion',
    image: '/properties/worli_living.jpg',
    description:
      'Reserved exclusively for residents and their invited guests, our wellness pavilion houses state-of-the-art cardiovascular and strength equipment, yoga stretching terrace, and private treatment rooms.',
    specs: ['Technogym Cardio & Strength', 'Private Treatment Suites', 'Yoga & Pilates Deck', 'Resident-Only Access'],
  },
  {
    id: 'landscape',
    label: 'Landscaping',
    icon: Trees,
    title: 'Mediterranean Biophilic Gardens',
    image: '/properties/bandra_pool.jpg',
    description:
      'Designed by leading Andalusian landscape architects, featuring centuries-old olive trees, vibrant magenta bougainvillea, lavender, and aromatic citrus groves watered with automated drip irrigation.',
    specs: ['Centuries-Old Olive Trees', 'Aromatic Herb & Citrus Groves', 'Low-Consumption Drip Irrigation', 'Continuous Walking Paths'],
  },
];

export default function AmenitiesTabs({ onOpenBooking }: AmenitiesTabsProps) {
  const [activeTab, setActiveTab] = useState(AMENITIES[0].id);
  const current = AMENITIES.find((a) => a.id === activeTab) || AMENITIES[0];

  return (
    <section id="amenities" className="py-28 md:py-36 px-6 md:px-12 bg-[#171A19] text-[#EFECE6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Resort Living</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white">
            Exceptional <span className="italic font-light">Amenities</span>
          </h2>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            <span>Book a call now</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-12 border-b border-white/10 pb-6">
          {AMENITIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#EFECE6] text-[#171A19] font-semibold shadow-lg'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Split Card with Image Swap */}
        <div className="rounded-3xl bg-[#111413] border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Content details */}
          <div className="lg:col-span-6 p-8 md:p-14 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-3 font-semibold">
                Amenity Feature
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
                    {current.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed mb-8">
                    {current.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-white/10">
                    {current.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-sans opacity-85">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-widest opacity-45">
                Exclusively for 25 Residences
              </span>
              <button
                onClick={onOpenBooking}
                className="font-sans text-xs tracking-widest uppercase font-semibold text-[#C5A880] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Request Prospectus</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Image Container with Crossfade */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-full overflow-hidden bg-black/40">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center absolute inset-0"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
