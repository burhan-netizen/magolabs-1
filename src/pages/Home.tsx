import { ArrowRight, Check, EyeOff, Plus, Minus, Quote, Search, SearchX, ShieldAlert, Trophy, X } from 'lucide-react';
import WorkWall from '../components/WorkWall';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import LeadForm, { LeadMode } from '../components/LeadForm';
import HeroShowcase from '../components/HeroShowcase';
import CountUp from '../components/CountUp';
import { WhatsAppLogo } from '../components/BrandIcons';
import { useLanguage } from '../context/LanguageContext';
import { getWorkDetailPath } from '../utils/pageRoutes';
import { WHATSAPP_URL } from '../utils/contactLinks';
import { spotlight } from '../utils/tilt';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

interface HomeProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

/* ---------------------------------------------------------------------------
   Page content, kept as plain data so the copy is easy to find and edit.

   The page tells one story, in the customer's order:
   their problem -> how we fix it -> what happened for others -> their next step.
   House style: short sentences, plain words, written to "you".
--------------------------------------------------------------------------- */

// The logo strip uses small copies made for it (public/logos/sm, about 78 KB for
// all nine). Each one carries its pixel size so its tile is the right width
// before the file arrives.
const CLIENT_LOGOS = [
  { name: 'Santosh Timbers', src: '/logos/sm/santoshtimbers.webp', width: 120, height: 120 },
  { name: 'Astrabizz Consultancy', src: '/logos/sm/astrabizz.webp', width: 180, height: 120 },
  { name: 'Dr. Mihir Shah Smile Care Clinic', src: '/logos/sm/drmihirshah.webp', width: 349, height: 120 },
  { name: 'SolWay Energies', src: '/logos/sm/solway.webp', width: 341, height: 120 },
  { name: 'Darshan Galani & Co.', src: '/logos/sm/darshangalani.webp', width: 390, height: 79 },
  { name: 'Jay Mehta & Co.', src: '/logos/sm/jaymehta.webp', width: 362, height: 73 },
  { name: 'MNP & Co.', src: '/logos/sm/mnp.webp', width: 212, height: 61 },
  { name: 'K.D. Mayani & Co.', src: '/logos/sm/kdmayani.webp', width: 289, height: 120 },
  { name: 'Prabhakar Processors', src: '/logos/sm/prabhakarprocessors.webp', width: 390, height: 99 },
];

/** One logo in the strip. The white tile stays hidden until its logo has loaded,
 *  so a slow connection never shows a row of blank tiles. */
