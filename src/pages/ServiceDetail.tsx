import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  LayoutTemplate,
  Search,
  MapPin,
  PenTool,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Calendar,
  Sparkles,
  Zap,
  Globe,
  Plus,
  Minus
} from 'lucide-react';
import { PageId, Service } from '../types';
import SEO from '../components/SEO';
import ReadingProgress from '../components/ReadingProgress';
import Breadcrumbs from '../components/Breadcrumbs';
import { WhatsAppLogo } from '../components/BrandIcons';
import { getCaseStudyById } from '../data/caseStudies';
import { getPathFromPage, getWorkDetailPath } from '../utils/pageRoutes';
import PageLink from '../components/PageLink';
import { ArrowRight } from 'lucide-react';

interface ServiceDetailProps {
  serviceId: PageId;
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

// Real case studies most relevant to each service, used for the "Related Work"
// section - a genuine internal link from the pitch to proof it was actually
// delivered. Matched by which project's real scope covered that capability.
const RELATED_WORK: Record<string, string[]> = {
  'service-web-design': ['santoshtimbers', 'drmihirshah'],
  'service-seo': ['drmihirshah', 'darshangalani'],
  'service-gbp': ['drmihirshah', 'kdmayani'],
};

// Copy for each of the 4 services. Benefits and process steps are written as
// "Label: description" and split on the first colon when rendered.
const SERVICES_DATA: Record<string, Service> = {
  'service-web-design': {
    id: 'service-web-design',
    title: 'Website Design & Development',
    headline: 'Your website is your storefront.',
    shortDesc: 'Custom business websites, designed from a blank canvas and hand-coded. Built to turn visitors into calls, enquiries and WhatsApp messages.',
    longDesc: 'If your site looks like a template, loads slowly on a phone, or hides the way to contact you, customers go to a competitor, in Surat or anywhere else they are searching. We design and hand-code lightweight websites that load fast and make your business look as established as it is.',
    iconName: 'LayoutTemplate',
    benefits: [
      'Custom code: No pre-made themes or page builders slowing the site down.',
      'Works on every screen: Tested on iPhones, Android phones, tablets and wide desktop monitors.',
      'Landing pages for ads: Single-goal pages that make your Google and Facebook ad spend go further.',
      'Easy to update: Change text, prices and photos yourself, without calling a developer.',
      'Secure by design: None of the plug-in vulnerabilities that template sites carry.'
    ],
    features: [
      'Custom design',
      'Mobile-first code',
      'Speed optimisation',
      'Lead capture forms',
      'WhatsApp and click-to-call',
      'Domain and email setup',
      'SSL security',
      'Search Console setup'
    ],
    process: [
      'Strategy: We learn who your buyers are and plan the pages around them.',
      'Design: Type, colour and layout made for your business. You approve it before we build.',
      'Development: The approved design is hand-coded into a fast, responsive website.',
      'Testing: Links, forms and layouts checked across Safari, Chrome and Firefox.',
      'Launch: We connect your domain, switch on security and submit the site to Google.'
    ],
    faqs: [
      {
        question: 'Do you use WordPress templates or themes?',
        answer: 'Never. Templates carry code you will never use, which slows the site down, and they make you look like fifty other businesses. Every page we build starts from a blank canvas.'
      },
      {
        question: 'Can I update the text and photos myself?',
        answer: 'Yes. We set up simple controls so that changing a service, a photo or a phone number takes a few clicks.'
      },
      {
        question: 'How long does a custom website take?',
        answer: 'It depends on the package. A Launch website is live in 5 days, Growth in 14 days, Scale in 21 days, and an online store in 28 days.'
      },
      {
        question: 'Do you help with hosting and domains?',
        answer: 'Yes. We help you register the domain, set up professional email and host the site on fast, secure cloud servers. Everything stays in your name.'
      }
    ]
  },
  'service-seo': {
    id: 'service-seo',
    title: 'Search Engine Optimization (SEO)',
    headline: 'Rank for the searches that turn into calls.',
    shortDesc: 'SEO aimed at people who are ready to buy. We tune your site structure, speed and content for the searches that bring enquiries.',
    longDesc: 'A lot of SEO is sold on rankings for phrases nobody searches when they are ready to buy. We do the opposite. We find the exact words your patients, clients and customers in Surat and nearby use when they are ready to call, and we build your site to rank for those.',
    iconName: 'Search',
    benefits: [
      'Local buyer keywords: Terms like "CA firm in Surat" or "dentist near me" that lead straight to calls.',
      'Technical fixes: Broken links, crawl problems and anything else stopping Google from reading your site.',
      'Schema markup: Structured data that tells search engines exactly who you are and what you offer.',
      'Image optimisation: Compressed files and proper alt text, so pages load fast and images can rank too.',
      'Content structure: Useful, well-organised pages that answer what people are searching for.'
    ],
    features: [
      'Keyword research',
      'Competitor review',
      'Titles and meta tags',
      'Site speed optimisation',
      'Schema markup',
      'Clean URL structure',
      'Link strategy',
      'Search Console and analytics setup'
    ],
    process: [
      'Keyword mapping: Finding the terms with real search volume and real buying intent.',
      'Technical clean-up: Fixing broken links, rewriting headings and improving load speed.',
      'Schema markup: Adding structured data so your listing stands out in results.',
      'Internal linking: Connecting pages so search engines can reach all of them.',
      'Monitor and refine: Watching Search Console and adjusting based on what the data shows.'
    ],
    faqs: [
      {
        question: 'How long before SEO shows results?',
        answer: 'SEO builds over time. Technical fixes and Google Business Profile work can improve local visibility within 4 to 6 weeks. Competitive page-one keywords usually take 3 to 6 months of steady work.'
      },
      {
        question: 'Do you guarantee a number one ranking?',
        answer: 'No, and nobody honestly can. Google changes its rankings constantly. What we do guarantee is that the technical, local and content work is done properly, which is what consistently beats competitors who skip it.'
      },
      {
        question: 'What is the difference between on-page and technical SEO?',
        answer: 'On-page SEO is what your visitors see: text, headings and images. Technical SEO is what search engines see: load speed, sitemaps, redirects and structured data.'
      }
    ]
  },
  'service-gbp': {
    id: 'service-gbp',
    title: 'Google Business Profile (GBP)',
    headline: 'Be one of the three businesses people see.',
    shortDesc: 'Get your business onto Google Maps properly. We set up, verify and optimise your profile so you show up when people nearby search for what you do.',
    longDesc: 'If you run a clinic, a firm, a factory or a restaurant in Surat, your Google Maps profile is one of the most valuable things you own online. When someone nearby searches for your service, Google shows a map with three businesses, and most people choose from those three. We optimise your profile to earn one of those places and turn it into calls and visits.',
    iconName: 'MapPin',
    benefits: [
      'Top-three visibility: Categories, services and details tuned to move you towards the top three map results.',
      'More reviews: A direct review link and simple message templates that make it easy for happy customers to rate you.',
      'Consistent details: Your name, address and phone number matched across every directory, which Google relies on to trust a business.',
      'Regular posts: Updates and offers that keep your profile active and informative.',
      'Better photos: Organised images of your premises and work, so people trust what they see.'
    ],
    features: [
      'Profile setup and claiming',
      'Map optimisation',
      'Review QR code',
      'Directory citations',
      'Service and product catalogue',
      'Photo optimisation',
      'Competitor map review',
      'Call and click reports'
    ],
    process: [
      'Profile audit: Reviewing your categories, hours and address, and finding what is holding you back.',
      'Fixing your details: Correcting inconsistencies in your address and phone number across the web.',
      'Service catalogue: Listing everything you offer in the words people search for.',
      'Review system: A simple routine your team can follow to collect genuine reviews.',
      'Posting: Publishing regular updates so the profile stays active.'
    ],
    faqs: [
      {
        question: 'Why is my business not showing on Google Maps?',
        answer: 'Usually it is the wrong business category, an incomplete profile, too few listings elsewhere, or a name, address and phone number that do not match across the web. These are the things we fix.'
      },
      {
        question: 'Do reviews really affect my ranking?',
        answer: 'Yes, a lot. Google looks at how many reviews you have, your average rating, how recent they are and the words customers use in them.'
      },
      {
        question: 'What is a citation?',
        answer: 'Any mention of your business name, address and phone number on another website. Google uses citations to confirm that your business is real and located where your map pin says.'
      }
    ]
  },
  'service-copywriting': {
    id: 'service-copywriting',
    title: 'Conversion Copywriting',
    headline: 'Most websites are let down by their words.',
    shortDesc: 'Clear, human-written copy for your website, service pages and landing pages. Written to connect with buyers and move them to act.',
    longDesc: 'The copy on most business websites is either dry and stiff, or full of phrases like "revolutionize" and "seamless" that every reader has learned to skip. We write the way a trusted advisor talks: plainly, about how you solve the customer\'s problem and why they should choose you.',
    iconName: 'PenTool',
    benefits: [
      'Headlines that hold attention: Opening lines that tell a visitor they are in the right place within three seconds.',
      'A human voice: Plain, confident sentences in place of jargon.',
      'A logical flow: Services presented in the order a buyer needs to make a decision.',
      'Natural calls to action: Buttons and prompts that invite, not push.',
      'Search-friendly: The phrases people search for, worked in without sounding forced.'
    ],
    features: [
      'Buyer research',
      'Headline writing',
      'Service page copy',
      'About and founder stories',
      'FAQ writing',
      'Calls to action',
      'SEO titles and descriptions',
      'Proofreading and formatting'
    ],
    process: [
      'Customer research: Learning what your buyers care about and what holds them back.',
      'Headlines: Writing the opening lines that decide whether a visitor stays.',
      'First draft: The full site written in one clear, consistent voice.',
      'Review: Going through the draft with you and refining the details.',
      'Layout: Placing the copy on the page so it is easy to scan and read.'
    ],
    faqs: [
      {
        question: 'Why not just use ChatGPT for my website text?',
        answer: 'AI tools fall back on the same patterns and the same empty adjectives. Your customers have read those phrases on a dozen other sites and they stop trusting them. Human copy stands out because it is specific to your business and your buyers.'
      },
      {
        question: 'Do you write page titles and search descriptions too?',
        answer: 'Yes. Every page comes with its SEO title, meta description, image alt text and button labels.'
      },
      {
        question: 'Can you rewrite my existing website copy?',
        answer: 'Yes. We turn long, hard-to-read pages into clear, scannable text that leads the reader to act.'
      }
    ]
  }
};

export default function ServiceDetail({ serviceId, onPageChange, onOpenCaseStudy }: ServiceDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const data = SERVICES_DATA[serviceId];
  const relatedWork = (RELATED_WORK[serviceId] ?? [])
    .map((id) => getCaseStudyById(id))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  if (!data) {
    return (
      <div className="pt-40 pb-20 text-center font-sans">
        <h2 className="text-xl font-bold">Service Not Found</h2>
        <button onClick={() => onPageChange('services')} className="mt-4 text-neutral-900 hover:underline">
          Return to Services Overview
        </button>
      </div>
    );
  }

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const serviceSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': data.title,
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Mago Labs',
        'telephone': '+91 9099245605',
        'email': 'burhan@magolabs.in',
        'url': 'https://www.magolabs.in'
      },
      'description': data.shortDesc
    },
    ...(data.faqs && data.faqs.length > 0
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': data.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
          }))
        }]
      : [])
  ];

  return (
    <>
      <SEO path={`services/${data.id}`} schemas={serviceSchemas} />

      {/* Top-of-page reading progress bar */}
      <ReadingProgress />

      {/* Hero Header */}
      <section id="service-detail-hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden font-sans border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onPageChange={onPageChange}
              items={[
                { label: 'Home', page: 'home' },
                { label: 'Services', page: 'services' },
                { label: data.title, path: getPathFromPage(serviceId) },
              ]}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03, x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPageChange('services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-8 transition-all group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow">Service</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
                {data.title}
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {data.shortDesc}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onPageChange('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-brand hover:bg-brand-deep px-6 py-3.5 text-sm font-bold text-ink transition-all shadow-lg shadow-brand/10 cursor-pointer"
                >
                  Get a free website audit
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20would%20like%20to%20discuss%20my%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 hover:bg-neutral-50 px-6 py-3.5 text-sm font-bold text-neutral-800 transition-all cursor-pointer"
                >
                  <WhatsAppLogo className="h-4 w-4 text-emerald-600" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-50 rounded-2xl p-8 border border-neutral-100 space-y-6 self-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                What&rsquo;s included
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-3">
                {data.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 bg-brand" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Copy & Benefits */}
      <section id="service-benefits" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Long Copy Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">Why it matters</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {data.headline}
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {data.longDesc}
              </p>
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-4">
                <h4 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider">
                  How we work
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Regular updates. Direct access to Burhan Kapasi, the founder. Clean code. No markup on your domain or hosting costs.
                </p>
              </div>
            </div>

            {/* Benefits Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="eyebrow">What you get</span>
              <h3 className="text-xl font-bold text-neutral-900">What this does for your business</h3>
              <div className="space-y-4">
                {data.benefits.map((bn, idx) => {
                  const parts = bn.split(':');
                  const header = parts[0];
                  const desc = parts.slice(1).join(':');
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.025, y: -2 }}
                      className="p-5 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 transition-all space-y-1 cursor-default"
                    >
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900">{header}</h4>
                      <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <motion.section 
        id="service-process" 
        className="py-24 bg-neutral-950 text-white font-sans overflow-hidden"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow eyebrow-on-dark">How it works</span>
            <h2 className="text-3xl font-bold tracking-tight text-white">Five steps, in order.</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              You always know what is happening now and what comes next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {data.process.map((p, idx) => {
              const parts = p.split(':');
              const header = parts[0];
              const desc = parts.slice(1).join(':');
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-6 rounded-xl border border-neutral-900 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-800 transition-all space-y-3 cursor-default"
                >
                  <div className="h-8 w-8 rounded-full bg-neutral-950 border border-brand/30 flex items-center justify-center text-xs font-bold text-brand">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white">{header}</h4>
                  <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Related Work: real proof this service was actually delivered, not just pitched */}
      {relatedWork.length > 0 && (
        <section id="service-related-work" className="py-20 bg-white font-sans border-t border-neutral-200/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center mb-8">
              <span className="eyebrow">Related work</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedWork.map((cs) => (
                <PageLink
                  key={cs.id}
                  href={getWorkDetailPath(cs.id)}
                  onNavigate={() => onOpenCaseStudy(cs.id)}
                  className="block text-left p-6 rounded-2xl border border-neutral-200 bg-neutral-50 hover:bg-white hover:border-neutral-900 transition-colors cursor-pointer space-y-2"
                >
                  {cs.logoUrl && <img src={cs.logoUrl} alt={`${cs.clientName} logo`} className="h-6 w-auto max-w-[100px] object-contain" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: cs.accent }}>
                    {cs.industry}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">{cs.clientName}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{cs.outcome}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900">
                    Read the case study <ArrowRight className="h-3 w-3" />
                  </span>
                </PageLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Specific FAQ */}
      <section id="service-faq" className="py-24 bg-neutral-50 font-sans border-t border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="eyebrow">Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Straight answers about {data.title}</h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-neutral-200/60 rounded-xl overflow-hidden shadow-sm transition-all">
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-neutral-900 hover:bg-neutral-50 transition-colors text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-neutral-500" /> : <Plus className="h-5 w-5 text-neutral-500" />}
                  </button>
                  {/* Always in the markup (collapsed with CSS) so search engines can read every answer */}
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
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
