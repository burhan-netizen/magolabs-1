import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { trackEvent } from '../utils/analytics';

interface ProcessProps {
  onPageChange: (page: PageId) => void;
}

// The full detail this page carries - trimmed to a 5-step summary on the homepage
// (src/pages/Home.tsx) so a first-time visitor gets the shape of the engagement
// without a long detour, while this page stays the complete, linkable reference.
const PROCESS_STEPS = [
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeRightItem = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] as const },
  },
};

export default function Process({ onPageChange }: ProcessProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO path="/process" />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs
              onPageChange={onPageChange}
              items={[
                { label: 'Home', page: 'home' },
                { label: 'Process' },
              ]}
            />
          </div>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Method</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Our Transparent 7-Step Process
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Great websites do not happen by accident. We use a standardized, meticulously
              designed process to ensure every project is launched on time, secure, and ready
              to generate sales &mdash; from the first audit to ongoing support after launch.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-950 text-white font-sans overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8 relative"
          >
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-neutral-800" />

            {PROCESS_STEPS.map((st, idx) => (
              <motion.div key={idx} variants={fadeRightItem} className="relative pl-16 group">
                <div className="absolute left-3 top-1 h-6 w-6 rounded-full bg-neutral-900 border-2 border-blue-500 flex items-center justify-center text-[10px] font-bold text-blue-400 z-10 group-hover:scale-110 transition-transform" />
                <motion.div
                  whileHover={{ y: -3, scale: 1.005, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  className="p-6 rounded-xl border border-neutral-900 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-800 hover:shadow-2xl hover:shadow-blue-500/5 transition-all space-y-2"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">{st.number} / Phase</span>
                  <h2 className="text-lg font-bold text-white">{st.title}</h2>
                  <p className="text-sm text-neutral-400 leading-relaxed">{st.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <div className="pt-14 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackEvent('cta_click', { location: 'process_page' });
                navigateTo('contact');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-all cursor-pointer"
            >
              Get My Website Reviewed
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}
