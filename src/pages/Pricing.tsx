import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowDown, ArrowRight, BadgeCheck, Check, ChevronDown, CreditCard, Gem, Globe, Handshake, KeyRound,
  LayoutDashboard, Minus, Palette, Plus, ShieldCheck, ShoppingBag, Sparkles, Store, TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import { WhatsAppLogo } from '../components/BrandIcons';
import Price from '../components/Price';
import { PACKAGES, getPackage, PackageInfo, HOURLY_RATE } from '../data/packages';
import { useCurrency } from '../hooks/useCurrency';
import { spotlight } from '../utils/tilt';
import EditorialList from '../components/EditorialList';
import ReviewCards from '../components/ReviewCards';

interface PricingProps {
  onPageChange: (page: PageId) => void;
}

interface Tier {
  number: string;
  name: string;
  tagline: string;
  pkg: PackageInfo;
  /** Three facts shown as chips under the price. */
  facts: string[];
  /** Line above the list for packages that build on the one before. */
  inherits?: string;
  features: string[];
  popular?: boolean;
}

type PackageId = PackageInfo['id'];

// The hero's package finder: what a visitor wants, and the package built for it.
const NEEDS: { id: PackageId; label: string; icon: typeof Globe }[] = [
  { id: 'launch', label: 'Look professional online', icon: Globe },
  { id: 'growth', label: 'Get more enquiries', icon: TrendingUp },
  { id: 'scale', label: 'A premium, custom build', icon: Gem },
  { id: 'commerce', label: 'Sell products online', icon: ShoppingBag },
];

/** How many features a package card shows before "See all". */
const VISIBLE_FEATURES = 6;

// The three website packages. Each one builds on the one before it.
const TIERS: Tier[] = [
  {
    number: '01',
    name: 'Launch',
    tagline: 'For businesses ready to build a professional online presence.',
    pkg: getPackage('launch'),
    facts: ['Up to 5 pages', 'Live in 5 days', '1 year free support'],
    features: [
      'Up to 5 pages',
      'Custom UI/UX design',
      'Mobile responsive',
      'Contact form',
      'WhatsApp integration',
      'Social media integration',
      'Google Maps',
      'Basic on-page SEO',
      'Speed optimization',
      'SSL setup',
      'Easy-edit CMS',
      'Free hosting for life, no monthly fees',
      'Google Analytics & Search Console',
      'Basic animations',
      '2 revision rounds',
      '1 year free support',
    ],
  },
  {
    number: '02',
    name: 'Growth',
    tagline: 'For businesses that want their website to generate enquiries.',
    pkg: getPackage('growth'),
    facts: ['Up to 10 pages', 'Live in 14 days', '1 year free support'],
    inherits: 'Everything in Launch, plus:',
    popular: true,
    features: [
      'Up to 10 pages',
      'Conversion-focused design',
      'Advanced animations & interactions',
      'Lead capture forms',
      'Multiple WhatsApp CTAs',
      'Local SEO setup',
      'Google Business Profile integration',
      'Blog / Insights section',
      'Editable blog & pages',
      'Testimonials & case studies',
      'Basic schema markup',
      '2 revision rounds',
      '1 year free support',
    ],
  },
  {
    number: '03',
    name: 'Scale',
    tagline: 'For established businesses that need a premium digital presence.',
    pkg: getPackage('scale'),
    facts: ['15+ pages', 'Live in 21 days', '1 year free support'],
    inherits: 'Everything in Growth, plus:',
    features: [
      '15+ pages',
      'Bespoke UI/UX',
      'Premium motion design',
      'Advanced GSAP interactions',
      'Advanced CMS integration',
      'Technical SEO',
      'Advanced schema markup',
      'Conversion tracking',
      'CRM / automation integration',
      'Advanced lead routing',
      'Custom functionality',
      'Advanced performance optimization',
      '2 revision rounds',
      '1 year free support',
    ],
  },
];

