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
  title: 'ERA Residence - Contemporary Mediterranean Residences in Estepona',
  description: 'A boutique gated community of only 25 contemporary Mediterranean residences on the New Golden Mile, Estepona, Costa del Sol, Spain.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'ERA Residence - Contemporary Mediterranean Residences in Estepona',
    description: 'A boutique gated community of only 25 contemporary Mediterranean residences on the New Golden Mile, Estepona, Costa del Sol.',
    url: 'https://www.era-residence.com',
    siteName: 'ERA Residence',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'ERA Residence Estepona',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ERA Residence - Contemporary Mediterranean Residences in Estepona',
    description: 'Boutique gated community of 25 luxury residences on the New Golden Mile, Estepona.',
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
              name: 'ERA Residence Estepona',
              description: 'A boutique gated community of only 25 residences on the New Golden Mile, Estepona.',
              url: 'https://www.era-residence.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Avenida Litoral',
                addressLocality: 'Estepona',
                postalCode: '29680',
                addressRegion: 'Malaga',
                addressCountry: 'ES',
              },
              telephone: '+34655408648',
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
