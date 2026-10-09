import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import SiteHealthCheck from '../components/SiteHealthCheck';
import PageLink from '../components/PageLink';
import AddOnServices from '../components/AddOnServices';
import Price from '../components/Price';
import { PACKAGES } from '../data/packages';

interface ServicesProps {
  onPageChange: (page: PageId) => void;
}

export default function Services({ onPageChange }: ServicesProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Websites are the main service. Everything else supports them.
  const website = {
    id: 'service-web-design' as PageId,
    title: 'Website Design & Development',
    tagline: 'Custom-designed and hand-coded.',
    shortDesc: 'A website that looks established, loads fast, and makes it easy to call, message or enquire. Designed from a blank canvas, never from a template.',
    bullets: [
      'Custom design, no templates',
      'Built mobile first',
      'Fast on any network',
      'Click-to-call, WhatsApp and enquiry forms',
      'Clean, secure code',
      'Easy for you to update',
    ],
  };

  const servicesSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Website Design & Development',
      'provider': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'description': 'Custom premium website design & development services.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Search Engine Optimization (SEO)',
      'provider': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'description': 'Technical, On-page and Local SEO optimization.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Google Business Profile (GBP) Management',
      'provider': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'description': 'Google Map rankings and GBP optimization services.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Conversion Copywriting',
      'provider': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'description': 'Custom written human copywriting focused on sales conversions.'
    }
  ];

  return (
    <>
      <SEO path="services" schemas={servicesSchemas} />

      {/* Hero Header */}
      <section id="services-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="eyebrow">Services</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]">
              We build websites that bring <span className="marker">enquiries.</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              That is the main thing we do. Everything else we offer exists to help your website do more.
            </p>
          </div>
        </div>
      </section>

      {/* The main service: websites */}
      <section id="services-list-grid" className="py-20 bg-neutral-50 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            id={`services-page-card-${website.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Info Column */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand text-ink">
                  Our main service
                </span>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">{website.title}</h2>
                  <p className="text-base font-semibold text-neutral-900">
                    <span className="marker">{website.tagline}</span>
                  </p>
                </div>

                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{website.shortDesc}</p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <PageLink
                    page="pricing"
                    onNavigate={() => navigateTo('pricing')}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-deep px-6 py-3.5 text-sm font-bold text-ink transition-colors cursor-pointer"
                  >
                    See packages and pricing
                    <ArrowRight className="h-4 w-4" />
                  </PageLink>
                  <PageLink
                    page={website.id}
                    onNavigate={() => navigateTo(website.id)}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 px-6 py-3.5 text-sm font-bold text-neutral-800 transition-colors cursor-pointer"
                  >
                    See how it works
                  </PageLink>
                </div>
              </div>

              {/* Bullets Column */}
              <div className="lg:col-span-5 bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-100 space-y-6 self-center">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">What&rsquo;s included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-6">
                  {website.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 bg-brand" aria-hidden="true" />
                      <span className="text-xs sm:text-sm text-neutral-700 font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The four packages, at a glance */}
            <div className="mt-10 pt-8 border-t border-neutral-200">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Four packages</h3>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PACKAGES.map((pkg) => (
                  <li key={pkg.id}>
                    <PageLink
                      page="pricing"
                      onNavigate={() => navigateTo('pricing')}
                      className="group block h-full rounded-2xl border border-neutral-200 p-5 hover:border-neutral-900 transition-colors cursor-pointer"
                    >
                      <span className="font-mono text-xs font-bold text-neutral-400">{pkg.number}</span>
                      <span className="mt-1 block text-lg font-bold text-neutral-900">{pkg.name}</span>
                      <span className="block text-sm text-neutral-600">{pkg.forWhom}</span>
                      <span className="mt-3 block text-sm font-semibold text-neutral-900">From <Price pkg={pkg} /> · live in {pkg.days} days</span>
                    </PageLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Supporting services, kept quiet */}
      <AddOnServices onPageChange={onPageChange} />

      {/* Interactive Website Health Check Section */}
      <section id="services-health-check-section" className="py-24 bg-neutral-100/40 font-sans border-t border-neutral-200/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <SiteHealthCheck />
        </div>
      </section>
    </>
  );
}
