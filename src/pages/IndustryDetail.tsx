import { useState } from 'react';
import { ArrowRight, Check, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import { getIndustry } from '../data/industries';
import { getCaseStudyById } from '../data/caseStudies';
import { getWorkDetailPath } from '../utils/pageRoutes';

interface IndustryDetailProps {
  industryId: PageId;
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

export default function IndustryDetail({ industryId, onPageChange, onOpenCaseStudy }: IndustryDetailProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const industry = getIndustry(industryId);
  if (!industry) return null;

  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cases = industry.caseIds.map((id) => getCaseStudyById(id)).filter((cs) => cs !== undefined);
  const lead = cases[0];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': industry.eyebrow,
      'serviceType': 'Website design and development',
      'provider': { '@type': 'Organization', 'name': 'Mago Labs', 'url': 'https://www.magolabs.in' },
      'description': industry.intro,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': industry.faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer },
      })),
    },
  ];

  return (
    <>
      <SEO path={industry.id} schemas={schemas} />

      {/* Hero */}
      <section id="industry-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="eyebrow">{industry.eyebrow}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]">
              {industry.headline} <span className="marker">{industry.headlineMark}</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">{industry.intro}</p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <PageLink
                page="contact"
                onNavigate={() => navigateTo('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-ink hover:bg-brand-deep transition-colors cursor-pointer"
              >
                Get a free website audit
                <ArrowRight className="h-4 w-4" />
              </PageLink>
              <PageLink
                page="pricing"
                onNavigate={() => navigateTo('pricing')}
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-7 py-4 text-base font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                See packages and pricing
              </PageLink>
            </div>
          </div>
        </div>
      </section>

      {/* Measured result from the lead case study */}
      {lead?.results && (
        <section id="industry-result" className="py-16 bg-neutral-950 text-white font-sans">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-4 space-y-3">
                <span className="eyebrow eyebrow-on-dark">What changed</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">{lead.clientName}</h2>
                <PageLink
                  href={getWorkDetailPath(lead.id)}
                  onNavigate={() => onOpenCaseStudy(lead.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-white transition-colors cursor-pointer"
                >
                  Read the case study <ArrowRight className="h-3.5 w-3.5" />
                </PageLink>
              </div>
              <dl className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {lead.results.map((result) => (
                  <div key={result.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <dd className="text-3xl sm:text-4xl font-bold tracking-tight text-brand">{result.value}</dd>
                    <dt className="mt-2 text-sm text-neutral-300">{result.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* The problem */}
      <section id="industry-problems" className="py-20 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="eyebrow">The problem</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">Sound familiar?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {industry.problems.map((problem, idx) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="pricing-surface rounded-2xl border border-neutral-200 bg-[#FAFAF8] p-7 space-y-2"
              >
                <span className="font-mono text-sm font-bold text-neutral-400">0{idx + 1}</span>
                <h3 className="text-lg font-semibold text-neutral-900 leading-snug">{problem.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{problem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section id="industry-builds" className="py-20 bg-neutral-50 font-sans border-y border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="eyebrow">What we build</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                A website built around how your customers decide.
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                Designed from a blank canvas, never from a template, and yours to own at the end.
              </p>
            </div>
            <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industry.builds.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-sm font-medium text-neutral-800 leading-snug">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Work in this industry */}
      <section id="industry-work" className="py-20 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-4">
            <span className="eyebrow">Our work</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
              {cases.length === 1 ? 'A business like yours.' : 'Businesses like yours.'}
            </h2>
          </div>
          <div className={`grid grid-cols-1 gap-6 ${cases.length === 1 ? 'max-w-3xl' : 'md:grid-cols-2'}`}>
            {cases.map((cs) => (
              <PageLink
                key={cs.id}
                href={getWorkDetailPath(cs.id)}
                onNavigate={() => onOpenCaseStudy(cs.id)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 hover:border-neutral-900 transition-colors cursor-pointer"
              >
                {cs.screenshotUrl && (
                  <img
                    src={cs.screenshotUrl}
                    alt={`${cs.clientName} website`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover object-top border-b border-neutral-200"
                  />
                )}
                <span className="flex flex-col gap-2 p-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">{cs.industry}</span>
                  <span className="text-xl font-bold text-neutral-900">{cs.clientName}</span>
                  <span className="text-sm text-neutral-600 leading-relaxed">{cs.outcome}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                    Read the case study <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </PageLink>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ. Answers stay in the markup (collapsed with CSS) so search engines can read them. */}
      <section id="industry-faq" className="py-20 bg-neutral-50 font-sans border-t border-neutral-200/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-10">
            <span className="eyebrow">Questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">Straight answers.</h2>
          </div>
          <div className="border-t border-neutral-200">
            {industry.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="border-b border-neutral-200">
                  <h3>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`industry-faq-panel-${idx}`}
                      className="w-full flex items-center justify-between gap-4 py-6 text-left cursor-pointer"
                    >
                      <span className="font-semibold text-neutral-900 text-base sm:text-lg">{faq.question}</span>
                      <span className={`flex-shrink-0 rounded-full p-1.5 transition-colors ${isOpen ? 'bg-brand text-ink' : 'bg-neutral-200 text-neutral-800'}`}>
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`industry-faq-panel-${idx}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-sm sm:text-base text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
