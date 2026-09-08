import { Briefcase } from 'lucide-react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import ClientWorkGallery from '../components/ClientWorkGallery';
import LiveMockupPlayground from '../components/LiveMockupPlayground';
import TestimonialWall from '../components/TestimonialWall';

interface WorkProps {
  onPageChange: (page: PageId) => void;
}

export default function Work({ onPageChange }: WorkProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const workSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://www.magolabs.in/work/#webpage',
      'url': 'https://www.magolabs.in/work',
      'name': 'Mago Labs Client Work & Case Studies',
      'description': 'Real websites Mago Labs has designed and built for clients across timber trading, dental care, consulting, energy, and chartered accountancy.',
    },
  ];

  return (
    <>
      <SEO
        title="Our Work | Client Case Studies | Mago Labs"
        description="See real websites Mago Labs has designed and built, and what each project actually solved. Live sites across timber trading, dental care, consulting, energy, and chartered accountancy."
        path="/work"
        schemas={workSchemas}
      />

      {/* Hero Header */}
      <section id="work-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 mx-auto">
            <Briefcase className="h-3.5 w-3.5" />
            Real Client Work
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Every project below is a real business, not a concept.
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
            Some had no website at all. Some had one that was quietly costing them clients. Here is what changed, and why it mattered for each business.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Real businesses. Real requirements. Real digital work.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work-case-studies" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <ClientWorkGallery />

          <div className="space-y-4 pt-4 border-t border-neutral-200/60">
            <p className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase flex items-center justify-center gap-2">
              <span>Not your industry? Try our live playground</span>
            </p>
            <LiveMockupPlayground onRequestProject={() => navigateTo('contact')} />
          </div>
        </div>
      </section>

      {/* Testimonials, folded in here so proof sits next to the work it's proving */}
      <section id="work-testimonials" className="py-24 bg-neutral-50 font-sans border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">In Their Own Words</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">What clients say after working with us</h2>
          </div>
          <TestimonialWall />
        </div>
      </section>
    </>
  );
}
