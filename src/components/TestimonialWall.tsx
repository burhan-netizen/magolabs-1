import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Quote,
  Star,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Scale,
  Factory,
  Sun,
  TreePine,
  Stethoscope,
  Rocket,
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: 'Chartered Accountancy' | 'Manufacturing' | 'Solar & B2B Energy' | 'Timber & Wood Trading' | 'Dental & Healthcare' | 'Business & IT Consulting';
  quote: string;
  accent: string;
  initials: string;
}

// Real client feedback, collected from Google Reviews and direct client conversations.
const TESTIMONIALS: Testimonial[] = [
  {
    id: 'darshan-galani',
    name: 'CA Darshan Galani',
    role: 'Proprietor',
    company: 'Darshan Galani & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "Big thanks to Burhan Bhai at Mago Labs for an amazing job on our website! He listened carefully to what we wanted, suggested smart improvements, and turned everything around faster than expected. The site looks great on phones and desktop, loads quickly, and is easy to manage. He was always available for questions and gave clear guidance after launch. Highly recommend him for anyone needing a professional, friendly web developer.",
    accent: '#7C3AED',
    initials: 'DG',
  },
  {
    id: 'smit-antala',
    name: 'Smit Antala',
    role: 'Director',
    company: 'Antala Metals Pvt Ltd',
    industry: 'Manufacturing',
    quote:
      "I honestly couldn't be happier with the website Mago Labs built for us. From the first discussion to the final delivery, everything was handled so professionally. They understood exactly what we wanted, suggested great ideas, and the final website turned out even better than we expected. The team was always quick to respond and made the whole experience completely stress-free. Would definitely recommend Mago Labs to anyone looking for a high-quality website.",
    accent: '#B45309',
    initials: 'SA',
  },
  {
    id: 'manav-shah',
    name: 'Manav Shah',
    role: 'Founder',
    company: 'SolWay Energies',
    industry: 'Solar & B2B Energy',
    quote: 'Very good website designs. Incredibly responsive team. Quick feedback turnaround. Great value.',
    accent: '#D97706',
    initials: 'MS',
  },
  {
    id: 'jay-mehta',
    name: 'CA Jay Mehta',
    role: 'Proprietor',
    company: 'Jay Mehta & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "Working with Burhan at Mago Labs was refreshing. We finally have a website that reflects how we work with our clients: clear, professional, and easy to trust. He handled everything from structure to launch without us ever having to chase for updates, and the site works beautifully on mobile too. Exactly what our practice needed.",
    accent: '#0891B2',
    initials: 'JM',
  },
  {
    id: 'manish-khandelwal',
    name: 'CA Manish Khandelwal',
    role: 'Partner',
    company: 'MNP & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "Our old website barely got us any enquiries. Mago Labs rebuilt it from scratch with a clean layout and much better structure, and we've noticed a real difference in how prospective clients respond after visiting the site. Burhan was responsive throughout and made revisions quickly whenever we asked.",
    accent: '#2563EB',
    initials: 'MK',
  },
  {
    id: 'ketan-mayani',
    name: 'CA Ketan Mayani',
    role: 'Proprietor',
    company: 'K.D. Mayani & Co.',
    industry: 'Chartered Accountancy',
    quote:
      "A very professional experience from start to finish. Burhan understood exactly what a CA firm needs online: credibility, clarity, and easy navigation for clients. The site was delivered on schedule and he was quick to make small adjustments even after launch. Would recommend Mago Labs to any professional firm looking to build trust online.",
    accent: '#059669',
    initials: 'KM',
  },
  {
    id: 'mihir-shah',
    name: 'Dr. Mihir Shah',
    role: 'Owner',
    company: 'Dr. Mihir Shah Smile Care Clinic',
    industry: 'Dental & Healthcare',
    quote: 'Absolutely professional people, know their work in best manner, I will absolutely recommend these people for website related work.',
    accent: '#0D9488',
    initials: 'MSC',
  },
  {
    id: 'harshit-chopra',
    name: 'Harshit Chopra',
    role: 'Owner',
    company: 'Santosh Timbers',
    industry: 'Timber & Wood Trading',
    quote:
      "Gorgeous website and amazing service from start to finish. The Mago Labs team gave us great design and amazing support throughout, exactly what we needed for the business.",
    accent: '#92400E',
    initials: 'HC',
  },
  {
    id: 'denish-dalal',
    name: 'Denish Dalal',
    role: 'Founder',
    company: 'Astrabizz Consultancy',
    industry: 'Business & IT Consulting',
    quote:
      "Great design and a truly gorgeous website. Mago Labs delivered amazing service and amazing support at every step. The site captures exactly the professional image we wanted for our consultancy.",
    accent: '#16A34A',
    initials: 'DD',
  },
];

