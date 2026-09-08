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
import { WhatsAppLogo } from '../components/BrandIcons';

interface ServiceDetailProps {
  serviceId: PageId;
  onPageChange: (page: PageId) => void;
}

// Complete bespoke copy database for each of the 4 services
const SERVICES_DATA: Record<string, Service> = {
  'service-web-design': {
    id: 'service-web-design',
    title: 'Website Design & Development',
    shortDesc: 'Bespoke corporate, portfolio and business websites engineered from a blank page. We code pixel-perfect, highly responsive layout architectures focused on converting visitors into calls and WhatsApp chats.',
    longDesc: 'Your website is your absolute virtual storefront. If it looks like a cheap template, loads slowly on 4G networks, or has confusing contact triggers, you are actively losing customers to competitors. We write hand-crafted, lightweight code that guarantees blistering speed and representing your business brand with extreme authority.',
    iconName: 'LayoutTemplate',
    benefits: [
      'Purely Custom Coding: No standard pre-made themes or visual page builders that bloat your loading speed.',
      'TACTILE Responsiveness: Tested across multiple screens, from iPhones and Android pads to extra-wide desktop monitors.',
      'Landing Pages for Ad Campaigns: Highly optimized, single-goal pages structured to maximize your Google or Facebook Ad spends.',
      'Intuitive Updates: We build structures that are incredibly easy for you to manage without calling developers.',
      'Top Tier Security Protocols: Fully secure, eliminating standard open-source CMS hack vulnerabilities.'
    ],
    features: [
      'Custom Design Files',
      'Mobile-First Fluid Code',
      'Speed Optimizations',
      'Built-in Lead Capture Forms',
      'WhatsApp API Triggers',
      'Domain & Email Setup',
      'SSL Protection',
      'Search Console Registration'
    ],
    process: [
      'Strategic Blueprint: Understanding your target audience (CA, doctors, MSMEs) and outlining the screen architecture.',
      'Bespoke Visual Layouts: Drafting typography, color palettes, and mockups tailored precisely for your business authority.',
      'Pixel-Perfect Coding: Translating approved designs into super-fast, responsive web files.',
      'Form & Quality Check: Auditing links, validating form inputs, and ensuring perfect compatibility across Safari, Chrome, and Firefox.',
      'Server Handover & Indexing: Pointing domains, enabling security, and submitting indexing queries to Google.'
    ],
    faqs: [
      {
        question: 'Do you use pre-made WordPress templates or themes?',
        answer: 'Never. Pre-made templates are filled with hundreds of lines of useless code that slow your site down and make it look exactly like fifty other businesses in your area. We design every page from a completely blank canvas.'
      },
      {
        question: 'Will I be able to update my own website text and photos?',
        answer: 'Yes. We build clean, lightweight administrative structures or straightforward layouts so that editing services, uploading pictures, or updating phone numbers takes just a few clicks.'
      },
      {
        question: 'How long does a custom business website take to design and launch?',
        answer: 'A standard custom website takes between 2 to 4 weeks depending on the complexity, sitemap size, and feedback loops.'
      },
      {
        question: 'Do you provide website hosting and domain support?',
        answer: 'Absolutely. We assist you in registering the domains, setting up professional G-Suite emails, and placing your site on premium, secure cloud servers.'
      }
    ]
  },
  'service-seo': {
    id: 'service-seo',
    title: 'Search Engine Optimization (SEO)',
    shortDesc: 'Strategic Search Engine Optimization targeting active, high-intent local buyers. We align your code architecture, speed, and content mapping to position you on page one of Google.',
    longDesc: 'Most SEO agencies sell fake promises of ranking for thousands of empty, low-intent phrases. We do not focus on vanity charts. We research, map, and rank your site for the exact search words that local patients, clients, and partners use when they are ready to call and purchase.',
    iconName: 'Search',
    benefits: [
      'Local Buyer Keywords: Ranking for terms like "best CA firm near me" or "dentist in Ahmedabad" that bring immediate calls.',
      'Technical SEO Auditing: Correcting internal link configurations, crawl directories, and search engine crawling barriers.',
      'Premium Schema Ingestion: Ingesting Organization, Service, and Local Business JSON-LD structure scripts so search crawlers understand you.',
      'Alt Text & Media Optimization: Compressing illustration files and metadata tagging to rank in Google Images.',
      'Content Architecture Setup: Outlining informative, authoritative pages that satisfy search queries and satisfy readers.'
    ],
    features: [
      'In-depth Keyword Research',
      'Competitor Search Profiling',
      'Metadata Title & Tag Setup',
      'Site Speed Optimization',
      'Search Schema Markups',
      'Clean URL Rewrite Structures',
      'External Link Strategies',
      'Google Search Analytics Setup'
    ],
    process: [
      'Keyword Mapping: Identifying terms with high search volume and high commercial buyer intent.',
      'Technical Overhaul: Fixing broken links, rewriting headings, and compressing page speeds.',
      'On-Page Schema Injection: Building JSON-LD script markups to stand out on search result pages.',
      'Internal Link Building: Structuring paths so search bots crawl every page efficiently.',
      'Monitoring & Refinement: Studying Search Console, monitoring rank changes, and adjusting keywords based on data.'
    ],
    faqs: [
      {
        question: 'How long does it take to see organic results from SEO?',
        answer: 'SEO is a compounding, long-term asset. While technical adjustments and Google Business Profile indexing can bring local visibility improvements in 4 to 6 weeks, major page-one keywords generally take 3 to 6 months of systematic optimization.'
      },
      {
        question: 'Do you guarantee number one rankings on Google?',
        answer: 'No legitimate agency can guarantee a specific spot on Google, as search algorithms update constantly. However, we guarantee we will implement standard best-practice technical, local, and content search criteria that consistently outrank standard competitors.'
      },
      {
        question: 'What is the difference between On-Page and Technical SEO?',
        answer: 'On-Page SEO covers elements visible to human readers (like text copy, headings, and images). Technical SEO covers elements visible only to search bots (like page load speeds, sitemaps, URL redirects, and structured data schemas).'
      }
    ]
  },
  'service-gbp': {
    id: 'service-gbp',
    title: 'Google Business Profile (GBP)',
    shortDesc: 'Unlock your business on Google Maps. We build, verify, optimize, and manage your Local Business Profile to place you in the Map 3-Pack where over 45% of local search clicks land.',
    longDesc: 'If you are a doctor, dentist, law firm, manufacturer, or local restaurant, your Google Maps profile is the single most important asset you own. When local customers search for your service, Google presents a map with three businesses. If you are not in that Map 3-Pack, you are invisible. We fully optimize your business profile to drive direct phone calls and map directions.',
    iconName: 'MapPin',
    benefits: [
      'Map 3-Pack Dominance: Adjusting category structures, service tags, and profiles to move you into the top three map listings.',
      'Review Management Systems: Providing you with straight-to-review WhatsApp links and templates to get positive customer ratings.',
      'NAP Consistency Audit: Aligning your Name, Address, and Phone across every business directory on the web to establish Google trust.',
      'Google Post Strategy: Creating localized updates and catalog listings to inform visitors.',
      'Visual Profile Optimization: Organizing geo-tagged images of your storefront, clinic, or office to build instant reader trust.'
    ],
    features: [
      'GBP Profile Setup & Claiming',
      'Local Map Optimization',
      'Review QR Code Generation',
      'NAP Directory Citations',
      'Service/Product Catalog Layout',
      'Geo-Tagged Image Ingestion',
      'Competitor Map Profiling',
      'Call & Click Interaction Reports'
    ],
    process: [
      'Profile Verification Audit: Analyzing categories, hours, addresses, and identifying maps optimization opportunities.',
      'NAP Alignment: Auditing and fixing inconsistencies in your address across the entire web.',
      'Service Catalog Structuring: Listing every procedure, product, or service you offer with clear keywords.',
      'Review Program Rollout: Implementing simple protocols for your reception or staff to gather real, five-star customer reviews.',
      'Post Ingestion: Publishing high-quality local service posts to capture search visibility.'
    ],
    faqs: [
      {
        question: 'Why is my business not showing up on Google Maps?',
        answer: 'This is usually due to incorrect business categories, incomplete profile details, a lack of active local citations, or NAP (Name, Address, Phone) inconsistencies. We specialize in resolving these issues to restore map visibility.'
      },
      {
        question: 'Do reviews actually affect my local search ranking?',
        answer: 'Yes, heavily. Google looks at the total count, average rating, frequency, and keyword keywords inside reviews to rank local business profiles on Google Maps.'
      },
      {
        question: 'What is a Local NAP Citation?',
        answer: 'A citation is any mention of your Name, Address, and Phone number on an external website. Google uses these citations to verify that your business is genuine and located exactly where your map pin is.'
      }
    ]
  },
  'service-copywriting': {
    id: 'service-copywriting',
    title: 'Conversion Copywriting',
    shortDesc: 'Clear, human, trust-oriented copywriting written by an experienced agency owner. We write website, service, and landing page texts that immediately connect with your buyers.',
    longDesc: 'Most business websites are ruined by copy that is either dry and academic, or filled with obvious AI buzzwords like "revolutionize", "seamless", or "spearheading". Real buyers see right through this. We write clear, simple, professional, human-to-human text that explains exactly how you solve your customer\'s problems and why they should trust you over everyone else.',
    iconName: 'PenTool',
    benefits: [
      'Direct-Response Copy: Writing headings and sub-headings that immediately hook visitors within 3 seconds of loading.',
      'Human & Trustworthy Voice: Removing robotic jargon and replacing it with genuine, persuasive sentences that establish authority.',
      'Clear Solution Layout: Presenting your services, procedures, or products in a highly logical flow that aligns with buyer psychology.',
      'Frictionless CTAs: Designing action-oriented buttons (e.g., "Schedule free audit") that feel inviting, not pushy.',
      'In-built Search Optimization: Writing texts that naturally incorporate search phrases without sounding repetitive or stuffed.'
    ],
    features: [
      'Persona-Driven Research',
      'Primary Hook Crafting',
      'Concise Header Styling',
      'Persuasive Service Pages',
      'About Founder Narratives',
      'FAQ Block Structuring',
      'Conversion Trigger Buttons',
      'Proofreading & Formatting'
    ],
    process: [
      'Target Customer Audit: Studying what your patients, CA clients, or builders care about and what fears keep them back.',
      'Hook Formulation: Curating compelling main titles and initial visual text blocks.',
      'Draft Creation: Writing the complete sitemap draft with a clear, engaging tone of voice.',
      'Review Loop: Discussing drafts, refining sentences, and adjusting industry-specific terms.',
      'Formatting Ingestion: Arranging and placing the copy inside responsive grids for peak scan-readability.'
    ],
    faqs: [
      {
        question: 'Why not just use ChatGPT to write my website text?',
        answer: 'AI tools write using highly repetitive patterns, empty adjectives, and predictable structures. Your customers read those same phrases on a dozen other sites and immediately discount your business authority. Professional human copywriting stands out because it speaks to genuine human pain points with nuance and simplicity.'
      },
      {
        question: 'Do you help write page titles and search descriptions too?',
        answer: 'Yes. Every page copy package we deliver includes custom structured SEO title tags, meta descriptions, alt texts, and CTA labels built right in.'
      },
      {
        question: 'Can you rewrite my existing slow-converting website copy?',
        answer: 'Absolutely. We specialize in audit-re-writing, turning long, unreadable blocks of paragraphs into clean, highly scannable, sales-focused text layouts.'
      }
    ]
  }
};

