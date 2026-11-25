import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  Quote,
  AlertCircle,
} from 'lucide-react';
import { PageId } from '../types';
import { getCaseStudyById, getCaseStudySEO, CASE_STUDIES } from '../data/caseStudies';
import { TESTIMONIALS } from '../data/testimonials';
import { screenshotSrcSet } from '../utils/images';
import { updateDocumentSEO } from '../utils/seo';
import { getWorkDetailPath } from '../utils/pageRoutes';
import Breadcrumbs from '../components/Breadcrumbs';
import PageLink from '../components/PageLink';

interface WorkDetailProps {
  id: string | null;
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

export default function WorkDetail({ id, onPageChange, onOpenCaseStudy }: WorkDetailProps) {
  const project = id ? getCaseStudyById(id) : undefined;

  useEffect(() => {
    if (!project) return;
    const config = getCaseStudySEO(project);
    updateDocumentSEO('work-detail', config.title, config.description, config.ogImage, getWorkDetailPath(project.id));
  }, [project]);

  const backToWork = () => {
    onPageChange('work');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!project) {
    return (
      <section className="pt-32 pb-24 font-sans">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center flex flex-col items-center gap-4">
          <AlertCircle className="h-8 w-8 text-neutral-400" />
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Case study not found</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            This project may have been renamed or the link is incorrect.
          </p>
          <button
            onClick={backToWork}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-6 py-3 text-sm font-bold text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Work
          </button>
        </div>
      </section>
    );
  }

  const testimonial = TESTIMONIALS.find((t) => t.company === project.clientName);
  // Other projects, the ones with measured results first.
  const related = [...CASE_STUDIES.filter((cs) => cs.id !== project.id)]
    .sort((x, y) => Number(Boolean(y.results)) - Number(Boolean(x.results)))
    .slice(0, 2);

  const storyRows = [
    { label: 'The business', text: project.business },
    { label: 'The challenge', text: project.challenge },
    { label: 'Our approach', text: project.approach },
    { label: 'The build', text: project.build },
    { label: 'The outcome', text: project.outcome },
  ].filter((row): row is { label: string; text: string } => Boolean(row.text));

  const shot = project.screenshotUrl ?? `/screenshots/${project.id}.webp`;

  return (
    <article className="font-sans">
      {/* Opening: who it was for, big, on dark */}
      <section className="relative bg-neutral-950 text-white pt-32 md:pt-40 pb-[18vw] lg:pb-72 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(180deg,#000_0%,#000_55%,transparent_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="case-crumbs">
            <Breadcrumbs
              onPageChange={onPageChange}
              items={[
                { label: 'Home', page: 'home' },
                { label: 'Work', page: 'work' },
                { label: project.clientName, path: getWorkDetailPath(project.id) },
              ]}
            />
          </div>

          <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-400">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 bg-brand" aria-hidden="true" />{project.industry}</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-400"><Check className="h-3.5 w-3.5" /> Live</span>
          </p>

          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.6rem,6.5vw,6rem)] font-bold leading-[0.96] tracking-[-0.045em] text-white">
            {project.clientName}
            <span className="mt-4 block text-[clamp(1rem,1.6vw,1.35rem)] font-medium leading-snug tracking-normal text-neutral-400">
              Website design and development case study
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {project.challenge && (
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">{project.challenge}</p>
            )}
            <div className="flex flex-wrap items-center gap-5">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand hover:bg-brand-deep px-6 py-3.5 text-sm font-bold text-ink transition-colors"
                >
                  Visit the live site <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <button
                onClick={backToWork}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-brand decoration-2 underline-offset-4 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> All work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The website, big, rising out of the dark opening */}
      <section className="relative bg-neutral-50 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="-mt-[15vw] lg:-mt-60 overflow-hidden rounded-[20px] sm:rounded-[28px] bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] ring-1 ring-black/10"
          >
            <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="ml-3 truncate font-mono text-xs text-neutral-500">{project.domain.replace(/^www\./, '')}</span>
            </div>
            <img
              src={shot}
              srcSet={screenshotSrcSet(shot)}
              sizes="(max-width: 1280px) 100vw, 1216px"
              alt={`${project.clientName} website homepage, designed by Mago Labs`}
              width={1920}
              height={900}
              className="block aspect-[1920/900] w-full object-cover object-top"
            />
          </motion.figure>

          {/* Measured results: the numbers before the story */}
          {project.results && project.results.length > 0 && (
            <div className="mt-20">
              <span className="eyebrow">What happened after launch</span>
              <dl className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
                {project.results.map((r) => (
                  <div key={r.label} className="border-t border-neutral-300 pt-6">
                    <dd className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-neutral-950">{r.value}</dd>
                    <dt className="mt-3 text-base text-neutral-600">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {/* The story: label on the left, the words given room on the right */}
      <section className="bg-neutral-50 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">The story</span>
          <div className="mt-8">
            {storyRows.map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 gap-3 border-t border-neutral-300 py-8 md:grid-cols-12 md:gap-8"
              >
                <h2 className="md:col-span-4 flex items-baseline gap-4 font-display text-xl font-semibold tracking-tight text-neutral-950">
                  <span className="font-mono text-sm font-medium text-neutral-500">0{i + 1}</span>
                  {row.label}
                </h2>
                <p className="md:col-span-8 text-lg leading-relaxed text-neutral-700">{row.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-neutral-300 pt-8">
            {project.scope.map((s) => (
              <span key={s} className="rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-medium text-neutral-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The client, in their own words */}
      {testimonial && (
        <section className="bg-neutral-950 py-24 text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Quote className="h-10 w-10 text-brand" aria-hidden="true" />
            <blockquote className="mt-8 font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.02em]">
              {testimonial.quote}
            </blockquote>
            <p className="mt-10 text-base font-semibold">{testimonial.name}</p>
            <p className="text-sm text-neutral-400">{testimonial.role}, {testimonial.company}</p>
          </div>
        </section>
      )}

      {/* More work */}
      {related.length > 0 && (
        <section className="bg-neutral-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">More work</h2>
              <button onClick={backToWork} className="group inline-flex items-center gap-2 font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4 cursor-pointer">
                All work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {related.map((cs) => (
                <PageLink
                  href={getWorkDetailPath(cs.id)}
                  key={cs.id}
                  onNavigate={() => onOpenCaseStudy(cs.id)}
                  className="group block text-left cursor-pointer"
                >
                  <span className="block overflow-hidden rounded-[22px] ring-1 ring-black/10">
                    <img
                      src={cs.screenshotUrl ?? `/screenshots/${cs.id}.webp`}
                      alt={`${cs.clientName} website`}
                      width={900}
                      height={422}
                      loading="lazy"
                      className="block aspect-[1920/900] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-5 flex items-start justify-between gap-6">
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">{cs.industry}</span>
                      <span className="mt-1 block font-display text-2xl font-semibold tracking-tight text-neutral-950">{cs.clientName}</span>
                    </span>
                    {cs.results?.[0] && (
                      <span className="shrink-0 text-right">
                        <span className="block font-display text-2xl font-bold text-neutral-950">{cs.results[0].value}</span>
                        <span className="block text-xs text-neutral-500">{cs.results[0].label}</span>
                      </span>
                    )}
                  </span>
                </PageLink>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
