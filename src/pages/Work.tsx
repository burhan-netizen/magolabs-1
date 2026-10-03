import { PageId } from '../types';
import PageLink from '../components/PageLink';
import { INDUSTRIES } from '../data/industries';
import SEO from '../components/SEO';
import ClientWorkGallery from '../components/ClientWorkGallery';
import TestimonialWall from '../components/TestimonialWall';

interface WorkProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

export default function Work({ onPageChange, onOpenCaseStudy }: WorkProps) {
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
      <SEO path="/work" schemas={workSchemas} />

      {/* Hero Header */}
      <section id="work-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4 max-w-3xl">
          <span className="eyebrow">Client work</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
            Real businesses. Real results.
          </h1>
          <p className="text-neutral-600 text-base leading-relaxed">
            Some had no website. Some had one that was quietly costing them clients. Here is what we built, and what changed.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-neutral-500">By industry:</span>
            {INDUSTRIES.map((industry) => (
              <PageLink
                key={industry.id}
                page={industry.id}
                onNavigate={() => { onPageChange(industry.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="rounded-full border border-neutral-200 px-3.5 py-1.5 font-medium text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                {industry.label}
              </PageLink>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work-case-studies" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <ClientWorkGallery onOpenCaseStudy={onOpenCaseStudy} />
        </div>
      </section>

      {/* Testimonials, folded in here so proof sits next to the work it's proving */}
      <section id="work-testimonials" className="py-24 bg-neutral-50 font-sans border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow">In their own words</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">What clients say.</h2>
          </div>
          <TestimonialWall />
        </div>
      </section>
    </>
  );
}
