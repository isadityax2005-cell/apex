import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — Apex Residency Mumbai',
  description: 'Privacy charter and personal data protection policies for Apex Residency, New Golden Mile, Mumbai.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen">
      <Header breadcrumb={[{ label: 'Privacy Policy' }]} />

      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-4xl mx-auto pb-24">
        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-3">
          Legal & Compliance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-sm font-sans opacity-80 leading-relaxed border-t border-white/10 pt-8">
          <p>
            This Privacy Policy sets out how Apex Luxury Developments (&ldquo;Apex Residency&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, processes, and protects your personal data in compliance with data privacy regulations and best practices.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">1. Data Controller</h3>
          <p>
            The entity responsible for processing your personal information is Apex Luxury Developments Ltd., with registered offices located at Apex Tower, New Golden Mile, Worli Sea Face, Mumbai 400018. Contact email: concierge@apexresidency.com.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">2. Categories of Data Collected</h3>
          <p>
            We process personal data that you provide directly to us through website contact forms, WhatsApp communications, private viewing requests, and telephone inquiries. This data includes your full name, email address, phone number, and residential preference notes.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">3. Purpose and Legal Basis</h3>
          <p>
            Your personal information is collected solely to process your inquiries regarding property reservations, private walkthroughs, floor plans, and construction milestones at Apex Residency. The legal basis for processing is your explicit consent provided upon submitting the booking and contact forms.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">4. Data Retention & Third Parties</h3>
          <p>
            We do not sell, rent, or transfer your personal data to external commercial third parties. Your data is retained strictly for the duration necessary to satisfy the commercial inquiry or statutory obligations.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">5. Your Statutory Rights</h3>
          <p>
            You retain the right to access, rectify, restrict, or request the erasure of your personal data at any time by directing an email to concierge@apexresidency.com.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