function LogoTile({ logo, decorative }: { logo: (typeof CLIENT_LOGOS)[number]; decorative: boolean; key?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  // A logo that finished loading before the page became interactive never fires onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) setReady(true);
  }, []);
  return (
    <div
      className={`flex items-center justify-center h-16 sm:h-[4.5rem] px-6 sm:px-7 rounded-2xl bg-[#ffffff] shrink-0 transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
    >
      <img
        ref={imgRef}
        src={logo.src}
        alt={decorative ? '' : logo.name}
        width={logo.width}
        height={logo.height}
        decoding="async"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        className="h-9 sm:h-10 w-auto max-w-[130px] object-contain"
      />
    </div>
  );
}

const PROBLEMS = [
  { icon: EyeOff, title: 'People can’t tell what you do.', desc: 'They land, get confused, and leave within seconds.' },
  { icon: ShieldAlert, title: 'Nothing gives them a reason to trust you.', desc: 'No proof, no results, nothing that sets you apart from the next search result.' },
  { icon: Trophy, title: 'A competitor looks more established.', desc: 'Side by side, the dated website loses, even when your work is better.' },
  { icon: SearchX, title: 'Google is not showing you.', desc: 'People searching for exactly what you sell are finding someone else.' },
];

// Each fix leads with what the customer gets; the service name is the small label.
const FIXES = [
  {
    id: 'service-web-design' as PageId,
    service: 'Website design & development',
    title: 'A website that makes people call.',
    desc: 'Designed around your customers and hand-coded to load fast. Every page leads to a call, a form or a WhatsApp message.',
  },
  {
    id: 'service-seo' as PageId,
    service: 'Search engine optimisation',
    title: 'Found when people search for what you sell.',
    desc: 'We target the searches that lead to enquiries in your area, not traffic that never calls.',
  },
  {
    id: 'service-gbp' as PageId,
    service: 'Google Business Profile',
    title: 'On the map when someone nearby needs you.',
    desc: 'Your profile set up, optimised and collecting reviews, so you show up ahead of the business down the road.',
  },
  {
    id: 'service-copywriting' as PageId,
    service: 'Conversion copywriting',
    title: 'Words that make visitors trust you.',
    desc: 'Human-written copy that says what you do and why to choose you. No generic AI filler.',
  },
];

// Measured client results.
const RESULTS = [
  {
    value: '25 to 58',
    count: { prefix: '25 to ', from: 25, to: 58, suffix: '' },
    label: 'patients a day',
    detail: 'A new dental clinic, within two months of launch. They had to hire more staff to keep up.',
    client: 'Dr. Mihir Shah Smile Care Clinic',
    caseStudyId: 'drmihirshah',
  },
  {
    value: '63%',
    count: { prefix: '', from: 0, to: 63, suffix: '%' },
    label: 'more appointment calls',
    detail: 'The same clinic, over the same two months, as it started appearing in Google searches.',
    client: 'Dr. Mihir Shah Smile Care Clinic',
    caseStudyId: 'drmihirshah',
  },
  {
    value: '34',
    count: { prefix: '', from: 0, to: 34, suffix: '' },
    label: 'new clients in three months',
    detail: 'A chartered accountancy firm that had never received an enquiry through Google before.',
    client: 'Darshan Galani & Co.',
    caseStudyId: 'darshangalani',
  },
];

const QUOTES = [
  { quote: 'Very good website designs. Incredibly responsive team. Quick feedback turnaround. Great value.', name: 'Manav Shah', initials: 'MS', company: 'SolWay Energies' },
  { quote: 'We finally have a website that reflects how we work with our clients: clear, professional, and easy to trust.', name: 'CA Jay Mehta', initials: 'JM', company: 'Jay Mehta & Co.' },
  { quote: 'Absolutely professional people, know their work in best manner. I will absolutely recommend them for website related work.', name: 'Dr. Mihir Shah', initials: 'MS', company: 'Smile Care Clinic' },
  { quote: 'Gorgeous website and amazing service from start to finish. Exactly what we needed for the business.', name: 'Harshit Chopra', initials: 'HC', company: 'Santosh Timbers' },
];

// "With Mago Labs" against the usual agency: rows arrive one after another.
const versusList = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const versusRow = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const } },
};
const versusTick = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: 'spring' as const, stiffness: 420, damping: 16 } },
};

const WITH_MAGO = [
  'A design made for your business, from a blank canvas.',
  'A site that loads fast on any phone and any network.',
  'Copy written by a human who has studied your buyers.',
  'One person to talk to, the founder, from start to finish.',
  'Your domain, your code and your hosting, in your name.',
  'A fixed quote before any work starts.',
];

const THE_USUAL = [
  'A template that other clients also get.',
  'Page builders and plug-ins that slow everything down.',
  'Generic filler text that could describe anyone.',
  'Your project passed between account managers.',
  'Your own domain and code kept out of your reach.',
  'A scope and a bill that shift after you sign.',
];

// The first step differs by starting point; the rest is the same for everyone.
const FIRST_STEP: Record<LeadMode, { heading: string; intro: string; title: string; desc: string }> = {
  audit: {
    heading: 'Start with a free audit.',
    intro: 'It takes a minute to ask, and you will know exactly where your website stands.',
    title: 'Send us your website address.',
    desc: 'We review it for free and tell you plainly what is costing you enquiries.',
  },
  new: {
    heading: 'Start with a free website plan.',
    intro: 'It takes a minute to ask, and you will know exactly what your first website needs.',
    title: 'Tell us what your business does.',
    desc: 'We send you a free plan: the pages you need, what they should say, and how customers will find you.',
  },
};

const NEXT_STEPS = [
  {
    title: 'Get a fixed quote.',
    desc: 'You see exactly what we would build and what it costs. No obligation to go ahead.',
  },
  {
    title: 'Launch in 5 to 28 days.',
    desc: 'You approve the design before we build it, and you own everything at the end.',
  },
];

const FAQS = [
  {
    question: 'What does the free audit include?',
    answer: 'Burhan reviews your website himself: how it looks, how fast it loads, how easy it is to contact you, and how you show up on Google. You get a short, plain-English summary of what to fix first. There is no charge and no obligation.',
  },
  {
    question: 'I don’t have a website yet. Where do I start?',
    answer: 'Ask for a free website plan. Tell us what your business does, and Burhan will send you a short plan: the pages you need, what they should say, and how customers will find you. Several of our clients, including a CA firm that went on to sign 34 new clients, started with no website at all.',
  },
  {
    question: 'How long does a website take to build?',
    answer: 'It depends on the package. A Launch website is live in 5 days, Growth in 14 days, Scale in 21 days, and an online store in 28 days.',
  },
  {
    question: 'How much does a custom website cost?',
    answer: 'There are four packages, and the pricing page lists what each one includes and its starting price. You get a clear, fixed quote before any work starts. No hidden fees, and you keep full ownership of your domain, code and hosting.',
  },
  {
    question: 'Will my website rank on Google?',
    answer: 'Every site we build is set up to rank: clean structure, proper headings, local schema markup and fast load times. Pair that with a well-run Google Business Profile and you give yourself the best chance. Nobody can honestly promise a specific position.',
  },
  {
    question: 'Can I edit the website myself later?',
    answer: 'Yes. We set up simple content controls so you can change text, prices and photos in a couple of minutes, without touching code.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We don’t disappear. Content changes, security updates and new features are a WhatsApp message or a call away.',
  },
];

// Three plain facts for the hero's trust card. Deliberately not the same numbers
// as the results section further down.
const HERO_FACTS = [
  { value: '75+', label: 'Businesses helped' },
  { value: '5 to 28', label: 'Days to launch' },
  { value: '100%', label: 'Yours to own' },
];

/** The one primary action on the page, repeated wherever a visitor might be ready. */
function AuditButton({ onNavigate, label, className = '' }: { onNavigate: () => void; label: string; className?: string }) {
  return (
    <PageLink
      page="contact"
      onNavigate={onNavigate}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-ink hover:bg-brand-deep transition-colors cursor-pointer ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </PageLink>
  );
}

export default function Home({ onPageChange, onOpenCaseStudy }: HomeProps) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToAudit = () => navigateTo('contact');

  // Which starting point the form on this page shows. The "no website yet" buttons
  // switch it and bring the form into view, so the visitor never leaves the page.
  const [leadMode, setLeadMode] = useState<LeadMode>('audit');
  const startWithoutWebsite = () => {
    setLeadMode('new');
    document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const firstStep = FIRST_STEP[leadMode];

  // The service selector in "How we fix it".
  const [activeFix, setActiveFix] = useState(0);

  // Gentle hero parallax: as the page scrolls, the cards drift up a little faster
  // than the text and the glow drifts down. Switched off for reduced motion.
  const reduceMotion = useReducedMotion();
  // Starts the "no results" search animation once that row scrolls into view.
  const [searchSeen, setSearchSeen] = useState(false);
  const { scrollY } = useScroll();
  const cardsY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -48]);
  const glowY = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 90]);
  const steps = [{ title: firstStep.title, desc: firstStep.desc }, ...NEXT_STEPS];

  // Structured data: the business, the organisation, and the FAQ on this page.
  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Mago Labs',
      'image': 'https://www.magolabs.in/logo.png',
      '@id': 'https://www.magolabs.in/#localbusiness',
      'url': 'https://www.magolabs.in',
      'telephone': '+91 9099245605',
      'email': 'burhan@magolabs.in',
      'priceRange': '₹₹',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Surat',
        'addressRegion': 'Gujarat',
        'addressCountry': 'IN'
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Mago Labs',
      'url': 'https://www.magolabs.in',
      'logo': 'https://www.magolabs.in/logo.png',
      'founder': {
        '@type': 'Person',
        'name': 'Burhan Kapasi'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
      }))
    }
  ];

  return (
    <>
      <SEO path="/" schemas={homeSchemas} />

      {/* 1. Hero: the promise, one action, and proof beside it. Dark, with glass cards.
          The text has no entrance animation: it is in the page HTML and should be
          visible the instant it paints. */}
      <section id="hero" className="glow-follow relative pt-32 pb-14 md:pt-40 md:pb-16 bg-neutral-950 text-[#ffffff] overflow-hidden font-sans">
        {/* Background: a faint grid and one amber glow that drifts on scroll */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none [mask-image:linear-gradient(180deg,black_0%,black_70%,transparent_100%)]" />
        <motion.div
          style={{ y: glowY }}
          className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,197,61,0.20),transparent_65%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#ffffff] leading-[1.08]">
                Websites that turn visitors into <span className="marker">customers.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.desc')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <AuditButton onNavigate={goToAudit} label={t('hero.cta.primary')} className="w-full sm:w-auto" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-[#ffffff] backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  <WhatsAppLogo className="h-5 w-5 text-emerald-400" />
                  {t('hero.cta.secondary')}
                </a>
                {/* Phones get the portfolio link as a third button; wider screens get it as a text link below */}
                <PageLink
                  page="work"
                  onNavigate={() => navigateTo('work')}
                  className="group sm:hidden w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-base font-semibold text-[#ffffff] hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  See our work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </PageLink>
              </div>

              <p className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-neutral-400">
                <span>
                  Free, with no obligation.{' '}
                  <a
                    href="#next-step"
                    onClick={(e) => { e.preventDefault(); startWithoutWebsite(); }}
                    className="font-semibold text-[#ffffff] underline decoration-brand decoration-2 underline-offset-4 whitespace-nowrap"
                  >
                    No website yet? Start here
                  </a>
                </span>
                {/* Straight to the portfolio, for visitors who want to see the work first */}
                <PageLink
                  page="work"
                  onNavigate={() => navigateTo('work')}
                  className="group hidden sm:inline-flex items-center gap-1.5 font-semibold text-[#ffffff] underline decoration-brand decoration-2 underline-offset-4 whitespace-nowrap"
                >
                  See our work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </PageLink>
              </p>
            </div>

            {/* Proof: real client websites on a 3D rail, then three plain facts */}
            <motion.div style={{ y: cardsY }} className="lg:col-span-6 space-y-7">
              <HeroShowcase onOpenCaseStudy={onOpenCaseStudy} />

              <dl className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6 text-center">
                {HERO_FACTS.map((fact) => (
                  <div key={fact.label} className="px-2">
                    <dd className="text-xl sm:text-2xl font-bold text-[#ffffff]">{fact.value}</dd>
                    <dt className="mt-1 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-neutral-400">{fact.label}</dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* Who already trusts us */}
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl py-7">
            <p className="px-7 mb-5 text-sm font-medium text-neutral-400">Trusted by businesses across Surat and beyond</p>
            <div className="logo-marquee-mask overflow-hidden">
              <div className="flex items-center gap-4 sm:gap-5 logo-marquee-track">
                {[...Array(2)].map((_, loopIdx) => (
                  <div key={loopIdx} className="flex items-center gap-4 sm:gap-5 shrink-0" aria-hidden={loopIdx === 1 ? 'true' : undefined}>
                    {CLIENT_LOGOS.map((logo, idx) => (
                      <LogoTile key={`${loopIdx}-${logo.name}-${idx}`} logo={logo} decorative={loopIdx === 1} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The problem, in the customer's words */}
      <section id="problem-section" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="eyebrow">The problem</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Is your website quietly losing you customers?
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              You would never know. Nobody calls to say they chose someone else. These are the four reasons it usually happens.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpItem}
                  onPointerMove={spotlight}
                  className="spot-card group p-6 rounded-2xl border border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                >
                  {/* An amber line draws across the top on hover */}
                  <span className="absolute inset-x-0 top-0 h-1 bg-brand origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
                  <span className="spot-number spot-number-light" aria-hidden="true">0{idx + 1}</span>
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-neutral-200 text-neutral-700 transition-[background-color,color,border-color,rotate] duration-300 group-hover:bg-brand group-hover:border-brand group-hover:text-ink group-hover:-rotate-6">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-500">0{idx + 1}</span>
                  </div>
                  <h3 className="relative mt-5 text-base font-semibold text-neutral-900 leading-snug">{item.title}</h3>
                  <p className="relative mt-3 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <AuditButton onNavigate={goToAudit} label="Find out what yours is costing you" />
            <p className="text-sm text-neutral-600">A free review of your website, in plain English.</p>
          </motion.div>
        </div>
      </section>

      {/* For businesses with no website at all: their own problem, proof and action */}
      <section id="no-website" className="relative overflow-hidden bg-brand text-ink font-sans">
        <div className="brand-orb brand-orb-a" aria-hidden="true" />
        <div className="brand-orb brand-orb-b" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest">No website yet?</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Then customers are finding nothing when they look for you.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed max-w-2xl">
                People search for a business before they call it. When nothing comes up, many assume you are small, new, or no longer around, and they call the next name on the list.
              </p>
              {/* What a customer sees today: a search that finds nothing */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                onViewportEnter={() => setSearchSeen(true)}
                data-seen={searchSeen || undefined}
                className="search-mock mt-3 flex flex-wrap items-center gap-x-4 gap-y-3"
                aria-hidden="true"
              >
                <span className="inline-flex items-center gap-3 rounded-full bg-[#ffffff] px-5 py-3 shadow-[0_18px_40px_-22px_rgba(13,13,13,0.55)]">
                  <Search className="h-4 w-4 text-neutral-500" />
                  <span className="search-mock-text font-mono text-sm text-neutral-900">your business name</span>
                </span>
                <span className="search-mock-result inline-flex items-center gap-2 rounded-full bg-ink/10 px-4 py-2 text-sm font-semibold text-ink">
                  <SearchX className="h-4 w-4" />
                  No results found
                </span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:col-span-5 space-y-5"
            >
              <div onPointerMove={spotlight} className="spot-card rounded-2xl bg-neutral-950 text-[#ffffff] p-6 sm:p-7 shadow-2xl shadow-neutral-900/30">
                <p className="relative text-3xl sm:text-4xl font-bold tracking-tight text-brand leading-none">
                  <CountUp to={34} duration={1.6} /> new clients
                </p>
                <p className="relative mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  Darshan Galani &amp; Co. had never had a website. Three months after their first one launched, enquiries from Google had turned into 34 new clients.
                </p>
              </div>
              <button
                onClick={startWithoutWebsite}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 px-7 py-4 text-base font-semibold text-[#ffffff] transition-colors cursor-pointer"
              >
                Get a free website plan
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. How we fix it: what the customer gets, with the service as a small label */}
      <section id="services-overview" className="py-24 bg-neutral-50 font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="eyebrow">How we fix it</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              You get a website that does its job.
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Everything we build has one purpose: to turn someone who has never heard of you into someone who calls.
            </p>
          </div>

          {/* Selector: pick what you need on the left, read about it on the right.
              Every panel stays in the page HTML; only the chosen one is shown. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div role="tablist" aria-label="What we fix" aria-orientation="vertical" className="lg:col-span-5 flex flex-col gap-3">
              {FIXES.map((fix, idx) => {
                const selected = activeFix === idx;
                return (
                  <button
                    key={fix.id}
                    role="tab"
                    id={`fix-tab-${idx}`}
                    aria-selected={selected}
                    aria-controls={`fix-panel-${idx}`}
                    onClick={() => setActiveFix(idx)}
                    onMouseEnter={() => setActiveFix(idx)}
                    onFocus={() => setActiveFix(idx)}
                    className={`group flex items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors cursor-pointer ${
                      selected
                        ? 'border-neutral-950 bg-neutral-950 text-[#ffffff]'
                        : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold ${selected ? 'text-brand' : 'text-neutral-500'}`}>0{idx + 1}</span>
                    <span className="flex-1 text-base sm:text-lg font-semibold leading-snug">{fix.title}</span>
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${selected ? 'text-brand translate-x-0.5' : 'text-neutral-400'}`} />
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              {FIXES.map((fix, idx) => (
                <div
                  key={fix.id}
                  role="tabpanel"
                  id={`fix-panel-${idx}`}
                  aria-labelledby={`fix-tab-${idx}`}
                  hidden={activeFix !== idx}
                  className="h-full"
                >
                  <motion.div
                    initial={false}
                    animate={{ opacity: activeFix === idx ? 1 : 0, y: activeFix === idx ? 0 : 10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full flex flex-col justify-between rounded-2xl bg-white border border-neutral-200 p-8 sm:p-10 lg:p-12"
                  >
                    <div>
                      <span className="eyebrow">{fix.service}</span>
                      <h3 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">{fix.title}</h3>
                      <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">{fix.desc}</p>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                      <AuditButton onNavigate={goToAudit} label="Get a free website audit" />
                      <PageLink
                        page={fix.id}
                        onNavigate={() => navigateTo(fix.id)}
                        aria-label={`${fix.service}: see how it works`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4 hover:decoration-neutral-900"
                      >
                        See how it works
                        <ArrowRight className="h-4 w-4" />
                      </PageLink>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Results */}
      <section id="results" className="relative py-24 bg-neutral-950 text-white font-sans overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="eyebrow eyebrow-on-dark">The results</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Here is what changed for our clients.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESULTS.map((r) => (
              <PageLink
                key={r.label}
                href={getWorkDetailPath(r.caseStudyId)}
                onNavigate={() => onOpenCaseStudy(r.caseStudyId)}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors p-7 sm:p-8"
              >
                <p className="text-5xl sm:text-6xl font-bold tracking-tight text-brand leading-none" aria-label={r.value}>
                  <span aria-hidden="true">
                    {r.count.prefix}
                    <CountUp from={r.count.from} to={r.count.to} />
                    {r.count.suffix}
                  </span>
                </p>
                <p className="mt-3 text-lg font-semibold text-white">{r.label}</p>
                <p className="mt-3 text-sm text-neutral-400 leading-relaxed flex-1">{r.detail}</p>
                <p className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-3 text-xs font-medium text-neutral-300">
                  {r.client}
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                </p>
              </PageLink>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The work behind the results: every website, as a wall that comes together */}
      <WorkWall onOpenWork={() => navigateTo('work')} />

      {/* What clients say */}
      <section id="client-quotes" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUOTES.map((q, idx) => (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.09 }}
                className="group relative p-6 rounded-2xl border border-neutral-200/70 bg-neutral-50 flex flex-col gap-4 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-[0_24px_48px_-30px_rgba(13,13,13,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Quote className="h-6 w-6 text-brand transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <blockquote className="text-sm text-neutral-800 leading-relaxed flex-1">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="pt-4 border-t border-neutral-200 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white transition-colors duration-300 group-hover:bg-brand group-hover:text-ink" aria-hidden="true">
                    {q.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-neutral-900">{q.name}</span>
                    <span className="block text-xs text-neutral-500">{q.company}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 6. What the customer gets, against the common alternative */}
      <section id="why-choose-us-overview" className="py-24 bg-neutral-50 font-sans border-y border-neutral-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="eyebrow">What you get</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Most agencies hand you a template. You deserve a website built for you.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* With Mago Labs: the lit, raised card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative"
            >
              <div className="versus-glow" aria-hidden="true" />
              <div className="versus-card glow-follow h-full overflow-hidden rounded-3xl bg-neutral-950 text-white border border-brand/50 p-8 sm:p-10 shadow-2xl shadow-neutral-900/25">
                <div className="relative z-10">
                  <h3 className="flex items-center gap-1 text-2xl font-bold tracking-tight">
                    With
                    {/* The logo file has empty space around the wordmark, which the negative margins cancel. */}
                    <img
                      src="/logo.png"
                      alt="Mago Labs"
                      width={99}
                      height={66}
                      className="h-[66px] w-auto -my-6 translate-y-[3px] invert select-none"
                    />
                  </h3>
                  <motion.ul
                    variants={versusList}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="mt-7"
                  >
                    {WITH_MAGO.map((line) => (
                      <motion.li key={line} variants={versusRow} className="versus-row flex items-start gap-3.5 py-4 border-t border-white/10 text-sm sm:text-base text-neutral-100 leading-relaxed">
                        <motion.span variants={versusTick} className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-ink" aria-hidden="true">
                          <Check className="h-3 w-3" strokeWidth={3.5} />
                        </motion.span>
                        <span>{line}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>

            {/* The usual agency: flat and quiet on purpose */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
              className="h-full rounded-3xl bg-white border border-neutral-200 p-8 sm:p-10"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-500">With the usual agency</h3>
              <motion.ul
                variants={versusList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mt-7"
              >
                {THE_USUAL.map((line) => (
                  <motion.li key={line} variants={versusRow} className="flex items-start gap-3.5 py-4 border-t border-neutral-200 text-sm sm:text-base text-neutral-500 leading-relaxed">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-400" aria-hidden="true">
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span>{line}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.45 }}
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-brand text-ink font-mono text-xs font-bold ring-8 ring-neutral-50 dark:ring-[#262626]"
              aria-hidden="true"
            >
              VS
            </motion.span>
          </div>
        </div>
      </section>

      {/* 7. The next step, with the form right here so nobody has to go looking for it */}
      <section id="next-step" className="py-24 bg-white font-sans scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="eyebrow">Your next step</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                  {firstStep.heading}
                </h2>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                  {firstStep.intro}
                </p>
              </div>

              <ol className="space-y-6">
                {steps.map((step, idx) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="font-mono text-sm font-bold text-neutral-900 bg-brand h-8 w-8 shrink-0 flex items-center justify-center">{idx + 1}</span>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-neutral-900 leading-snug">{step.title}</h3>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="text-sm text-neutral-600">
                Would you rather talk?{' '}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4"
                >
                  Message Burhan on WhatsApp.
                </a>
              </p>
            </div>

            <div className="lg:col-span-7">
              <LeadForm idPrefix="home" source="Homepage" mode={leadMode} onModeChange={setLeadMode} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ. Every answer stays in the page markup (collapsed with CSS, not
          removed), so search engines and assistants can read them. */}
      <section id="faq-section" className="py-24 bg-neutral-50 font-sans border-t border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12">
            <span className="eyebrow">Questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              Straight answers.
            </h2>
          </div>

          <div className="border-t border-neutral-200">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b border-neutral-200">
                  <h3>
                    <button
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`home-faq-panel-${idx}`}
                      className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer"
                    >
                      <span className="font-semibold text-neutral-900 text-base sm:text-lg">{faq.question}</span>
                      <span className={`flex-shrink-0 rounded-full p-1.5 transition-colors ${isOpen ? 'bg-brand text-ink' : 'bg-neutral-200 text-neutral-800'}`}>
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`home-faq-panel-${idx}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-sm sm:text-base text-neutral-600 leading-relaxed">{faq.answer}</p>
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
