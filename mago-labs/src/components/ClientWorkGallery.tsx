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
} from 'lucide-react';

export interface ClientProject {
  id: string;
  clientName: string;
  url: string; // full https:// url
  domain: string; // display domain, e.g. www.example.com
  industry: string;
  blurb: string; // 1-2 sentence honest description, EDIT ME
  scope: string[]; // what you actually did, EDIT ME
  accent: string;
}

// DRAFT DATA: please correct industries/blurbs/scope to match reality.
// I could confirm these domains are live, but not verify full page content.
const PROJECTS: ClientProject[] = [
  {
    id: 'mnp',
    clientName: 'MNP & Co.',
    url: 'https://www.mnpnco.com',
    domain: 'www.mnpnco.com',
    industry: 'Chartered Accountancy',
    blurb: 'A professional services website built to establish credibility and generate consultation enquiries.',
    scope: ['Website Design', 'Service Pages', 'Enquiry Form'],
    accent: '#2563EB',
  },
  {
    id: 'jaymehta',
    clientName: 'Jay Mehta & Co.',
    url: 'https://www.jaymehtanadco.com',
    domain: 'www.jaymehtanadco.com',
    industry: 'Chartered Accountancy',
    blurb: 'A clean, trust-focused site laying out services and making it easy for prospective clients to reach out.',
    scope: ['Website Design', 'Service Pages', 'Enquiry Form'],
    accent: '#0891B2',
  },
  {
    id: 'kdmayani',
    clientName: 'K.D. Mayani & Co.',
    url: 'https://www.kdmayaniandco.com',
    domain: 'www.kdmayaniandco.com',
    industry: 'Chartered Accountancy',
    blurb: 'A structured, authority-building presence for a growing accounting practice.',
    scope: ['Website Design', 'Local SEO', 'Enquiry Form'],
    accent: '#059669',
  },
  {
    id: 'darshangalani',
    clientName: 'Darshan Galani & Co.',
    url: 'https://www.darshangalani.com',
    domain: 'www.darshangalani.com',
    industry: 'Chartered Accountancy',
    blurb: 'A content-rich site covering the firm\u2019s full range of compliance and advisory services.',
    scope: ['Website Design', 'Content Structure', 'SEO'],
    accent: '#7C3AED',
  },
  {
    id: 'solway',
    clientName: 'SolWay Energies',
    url: 'https://www.solwayenergies.com',
    domain: 'www.solwayenergies.com',
    industry: 'Solar & B2B Energy',
    blurb: 'A B2B-facing site for a solar energy distributor, built to communicate scale and capability to corporate buyers.',
    scope: ['Website Design', 'Product/Service Showcase', 'Lead Capture'],
    accent: '#D97706',
  },
];

// The two most differentiated projects get featured, larger cards.
// The rest (mostly same-industry) sit in a compact row so the section
// reads as "range of work," not "we mostly do one thing."
const FEATURED_IDS = ['solway', 'darshangalani'];

function PreviewFrame({ project, onClose }: { project: ClientProject; onClose: () => void }) {
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
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500 font-mono">
              <Lock className="h-2.5 w-2.5" />
              {project.domain}
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-500 whitespace-nowrap"
          >
            Open in new tab <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer ml-1"
          >
            <X className="h-4 w-4 text-neutral-500" />
          </button>
        </div>

        {/* Frame body */}
        <div className="relative flex-1 bg-neutral-50">
          {status === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-neutral-400 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading live site\u2026
            </div>
          )}
          {status === 'maybe-blocked' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8 bg-white/90">
              <AlertCircle className="h-6 w-6 text-amber-500" />
              <p className="text-sm text-neutral-600 max-w-sm">
                This preview is taking a while \u2014 some sites block being shown inside a
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

function ProjectCard({ project, onPreview, featured, key }: { key?: string; project: ClientProject; onPreview: () => void; featured?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col ${
        featured ? 'sm:col-span-1' : ''
      }`}
    >
      {/* Fake chrome bar as a static, branded thumbnail (no auto-loaded iframe) */}
      <div
        className="relative flex items-center justify-center px-4 py-8 sm:py-10 cursor-pointer group"
        style={{ background: `linear-gradient(135deg, ${project.accent}14, transparent 70%)` }}
        onClick={onPreview}
      >
        <div className="absolute top-3 left-4 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/60" />
          <span className="h-2 w-2 rounded-full bg-amber-400/60" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-[10px] text-neutral-400 font-mono">
          <Lock className="h-2.5 w-2.5" />
          {project.domain}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 group-hover:bg-neutral-950/5 transition-colors">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: project.accent }}
          >
            <Play className="h-3 w-3" /> Preview Live Site
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: project.accent }}>
              {project.industry}
            </span>
            <h3 className="text-base font-bold text-neutral-950 tracking-tight">{project.clientName}</h3>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 whitespace-nowrap">
            <Check className="h-2.5 w-2.5" /> Live
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed flex-1">{project.blurb}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.scope.map((s) => (
            <span key={s} className="text-[10px] font-medium bg-neutral-50 border border-neutral-200 rounded-full px-2 py-0.5 text-neutral-600">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-neutral-100 mt-1">
          <button
            onClick={onPreview}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Play className="h-3 w-3" /> Preview
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors"
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
  const featured = PROJECTS.filter((p) => FEATURED_IDS.includes(p.id));
  const rest = PROJECTS.filter((p) => !FEATURED_IDS.includes(p.id));
  const previewProject = PROJECTS.find((p) => p.id === previewId) || null;

  return (
    <div className="w-full max-w-6xl mx-auto text-left space-y-6">
      {/* Featured, most differentiated projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} onPreview={() => setPreviewId(project.id)} featured />
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
              <ProjectCard key={project.id} project={project} onPreview={() => setPreviewId(project.id)} />
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