// The online store package, grouped so a long list reads at a glance.
const COMMERCE = {
  number: '04',
  name: 'Commerce',
  tagline: 'For businesses ready to sell online.',
  pkg: getPackage('commerce'),
  facts: ['Up to 50 products initially', 'Live in 28 days', '1 year free support'],
  groups: [
    {
      title: 'Your store',
      icon: Store,
      items: [
        'Custom e-commerce website',
        'Up to 50 products initially',
        'Custom UI/UX design',
        'Mobile responsive',
        'Product & category pages',
        'Product search & filtering',
      ],
    },
    {
      title: 'Selling',
      icon: CreditCard,
      items: [
        'Shopping cart',
        'Checkout system',
        'Payment gateway integration',
        'Shipping integration',
        'Coupon / discount functionality',
        'Customer account functionality',
        'WhatsApp integration',
      ],
    },
    {
      title: 'Running it',
      icon: LayoutDashboard,
      items: [
        'Order management',
        'Basic inventory management',
        'Admin panel / CMS',
        'Google Analytics & Search Console',
        'Social media integration',
      ],
    },
    {
      title: 'Foundation',
      icon: ShieldCheck,
      items: [
        'Basic on-page SEO',
        'SSL configuration',
        'Performance optimization',
        'Free hosting for life',
        '2 revision rounds',
        '1 year free support',
      ],
    },
  ],
};

// Side-by-side summary of all four packages.
const COMPARE_COLUMNS = ['Launch', 'Growth', 'Scale', 'Commerce'];
const COMPARE_ROWS: { label: string; values: string[] }[] = [
  { label: 'Best for', values: ['A professional presence', 'Generating enquiries', 'A premium presence', 'Selling online'] },
  { label: 'Size', values: ['Up to 5 pages', 'Up to 10 pages', '15+ pages', 'Up to 50 products'] },
  { label: 'SEO', values: ['Basic on-page', 'Local SEO setup', 'Technical SEO', 'Basic on-page'] },
  { label: 'Edit it yourself', values: ['Easy-edit CMS', 'Easy-edit CMS', 'Advanced CMS', 'Admin panel / CMS'] },
  { label: 'Revision rounds', values: ['2', '2', '2', '2'] },
  { label: 'Hosting', values: ['Free for life', 'Free for life', 'Free for life', 'Free for life'] },
  { label: 'Free support', values: ['1 year', '1 year', '1 year', '1 year'] },
  { label: 'Live in', values: PACKAGES.map((pkg) => `${pkg.days} days`) },
];

// True of every package, whatever its size.
const ALWAYS = [
  { title: 'Designed for you', icon: Palette, desc: 'Every website starts from a blank canvas. No templates, at any price.' },
  { title: 'Yours to own', icon: KeyRound, desc: 'Your domain and your code stay in your name. Hosting is free for life, with no monthly fees.' },
  { title: 'A fixed quote first', icon: BadgeCheck, desc: 'You know the exact price before any work starts.' },
  { title: 'Direct with the founder', icon: Handshake, desc: 'You work with Burhan from the first call to launch.' },
];

const FAQS = [
  {
    question: 'What does "from" mean?',
    answer: 'It is the starting price for that package. Your exact price depends on the pages and features you need. You get a fixed quote before any work starts, and it only changes if you ask for more.',
  },
  {
    question: 'Which package is right for me?',
    answer: 'If you are not sure, ask. Burhan will look at your business and recommend one, and he will tell you when the smaller package is enough.',
  },
  {
    question: 'Are the domain and hosting included?',
    answer: 'Hosting is included free for life for standard business websites (fair use), with no monthly fees. Your domain is registered in your name, and you keep full ownership of it and your code.',
  },
  {
    question: 'Are there any monthly fees?',
    answer: 'No. You pay once: 50% to start and 50% at launch. Hosting is free for life, and the first year of support (bug fixes and small edits) is free too.',
  },
  {
    question: 'What happens after the first year?',
    answer: 'Every website comes with an easy-edit CMS, so you can update text and photos yourself. If you would rather we did it, we make changes at a simple hourly rate.',
  },
  {
    question: 'Can I start small and add more later?',
    answer: 'Yes. Every website is built so that pages and features can be added later. You pay only for what is added.',
  },
  {
    question: 'What is a revision round?',
    answer: 'One round is one collected set of changes from you after you review the design or the build. We make them, you review again, and that completes the round.',
  },
];

const whatsappFor = (name: string) =>
  'https://wa.me/919099245605?text=' + encodeURIComponent(`Hi Mago Labs, I am interested in the ${name} package.`);

