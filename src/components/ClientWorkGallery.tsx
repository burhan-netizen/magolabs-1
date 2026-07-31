import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Lock,
  X,
  Play,
  AlertCircle,
  Loader2,
  Check,
  Target,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import { CaseStudy } from '../types';

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'santoshtimbers',
    clientName: 'Santosh Timbers',
    url: 'https://www.santoshtimbers.com',
    domain: 'www.santoshtimbers.com',
    industry: 'Timber & Wood Trading',
    challenge:
      "Santosh Timbers is one of India's largest timber importers, but before we stepped in, they had no website at all. A business operating at that scale was relying entirely on word of mouth and personal networks, with nothing online to back up their credibility when a new buyer wanted to check them out.",
    approach:
      "We built them a website from scratch, designed specifically to convert visitors into serious enquiries. Every section was built around establishing trust fast, since bulk timber buyers want to know they are dealing with a real, established company before they pick up the phone.",
    outcome:
      "Santosh Timbers now has a professional online presence that matches the scale of their actual business, giving new buyers a reason to trust them before the first conversation even happens.",
    scope: ['Website Design', 'Product Catalog', 'Enquiry Form'],
    accent: '#92400E',
    logoUrl: '/logos/santoshtimbers.png',
    screenshotUrl: '/screenshots/santoshtimbers.jpg',
  },
  {
    id: 'drmihirshah',
    clientName: 'Dr. Mihir Shah Smile Care Clinic',
    url: 'https://www.drmihirshahsmilecareclinic.com',
    domain: 'www.drmihirshahsmilecareclinic.com',
    industry: 'Dental & Healthcare',
    challenge:
      "Dr. Mihir Shah has been practicing dentistry for over 25 years, but had never had a website. When he opened a new clinic location, he needed a way to attract patients who had never heard of him before, and decades of real experience were not going to be visible to anyone searching online.",
    approach:
      "We built him a professional, aesthetically polished website with a built in appointment booking flow, designed to make new patients feel comfortable enough to book their first visit at the new location. The goal was to turn 25 years of real experience into something a first time visitor could instantly sense and trust.",
    outcome:
      "Dr. Shah now has a website that matches the quality of care he actually provides, giving his new clinic a real shot at attracting patients in a location where nobody knew him yet.",
    scope: ['Website Design', 'Appointment Booking System', 'Local SEO'],
    accent: '#0D9488',
    logoUrl: '/logos/drmihirshah.png',
    screenshotUrl: '/screenshots/drmihirshah.jpg',
  },
  {
    id: 'astrabizz',
    clientName: 'Astrabizz Consultancy',
    url: 'https://www.astrabizz.com',
    domain: 'www.astrabizz.com',
    industry: 'Business & IT Consulting',
    challenge:
      "In consulting, especially when working with large companies on ERP, CRM, and AI driven digital transformation projects, trust is everything. Astrabizz needed a website that could hold its own in front of enterprise clients who are used to dealing with polished, established consulting firms.",
    approach:
      "We designed a site that clearly showcases Denish's expertise and the specific technologies he works with, positioning Astrabizz as a credible digital transformation partner rather than just another freelancer with a laptop. Every page was built to move a skeptical enterprise visitor toward booking a consultation.",
    outcome:
      "Astrabizz now has a website that reflects the seriousness of the work they do, giving Denish a genuine edge when pitching to bigger companies evaluating multiple consulting partners.",
    scope: ['Website Design', 'Service Pages', 'Consultation Booking CTA'],
    accent: '#16A34A',
    logoUrl: '/logos/astrabizz.png',
    screenshotUrl: '/screenshots/astrabizz.jpg',
  },
  {
    id: 'solway',
    clientName: 'SolWay Energies',
    url: 'https://www.solwayenergies.com',
    domain: 'www.solwayenergies.com',
    industry: 'Solar & B2B Energy',
    challenge:
      "SolWay Energies is a solar and B2B energy distributor working with corporate buyers, but had no website to back up conversations happening in meetings and on calls. In B2B energy, buyers do their homework before committing, and having nothing to find online was quietly costing them credibility.",
    approach:
      "We built a website designed to communicate scale and capability to corporate buyers, structured around the kind of proof a B2B buyer actually looks for before trusting a new supplier.",
    outcome:
      "SolWay Energies now has a digital presence that supports their sales conversations instead of undermining them, giving corporate buyers a reason to take the relationship seriously from the first search.",
    scope: ['Website Design', 'Product/Service Showcase', 'Lead Capture'],
    accent: '#D97706',
    logoUrl: '/logos/solway.png',
    screenshotUrl: '/screenshots/solway.jpg',
  },
  {
    id: 'darshangalani',
    clientName: 'Darshan Galani & Co.',
    url: 'https://www.darshangalani.com',
    domain: 'www.darshangalani.com',
    industry: 'Chartered Accountancy',
    challenge:
      "Darshan Galani & Co. is a chartered accountancy practice that had never had a website. For a CA firm, the absence of a website can quietly work against you, since prospective clients often check online before ever picking up the phone.",
    approach:
      "We built the firm a clean, trust focused website from the ground up, structured to make it easy for prospective clients to understand their services and reach out with confidence.",
    outcome:
      "The firm now has a professional online presence that reflects the credibility of their actual practice, something they simply did not have before.",
    scope: ['Website Design', 'Content Structure', 'SEO'],
    accent: '#7C3AED',
    logoUrl: '/logos/darshangalani.png',
    screenshotUrl: '/screenshots/darshangalani.jpg',
  },
  {
    id: 'kdmayani',
    clientName: 'K.D. Mayani & Co.',
    url: 'https://www.kdmayaniandco.com',
    domain: 'www.kdmayaniandco.com',
    industry: 'Chartered Accountancy',
    challenge:
      "K.D. Mayani & Co., a growing accounting practice, was also operating without a website, missing the opportunity to build authority with prospective clients before that first conversation.",
    approach:
      "We built them a structured, professional presence designed around the specific things a CA firm needs to communicate: credibility, clarity, and ease of contact.",
    outcome:
      "K.D. Mayani & Co. now has an authority building website that gives the practice a stronger first impression with every new prospective client who finds them.",
    scope: ['Website Design', 'Local SEO', 'Enquiry Form'],
    accent: '#059669',
    logoUrl: '/logos/kdmayani.png',
    screenshotUrl: '/screenshots/kdmayani.jpg',
  },
  {
    id: 'jaymehta',
    clientName: 'Jay Mehta & Co.',
    url: 'https://www.jaymehtanadco.com',
    domain: 'www.jaymehtanadco.com',
    industry: 'Chartered Accountancy',
    challenge:
      "Jay Mehta & Co. already had a website, but it was unprofessional and was not converting visitors into enquiries. An outdated site can actually work against a CA firm more than having no site at all, since it signals the opposite of what a prospective client wants to feel.",
    approach:
      "We revamped the entire website from the ground up, replacing the old design with a clean, trust focused layout built to convert. The goal was a site that finally matched how the firm actually operates day to day.",
    outcome:
      "Jay Mehta & Co. now has a website that works beautifully on mobile, loads fast, and gives clients a much stronger reason to trust the practice than the old site ever did.",
    scope: ['Website Redesign', 'Mobile Optimization', 'Enquiry Form'],
    accent: '#0891B2',
    logoUrl: '/logos/jaymehta.png',
    screenshotUrl: '/screenshots/jaymehta.jpg',
  },
  {
    id: 'mnp',
    clientName: 'MNP & Co.',
    url: 'https://www.mnpnco.com',
    domain: 'www.mnpnco.com',
    industry: 'Chartered Accountancy',
    challenge:
      "MNP & Co.'s old website barely brought in any enquiries. It technically existed, but it was not doing the job a website is actually supposed to do for a growing accounting practice.",
    approach:
      "We rebuilt it from scratch with a cleaner layout and a much stronger structure, focused entirely on turning visitors into actual enquiries rather than just having a page online for the sake of it.",
    outcome:
      "Since the rebuild, the firm has noticed a real difference in how prospective clients respond after visiting the site, exactly the kind of result a website revamp should deliver.",
    scope: ['Website Redesign', 'Conversion Optimization', 'Enquiry Form'],
    accent: '#2563EB',
    logoUrl: '/logos/mnp.png',
    screenshotUrl: '/screenshots/mnp.jpg',
  },
];