/**
 * Dynamically generates a valid JSON-LD FAQ schema and injects/updates it in the document head.
 * @param faqs List of FAQs for the current service
 * @returns Clean-up function to remove the script when component unmounts or changes
 */
function injectFAQSchema(faqs: { question: string; answer: string }[]): () => void {
  const scriptId = 'json-ld-service-faq';

  // Remove any existing script with this ID to avoid duplicate tags
  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }

  if (!faqs || faqs.length === 0) {
    return () => {};
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = scriptId;
  script.text = JSON.stringify(faqSchema);
  document.head.appendChild(script);

  return () => {
    const scriptToRemove = document.getElementById(scriptId);
    if (scriptToRemove) {
      scriptToRemove.remove();
    }
  };
}

export default function ServiceDetail({ serviceId, onPageChange }: ServiceDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const data = SERVICES_DATA[serviceId];

  // Dynamic FAQ structured data injection effect
  useEffect(() => {
    if (data && data.faqs) {
      const cleanup = injectFAQSchema(data.faqs);
      return cleanup;
    }
  }, [serviceId, data]);

  if (!data) {
    return (
      <div className="pt-40 pb-20 text-center font-sans">
        <h2 className="text-xl font-bold">Service Not Found</h2>
        <button onClick={() => onPageChange('services')} className="mt-4 text-blue-600 hover:underline">
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
    }
  ];

  return (
    <>
      <SEO
        title={`${data.title} in India | Mago Labs`}
        description={data.shortDesc}
        path={`services/${data.id}`}
        schemas={serviceSchemas}
      />

      {/* Top-of-page reading progress bar */}
      <ReadingProgress />

      {/* Hero Header */}
      <section id="service-detail-hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden font-sans border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.button
            whileHover={{ scale: 1.03, x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPageChange('services')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-8 transition-all group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services Overview
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
                Core Agency Capability
              </span>
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
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/10 cursor-pointer"
                >
                  Discuss Your Project
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
                <Sparkles className="h-4 w-4 text-blue-500" />
                Featured Capabilities
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-3">
                {data.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0" />
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
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Problem & Our Solution</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                Designed with conversion psychology and engineered with precision code.
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {data.longDesc}
              </p>
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-4">
                <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Our Core SLA
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  We maintain a absolute policy of transparent updates, direct call support from Burhan Kapasi (founder), clean code structure, and zero markup on domain/server costs.
                </p>
              </div>
            </div>

            {/* Benefits Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Business Value</span>
              <h3 className="text-xl font-bold text-neutral-900">Why Choose Us For {data.title}?</h3>
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
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Our Method</span>
            <h2 className="text-3xl font-bold tracking-tight text-white">How We Deliver Results</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We execute in sequential, organized phases. No guessing games. No long delays.
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
                  <div className="h-8 w-8 rounded-full bg-neutral-950 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">
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

      {/* Service Specific FAQ */}
      <section id="service-faq" className="py-24 bg-neutral-50 font-sans border-t border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">Expert Answers About {data.title}</h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white border border-neutral-200/60 rounded-xl overflow-hidden shadow-sm transition-all">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-neutral-900 hover:bg-neutral-50 transition-colors text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-neutral-500" /> : <Plus className="h-5 w-5 text-neutral-500" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-neutral-100 text-neutral-500 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
