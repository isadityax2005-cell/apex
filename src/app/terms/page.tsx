import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Use — ERA Residence Estepona',
  description: 'Terms of use and statutory legal conditions for ERA Residence website and digital materials.',
};

export default function TermsPage() {
  return (
    <main className="bg-[#121514] text-[#EFECE6] min-h-screen">
      <Header breadcrumb={[{ label: 'Terms of Use' }]} />

      <div className="pt-32 md:pt-40 px-6 md:px-12 max-w-4xl mx-auto pb-24">
        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] font-semibold block mb-3">
          Legal & Compliance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white mb-8">
          Terms of Use
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-sm font-sans opacity-80 leading-relaxed border-t border-white/10 pt-8">
          <p>
            Welcome to the official digital portal of ERA Residence. By accessing, browsing, or utilizing this website, you agree to be bound by the statutory terms set forth below.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">1. Architectural Visualizations and Renders</h3>
          <p>
            All architectural computer-generated imagery (CGI), 3D floor plans, landscape depictions, and interior staging exhibited on this website are of an illustrative nature. While prepared with technical precision according to approved architectural master plans, finish materials and dimensions may undergo minor technical adjustments during municipal construction execution.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">2. Building Licenses and Statutory Clearances</h3>
          <p>
            ERA Residence holds full municipal licenses granted by the Ayuntamiento de Estepona. Binding contractual details, technical specifications, and escrow bank guarantees are governed exclusively by executed private purchase contracts (Contrato de Compraventa).
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">3. Intellectual Property Rights</h3>
          <p>
            All graphics, architectural designs, logos, typography, line art, and software code published on this website are protected under European intellectual property legislation and remain the exclusive property of ERA Capital Developments S.L.
          </p>

          <h3 className="font-serif text-2xl text-white pt-4">4. Governing Jurisdiction</h3>
          <p>
            Any disputes arising in connection with the access or utilization of this website shall be submitted to the exclusive jurisdiction of the Courts of Estepona and Malaga, Spain.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
