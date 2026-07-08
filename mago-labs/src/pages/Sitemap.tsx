import { Map, Link2, FileCode, CheckCircle2, ArrowRight, Home, User, Settings, FolderKanban, MessageSquare, BookOpen, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';

interface SitemapProps {
  onPageChange: (page: PageId) => void;
}

export default function Sitemap({ onPageChange }: SitemapProps) {
  const categories = [
    {
      title: 'Core Navigation',
      description: 'The main paths to explore our agency, our ethos, and direct communications.',
      icon: Home,
      links: [
        { name: 'Home / Agency Overview', id: 'home' as PageId, description: 'High-speed, custom-engineered landing experience' },
        { name: 'About the Founder', id: 'about' as PageId, description: 'Get to know Burhan Kapasi and our direct client partnership model' },
        { name: 'Why Choose Us', id: 'why-choose-us' as PageId, description: 'Our 8 agency commitments including absolute pricing transparency' },
        { name: 'Book Consultation / Audits', id: 'contact' as PageId, description: 'Request a free 30-min performance and local search SEO checkup' },
      ]
    },
    {
      title: 'Our Core Services',
      description: 'Custom-coded performance marketing and high-ROI local ranking strategies.',
      icon: Settings,
      links: [
        { name: 'All Services Overview', id: 'services' as PageId, description: 'Complete map of our bespoke digital business systems' },
        { name: 'Bespoke Web Design & Dev', id: 'service-web-design' as PageId, description: 'Hand-coded TypeScript and React applications without template bloat' },
        { name: 'Technical SEO & PageSpeed', id: 'service-seo' as PageId, description: 'In-built schema structures that guarantee 90+ Lighthouse speeds' },
        { name: 'Google Business Profile SEO', id: 'service-gbp' as PageId, description: 'Dominating local geo-targeted queries and maps for local leads' },
        { name: 'High-Converting Copywriting', id: 'service-copywriting' as PageId, description: 'Direct sales copy designed specifically to drive inbound phone calls' },
      ]
    },
    {
      title: 'Proof & Insights',
      description: 'Where we\'ll showcase client work, reviews, and engineering updates as they go live.',
      icon: FolderKanban,
      links: [
        { name: 'Client Project Portfolio', id: 'portfolio' as PageId, description: 'Live client websites Mago Labs has designed and built, from chartered accountancy firms to a solar energy distributor' },
        { name: 'Testimonials & Reviews', id: 'testimonials' as PageId, description: 'Real feedback from real clients: chartered accountants, manufacturers, and energy businesses' },
        { name: 'Insights & Resources', id: 'insights' as PageId, description: 'Our technical blog covering Lighthouse speed benchmarks and SEO tips' },
      ]
    },
    {
      title: 'Developer & Search Engines',
      description: 'Direct files, structured models, and metadata endpoints for bots.',
      icon: FileCode,
      links: [
        { name: 'XML Sitemap (Technical)', external: true, path: '/sitemap.xml', description: 'Raw crawler sitemap optimized for Googlebot indexing' },
      ]
    }
  ];

  const sitemapSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://www.magolabs.in/sitemap/#webpage',
      'url': 'https://www.magolabs.in/sitemap',
      'name': 'Website Sitemap and Architecture | Mago Labs',
      'description': 'A comprehensive, human-readable outline of Mago Labs pages, services, case studies, and indexing sitemaps.'
    }
  ];

  return (
    <>
      <SEO
        title="Website Sitemap & Architecture | Mago Labs"
        description="Comprehensive map of all service pages, portfolio previews, and direct XML sitemap files of Mago Labs website."
        path="sitemap"
        schemas={sitemapSchemas}
      />

      {/* Hero Header */}
      <section id="sitemap-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-[#1A1A1A] font-sans overflow-hidden border-b border-neutral-200/50 dark:border-neutral-800/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              <Map className="h-4.5 w-4.5" />
              Directory Structure
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Website Sitemap & Directory
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore our core framework, premium custom-coded services, and technical search-engine indexes in one clean, transparent interface.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="sitemap-content" className="py-20 bg-white dark:bg-[#1A1A1A] font-sans transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((category, catIdx) => {
              const CategoryIcon = category.icon;
              return (
                <div 
                  key={catIdx}
                  className="p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/25 dark:bg-neutral-900/10 space-y-6"
                >
                  <div className="flex items-center gap-3.5 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.links.map((link, linkIdx) => {
                      if ('external' in link) {
                        return (
                          <a
                            key={linkIdx}
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-white dark:bg-neutral-900/40 hover:border-blue-300 dark:hover:border-blue-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 transition-all text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                                {link.name}
                                <Link2 className="h-3.5 w-3.5 opacity-60" />
                              </span>
                              <span className="text-[10px] uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded font-bold">
                                XML FILE
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                              {link.description}
                            </p>
                          </a>
                        );
                      }

                      return (
                        <button
                          key={linkIdx}
                          onClick={() => onPageChange(link.id as PageId)}
                          className="group w-full block p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-white dark:bg-neutral-900/40 hover:border-blue-300 dark:hover:border-blue-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 transition-all text-left cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {link.name}
                            </span>
                            <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            {link.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verification Badge Section */}
          <div className="mt-16 p-8 rounded-2xl border border-emerald-500/20 dark:border-emerald-500/10 bg-emerald-50/10 dark:bg-emerald-950/5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Technical Index Verification
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                Our dynamic XML generation script syncs perfectly with this page structure and auto-notifies search crawlers like Googlebot to ensure near-instant page indexing. Every single page is fully hand-optimized to guarantee 100% Core Web Vitals compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
