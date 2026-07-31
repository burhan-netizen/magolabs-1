import {
  LayoutTemplate,
  Search,
  MapPin,
  PenTool,
  Sparkles,
  Smartphone,
  Zap,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Compass,
  ArrowRight,
  Phone,
  MessageSquare,
  Stethoscope,
  Factory,
  Calculator,
  ShoppingBag,
  GraduationCap,
  Building2,
  Rocket,
  Utensils,
  Briefcase,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, Service, Industry, Benefit, ProcessStep } from '../types';
import SEO from '../components/SEO';
import InteractiveShowcase from '../components/InteractiveShowcase';
import InteractiveParticleMesh from '../components/InteractiveParticleMesh';
import SiteHealthCheck from '../components/SiteHealthCheck';
import { useLanguage } from '../context/LanguageContext';

/** Counts up from 0 to target once it scrolls into view, used on the stat strip
 *  for a more premium feel than a number just appearing statically. */
function AnimatedNumber({ target, suffix = '', duration = 1.4 }: { target: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  const startCounting = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.span onViewportEnter={startCounting} viewport={{ once: true, margin: '-40px' }}>
      {value}{suffix}
    </motion.span>
  );
}

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

const fadeRightItem = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

interface HomeProps {
  onPageChange: (page: PageId) => void;
}

