import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bed, Bath, Maximize2, ShieldCheck, Calendar, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import BougainvilleaDrift from '@/components/BougainvilleaDrift';
import { APARTMENTS } from '@/data/apartments';

// Pre-render all 24 unit routes
export async function generateStaticParams() {
  return APARTMENTS.map((apt) => ({
    id: apt.id,
  }));
}

interface DetailProps {
  params: Promise<{ id: string }>;
}

export default async function ApartmentDetailPage({ params }: DetailProps) {
  const { id } = await params;
  const unit = APARTMENTS.find((a) => a.id === id);

  if (!unit) {
    notFound();
  }

  // Related units in the same category
  const relatedUnits = APARTMENTS.filter((a) => a.type === unit.type && a.id !== unit.id).slice(0, 3);

  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen">
      <CookieBanner />
      <BougainvilleaDrift />
      <Header
        breadcrumb={[
          { label: 'Select an Apartment', href: '/apartments' },
          { label: unit.unitNumber },
        ]}
      />

      <div className="pt-28 md:pt-36 px-6 md:px-12 max-w-7xl mx-auto pb-24">
        {/* Back Link */}
        <Link
          href="/apartments"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase opacity-60 hover:opacity-100 hover:text-[#C5A880] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to All Apartments</span>
        </Link>

        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-12 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold">
                {unit.typeLabel}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-sans text-xs opacity-50">{unit.block}</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white">
              {unit.unitNumber}
            </h1>
            <p className="font-serif text-xl italic opacity-60 mt-1">{unit.floor}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest opacity-40 mb-1">Asking Price</p>
              <p className="font-serif text-3xl sm:text-4xl text-white font-medium">{unit.price}</p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white hover:scale-105 transition-all shadow-xl flex items-center gap-2"
            >
              <span>Inquire About This Unit</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-8 rounded-3xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10 shadow-2xl">
            <img
              src={unit.heroImage}
              alt={`${unit.unitNumber} master view`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
            {unit.gallery.slice(1, 3).map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10">
                <img src={img} alt={`${unit.unitNumber} interior ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Specifications & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Left: Description & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="font-serif text-3xl text-white mb-4">Architectural Overview</h2>
              <p className="font-sans text-base opacity-75 leading-relaxed">
                {unit.description}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10">
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#C5A880] block mb-4 font-semibold">
                Unit Highlights & Technology
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                {unit.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 opacity-85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floor Plan Card */}
            <div className="p-8 rounded-3xl bg-[#171A19] border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
                  Architectural Floor Plan
                </span>
                <span className="text-xs font-sans opacity-50">1:100 Scale</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 p-6 flex flex-col items-center text-center">
                <img
                  src={unit.floorPlanImage}
                  alt={`${unit.unitNumber} Floor Plan`}
                  className="w-full max-h-72 object-contain opacity-80 mb-4"
                />
                <p className="font-sans text-xs opacity-60">
                  Detailed PDF blueprints and MEP drawings available upon verified inquiry.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Key Specs Table Card */}
          <div className="lg:col-span-5 p-8 md:p-10 rounded-3xl bg-[#171A19] border border-white/15 shadow-2xl sticky top-28">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-2 font-semibold">
              Official Specifications
            </span>
            <h3 className="font-serif text-3xl text-white mb-6">Unit Data Card</h3>

            <div className="divide-y divide-white/10 text-sm font-sans mb-8">
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Typology</span>
                <span className="text-white font-medium">{unit.typeLabel}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Bedrooms</span>
                <span className="text-white font-medium">{unit.bedrooms}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Bathrooms</span>
                <span className="text-white font-medium">{unit.bathrooms}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Interior Surface</span>
                <span className="text-white font-medium">
                  {Math.round(unit.interiorM2 * 10.7639).toLocaleString()} sq ft ({unit.interiorM2} m²)
                </span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Terrace / Solarium</span>
                <span className="text-emerald-400 font-medium">
                  +{Math.round(unit.terraceM2 * 10.7639).toLocaleString()} sq ft ({unit.terraceM2} m²)
                </span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Building Block</span>
                <span className="text-white font-medium">{unit.block}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Floor Level</span>
                <span className="text-white font-medium">{unit.floor}</span>
              </div>
              <div className="py-3.5 flex justify-between">
                <span className="opacity-50">Target Handover</span>
                <span className="text-[#C5A880] font-semibold">{unit.completion}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/contact"
                className="w-full py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold bg-[#EFECE6] text-[#121514] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Book a Private Viewing</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href="tel:+34655408648"
                className="w-full py-3.5 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all font-sans text-xs tracking-widest uppercase flex items-center justify-center gap-2 text-white/80"
              >
                <Phone size={14} className="text-[#C5A880]" />
                <span>Call +34 (655) 408-648</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related Units in the Collection */}
        {relatedUnits.length > 0 && (
          <section className="border-t border-white/10 pt-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-1 font-semibold">
                  Alternative Options
                </span>
                <h3 className="font-serif text-3xl text-white">Similar Residences</h3>
              </div>
              <Link href="/apartments" className="text-xs font-sans uppercase tracking-widest text-[#C5A880] hover:underline">
                View All Units →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedUnits.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/apartments/${rel.id}`}
                  className="group rounded-2xl bg-[#171A19] border border-white/10 overflow-hidden hover:border-[#C5A880]/50 transition-all p-4 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                    <img src={rel.heroImage} alt={rel.unitNumber} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 text-[10px] font-sans uppercase text-white">
                      {rel.unitNumber}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white">{rel.unitNumber} · {rel.typeLabel}</h4>
                    <p className="font-sans text-xs opacity-60 mt-1">
                      {rel.bedrooms} Beds · {rel.interiorM2} m² (+{rel.terraceM2} m² Terrace)
                    </p>
                    <p className="font-serif text-lg text-[#C5A880] mt-3">{rel.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
