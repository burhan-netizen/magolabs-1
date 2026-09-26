import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Lock,
  X,
  Play,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/caseStudies';

interface ClientWorkGalleryProps {
  /** Navigates to this case study's dedicated /work/<id> page (real, indexable content). */
  onOpenCaseStudy: (id: string) => void;
}

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col"
      >
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
      </motion.div>
    </motion.div>,
    document.body
  );
}

/** Deliberately minimal: a screenshot, a name, one line, one link. The full
 *  Business/Challenge/Approach/Build/Outcome narrative lives on each project's
 *  dedicated /work/<id> page (WorkDetail.tsx) - repeating all five paragraphs for
 *  every one of 9 cards here turned the gallery into a wall of text instead of
 *  something worth browsing. */
function CaseStudyCard({
  project,
  onPreview,
  onOpenCaseStudy,
}: {
  key?: string;
  project: CaseStudy;
  onPreview: () => void;
  onOpenCaseStudy: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1F1F1F] overflow-hidden transition-shadow duration-300 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      {/* Thumbnail: real homepage screenshot when we have one, with the client
          logo as a small badge over it, falling back to logo-only or the
          domain chrome placeholder for anything we don't have media for yet */}
      <div
        className="relative aspect-[8/5] overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-900"
        onClick={onPreview}
      >
        {project.screenshotUrl ? (
          <img
            src={project.screenshotUrl}
            alt={`${project.clientName} website homepage`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center px-4"
            style={{ background: `linear-gradient(135deg, ${project.accent}14, transparent 70%)` }}
          >
            {project.logoUrl ? (
              <img src={project.logoUrl} alt={`${project.clientName} logo`} loading="lazy" className="h-16 w-auto max-w-[70%] object-contain" />
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-neutral-200 px-3 py-1 text-[10px] text-neutral-400 font-mono">
                <Lock className="h-2.5 w-2.5" />
                {project.domain}
              </div>
            )}
          </div>
        )}

        {/* Bottom gradient + logo badge, always visible for legibility over any screenshot */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        {project.screenshotUrl && project.logoUrl && (
          <div className="absolute bottom-3 left-3 h-8 px-2.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-md border border-neutral-200/60 flex items-center">
            <img src={project.logoUrl} alt={`${project.clientName} logo`} className="h-4 w-auto max-w-[80px] object-contain" />
          </div>
        )}

        {/* Hover preview affordance */}
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 group-hover:bg-neutral-950/25 transition-colors duration-300">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
            style={{ backgroundColor: project.accent }}
          >
            <Play className="h-3 w-3" /> Preview Live Site
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: project.accent }}>
            {project.industry}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" title="Live site" />
        </div>

        <button
          onClick={() => onOpenCaseStudy(project.id)}
          className="block text-left text-base font-bold text-neutral-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
        >
          {project.clientName}
        </button>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {project.outcome}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-all cursor-pointer group/link"
          >
            Read Case Study
            <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.clientName}'s live site`}
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClientWorkGallery({ onOpenCaseStudy }: ClientWorkGalleryProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const industries = useMemo(
    () => ['All', ...Array.from(new Set(CASE_STUDIES.map((cs) => cs.industry)))],
    []
  );
  const filtered = activeFilter === 'All' ? CASE_STUDIES : CASE_STUDIES.filter((cs) => cs.industry === activeFilter);
  const previewProject = CASE_STUDIES.find((p) => p.id === previewId) || null;

  return (
    <div className="w-full max-w-6xl mx-auto text-left space-y-10">
      {/* Industry filter: a real interaction, not just decoration - browsing 9
          projects gets easier once you can narrow to your own industry. */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {industries.map((industry) => (
          <button
            key={industry}
            onClick={() => setActiveFilter(industry)}
            className="relative px-4 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer"
          >
            {activeFilter === industry && (
              <motion.span
                layoutId="work-filter-pill"
                className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span
              className={`relative z-10 transition-colors ${
                activeFilter === industry
                  ? 'text-white dark:text-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {industry}
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <CaseStudyCard
              key={project.id}
              project={project}
              onPreview={() => setPreviewId(project.id)}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {previewProject && <PreviewFrame project={previewProject} onClose={() => setPreviewId(null)} />}
      </AnimatePresence>
    </div>
  );
}
