'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  category: string;
  content: string;
  badge?: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: 'developer',
    title: 'Developer & Private Atelier',
    category: 'Sovereign Heritage Group',
    content: 'Apex Residency is developed in joint venture with Sovereign Heritage Group and Swiss Coastal Engineering. With over 28 ultra-luxury private estates delivered across Zurich, London, and Mumbai, every facet reflects generational durability.',
    badge: 'Swiss-Grade Construction',
  },
  {
    id: 'architecture',
    title: 'Lead Architects & Interior Masterplan',
    category: 'Studio Khosla & Assoc. · Foster Studio Alumni',
    content: 'Sculpted by award-winning architectural atelier Studio Khosla in collaboration with Milanese lighting designers. Clean horizontal cantilevered slab geometry balanced with warm local Kota limestone, oxidised brass, and acoustic double-glazed curtain walls.',
    badge: 'AIA Coastal Design Nominee',
  },
  {
    id: 'license',
    title: 'Statutory Permits & Title Clearance',
    category: 'MahaRERA Registered',
    content: 'The development holds full environmental CRZ clearance, absolute freehold title certification by Nishith Desai Associates, and full municipal commencement licenses. All title deeds and escrow statements are accessible through the private client portal.',
    badge: 'RERA: P51900084920',
  },
  {
    id: 'handover',
    title: '2026 Handover & Milestone Progress',
    category: 'Phase II Superstructure Underway',
    content: 'Superstructure structural milestones have surpassed 80% completion. Custom interior fit-outs (Sub-Zero, Dada Molteni, Agape bathrooms) commence Q3 2026 with bespoke key handover scheduled for December 2026.',
    badge: 'On Schedule Q4 2026',
  },
];

export default function ProjectAccordion() {
  const [activeId, setActiveId] = useState<string | null>(ITEMS[0].id);

  return (
    <div className="w-full divide-y divide-white/10">
      {ITEMS.map((item) => {
        const isOpen = activeId === item.id;
        return (
          <div key={item.id} className="py-7 transition-colors">
            <button
              onClick={() => setActiveId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <div>
                <span className="font-sans text-[11px] tracking-[0.25em] uppercase opacity-45 block mb-1.5">{item.category}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 group-hover:text-white transition-all flex-shrink-0 ml-4"
                style={{
                  background: isOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                  <Plus size={16} />
                </motion.div>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 pb-2 text-left max-w-3xl">
                    {item.badge && (
                      <span className="inline-block font-sans text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/15 mb-4">
                        {item.badge}
                      </span>
                    )}
                    <p className="font-sans text-sm md:text-base opacity-75 leading-relaxed text-[#EFECE6]">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
