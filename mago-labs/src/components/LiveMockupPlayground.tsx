import { useEffect, useRef, useState, type ComponentType } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Utensils,
  Dumbbell,
  Home as HomeIcon,
  Scale,
  ShoppingBag,
  Rocket,
  Shuffle,
  Lock,
  Sparkles,
} from 'lucide-react';

interface Industry {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  domain: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  chips: string[];
  ctaLabel: string;
  accent: string; // hex
}

const INDUSTRIES: Industry[] = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    icon: Utensils,
    domain: 'bellarosa.com',
    eyebrow: 'Food & Hospitality',
    headline: 'Taste the difference.',
    subheadline: 'A warm, appetite-driven site built to turn browsers into reservations.',
    chips: ['Online Reservations', 'Menu Showcase', 'Local SEO'],
    ctaLabel: 'Reserve a Table',
    accent: '#D97706',
  },
  {
    id: 'fitness',
    label: 'Fitness Studio',
    icon: Dumbbell,
    domain: 'ironhouse.fit',
    eyebrow: 'Health & Fitness',
    headline: 'Train like it matters.',
    subheadline: 'Bold, high-energy design built to convert first-time visitors into members.',
    chips: ['Class Booking', 'Membership Funnel', 'Social Proof Wall'],
    ctaLabel: 'Book a Free Class',
    accent: '#E11D48',
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    icon: HomeIcon,
    domain: 'harborlane.realty',
    eyebrow: 'Property & Realty',
    headline: 'Homes worth showing off.',
    subheadline: 'Immersive galleries and clean listings that make every property feel premium.',
    chips: ['Listing Showcase', 'Virtual Tours', 'Lead Capture'],
    ctaLabel: 'View Listings',
    accent: '#059669',
  },
  {
    id: 'law',
    label: 'Law Firm',
    icon: Scale,
    domain: 'caldwellpartners.law',
    eyebrow: 'Legal Services',
    headline: 'Trust, built into every pixel.',
    subheadline: 'A calm, high-authority presence that reassures clients before they even call.',
    chips: ['Case Results', 'Attorney Bios', 'Consultation Form'],
    ctaLabel: 'Book a Consultation',
    accent: '#2563EB',
  },
  {
    id: 'retail',
    label: 'Boutique Retail',
    icon: ShoppingBag,
    domain: 'loomandline.shop',
    eyebrow: 'Retail & E-commerce',
    headline: 'Shop the story, not just the stock.',
    subheadline: 'Editorial product pages and a checkout that feels as good as the packaging.',
    chips: ['Product Storytelling', 'Fast Checkout', 'Email Capture'],
    ctaLabel: 'Shop the Collection',
    accent: '#7C3AED',
  },
  {
    id: 'saas',
    label: 'SaaS Startup',
    icon: Rocket,
    domain: 'flowstack.io',
    eyebrow: 'Software & Tech',
    headline: 'Explain it in five seconds.',
    subheadline: 'Clear, credible messaging that turns technical complexity into a fast yes.',
    chips: ['Feature Walkthrough', 'Pricing Table', 'Signup Flow'],
    ctaLabel: 'Start Free Trial',
    accent: '#0891B2',
  },
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface LiveMockupPlaygroundProps {
  onRequestProject?: () => void;
}

export default function LiveMockupPlayground({ onRequestProject }: LiveMockupPlaygroundProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [typedHeadline, setTypedHeadline] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = INDUSTRIES[activeIdx];

  useEffect(() => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    setTypedHeadline('');
    setIsTyping(true);

    let i = 0;
    const headline = active.headline;
    typeIntervalRef.current = setInterval(() => {
      i += 1;
      setTypedHeadline(headline.slice(0, i));
      if (i >= headline.length) {
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
        setIsTyping(false);
      }
    }, 28);

    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, [activeIdx]);

  const handleShuffle = () => {
    let next = Math.floor(Math.random() * INDUSTRIES.length);
    if (next === activeIdx) next = (next + 1) % INDUSTRIES.length;
    setActiveIdx(next);
  };

  const Icon = active.icon;

  return (
    <div className="w-full max-w-5xl mx-auto text-left">
      {/* Industry picker */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {INDUSTRIES.map((industry, idx) => {
          const IndIcon = industry.icon;
          const isActive = idx === activeIdx;
          return (
            <button
              key={industry.id}
              onClick={() => setActiveIdx(idx)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              <IndIcon className="h-3.5 w-3.5" style={isActive ? { color: industry.accent } : undefined} />
              {industry.label}
            </button>
          );
        })}
        <button
          onClick={handleShuffle}
          className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-neutral-300 px-3.5 py-2 text-xs font-semibold text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 transition-all cursor-pointer"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Surprise Me
        </button>
      </div>

      {/* Live mock browser */}
      <div className="relative rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
        {/* Chrome bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-[11px] text-neutral-400 font-mono max-w-[220px] sm:max-w-none truncate">
              <Lock className="h-2.5 w-2.5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={active.domain}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="truncate"
                >
                  {active.domain}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="w-[52px] hidden sm:block" />
        </div>

        {/* Hero mock content */}
        <div className="relative min-h-[340px] flex flex-col items-center justify-center text-center px-6 sm:px-12 py-12 overflow-hidden">
          {/* Ambient tinted backdrop, transitions with industry */}
          <motion.div
            key={`${active.id}-bg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${hexToRgba(active.accent, 0.12)} 0%, transparent 60%)`,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 flex flex-col items-center max-w-lg mx-auto"
            >
              <div
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4"
                style={{
                  color: active.accent,
                  borderColor: hexToRgba(active.accent, 0.25),
                  backgroundColor: hexToRgba(active.accent, 0.08),
                }}
              >
                <Icon className="h-3 w-3" />
                {active.eyebrow}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 min-h-[2.5em] sm:min-h-[1.3em]">
                {typedHeadline}
                {isTyping && <span className="inline-block w-[2px] h-[1em] bg-neutral-400 ml-0.5 align-middle animate-pulse" />}
              </h3>

              <p className="text-sm text-neutral-500 leading-relaxed mt-3">
                {active.subheadline}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isTyping ? 0 : 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-wrap justify-center gap-2 mt-5"
              >
                {active.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[10px] font-semibold bg-neutral-50 border border-neutral-200 rounded-full px-2.5 py-1 text-neutral-600"
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isTyping ? 0 : 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-sm cursor-default select-none"
                style={{ backgroundColor: active.accent }}
              >
                {active.ctaLabel}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Honesty footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 px-4 py-2.5 border-t border-neutral-100 text-[10px] text-neutral-400 font-medium bg-white">
          <span className="flex items-center gap-1">
            <Sparkles className="h-2.5 w-2.5 text-blue-500" />
            Live preview engine, rendered in real time, right now
          </span>
          <span>Not an actual client site</span>
        </div>
      </div>

      <p className="text-center text-xs text-neutral-400 mt-5 max-w-xl mx-auto leading-relaxed">
        This is a real interactive tool we built for this page, not a screenshot. Your actual
        project would be designed and coded from scratch around your brand, exactly like this.
      </p>

      {onRequestProject && (
        <div className="flex justify-center mt-6">
          <button
            onClick={onRequestProject}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs font-bold text-white transition-all hover:translate-y-[-1px] shadow-lg shadow-blue-600/10 cursor-pointer"
          >
            Let's Build Your Real Site
          </button>
        </div>
      )}
    </div>
  );
}
