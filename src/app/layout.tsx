import type { Metadata } from 'next';
import { Outfit, Geist_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

import SmoothScroll from '@/components/SmoothScroll';
import ErrorOverlay from '@/components/ErrorOverlay';

export const metadata: Metadata = {
  title: 'Apex Properties | Premium Real Estate',
  description: 'A zero-cost premium B2B web development template for real estate.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white">
        <ErrorOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
