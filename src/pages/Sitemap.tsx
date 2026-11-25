import { Map, Link2, FileCode, CheckCircle2, ArrowRight, Home, User, Settings, FolderKanban, MessageSquare, BookOpen, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';

interface SitemapProps {
  onPageChange: (page: PageId) => void;
}

export default function Sitemap({ onPageChange }: SitemapProps) {
  const categories = [
    {
      title: 'Core Navigation',
      description: 'The main pages of the site.',
      icon: Home,
      links: [
        { name: 'Home', id: 'home' as PageId, description: 'What we do and the results we get' },
        { name: 'About', id: 'about' as PageId, description: 'Burhan Kapasi, the founder, and how we work' },
        { name: 'Pricing', id: 'pricing' as PageId, description: 'Four website packages with clear starting prices' },
        { name: 'For Agencies', id: 'agencies' as PageId, description: 'White label website design and development for agencies' },
        { name: 'Contact and free audit', id: 'contact' as PageId, description: 'Ask for a free website audit, or get in touch' },
      ]
    },
    {
      title: 'Services',
      description: 'Websites, Google, words and marketing.',
      icon: Settings,
      links: [
        { name: 'All services', id: 'services' as PageId, description: 'Everything we offer, in one place' },
        { name: 'Website design and development', id: 'service-web-design' as PageId, description: 'Custom websites, designed and coded from a blank page' },
        { name: 'SEO', id: 'service-seo' as PageId, description: 'Get found on Google by people searching for what you sell' },
        { name: 'Google Business Profile', id: 'service-gbp' as PageId, description: 'Show up on Google Maps when someone nearby needs you' },
        { name: 'Websites for Dentists and Clinics', id: 'industry-dentists' as PageId, description: 'Appointment booking, local SEO and a clinic result' },
        { name: 'Websites for CA Firms', id: 'industry-ca-firms' as PageId, description: 'Trust-focused websites for chartered accountants' },
        { name: 'Websites for Manufacturers', id: 'industry-manufacturers' as PageId, description: 'Catalogues, enquiry forms and admin panels for B2B suppliers' },
        { name: 'Websites for Textile Businesses', id: 'industry-textile' as PageId, description: 'Product ranges, capacity and admin panels for mills, processors and traders' },
        { name: 'Websites for Consultants', id: 'industry-consultants' as PageId, description: 'Service pages, credentials and consultation booking' },
        { name: 'Sales Pages for Digital Products', id: 'industry-digital-products' as PageId, description: 'Sales pages for coaches, courses and digital products' },
        { name: 'Copywriting', id: 'service-copywriting' as PageId, description: 'Words that make visitors trust you and get in touch' },
        { name: 'Social Media Management', id: 'service-social-media' as PageId, description: 'Instagram, Facebook and LinkedIn planned, designed and posted for you' },
        { name: 'Lead Generation', id: 'service-lead-generation' as PageId, description: 'Researched prospects, verified contacts and personalised outreach' },
        { name: 'Paid Ads (Meta and Google)', id: 'service-paid-ads' as PageId, description: 'Facebook, Instagram and Google ads managed around enquiries' },
      ]
    },
    {
      title: 'Work and guides',
      description: 'Client work, results and plain-English guides.',
      icon: FolderKanban,
      links: [
        { name: 'Our work', id: 'work' as PageId, description: 'Real client websites Mago Labs has designed and built, with testimonials, from timber trading to chartered accountancy' },
        { name: 'Insights & Resources', id: 'insights' as PageId, description: 'Guides on websites, Google and getting more enquiries' },
      ]
    },
    {
      title: 'Legal',
      description: 'Privacy, terms and the sitemap file.',
      icon: FileCode,
      links: [
        { name: 'Privacy Policy', id: 'privacy' as PageId, description: 'How we collect, use, and protect your information' },
        { name: 'Terms of Service', id: 'terms' as PageId, description: 'The terms that govern using this site and working with us' },
        { name: 'XML sitemap', external: true, path: '/sitemap.xml', description: 'The sitemap file for search engines' },
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
      'description': 'Every page on the Mago Labs website, in one list.'
    }
  ];

  return (
    <>
      <SEO path="sitemap" schemas={sitemapSchemas} />

      {/* Hero Header */}
      <section id="sitemap-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white dark:bg-[#1A1A1A] font-sans overflow-hidden border-b border-neutral-200/50 dark:border-neutral-800/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 eyebrow dark:text-brand">
              <Map className="h-4.5 w-4.5" />
              Sitemap
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              Every page, in one place.
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              Find any page on the Mago Labs website.
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
                    <div className="h-10 w-10 rounded-xl bg-brand-soft dark:bg-brand/10 text-neutral-900 dark:text-brand flex items-center justify-center">
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
                            className="group block p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-white dark:bg-neutral-900/40 hover:border-brand dark:hover:border-brand/30 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 transition-all text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-600 dark:group-hover:text-brand transition-colors flex items-center gap-1.5">
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
                        <PageLink page={link.id as PageId}
                          key={linkIdx}
                          onNavigate={() => onPageChange(link.id as PageId)}
                          className="group w-full block p-4 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40 bg-white dark:bg-neutral-900/40 hover:border-brand dark:hover:border-brand/30 hover:bg-neutral-50 dark:hover:bg-neutral-900/80 transition-all text-left cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-600 dark:group-hover:text-brand transition-colors">
                              {link.name}
                            </span>
                            <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-brand transform group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                            {link.description}
                          </p>
                        </PageLink>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