// The two most differentiated stories (biggest business, most personal narrative)
// get featured, larger cards with the full challenge/approach/outcome visible.
// The rest sit in a compact row so the section reads as "range of work."
const FEATURED_IDS = ['santoshtimbers', 'drmihirshah'];

function PreviewFrame({ project, onClose }: { project: CaseStudy; onClose: () => void }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'maybe-blocked'>('loading');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Browsers don't reliably fire onError for X-Frame-Options/CSP blocks;
    // the frame just stays blank. This timeout is a heuristic nudge toward
    // the "open directly" fallback, not a hard failure detection.
    timeoutRef.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'maybe-blocked' : s));
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-neutral-100 bg-neutral-50 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex-1 min-w-0 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500 font-mono min-w-0 max-w-full">
              <Lock className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate">{project.domain}</span>
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-500 whitespace-nowrap shrink-0"
          >
            Open in new tab <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden inline-flex items-center justify-center p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors shrink-0"
            aria-label="Open in new tab"
          >
            <ExternalLink className="h-4 w-4 text-blue-600" />
          </a>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close preview"
          >
            <X className="h-4 w-4 text-neutral-500" />
          </button>
        </div>

        {/* Frame body */}
        <div className="relative flex-1 bg-neutral-50">
          {status === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-neutral-400 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading live site&hellip;
            </div>
          )}
          {status === 'maybe-blocked' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8 bg-white/90">
              <AlertCircle className="h-6 w-6 text-amber-500" />
              <p className="text-sm text-neutral-600 max-w-sm">
                This preview is taking a while, some sites block being shown inside a
                frame. Open it directly to see the live version.
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white transition-all"
              >
                Open {project.domain} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
          <iframe
            src={project.url}
            title={`Live preview of ${project.clientName}`}
            className="w-full h-full border-0"
            onLoad={() => setStatus('loaded')}
            loading="lazy"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

function CaseStudyCard({ project, onPreview, featured, key }: { key?: string; project: CaseStudy; onPreview: () => void; featured?: boolean }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1F1F1F] shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
      {/* Thumbnail: real homepage screenshot when we have one, with the client
          logo as a small badge over it, falling back to logo-only or the
          domain chrome placeholder for anything we don't have media for yet */}
      <div
        className="relative flex items-center justify-center cursor-pointer group overflow-hidden bg-neutral-100 dark:bg-neutral-900"
        onClick={onPreview}
      >
        {project.screenshotUrl ? (
          <>
            <img
              src={project.screenshotUrl}
              alt={`${project.clientName} website homepage`}
              loading="lazy"
              className="w-full h-40 sm:h-44 object-cover object-top"
            />
            {project.logoUrl && (
              <div className="absolute bottom-3 left-3 h-9 px-2.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-md border border-neutral-200/60 flex items-center">
                <img src={project.logoUrl} alt={`${project.clientName} logo`} className="h-5 w-auto max-w-[90px] object-contain" />
              </div>
            )}
          </>
        ) : (
          <div
            className="relative w-full flex items-center justify-center px-4 py-8 sm:py-10"
            style={{ background: `linear-gradient(135deg, ${project.accent}14, transparent 70%)` }}
          >
            <div className="absolute top-3 left-4 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/60" />
              <span className="h-2 w-2 rounded-full bg-amber-400/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
            </div>
            {project.logoUrl ? (
              <img
                src={project.logoUrl}
                alt={`${project.clientName} logo`}
                loading="lazy"
                className="h-16 sm:h-20 w-auto max-w-[70%] object-contain"
              />
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-[10px] text-neutral-400 font-mono">
                <Lock className="h-2.5 w-2.5" />
                {project.domain}
              </div>
            )}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 group-hover:bg-neutral-950/20 transition-colors">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: project.accent }}
          >
            <Play className="h-3 w-3" /> Preview Live Site
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: project.accent }}>
              {project.industry}
            </span>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">{project.clientName}</h3>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
            <Check className="h-2.5 w-2.5" /> Live
          </div>
        </div>

        {featured ? (
          <div className="space-y-3.5">
            <div className="flex gap-2.5">
              <Target className="h-4 w-4 shrink-0 mt-0.5" style={{ color: project.accent }} />
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.challenge}</p>
            </div>
            <div className="flex gap-2.5">
              <Wrench className="h-4 w-4 shrink-0 mt-0.5" style={{ color: project.accent }} />
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.approach}</p>
            </div>
            <div className="flex gap-2.5">
              <TrendingUp className="h-4 w-4 shrink-0 mt-0.5" style={{ color: project.accent }} />
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.outcome}</p>
            </div>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">{project.outcome}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.scope.map((s) => (
            <span key={s} className="text-[10px] font-medium bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full px-2 py-0.5 text-neutral-600 dark:text-neutral-400">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 mt-1">
          <button
            onClick={onPreview}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Play className="h-3 w-3" /> Preview
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Visit Live Site <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClientWorkGallery() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const featured = CASE_STUDIES.filter((p) => FEATURED_IDS.includes(p.id));
  const rest = CASE_STUDIES.filter((p) => !FEATURED_IDS.includes(p.id));
  const previewProject = CASE_STUDIES.find((p) => p.id === previewId) || null;

  return (
    <div className="w-full max-w-6xl mx-auto text-left space-y-6">
      {/* Featured case studies, full challenge/approach/outcome narrative */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featured.map((project) => (
          <CaseStudyCard key={project.id} project={project} onPreview={() => setPreviewId(project.id)} featured />
        ))}
      </div>

      {/* Rest of the work, compact row */}
      {rest.length > 0 && (
        <>
          <p className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase text-center pt-2">
            More Client Work
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project) => (
              <CaseStudyCard key={project.id} project={project} onPreview={() => setPreviewId(project.id)} />
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {previewProject && <PreviewFrame project={previewProject} onClose={() => setPreviewId(null)} />}
      </AnimatePresence>
    </div>
  );
}
