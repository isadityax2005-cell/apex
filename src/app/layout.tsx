import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

import SmoothScroll from '@/components/SmoothScroll';
import ErrorOverlay from '@/components/ErrorOverlay';
import CursorBlob from '@/components/CursorBlob';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Apex Residency | Luxury Residences Mumbai',
  description: 'Ultra-luxury penthouses, beachfront mansions, and private villas in Mumbai.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} antialiased`}>
      <body className="bg-[#EFECE6] text-[#2C302E] selection:bg-[#2C302E] selection:text-[#EFECE6] font-sans">
        <ErrorOverlay />
        <CursorBlob />
        <Navigation />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
