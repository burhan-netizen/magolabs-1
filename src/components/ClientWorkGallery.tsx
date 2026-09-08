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
  Building2,
  Target,
  Lightbulb,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import { CaseStudy } from '../types';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';

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

function CaseStudyCard({
  project,
  onPreview,
  onOpenCaseStudy,
  featured,
}: {
  key?: string;
  project: CaseStudy;
  onPreview: () => void;
  onOpenCaseStudy: (id: string) => void;
  featured?: boolean;
}) {
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
            <button
              onClick={() => onOpenCaseStudy(project.id)}
              className="text-base font-bold text-neutral-950 dark:text-white tracking-tight hover:underline text-left cursor-pointer"
            >
              {project.clientName}
            </button>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
            <Check className="h-2.5 w-2.5" /> Live
          </div>
        </div>

        {featured && project.business && project.build ? (
          <div className="space-y-3.5">
            {[
              { label: 'The Business', icon: Building2, text: project.business },
              { label: 'The Challenge', icon: Target, text: project.challenge },
              { label: 'The Mago Approach', icon: Lightbulb, text: project.approach },
              { label: 'The Build', icon: Wrench, text: project.build },
              { label: 'The Outcome', icon: TrendingUp, text: project.outcome },
            ].map((row) => {
              const RowIcon = row.icon;
              return (
                <div key={row.label} className="flex gap-2.5">
                  <RowIcon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: project.accent }} />
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <span className="font-bold text-neutral-800 dark:text-neutral-200">{row.label}: </span>
                    {row.text}
                  </p>
                </div>
              );
            })}
          </div>
        ) : featured ? (
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

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 mt-1">
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors cursor-pointer"
          >
            Read Full Case Study <ExternalLink className="h-3 w-3" />
          </button>
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
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
          >
            Visit Live Site <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ClientWorkGallery({ onOpenCaseStudy }: ClientWorkGalleryProps) {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const featured = CASE_STUDIES.filter((p) => FEATURED_CASE_STUDY_IDS.includes(p.id));
  const rest = CASE_STUDIES.filter((p) => !FEATURED_CASE_STUDY_IDS.includes(p.id));
  const previewProject = CASE_STUDIES.find((p) => p.id === previewId) || null;

  return (
    <div className="w-full max-w-6xl mx-auto text-left space-y-6">
      {/* Featured case studies, full challenge/approach/outcome narrative */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project) => (
          <CaseStudyCard
            key={project.id}
            project={project}
            onPreview={() => setPreviewId(project.id)}
            onOpenCaseStudy={onOpenCaseStudy}
            featured
          />
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
              <CaseStudyCard
                key={project.id}
                project={project}
                onPreview={() => setPreviewId(project.id)}
                onOpenCaseStudy={onOpenCaseStudy}
              />
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
