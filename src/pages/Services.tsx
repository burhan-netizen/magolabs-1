import { LayoutTemplate, Search, MapPin, PenTool, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import SiteHealthCheck from '../components/SiteHealthCheck';

interface ServicesProps {
  onPageChange: (page: PageId) => void;
}

export default function Services({ onPageChange }: ServicesProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesList = [
    {
      id: 'service-web-design' as PageId,
      title: 'Website Design & Development',
      tag: 'Core Service',
      tagline: 'Bespoke custom code designed to turn visitors into enquiries.',
      shortDesc: 'We design and code business websites that look premium, load instantly, and are built purely around converting traffic into actual client calls, form submissions, and WhatsApp enquiries. No template bloat.',
      bullets: [
        'Custom Design (Blank Canvas - No Templates)',
        'Tactile, Mobile-First Responsive Layout',
        'Performance Engineered From the Ground Up',
        'Inbuilt Lead Triggers (WhatsApp, Click-to-Call, Forms)',
        'Clean, Highly Secure Code Structure',
        'Intuitive Content Management System',
      ],
      icon: LayoutTemplate,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
    },
    {
      id: 'service-seo' as PageId,
      title: 'Search Engine Optimization',
      tag: 'Growth Layer',
      tagline: 'Strategic Local & Technical SEO to place you on top of Google.',
      shortDesc: 'Get found by customers actively searching for your services in your local area. We optimize your technical code and site architecture for high-intent keywords that bring direct leads, not vanity traffic.',
      bullets: [
        'Local Map Pack Search Optimization',
        'Buyer-Intent Keyword Research',
        'Competitor Search Position Auditing',
        'On-Page SEO Structure & Meta Tagging',
        'Technical Crawl & Speed Enhancements',
        'Sitemap & Google Console Setup',
      ],
      icon: Search,
      color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600',
    },
    {
      id: 'service-gbp' as PageId,
      title: 'Google Business Profile',
      tag: 'Growth Layer',
      tagline: 'Dominate Google Maps local search and drive instant phone calls.',
      shortDesc: 'Unlock immense visibility on Google Maps. We configure, verify, and fully optimize your local profile to rank in the coveted local 3-pack search results, driving direct reviews and calls.',
      bullets: [
        'Complete Profile Setup & Verification Setup',
        'Local 3-Pack Map Rankings Optimization',
        'Review Strategy to Build Customer Trust',
        'Localized Service Catalog Optimization',
        'Weekly Updates & Promotions Posting',
        'Accurate Local Directory Synchronizing',
      ],
      icon: MapPin,
      color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
    },
    {
      id: 'service-copywriting' as PageId,
      title: 'Conversion Copywriting',
      tag: 'Growth Layer',
      tagline: 'Persuasive written words that build trust and drive conversions.',
      shortDesc: 'No robotic AI-generated fluff. We draft compelling, clear, persuasive website copy that speaks directly to your ideal buyers\' pain points and guides them to take immediate actions.',
      bullets: [
        'Conversion-Focused Main Heading Hooks',
        'Persuasive Benefits-focused Core Messaging',
        'Zero-friction Interactive CTA Microcopy',
        'Clear, Direct Service Descriptors',
        'Trust-Building Copy & Customer Journey Flow',
        'Search-engine Friendly Article Templates',
      ],
      icon: PenTool,
      color: 'bg-amber-500/10 border-amber-500/20 text-amber-600',
    },
  ];

  const servicesSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Website Design & Development',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Mago Labs'
      },
      'description': 'Custom premium website design & development services.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Search Engine Optimization (SEO)',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Mago Labs'
      },
      'description': 'Technical, On-page and Local SEO optimization.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Google Business Profile (GBP) Management',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Mago Labs'
      },
      'description': 'Google Map rankings and GBP optimization services.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Conversion Copywriting',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Mago Labs'
      },
      'description': 'Custom written human copywriting focused on sales conversions.'
    }
  ];

  return (
    <>
      <SEO path="services" schemas={servicesSchemas} />

      {/* Hero Header */}
      <section id="services-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Expertise</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Bespoke Digital Services Built to Grow Your Business
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              We specialize in custom web development, local search marketing, and conversion-focused messaging. We design with intent, program with precision, and write with clarity to deliver real-world business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <motion.section 
        id="services-list-grid" 
        className="py-24 bg-neutral-50 font-sans"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500 max-w-2xl mx-auto mb-14 leading-relaxed">
            Your website is the foundation. SEO, Google Business Profile, and copywriting are the growth layer we build on top of it.
          </p>
          <div className="space-y-16">
            {servicesList.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  id={`services-page-card-${srv.id}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, scale: 1.005, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 transition-all grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
                >
                  {/* Info Column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
                        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${srv.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">0{idx + 1} / Service Capability</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          srv.tag === 'Core Service'
                            ? 'bg-blue-600 text-white'
                            : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        {srv.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                        {srv.title}
                      </h2>
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        {srv.tagline}
                      </p>
                    </div>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ y: -3, scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                        whileTap={{ scale: 0.985, y: 0 }}
                        onClick={() => navigateTo(srv.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:shadow-lg transition-all cursor-pointer"
                      >
                        Deep Dive Service Details
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -3, scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                        whileTap={{ scale: 0.985, y: 0 }}
                        onClick={() => navigateTo('contact')}
                        className="inline-flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 px-6 py-3.5 text-sm font-bold text-neutral-800 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        Discuss Your Project
                      </motion.button>
                    </div>
                  </div>

                  {/* Bullets Column */}
                  <div className="lg:col-span-5 bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-100 space-y-6 self-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      What's Included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-6">
                      {srv.bullets.map((bullet, bIdx) => (
                        <motion.li 
                          key={bIdx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: 0.4, delay: bIdx * 0.05 + 0.1, ease: 'easeOut' }}
                          className="flex items-start gap-2.5"
                        >
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-neutral-700 font-medium">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

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
