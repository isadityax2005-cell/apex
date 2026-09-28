import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ErrorOverlay from '@/components/ErrorOverlay';
import CursorBlob from '@/components/CursorBlob';
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'Apex Residency — Ultra-Luxury Coastal Residences | Mumbai · New Golden Mile',
  description: 'A boutique collection of 24 ultra-luxury coastal residences along the Arabian Sea on the New Golden Mile, Worli, Bandra, and Juhu, Mumbai.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Apex Residency — Ultra-Luxury Coastal Residences in Mumbai',
    description: 'A boutique collection of 24 ultra-luxury coastal residences along the Arabian Sea on the New Golden Mile, Mumbai.',
    url: 'https://www.apexresidency.com',
    siteName: 'Apex Residency',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Apex Residency Mumbai',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Residency — Ultra-Luxury Coastal Residences in Mumbai',
    description: 'Boutique collection of 24 ultra-luxury residences on the New Golden Mile, Mumbai.',
    images: ['/hero.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} antialiased`}>
      <head>
        {/* Structured Data (Organization & Residence) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateListing',
              name: 'Apex Residency Mumbai',
              description: 'A boutique collection of 24 ultra-luxury residences on the New Golden Mile, Mumbai.',
              url: 'https://www.apexresidency.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Apex Tower, Worli Sea Face',
                addressLocality: 'Mumbai',
                postalCode: '400018',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN',
              },
              telephone: '+912269888800',
            }),
          }}
        />
      </head>
      <body className="bg-[#121514] text-[#EFECE6] selection:bg-[#C5A880] selection:text-[#121514] font-sans">
        <ErrorOverlay />
        <CursorBlob />
        <Toaster position="top-right" richColors theme="dark" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