export default function Home({ onPageChange }: HomeProps) {
  const { t, language } = useLanguage();
  // Mouse cursor tracking for Hero Spotlight glow
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Navigation callback helper
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Structured Data Schema for Local Business and Organization
  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'Mago Labs',
      'image': 'https://www.magolabs.in/input_file_1.png',
      '@id': 'https://www.magolabs.in/#localbusiness',
      'url': 'https://www.magolabs.in',
      'telephone': '+91 9099245605',
      'email': 'burhan@magolabs.in',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Ahmedabad',
        'addressRegion': 'Gujarat',
        'postalCode': '380001',
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
      'logo': 'https://www.magolabs.in/input_file_1.png',
      'founder': {
        '@type': 'Person',
        'name': 'Burhan Kapasi'
      }
    }
  ];

  const services = [
    {
      id: 'service-web-design' as PageId,
      title: 'Custom Websites That Generate Leads',
      desc: 'Bespoke, high-converting websites designed from a blank canvas. No slow templates. We write clean, custom code engineered purely to turn visitors into calls, form submissions, and WhatsApp enquiries.',
      icon: LayoutTemplate,
    },
    {
      id: 'service-seo' as PageId,
      title: 'Get Found on Google by Your Ideal Customers',
      desc: 'Strategic Local and Technical SEO targeting the exact high-intent buyer terms your competitors rank for. Drive consistent organic traffic, phone calls, and direct enquiries.',
      icon: Search,
    },
    {
      id: 'service-gbp' as PageId,
      title: 'Appear in Local Searches & Attract Nearby Buyers',
      desc: 'Dominate Google Maps local search. Complete profile setup, optimization, and proactive review gathering strategies that make your business the trusted #1 choice in your area.',
      icon: MapPin,
    },
    {
      id: 'service-copywriting' as PageId,
      title: 'Human Copy Written to Turn Traffic into Revenue',
      desc: 'Zero generic AI-generated fluff. We write persuasive, clear, trust-building copywriting that speaks directly to your ideal buyers\' pain points and guides them to take immediate action.',
      icon: PenTool,
    },
  ];

  const benefits = [
    {
      title: 'Custom Design (Zero Templates)',
      desc: 'We start with a blank canvas. Every visual element is tailor-made to represent your business authority and command trust from your ideal buyers.',
      icon: Sparkles,
    },
    {
      title: 'Mobile First Optimization',
      desc: 'Over 65% of your search visits happen on phones. We test and design our layouts to look stunning and feel completely tactile on small screens.',
      icon: Smartphone,
    },
    {
      title: 'Lightning Fast (90+ Speed)',
      desc: 'Fast websites make more money. We optimize every image, compress modern files, and secure top-tier speeds to reduce visitor bounce rates.',
      icon: Zap,
    },
    {
      title: 'SEO Ready Foundation',
      desc: 'We integrate proper HTML structures, custom Google schemas, meta descriptions, and sitemaps from day one, helping you rank on Google faster.',
      icon: CheckCircle2,
    },
    {
      title: 'Google Maps Friendly',
      desc: 'Perfect local alignment. Built-in map hooks, localized keyword signals, and direct alignment with Google Local Packs to drive nearby customers.',
      icon: Compass,
    },
    {
      title: 'Easy to Edit & Manage',
      desc: 'No confusing dashboards. We deliver clean, intuitive backends so you can easily edit text, modify pricing, or add new images in under 2 minutes.',
      icon: Cpu,
    },
    {
      title: 'Bulletproof Security',
      desc: 'We use secure hosting environments, modern frameworks, and automatic SSL setup. Zero standard hack vulnerability typical of template builders.',
      icon: ShieldCheck,
    },
    {
      title: 'Conversion Focused Layout',
      desc: 'We place high-converting call-to-action triggers, direct WhatsApp links, click-to-call buttons, and lead forms exactly where users naturally look.',
      icon: TrendingUp,
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      desc: 'We audit your current online footprint, study your competitors, and understand your exact business objectives and ideal buyers.',
    },
    {
      number: '02',
      title: 'Planning',
      desc: 'We lay down the navigation architecture, design the sitemap, and structure the content blocks for maximum buyer psychology flow.',
    },
    {
      number: '03',
      title: 'Design',
      desc: 'We curate bespoke color palettes, premium typography pairings, and layout drafts. You see custom mockups before any code is written.',
    },
    {
      number: '04',
      title: 'Development',
      desc: 'Our developer converts the approved design into lightning-fast, pixel-perfect, secure code following modern web standard protocols.',
    },
    {
      number: '05',
      title: 'Testing',
      desc: 'We test forms, cross-browser compatibility, links, tracking, and verify Core Web Vitals performance before pointing any servers.',
    },
    {
      number: '06',
      title: 'Launch',
      desc: 'We migrate the domains, register sitemaps on Google Search Console, request fast indexing, and verify your live connection.',
    },
    {
      number: '07',
      title: 'Support',
      desc: 'We monitor site health, provide quick updates when you ask, and act as your long-term digital growth consultant.',
    },
  ];

  const industries = [
    { name: 'Doctors & Dentists', icon: Stethoscope, desc: 'Patient-acquisition setups' },
    { name: 'Manufacturing', icon: Factory, desc: 'B2B order & catalogue displays' },
    { name: 'CA & Law Firms', icon: Calculator, desc: 'Authority & lead generation' },
    { name: 'Real Estate & Builders', icon: Building2, desc: 'Premium project showcasing' },
    { name: 'Startups & Tech', icon: Rocket, desc: 'High-converting SaaS/MVP landings' },
    { name: 'Retail Stores', icon: ShoppingBag, desc: 'Product and location catalogs' },
    { name: 'Restaurants & Cafes', icon: Utensils, desc: 'Direct menus and reservations' },
    { name: 'Education & Coaches', icon: GraduationCap, desc: 'Class details and student leads' },
    { name: 'Interior Designers', icon: Sparkles, desc: 'Bespoke image portfolio grids' },
    { name: 'Professional Services', icon: Briefcase, desc: 'Custom local MSME solutions' },
  ];

  return (
    <>
      <SEO
        title="Websites That Grow Businesses | Mago Labs"
        description="Mago Labs builds high-converting websites that help businesses attract customers, build trust and generate leads. Fast, SEO-friendly, custom-built."
        path="/"
        schemas={homeSchemas}
      />

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-white overflow-hidden font-sans cursor-default select-none"
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        {/* Dynamic Drifting Neural Particle Canvas */}
        <InteractiveParticleMesh />
        {/* Glowing Cursor Aura Effect (Ambient Light Follows Pointer) */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_380px_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(59,130,246,0.065),transparent_80%)] pointer-events-none transition-opacity duration-500"
          style={{
            ['--mouse-x' as any]: `${heroMouse.x}px`,
            ['--mouse-y' as any]: `${heroMouse.y}px`,
            opacity: isHeroHovered ? 1 : 0
          }}
        />

        {/* Background grids and abstract blobs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-20 right-0 -z-10 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 -z-10 h-72 w-72 rounded-full bg-neutral-100/50 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.05] sm:leading-[0.95]"
              >
                {language === 'en' ? (
                  <>Websites That Turn <span className="text-blue-600 relative">Visitors</span> Into Customers</>
                ) : language === 'hi' ? (
                  <>ऐसी वेबसाइटें जो <span className="text-blue-600 relative">विज़िटर्स</span> को ग्राहकों में बदलें</>
                ) : (
                  <>એવી વેબસાઇટ્સ જે <span className="text-blue-600 relative">મુલાકાતીઓ</span> ને ગ્રાહકોમાં ફેરવે</>
                )}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-90"
              >
                {t('hero.desc')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <motion.button
                  whileHover={{ y: -3, scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.985, y: 0 }}
                  onClick={() => navigateTo('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/25 transition-all cursor-pointer"
                >
                  {t('hero.cta.primary')}
                </motion.button>
                <motion.button
                  whileHover={{ y: -3, scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.985, y: 0 }}
                  onClick={() => navigateTo('work')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1 rounded-full bg-white border border-neutral-200 px-8 py-4 text-base font-bold text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  {t('hero.cta.secondary')}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            </div>

            {/* Right Interactive Mockup Showcase Column */}
            <div className="lg:col-span-6 flex items-center justify-center relative mt-10 lg:mt-0">
              <InteractiveShowcase />
            </div>
          </div>

          {/* Quick credentials / trusts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-16 mt-16 border-t border-neutral-200/50 flex flex-wrap justify-center lg:justify-start gap-y-4 gap-x-8 text-xs text-neutral-500 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              {t('hero.trust.custom')}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              {t('hero.trust.mobile')}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              {t('hero.trust.fast')}
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              {t('hero.trust.seo')}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Strip , added per the homepage redesign: proof needs to appear
          before claims, not after eight sections of them. */}
      <motion.section
        id="social-proof-strip"
        className="py-16 bg-white font-sans border-b border-neutral-200/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
            Trusted by real businesses across Surat and beyond
          </p>

          {/* Real client logo strip: infinite marquee, full color, bigger */}
          <div className="logo-marquee-mask overflow-hidden mb-14">
            <div className="flex items-center gap-4 sm:gap-6 logo-marquee-track">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {[
                    { name: 'Santosh Timbers', src: '/logos/santoshtimbers.png' },
                    { name: 'Astrabizz Consultancy', src: '/logos/astrabizz.png' },
                    { name: 'Dr. Mihir Shah Smile Care Clinic', src: '/logos/drmihirshah.png' },
                    { name: 'SolWay Energies', src: '/logos/solway.png' },
                    { name: 'Darshan Galani & Co.', src: '/logos/darshangalani.png' },
                    { name: 'Jay Mehta & Co.', src: '/logos/jaymehta.png' },
                    { name: 'MNP & Co.', src: '/logos/mnp.png' },
                    { name: 'K.D. Mayani & Co.', src: '/logos/kdmayani.png' },
                  ].map((logo, idx) => (
                    <div
                      key={`${loopIdx}-${logo.name}-${idx}`}
                      className="flex items-center justify-center h-20 sm:h-24 px-6 sm:px-8 rounded-2xl bg-white border border-neutral-200/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-300 shrink-0"
                    >
                      <img
                        src={logo.src}
                        alt={logo.name}
                        loading="lazy"
                        className="h-10 sm:h-12 w-auto max-w-[140px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { quote: 'Very good website designs. Incredibly responsive team. Quick feedback turnaround. Great value.', name: 'Manav Shah', company: 'SolWay Energies' },
              { quote: 'We finally have a website that reflects how we work with our clients: clear, professional, and easy to trust.', name: 'CA Jay Mehta', company: 'Jay Mehta & Co.' },
              { quote: 'Absolutely professional people, know their work in best manner. I will absolutely recommend them for website related work.', name: 'Dr. Mihir Shah', company: 'Smile Care Clinic' },
              { quote: 'Gorgeous website and amazing service from start to finish. Exactly what we needed for the business.', name: 'Harshit Chopra', company: 'Santosh Timbers' },
            ].map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-5 rounded-2xl border border-neutral-100 bg-neutral-50/50 space-y-3"
              >
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-2 border-t border-neutral-200/60">
                  <p className="text-xs font-bold text-neutral-900">{t.name}</p>
                  <p className="text-[11px] text-neutral-500">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Overview Section */}
      <motion.section 
        id="services-overview" 
        className="py-24 bg-neutral-50 font-sans border-y border-neutral-200/50"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{t('home.services.badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              {t('home.services.title')}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {t('home.services.desc')}
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  id={`home-service-card-${srv.id}`}
                  variants={fadeUpItem}
                  whileHover={{ y: -6, scale: 1.01, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  className="flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-neutral-300/80 transition-all group"
                >
                  <div className="space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-8">
                    <button
                      onClick={() => navigateTo(srv.id)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      Explore Service Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Work , added per the homepage redesign: real proof of the services
          just described, before asking the visitor to trust abstract claims. */}
      <motion.section
        id="featured-work"
        className="py-24 bg-white font-sans"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Real Client Work</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Here is what those services actually built</h2>
            <p className="text-sm text-neutral-500 leading-relaxed">Real businesses, real problems solved, not concepts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Santosh Timbers', industry: 'Timber & Wood Trading', result: 'One of India\u2019s largest timber importers, taken from zero online presence to a professional site built for trust.', accent: '#92400E', logo: '/logos/santoshtimbers.png' },
              { name: 'Dr. Mihir Shah Smile Care Clinic', industry: 'Dental & Healthcare', result: 'A 25+ year dental practice given its first ever website, with online appointment booking for a new clinic location.', accent: '#0D9488', logo: '/logos/drmihirshah.png' },
              { name: 'Astrabizz Consultancy', industry: 'Business & IT Consulting', result: 'A digital transformation consultancy given a website built to earn trust with enterprise clients.', accent: '#16A34A', logo: '/logos/astrabizz.png' },
            ].map((project, idx) => (
              <motion.button
                key={project.name}
                onClick={() => navigateTo('work')}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-left p-6 rounded-2xl border border-neutral-200/80 bg-white hover:shadow-lg transition-all cursor-pointer space-y-3"
              >
                <img src={project.logo} alt={`${project.name} logo`} loading="lazy" className="h-8 w-auto max-w-[120px] object-contain" />
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: project.accent }}>
                  {project.industry}
                </span>
                <h3 className="text-base font-bold text-neutral-900">{project.name}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{project.result}</p>
              </motion.button>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('work')}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-6 py-3 text-sm font-bold text-white transition-all cursor-pointer"
            >
              See All Our Work <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Stat Strip: bridges the 8 detailed case studies above with the fuller
          picture, real numbers scan faster than adjectives. */}
      <motion.section
        id="stat-strip"
        className="relative py-20 bg-neutral-900 font-sans overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Ambient animated glow, purely decorative */}
        <motion.div
          className="absolute -top-1/2 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18), transparent 70%)' }}
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-500 mb-12">
            The 8 case studies above are a sample, not the whole picture
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { icon: Building2, node: <AnimatedNumber target={75} suffix="+" />, label: 'Businesses Helped' },
              { icon: Briefcase, node: <AnimatedNumber target={8} />, label: 'Featured Case Studies' },
              { icon: ShieldCheck, node: <AnimatedNumber target={100} suffix="%" />, label: 'Client-Owned Code' },
              { icon: MessageSquare, node: '1-on-1', label: 'Founder-Direct, No Account Managers' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-default"
                >
                  <Icon className="h-5 w-5 text-blue-400 mx-auto mb-3 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <p className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">{item.node}</p>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1.5">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us-overview" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Why Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              The Mago Labs Difference
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Most agencies use cheap templates and bloated WordPress plug-ins that make your site slow and vulnerable. We write clean code, design from scratch, and deliver top-tier speed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((bn, idx) => {
              const Icon = bn.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.01, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  className="p-6 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-white hover:border-neutral-200/80 hover:shadow-lg hover:shadow-neutral-200/30 transition-all duration-300 space-y-4 cursor-default"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{bn.title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{bn.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Web Process Section */}
      <motion.section 
        id="process-overview" 
        className="py-24 bg-neutral-950 text-white font-sans overflow-hidden"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-32 h-fit">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Our Method</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Our Transparent 7-Step Process
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Great websites do not happen by accident. We use a standardized, meticulously designed process to ensure every project is launched on time, secure, and ready to generate sales.
              </p>
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all cursor-pointer"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="lg:col-span-2 space-y-8 relative"
            >
              {/* Vertical line connecting steps */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-neutral-800" />

              {processSteps.map((st, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeRightItem}
                  className="relative pl-16 group"
                >
                  <div className="absolute left-3 top-1 h-6 w-6 rounded-full bg-neutral-900 border-2 border-blue-500 flex items-center justify-center text-[10px] font-bold text-blue-400 z-10 group-hover:scale-110 transition-transform" />
                  <motion.div 
                    whileHover={{ y: -3, scale: 1.005, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                    className="p-6 rounded-xl border border-neutral-900 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-800 hover:shadow-2xl hover:shadow-blue-500/5 transition-all space-y-2"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">{st.number} / Phase</span>
                    <h3 className="text-lg font-bold text-white">{st.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{st.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Industries We Serve Section */}
      <motion.section 
        id="industries-serve" 
        className="py-24 bg-white font-sans"
        initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Industries We Serve</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Tailored Solutions for Your Sector
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              We design specific layout flows depending on your business type. A dentist needs direct bookings, while a manufacturer needs catalog downloads. We build what fits.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpItem}
                  whileHover={{ y: -5, scale: 1.015, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  className="p-6 rounded-xl border border-neutral-200/60 bg-neutral-50/20 hover:bg-white hover:border-neutral-300 hover:shadow-md transition-all group space-y-4 cursor-default"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{ind.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Website Health Check Section */}
      <section id="home-health-check-section" className="py-24 bg-neutral-100/40 font-sans border-t border-neutral-200/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <SiteHealthCheck />
        </div>
      </section>

      {/* Founder Pitch Teaser */}
      <section id="founder-teaser" className="py-20 bg-neutral-50 font-sans border-t border-neutral-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Image (Using provided founder image) */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative max-w-sm rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
                <img
                  src="/burhan-founder.jpg"
                  alt="Burhan Kapasi - Founder of Mago Labs"
                  width={768}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-neutral-100 shadow-sm">
                  <p className="text-sm font-bold text-neutral-900">Burhan Kapasi</p>
                  <p className="text-xs text-neutral-500">Founder & Principal Developer</p>
                </div>
              </div>
            </div>

            {/* Teaser Copy */}
            <div className="lg:col-span-3 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">A Message from the Founder</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                "We do not build pretty business cards. We build marketing engines."
              </h2>
              <div className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  Hello, I am Burhan Kapasi. When I founded Mago Labs, I set out to deliver a higher standard of digital craftsmanship. Too often, ambitious business owners are given generic pre-made layouts that load slowly, lack engaging copywriting, and miss out on valuable organic traffic.
                </p>
                <p>
                  We approach web design as an absolute partnership. I work directly with you to design high-impact aesthetics, craft persuasive copywriting that connects deeply with your audience, and build lightweight, high-performance pages configured for top Google rankings and actual lead generation.
                </p>
              </div>
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('about')}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  Read My Full Story
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq-section" className="py-24 bg-white font-sans border-t border-neutral-200/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Have questions? We have direct, transparent answers. Here is everything you need to know about working with us to grow your business.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'How long does a website take to build?',
                answer: 'A typical custom business website takes between 3 to 5 weeks from discovery to launch. Landing pages can be delivered in as little as 10 to 14 days. We prioritize thorough planning, strategy, persuasive copywriting, and custom coding to ensure your site is built to convert.'
              },
              {
                question: 'How much does a custom website cost?',
                answer: 'Since every business has unique sitemap requirements, we provide flat, transparent quotes upfront. A custom lead-generation website starts around ₹35,000 / $500 depending on the design scale and integrations. We don\'t charge hidden fees, and you keep 100% ownership of your domain, code, and hosting.'
              },
              {
                question: 'Will my website rank on Google?',
                answer: 'Yes. Every website we build comes with a built-in technical SEO foundation: search-engine friendly HTML outline structure, proper heading tag hierarchy, localized Schema script markups, and fast page loading speeds. Combined with Google Business Profile local optimization, we help you rank higher.'
              },
              {
                question: 'Can I edit my website content later by myself?',
                answer: 'Absolutely. We design with total client independence in mind. We configure intuitive, easy-to-use content blocks or admin panel routes so you can update service text, change pricing lists, or upload portfolio images in under 2 minutes, without needing to know any code.'
              },
              {
                question: 'Do you provide domain registration & web hosting?',
                answer: 'Yes, we handle everything for you. We help choose and register your custom domain name and deploy your website files on secure, lightning-fast cloud web servers like Hostinger, Cloudflare, or Vercel, ensuring zero downtime and top-tier page performance.'
              },
              {
                question: 'Do you provide ongoing support and updates?',
                answer: 'Yes. We don\'t just launch your site and disappear. We offer flexible post-launch support and maintenance. Whether you need rapid content edits, security patches, or new features added, we are always just a direct WhatsApp call or message away.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-neutral-200/85 rounded-2xl overflow-hidden transition-all duration-300 bg-white"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 hover:bg-neutral-50/50 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-neutral-900 text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-neutral-500 bg-neutral-100 rounded-full p-1.5 transition-colors">
                      {isOpen ? (
                        <Minus className="h-4 w-4 text-neutral-800" />
                      ) : (
                        <Plus className="h-4 w-4 text-blue-600" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="p-6 pt-0 bg-white border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
