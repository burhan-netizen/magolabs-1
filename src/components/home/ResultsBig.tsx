import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import PageLink from '../PageLink';
import CountUp from '../CountUp';
import { getWorkDetailPath } from '../../utils/pageRoutes';

const RESULTS = [
  { prefix: '25 to ', from: 25, to: 58, suffix: '', label: 'patients a day', detail: 'A new dental clinic, within two months of launch. They had to hire more staff to keep up.', client: 'Dr. Mihir Shah Smile Care Clinic', id: 'drmihirshah' },
  { prefix: '', from: 0, to: 63, suffix: '%', label: 'more appointment calls', detail: 'The same clinic, over the same two months, as it started showing up in Google searches.', client: 'Dr. Mihir Shah Smile Care Clinic', id: 'drmihirshah' },
  { prefix: '', from: 0, to: 34, suffix: '', label: 'new clients in three months', detail: 'A chartered accountancy firm that had never had an enquiry through Google before.', client: 'Darshan Galani & Co.', id: 'darshangalani' },
];

export default function ResultsBig({ onOpenCaseStudy }: { onOpenCaseStudy: (id: string) => void }) {
  return (
    <section id="results" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <span className="label-v2">The results</span>
        <h2 className="display-lg mt-5 max-w-[16ch] text-[clamp(2.5rem,5.6vw,5rem)] text-ink">
          Real numbers from <span className="font-serif-accent">real</span> clients.
        </h2>

        <div className="mt-16 divide-y divide-ink/12 border-y border-ink/12">
          {RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.06}>
              <PageLink
                href={getWorkDetailPath(r.id)}
                onNavigate={() => onOpenCaseStudy(r.id)}
                className="group grid items-end gap-4 py-10 md:grid-cols-[1.25fr_1fr] md:gap-10 md:py-12"
              >
                <p className="display-xl text-[clamp(4.2rem,12vw,10.5rem)] leading-[0.85] text-ink transition-colors duration-300">
                  {r.prefix}
                  <CountUp from={r.from} to={r.to} />
                  {r.suffix}
                </p>
                <div className="pb-2">
                  <p className="text-2xl font-semibold text-ink md:text-3xl">{r.label}</p>
                  <p className="mt-3 leading-relaxed text-ink/65">{r.detail}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    {r.client}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                </div>
              </PageLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