const INDUSTRY_ICON: Record<Testimonial['industry'], typeof Scale> = {
  'Chartered Accountancy': Scale,
  Manufacturing: Factory,
  'Solar & B2B Energy': Sun,
  'Timber & Wood Trading': TreePine,
  'Dental & Healthcare': Stethoscope,
  'Business & IT Consulting': Rocket,
};

const FILTERS: Array<Testimonial['industry'] | 'All'> = [
  'All',
  'Chartered Accountancy',
  'Manufacturing',
  'Solar & B2B Energy',
  'Timber & Wood Trading',
  'Dental & Healthcare',
  'Business & IT Consulting',
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function Spotlight() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const t = TESTIMONIALS[index];
  const Icon = INDUSTRY_ICON[t.industry];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div
      className="relative max-w-3xl mx-auto rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-neutral-100">
        {!paused && (
          <motion.div
            key={index}
            className="h-full"
            style={{ backgroundColor: t.accent }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5.5, ease: 'linear' }}
          />
        )}
      </div>

      <div className="p-8 sm:p-10 text-center">
        <Quote className="h-7 w-7 mx-auto mb-4 opacity-20" style={{ color: t.accent }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-base sm:text-lg font-medium text-neutral-800 leading-relaxed max-w-2xl mx-auto">
              "{t.quote}"
            </p>

            <div className="mt-6 flex flex-col items-center gap-2">
              <Stars />
              <div className="flex items-center gap-2.5 mt-1">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: t.accent }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-neutral-900 flex items-center gap-1">
                    {t.name}
                    <BadgeCheck className="h-3.5 w-3.5 text-blue-500" />
                  </p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    <Icon className="h-3 w-3" /> {t.company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={() => go(-1)}
            className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${item.name}`}
                className="p-1 cursor-pointer"
              >
                <span
                  className="block h-1.5 rounded-full transition-all"
                  style={{
                    width: i === index ? 18 : 6,
                    backgroundColor: i === index ? t.accent : '#e5e7eb',
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setPaused((p) => !p)}
            className="ml-2 p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ t, index }: { key?: string; t: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.quote.length > 180;
  const Icon = INDUSTRY_ICON[t.industry];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.06 }}
      className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 sm:p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: t.accent }}
          >
            {t.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900 flex items-center gap-1 leading-tight">
              {t.name}
              <BadgeCheck className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            </p>
            <p className="text-[11px] text-neutral-500">{t.role}, {t.company}</p>
          </div>
        </div>
        <Quote className="h-5 w-5 opacity-15 shrink-0" style={{ color: t.accent }} />
      </div>

      <Stars />

      <p className={`text-sm text-neutral-600 leading-relaxed flex-1 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
        {t.quote}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[11px] font-bold text-blue-600 hover:text-blue-500 transition-colors self-start cursor-pointer"
        >
          {expanded ? 'Show less' : 'Read full review'}
        </button>
      )}

      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide"
          style={{ color: t.accent }}
        >
          <Icon className="h-3 w-3" /> {t.industry}
        </span>
        <span className="text-[10px] font-medium text-neutral-400">Verified Client</span>
      </div>
    </motion.div>
  );
}

export default function TestimonialWall() {
  const [filter, setFilter] = useState<Testimonial['industry'] | 'All'>('All');

  const filtered = useMemo(
    () => (filter === 'All' ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.industry === filter)),
    [filter]
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 text-left">
      <Spotlight />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer border ${
                filter === f
                  ? 'bg-neutral-900 border-neutral-900 text-white'
                  : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((t, i) => (
              <ReviewCard key={t.id} t={t} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
