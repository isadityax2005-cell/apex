import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy — ERA Residence Estepona',
  description: 'Privacy charter and personal data protection policies for ERA Residence, Estepona, Costa del Sol.',
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
            This Privacy Policy sets out how ERA Capital Developments (&ldquo;ERA Residence&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, processes, and protects your personal data in compliance with the General Data Protection Regulation (EU 2016/679 - GDPR) and the Spanish Organic Law on Data Protection (LOPDGDD 3/2018).
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">1. Data Controller</h3>
          <p>
            The entity responsible for processing your personal information is ERA Capital Developments S.L., with corporate registered offices located at Avenida Litoral, 29680 Estepona, Malaga, Spain. Contact email: info@era-residence.com.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">2. Categories of Data Collected</h3>
          <p>
            We process personal data that you provide directly to us through website contact forms, WhatsApp communications, brochure requests, and telephone inquiries. This data includes your full name, email address, phone number, and residential preference notes.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">3. Purpose and Legal Basis</h3>
          <p>
            Your personal information is collected solely to process your inquiries regarding property reservations, sales schedules, floor plans, and construction milestones at ERA Residence. The legal basis for processing is your explicit consent provided upon submitting the booking and contact forms.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">4. Data Retention & Third Parties</h3>
          <p>
            We do not sell, rent, or transfer your personal data to external commercial third parties. Your data is retained strictly for the duration necessary to satisfy the commercial inquiry or contractual obligations under Spanish real estate regulations.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">5. Your Statutory Rights</h3>
          <p>
            Under GDPR, you retain the right to access, rectify, restrict, or request the erasure of your personal data at any time by directing an email to info@era-residence.com.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
