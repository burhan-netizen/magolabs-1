import { PageId } from '../types';
import PageLink from '../components/PageLink';
import { INDUSTRIES } from '../data/industries';
import SEO from '../components/SEO';
import WorkShowcase from '../components/WorkShowcase';
import CountUp from '../components/CountUp';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../data/caseStudies';
import TestimonialWall from '../components/TestimonialWall';

interface WorkProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

// The two rows of websites that drift behind the hero headline.
const WALL_ROW_A = CASE_STUDIES.filter((_, i) => i % 2 === 0);
const WALL_ROW_B = CASE_STUDIES.filter((_, i) => i % 2 === 1);

const HERO_STATS = [
  { value: CASE_STUDIES.length, label: 'Websites in this portfolio' },
  { value: 58, label: 'Patients a day at one clinic, up from 25' },
  { value: 34, label: 'New clients for one CA firm in 3 months' },
];

export default function Work({ onPageChange, onOpenCaseStudy }: WorkProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const workSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://www.magolabs.in/work/#webpage',
      'url': 'https://www.magolabs.in/work',
      'name': 'Mago Labs Client Work & Case Studies',
      'description': 'Real websites Mago Labs has designed and built for clients across timber trading, dental care, consulting, energy, and chartered accountancy.',
    },
  ];

  return (
    <>
      <SEO path="/work" schemas={workSchemas} />

      {/* Hero: the headline over a slow-moving wall of the websites themselves */}
      <section id="work-hero" className="glow-follow relative pt-36 pb-20 md:pt-44 md:pb-24 bg-neutral-950 text-[#ffffff] font-sans overflow-hidden">
        <div className="work-wall" aria-hidden="true">
          {[WALL_ROW_A, WALL_ROW_B].map((row, rowIdx) => (
            <div key={rowIdx} className={`work-wall-row ${rowIdx === 1 ? 'is-reverse' : ''}`}>
              {[...row, ...row].map((cs, i) => (
                <img key={`${cs.id}-${i}`} src={cs.screenshotUrl} alt="" width={380} height={182} loading="eager" decoding="async" />
              ))}
            </div>
          ))}
        </div>
        {/* Darkens the wall behind the text so the headline stays easy to read */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(13,13,13,0.94)_0%,rgba(13,13,13,0.78)_55%,rgba(13,13,13,0.45)_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-3xl space-y-5">
            <span className="eyebrow eyebrow-on-dark">Client work</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
              Real businesses. <span className="marker whitespace-nowrap">Real results.</span>
            </h1>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
              Some had no website. Some had one that was quietly costing them clients. Here is what we built, and what changed.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-neutral-400">By industry:</span>
              {INDUSTRIES.map((industry) => (
                <PageLink
                  key={industry.id}
                  page={industry.id}
                  onNavigate={() => navigateTo(industry.id)}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-medium text-neutral-200 backdrop-blur-md hover:border-brand hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  {industry.label}
                </PageLink>
              ))}
            </div>
          </div>

          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4">
            {HERO_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-xl"
              >
                <dd className="text-4xl font-bold tracking-tight text-brand">
                  <CountUp to={stat.value} duration={1.4} />
                </dd>
                <dt className="mt-2 text-sm text-neutral-300">{stat.label}</dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <WorkShowcase onOpenCaseStudy={onOpenCaseStudy} />

      {/* Testimonials, folded in here so proof sits next to the work it's proving */}
      <section id="work-testimonials" className="py-24 bg-neutral-50 font-sans border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow">In their own words</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">What clients say.</h2>
          </div>
          <TestimonialWall />
        </div>
      </section>
    </>
  );
}
