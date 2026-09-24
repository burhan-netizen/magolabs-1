import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Plus,
  Minus,
  Eye,
  ShieldAlert,
  TrendingDown,
  SearchX,
  Smartphone,
  Search,
  MapPin,
  Users,
  PackageSearch,
  FileWarning,
  Building2,
  Wrench,
  HelpCircle,
} from 'lucide-react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { getCaseStudyById } from '../data/caseStudies';
import { trackEvent } from '../utils/analytics';
import { NICHE_PAGES } from '../data/nicheLandingPages';

const ICONS = {
  Eye, ShieldAlert, TrendingDown, SearchX, Smartphone, Search, MapPin, Users,
  PackageSearch, FileWarning, Building2, Wrench, HelpCircle,
} as const;
type IconName = keyof typeof ICONS;

interface NicheProblem {
  icon: IconName;
  title: string;
  desc: string;
}

interface NicheFAQ {
  question: string;
  answer: string;
}

export interface NicheConfig {
  id: PageId;
  path: string;
  eyebrow: string;
  h1: string;
  intro: string;
  problemsHeadline: string;
  problems: NicheProblem[];
  contextParagraphs: string[];
  solutionHeadline: string;
  solutionPoints: string[];
  portfolioIds: string[];
  faqs: NicheFAQ[];
  /** Rendered as plain text with one internal link; kept simple rather than
   *  building a rich-text renderer for a single, occasional cross-link. */
  crossLink?: { text: string; before: string; after: string; page: PageId };
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const } },
};

interface NicheLandingPageProps {
  nicheId: PageId;
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

export default function NicheLandingPage({ nicheId, onPageChange, onOpenCaseStudy }: NicheLandingPageProps) {
  const config = NICHE_PAGES[nicheId];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const portfolio = config.portfolioIds
    .map((id) => getCaseStudyById(id))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  return (
    <>
      <SEO path={config.path} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumbs onPageChange={onPageChange} items={[{ label: 'Home', page: 'home' }, { label: config.h1 }]} />
          </div>
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{config.eyebrow}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              {config.h1}
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {config.intro}
            </p>
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackEvent('cta_click', { location: 'niche_landing', page: config.id });
                  navigateTo('contact');
                }}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10 cursor-pointer"
              >
                Get My Website Reviewed
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <motion.section
        className="py-20 bg-neutral-950 text-white font-sans relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight mb-14 max-w-2xl mx-auto">
            {config.problemsHeadline}
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {config.problems.map((item, idx) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpItem}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all space-y-4"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Industry Context + Solution */}
      <section className="py-20 bg-white font-sans">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="space-y-5">
            {config.contextParagraphs.map((p, idx) => (
              <p key={idx} className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="p-8 rounded-2xl border border-neutral-200/80 bg-neutral-50/50 space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">{config.solutionHeadline}</h2>
            <ul className="space-y-3">
              {config.solutionPoints.map((point, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-neutral-600 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {config.crossLink && (
            <p className="text-sm text-neutral-500 leading-relaxed">
              {config.crossLink.before}{' '}
              <button
                onClick={() => navigateTo(config.crossLink!.page)}
                className="font-semibold text-blue-600 hover:text-blue-500 hover:underline cursor-pointer"
              >
                {config.crossLink.text}
              </button>{' '}
              {config.crossLink.after}
            </p>
          )}
        </div>
      </section>

      {/* Relevant Portfolio */}
      {portfolio.length > 0 && (
        <section className="py-20 bg-neutral-50 font-sans border-y border-neutral-200/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Real Work</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">Relevant case studies</h2>
            </div>
            <div className={`grid grid-cols-1 ${portfolio.length > 1 ? 'sm:grid-cols-2' : ''} ${portfolio.length > 2 ? 'lg:grid-cols-3' : ''} gap-6`}>
              {portfolio.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => onOpenCaseStudy(cs.id)}
                  className="text-left p-6 rounded-2xl border border-neutral-200/80 bg-white hover:shadow-lg transition-all cursor-pointer space-y-3"
                >
                  {cs.logoUrl && <img src={cs.logoUrl} alt={`${cs.clientName} logo`} loading="lazy" className="h-8 w-auto max-w-[120px] object-contain" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: cs.accent }}>
                    {cs.industry}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900">{cs.clientName}</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{cs.outcome}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                    Read Full Case Study <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process teaser - links to the canonical /process page rather than repeating
          the full detail here, to avoid duplicating a whole content block across
          every niche page. */}
      <section className="py-16 bg-white font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">How we get there</h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Every project follows the same transparent process, discovery, strategy, design, build,
            and launch, regardless of your industry.
          </p>
          <button
            onClick={() => navigateTo('process')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-500 hover:underline cursor-pointer"
          >
            See our full process
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white font-sans border-b border-neutral-200/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {config.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-neutral-200/85 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 hover:bg-neutral-50/50 text-left transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-neutral-900 text-sm sm:text-base pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 text-neutral-500 bg-neutral-100 rounded-full p-1.5 transition-colors">
                      {isOpen ? <Minus className="h-4 w-4 text-neutral-800" /> : <Plus className="h-4 w-4 text-blue-600" />}
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