/** One ticked line in a package's feature list. */
function FeatureItem({ dark, children }: { dark?: boolean; children: ReactNode; key?: string }) {
  return (
    <li className={`flex items-start gap-3 text-sm leading-snug ${dark ? 'text-neutral-200' : 'text-neutral-700'}`}>
      <span className={`mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full ${dark ? 'bg-brand text-ink' : 'pricing-check bg-brand-soft text-ink'}`}>
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

export default function Pricing({ onPageChange }: PricingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  // The package the visitor chose in the hero, which gets marked further down.
  const [picked, setPicked] = useState<PackageId | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const currency = useCurrency();
  // Outside India the after-year-one answer names the hourly rate in the visitor's currency.
  const faqAnswer = (answer: string) =>
    currency === 'INR' ? answer : answer.replace('at a simple hourly rate', `at ${HOURLY_RATE[currency]} an hour`);

  // Opens the contact page with the chosen package already filled into the message.
  const goToQuote = (pkg?: string) => {
    if (pkg) window.history.pushState({}, '', `/contact?package=${encodeURIComponent(pkg)}`);
    onPageChange('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const quoteHref = (pkg: string) => `/contact?package=${encodeURIComponent(pkg)}`;

  // Marks the matching package and brings it into view.
  const pickPackage = (id: PackageId) => {
    setPicked(id);
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(`package-${id}`)?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
  };

  // The comparison table lights up one column: the one under the pointer, else
  // the visitor's pick, else the most popular package.
  const pickedCol = PACKAGES.findIndex((pkg) => pkg.id === picked);
  const activeCol = hoverCol ?? (pickedCol >= 0 ? pickedCol : 1);
  const colClass = (colIdx: number) => `transition-colors duration-300 ${colIdx === activeCol ? 'pricing-col-pop bg-brand-soft' : ''}`;

  const pricingSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Website design and development',
      'provider': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'url': 'https://www.magolabs.in/pricing',
      'offers': [...TIERS, COMMERCE].map((tier) => ({
        '@type': 'Offer',
        'name': `${tier.name} package`,
        'description': tier.tagline,
        'priceCurrency': 'INR',
        'priceSpecification': {
          '@type': 'PriceSpecification',
          'minPrice': tier.pkg.inr,
          'priceCurrency': 'INR',
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer },
      })),
    },
  ];

  return (
    <>
      <SEO path="pricing" schemas={pricingSchemas} />

      {/* Hero */}
      <section id="pricing-hero" className="page-hero relative pt-32 pb-14 md:pt-40 md:pb-16 bg-white font-sans overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-60" />
        <div className="pricing-aurora" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="eyebrow price-rise">Pricing</span>
            <h1 className="price-rise text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]" style={{ '--i': 1 } as CSSProperties}>
              Clear prices. <span className="marker whitespace-nowrap">No surprises.</span>
            </h1>
            <p className="price-rise text-neutral-600 text-base sm:text-lg leading-relaxed" style={{ '--i': 2 } as CSSProperties}>
              Four packages, each designed from scratch for your business. One-off price, no monthly fees. Live in as little as 5 days, with a fixed quote before any work starts.
            </p>
            <div className="price-rise flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm font-medium text-neutral-700" style={{ '--i': 3 } as CSSProperties}>
              {['No templates', 'No monthly fees', 'You own everything'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Website packages */}
      <section id="pricing-packages" className="pt-6 pb-10 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-start">
            {TIERS.map((tier, idx) => {
              const dark = !!tier.popular;
              const isPicked = picked === tier.pkg.id;
              const isOpen = !!expanded[tier.name];
              const listId = `package-${tier.pkg.id}-more`;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
                  className={`relative ${dark ? 'lg:-mt-4' : ''}`}
                >
                  {dark && <div className="price-card-glow" aria-hidden="true" />}
                  <article
                    id={`package-${tier.pkg.id}`}
                    data-picked={isPicked || undefined}
                    onPointerMove={spotlight}
                    className={`price-card flex flex-col rounded-3xl p-7 sm:p-8 ${
                      dark
                        ? 'pricing-card-dark bg-neutral-950 text-white border-2 border-brand shadow-2xl shadow-neutral-900/20'
                        : 'pricing-surface bg-[#FAFAF8] border border-neutral-200'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3.5 left-7 sm:left-8 inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
                        <Sparkles className="h-3.5 w-3.5" />
                        Most popular
                      </span>
                    )}
                    {isPicked && <span className="price-match right-7 sm:right-8">Your match</span>}

                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-sm font-bold ${dark ? 'text-brand' : 'text-neutral-500'}`}>{tier.number}</span>
                      <h2 className={`text-2xl font-bold tracking-tight ${dark ? 'text-white' : 'text-neutral-900'}`}>{tier.name}</h2>
                    </div>
                    <p className={`mt-3 text-sm leading-relaxed min-h-[2.75rem] ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}>{tier.tagline}</p>

                    <div className="mt-6">
                      <span className={`block text-xs font-semibold uppercase tracking-wider ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>Starts from</span>
                      <span className={`mt-1 block text-4xl sm:text-5xl font-bold tracking-tight ${dark ? 'text-white' : 'text-neutral-900'}`}><Price pkg={tier.pkg} /></span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tier.facts.map((fact) => (
                        <span
                          key={fact}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            dark ? 'bg-white/10 text-white' : 'pricing-chip bg-[#ffffff] border border-neutral-200 text-neutral-700'
                          }`}
                        >
                          {fact}
                        </span>
                      ))}
                    </div>

                    <PageLink
                      href={quoteHref(tier.name)}
                      onNavigate={() => goToQuote(tier.name)}
                      className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
                        dark ? 'bg-brand text-ink hover:bg-brand-deep' : 'pricing-btn-ink bg-neutral-900 text-white hover:bg-neutral-700'
                      }`}
                    >
                      Get a quote for {tier.name}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </PageLink>
                    <a
                      href={whatsappFor(tier.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${
                        dark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <WhatsAppLogo className="h-4 w-4" />
                      Ask on WhatsApp
                    </a>

                    <div className={`mt-7 pt-7 border-t ${dark ? 'border-white/10' : 'border-neutral-200'}`}>
                      <p className={`text-xs font-bold uppercase tracking-wider ${dark ? 'text-brand' : 'text-neutral-900'}`}>
                        {tier.inherits ?? 'What you get:'}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {tier.features.slice(0, VISIBLE_FEATURES).map((feature) => (
                          <FeatureItem key={feature} dark={dark}>{feature}</FeatureItem>
                        ))}
                      </ul>
                      {/* The rest stay in the markup (collapsed with CSS) so search engines can read them. */}
                      <div
                        id={listId}
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                      >
                        <div className="overflow-hidden">
                          <ul className={`pt-3 space-y-3 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            {tier.features.slice(VISIBLE_FEATURES).map((feature) => (
                              <FeatureItem key={feature} dark={dark}>{feature}</FeatureItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpanded((prev) => ({ ...prev, [tier.name]: !isOpen }))}
                        aria-expanded={isOpen}
                        aria-controls={listId}
                        className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors ${
                          dark ? 'text-brand hover:text-white' : 'text-neutral-900 hover:text-neutral-600'
                        }`}
                      >
                        {isOpen ? 'Show fewer' : `See all ${tier.features.length} features`}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>

          {/* What a client said about the value */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <p className="lg:col-span-4 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
              What clients say about the value.
            </p>
            <ReviewCards ids={['manav-shah']} className="lg:col-span-8" />
          </div>
        </div>
      </section>

      {/* Commerce */}
      <section id="pricing-commerce" className="py-10 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative"
          >
            {picked === 'commerce' && <span className="price-match right-7 sm:right-10">Your match</span>}
            <article
              id="package-commerce"
              data-picked={picked === 'commerce' || undefined}
              onPointerMove={spotlight}
              className="price-card rounded-3xl border border-neutral-200 pricing-surface bg-[#FAFAF8] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="commerce-panel relative lg:col-span-4 p-7 sm:p-10 bg-neutral-950 text-white flex flex-col overflow-hidden">
                <span className="commerce-mark" aria-hidden="true">{COMMERCE.number}</span>
                <div className="relative flex items-baseline gap-3">
                  <span className="font-mono text-sm font-bold text-ink/60">{COMMERCE.number}</span>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">{COMMERCE.name}</h2>
                </div>
                <p className="relative mt-3 text-sm leading-relaxed text-ink/80">{COMMERCE.tagline}</p>

                <div className="relative mt-6">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink/60">Starts from</span>
                  <span className="mt-1 block text-4xl sm:text-5xl font-bold tracking-tight text-ink"><Price pkg={COMMERCE.pkg} /></span>
                </div>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {COMMERCE.facts.map((fact) => (
                    <span key={fact} className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink">
                      {fact}
                    </span>
                  ))}
                </div>

                <div className="relative mt-8 lg:mt-auto lg:pt-10 flex flex-col">
                  <PageLink
                    href={quoteHref(COMMERCE.name)}
                    onNavigate={() => goToQuote(COMMERCE.name)}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-[#ffffff] hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Get a quote for Commerce
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </PageLink>
                  <a
                    href={whatsappFor(COMMERCE.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink/80 hover:text-ink transition-colors"
                  >
                    <WhatsAppLogo className="h-4 w-4" />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8 p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">What you get:</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                  {COMMERCE.groups.map((group, idx) => {
                    const Icon = group.icon;
                    return (
                      <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                      >
                        <h3 className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg pricing-check bg-brand-soft text-ink">
                            <Icon className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                          </span>
                          {group.title}
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {group.items.map((item) => (
                            <FeatureItem key={item}>{item}</FeatureItem>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      {/* Side by side */}
      <section id="pricing-compare" className="py-20 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-4">
            <span className="eyebrow">Side by side</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">The four packages at a glance.</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-[0_30px_70px_-50px_rgba(13,13,13,0.45)]"
          >
            <table className="w-full min-w-[720px] text-left text-sm" onMouseLeave={() => setHoverCol(null)}>
              <thead>
                <tr className="pricing-surface bg-[#FAFAF8]">
                  <th scope="col" className="px-5 py-4 font-semibold text-neutral-500 w-[20%]">
                    <span className="sr-only">Detail</span>
                  </th>
                  {COMPARE_COLUMNS.map((col, colIdx) => (
                    <th
                      key={col}
                      scope="col"
                      onMouseEnter={() => setHoverCol(colIdx)}
                      className={`px-5 py-4 text-base font-bold text-neutral-900 w-[20%] ${colClass(colIdx)}`}
                    >
                      <span className="block font-mono text-[10px] font-bold tracking-wider text-neutral-500">{PACKAGES[colIdx].number}</span>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-neutral-200">
                    <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 align-top">{row.label}</th>
                    {row.values.map((value, colIdx) => (
                      <td key={colIdx} onMouseEnter={() => setHoverCol(colIdx)} className={`px-5 py-4 align-top text-neutral-700 ${colClass(colIdx)}`}>
                        {value || (
                          <>
                            <Minus className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-neutral-200">
                  <th scope="row" className="px-5 py-4 font-semibold text-neutral-900 align-top">Starts from</th>
                  {PACKAGES.map((pkg, colIdx) => (
                    <td key={pkg.id} onMouseEnter={() => setHoverCol(colIdx)} className={`px-5 py-4 align-top font-bold text-neutral-900 text-base ${colClass(colIdx)}`}>
                      <Price pkg={pkg} />
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-neutral-200">
                  <th scope="row" className="px-5 py-4"><span className="sr-only">Choose</span></th>
                  {PACKAGES.map((pkg, colIdx) => (
                    <td key={pkg.id} onMouseEnter={() => setHoverCol(colIdx)} className={`px-5 py-4 ${colClass(colIdx)}`}>
                      <PageLink
                        href={quoteHref(pkg.name)}
                        onNavigate={() => goToQuote(pkg.name)}
                        aria-label={`Get a quote for ${pkg.name}`}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4 cursor-pointer"
                      >
                        Get a quote
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </PageLink>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>


      {/* Included in every package */}
      <section id="pricing-always" className="glow-follow relative overflow-hidden py-20 bg-neutral-950 text-white font-sans">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="eyebrow eyebrow-on-dark">In every package</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">Whatever you choose, these do not change.</h2>
          </div>
          <EditorialList tone="dark" items={ALWAYS.map(({ title, desc }) => ({ title, desc }))} />
        </div>
      </section>

      {/* FAQ. Answers stay in the markup (collapsed with CSS) so search engines can read them. */}
      <section id="pricing-faq" className="py-24 bg-neutral-50 font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12">
            <span className="eyebrow">Pricing questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">Straight answers.</h2>
          </div>

          <div className="border-t border-neutral-200">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="border-b border-neutral-200">
                  <h3>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`pricing-faq-panel-${idx}`}
                      className="group w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className={`font-mono text-xs font-bold transition-colors duration-300 ${isOpen ? 'text-neutral-900' : 'text-neutral-500'}`}>0{idx + 1}</span>
                        <span className="font-semibold text-neutral-900 text-base sm:text-lg transition-[translate] duration-300 group-hover:translate-x-1">{faq.question}</span>
                      </span>
                      <span className={`flex-shrink-0 rounded-full p-1.5 transition-colors duration-300 ${isOpen ? 'bg-brand text-ink' : 'bg-neutral-200 text-neutral-800'}`}>
                        <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`pricing-faq-panel-${idx}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className={`pb-6 pl-9 pr-10 text-sm sm:text-base text-neutral-600 leading-relaxed transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>{faqAnswer(faq.answer)}</p>
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
