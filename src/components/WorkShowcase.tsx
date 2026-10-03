import React, { useRef, useState } from 'react';
import { screenshotSrcSet } from '../utils/images';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CaseStudy } from '../types';
import PageLink from './PageLink';
import { getWorkDetailPath } from '../utils/pageRoutes';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';
import { tiltHandlers } from '../utils/tilt';
import { useScrollStack } from '../hooks/useScrollStack';

interface WorkShowcaseProps {
  onOpenCaseStudy: (id: string) => void;
}

// Which filter each of the remaining projects sits under.
const CATEGORY: Record<string, string> = {
  kdmayani: 'CA firms',
  jaymehta: 'CA firms',
  mnp: 'CA firms',
  astrabizz: 'Consulting',
  momrise: 'Our own products',
  tinyhumans: 'Our own products',
};
const FILTERS = ['All', 'CA firms', 'Consulting', 'Our own products'];

/** A screenshot inside a slim browser frame. */
function BrowserFrame({ project, eager }: { project: CaseStudy; eager?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f4f4f2] px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="ml-2.5 truncate font-mono text-[10px] text-neutral-500">{project.domain}</span>
      </div>
      <img
        src={project.screenshotUrl}
        srcSet={project.screenshotUrl && screenshotSrcSet(project.screenshotUrl)}
        sizes="(max-width: 640px) 100vw, 450px"
        alt={`${project.clientName} website`}
        width={900}
        height={430}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block aspect-[900/430] w-full object-cover object-top"
      />
    </div>
  );
}

/**
 * The Work page's portfolio: five featured stories that stack like a deck as you
 * scroll, then every other project in a grid you can filter.
 */
export default function WorkShowcase({ onOpenCaseStudy }: WorkShowcaseProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  useScrollStack(stackRef, '.work-stack-card', { stackDistance: 22, scale: 0.04, blur: 1.2 });

  const [filter, setFilter] = useState('All');

  const featured = FEATURED_CASE_STUDY_IDS
    .map((id) => CASE_STUDIES.find((p) => p.id === id))
    .filter((p): p is CaseStudy => Boolean(p));
  const rest = CASE_STUDIES.filter((p) => !FEATURED_CASE_STUDY_IDS.includes(p.id));
  const shown = filter === 'All' ? rest : rest.filter((p) => CATEGORY[p.id] === filter);

  return (
    <>
      {/* Featured: big story cards that pin and stack on wide screens */}
      <section id="work-featured" className="py-20 sm:py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="eyebrow">Featured</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Five stories worth reading.
            </h2>
          </div>

          <div ref={stackRef} className="work-stack">
            {featured.map((project, idx) => (
              <article key={project.id} className="work-stack-card grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
                <div
                  className="lg:col-span-7 flex items-center p-6 sm:p-10"
                  style={{ background: `linear-gradient(135deg, ${project.accent}26 0%, ${project.accent}0d 55%, transparent 100%)` }}
                >
                  <PageLink
                    href={getWorkDetailPath(project.id)}
                    onNavigate={() => onOpenCaseStudy(project.id)}
                    aria-label={`Read the ${project.clientName} case study`}
                    className="block w-full transition-transform duration-500 hover:scale-[1.015] cursor-pointer"
                  >
                    <BrowserFrame project={project} eager={idx === 0} />
                  </PageLink>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-5 p-6 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]" style={{ color: project.accent }}>
                      {project.industry}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      0{idx + 1} / 0{featured.length}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">{project.clientName}</h3>

                  {project.results ? (
                    <dl className="flex flex-wrap gap-2.5">
                      {project.results.slice(0, 2).map((r) => (
                        <div key={r.label} className="rounded-xl bg-neutral-950 px-4 py-3">
                          <dd className="text-2xl font-bold leading-none text-brand">{r.value}</dd>
                          <dt className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-neutral-300">{r.label}</dt>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <ul className="flex flex-wrap gap-2">
                      {project.scope.map((s) => (
                        <li key={s} className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">{s}</li>
                      ))}
                    </ul>
                  )}

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">{project.outcome}</p>

                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                    <PageLink
                      href={getWorkDetailPath(project.id)}
                      onNavigate={() => onOpenCaseStudy(project.id)}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-ink hover:bg-brand-deep transition-colors cursor-pointer"
                    >
                      Read the case study <ArrowRight className="h-4 w-4" />
                    </PageLink>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      Visit the live site <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Everything else, with a filter */}
      <section id="work-more" className="py-20 sm:py-24 bg-neutral-50 font-sans border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-4">
              <span className="eyebrow">More work</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">Different industries. Same goal.</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {FILTERS.map((name) => {
                const isActive = filter === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setFilter(name)}
                    aria-pressed={isActive}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                      isActive ? 'text-ink' : 'work-filter-idle text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="work-filter-pill"
                        className="absolute inset-0 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (idx % 3) * 0.07, layout: { type: 'spring', stiffness: 300, damping: 32 } }}
                  className="h-full"
                >
                  <article className="work-card group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white" {...tiltHandlers()}>
                    <PageLink
                      href={getWorkDetailPath(project.id)}
                      onNavigate={() => onOpenCaseStudy(project.id)}
                      aria-label={`Read the ${project.clientName} case study`}
                      className="relative block overflow-hidden cursor-pointer"
                    >
                      <img
                        src={project.screenshotUrl}
                        srcSet={project.screenshotUrl && screenshotSrcSet(project.screenshotUrl)}
                        sizes="(max-width: 640px) 100vw, 450px"
                        alt={`${project.clientName} website`}
                        width={900}
                        height={430}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[900/430] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="absolute bottom-3 left-3 inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        Read the case study <ArrowRight className="h-3 w-3" />
                      </span>
                    </PageLink>

                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: project.accent }}>
                        {project.industry}
                      </span>
                      <h3 className="text-lg font-bold tracking-tight text-neutral-900">{project.clientName}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">{project.outcome}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                        {project.scope.map((s) => (
                          <li key={s} className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600">{s}</li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                        <PageLink
                          href={getWorkDetailPath(project.id)}
                          onNavigate={() => onOpenCaseStudy(project.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 cursor-pointer"
                        >
                          Case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </PageLink>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          Live site <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
