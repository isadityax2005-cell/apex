import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import BougainvilleaDrift from '@/components/BougainvilleaDrift';
import ApartmentsCatalog from '@/components/ApartmentsCatalog';
import { TOTAL_UNITS } from '@/data/apartments';

export const metadata: Metadata = {
  title: `The ${TOTAL_UNITS} Private Residences | Apex Residency Mumbai`,
  description: `Explore the ${TOTAL_UNITS} ultra-luxury residences at Apex Residency on Mumbai's New Golden Mile. Ground floor garden homes, single-level apartments, and panoramic duplex penthouses.`,
  openGraph: {
    title: `The ${TOTAL_UNITS} Private Residences | Apex Residency Mumbai`,
    description: `Explore the ${TOTAL_UNITS} ultra-luxury residences at Apex Residency along the Arabian Sea on Mumbai's New Golden Mile.`,
    url: 'https://real-estate-base-template.vercel.app/apartments',
    images: ['https://real-estate-base-template.vercel.app/hero-day.jpg'],
  },
};

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string; beds?: string; sort?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialType = resolvedParams.type || 'all';
  const initialBeds = resolvedParams.beds || 'all';
  const initialSort = resolvedParams.sort || 'relevant';

  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen">
      <CookieBanner />
      <BougainvilleaDrift />
      <Header breadcrumb={[{ label: 'Select an Apartment' }]} />
      
      {/* Server Rendered Catalog with all 24 cards immediately in HTML */}
      <ApartmentsCatalog
        initialType={initialType}
        initialBeds={initialBeds}
        initialSort={initialSort}
      />

      <Footer />
    </main>
  );
}
