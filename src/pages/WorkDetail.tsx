import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Target,
  Lightbulb,
  Wrench,
  TrendingUp,
  ExternalLink,
  Check,
  Quote,
  AlertCircle,
} from 'lucide-react';
import { PageId } from '../types';
import { getCaseStudyById, getCaseStudySEO, CASE_STUDIES } from '../data/caseStudies';
import { TESTIMONIALS } from '../components/TestimonialWall';
import { updateDocumentSEO } from '../utils/seo';
import { getWorkDetailPath } from '../utils/pageRoutes';
import { WhatsAppLogo } from '../components/BrandIcons';
import Breadcrumbs from '../components/Breadcrumbs';

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
  const related = CASE_STUDIES.filter((cs) => cs.id !== project.id).slice(0, 2);

  const storyRows = [
    { label: 'The Business', icon: Building2, text: project.business },
    { label: 'The Challenge', icon: Target, text: project.challenge },
    { label: 'The Mago Approach', icon: Lightbulb, text: project.approach },
    { label: 'The Build', icon: Wrench, text: project.build },
    { label: 'The Outcome', icon: TrendingUp, text: project.outcome },
  ].filter((row): row is { label: string; icon: typeof Building2; text: string } => Boolean(row.text));

  return (
    <article className="font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs
            onPageChange={onPageChange}
            items={[
              { label: 'Home', page: 'home' },
              { label: 'Work', page: 'work' },
              { label: project.clientName, path: getWorkDetailPath(project.id) },
            ]}
          />

          <div className="flex items-center gap-3">
            {project.logoUrl && (
              <img src={project.logoUrl} alt={`${project.clientName} logo`} className="h-8 w-auto max-w-[120px] object-contain" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: project.accent }}>
              {project.industry}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">
              <Check className="h-2.5 w-2.5" /> Live
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
            {project.clientName} — Website Design &amp; Development Case Study
          </h1>

          {project.business && (
            <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl">{project.business}</p>
          )}

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 px-6 py-3 text-sm font-bold text-white transition-all"
            >
              Visit Live Site <ExternalLink className="h-4 w-4" />
            </a>
            <button
              onClick={backToWork}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 hover:bg-neutral-50 px-6 py-3 text-sm font-bold text-neutral-800 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to All Work
            </button>
          </div>
        </div>
      </section>

      {project.screenshotUrl && (
        <section className="py-12 bg-neutral-50 border-b border-neutral-200/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <img
              src={project.screenshotUrl}
              alt={`${project.clientName} website homepage`}
              loading="lazy"
              className="w-full rounded-2xl border border-neutral-200 shadow-sm object-cover"
            />
          </div>
        </section>
      )}

      {/* The story */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          {storyRows.map((row) => {
            const Icon = row.icon;
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4 }}
                className="flex gap-4"
              >
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${project.accent}14`, color: project.accent }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-1.5">{row.label}</h2>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{row.text}</p>
                </div>
              </motion.div>
            );
          })}

          <div className="flex flex-wrap gap-2 pt-4">
            {project.scope.map((s) => (
              <span
                key={s}
                className="text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1 text-neutral-600"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Real client testimonial, matched from the site's own verified reviews */}
      {testimonial && (
        <section className="py-20 bg-neutral-50 border-y border-neutral-200/50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <Quote className="h-7 w-7 mx-auto opacity-20" style={{ color: project.accent }} />
            <p className="text-lg sm:text-xl font-medium text-neutral-800 leading-relaxed">"{testimonial.quote}"</p>
            <div>
              <p className="text-sm font-bold text-neutral-900">{testimonial.name}</p>
              <p className="text-xs text-neutral-500">{testimonial.role}, {testimonial.company}</p>
            </div>
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((cs) => (
                <button
                  key={cs.id}
                  onClick={() => onOpenCaseStudy(cs.id)}
                  className="text-left p-6 rounded-2xl border border-neutral-200/80 bg-white hover:shadow-lg transition-all cursor-pointer space-y-2"
                >
                  {cs.logoUrl && <img src={cs.logoUrl} alt={`${cs.clientName} logo`} className="h-6 w-auto max-w-[100px] object-contain" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: cs.accent }}>
                    {cs.industry}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900">{cs.clientName}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                    Read Case Study <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-neutral-950 text-white text-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Want a project like this for your business?</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onPageChange('contact')}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white transition-all cursor-pointer"
            >
              Discuss Your Project
            </button>
            <a
              href="https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20would%20like%20to%20discuss%20my%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 hover:bg-neutral-900 px-6 py-3.5 text-sm font-bold text-neutral-200 transition-all"
            >
              <WhatsAppLogo className="h-4 w-4 text-emerald-500" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
