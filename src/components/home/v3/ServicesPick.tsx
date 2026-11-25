import { useState } from 'react';
import { ArrowUpRight, MapPin, Search, Star } from 'lucide-react';
import PageLink from '../../PageLink';
import type { PageId } from '../../../types';

/* Each service owns a shape and a colour, used everywhere it appears. */
const SERVICES: {
  id: PageId;
  name: string;
  line: string;
  points: string[];
  tint: string;
  ink: string;
  shape: 'square' | 'diamond' | 'circle' | 'star';
}[] = [
  {
    id: 'service-web-design',
    name: 'Custom websites',
    line: 'Designed from a blank page around your business, built to load fast and turn visitors into calls.',
    points: ['Your own design, never a template', 'Fast on any phone', 'You own the domain and code'],
    tint: '#FFD95C',
    ink: '#3D2A00',
    shape: 'square',
  },
  {
    id: 'service-seo',
    name: 'SEO',
    line: 'So the people already searching for what you do find you first, not the business next door.',
    points: ['Local search and Google Maps', 'Pages written for real searches', 'Clean, fast, structured code'],
    tint: '#BFE6C9',
    ink: '#14482A',
    shape: 'diamond',
  },
  {
    id: 'service-gbp',
    name: 'Google Business Profile',
    line: 'Your listing on Google Maps set up properly, so calls and directions start before anyone sees your site.',
    points: ['Complete, verified profile', 'Photos, services and posts', 'A simple way to get more reviews'],
    tint: '#F9C6DB',
    ink: '#5E1736',
    shape: 'circle',
  },
  {
    id: 'service-copywriting',
    name: 'Conversion copywriting',
    line: 'Words that explain what you do in plain language and give people a reason to pick you today.',
    points: ['Headlines that say what you do', 'Pages written for your buyers', 'One clear next step on every page'],
    tint: '#FFCBA6',
    ink: '#5A2709',
    shape: 'star',
  },
];

function Shape({ kind, color, className = '' }: { kind: string; color: string; className?: string }) {
  if (kind === 'diamond') return <span className={`inline-block rotate-45 rounded-[4px] ${className}`} style={{ background: color }} />;
  if (kind === 'circle') return <span className={`inline-block rounded-full ${className}`} style={{ background: color }} />;
  if (kind === 'star')
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M12 1.5l2.6 7.9H23l-6.7 4.9 2.6 7.9L12 17.3 5.1 22.2l2.6-7.9L1 9.4h8.4z" fill={color} />
      </svg>
    );
  return <span className={`inline-block rounded-[6px] ${className}`} style={{ background: color }} />;
}

/* A small, honest picture of what each service changes. No made-up numbers. */
function Preview({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(10,23,51,0.45)] ring-1 ring-black/5">
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#F6F5F1] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#DCD9D1]" />
          <span className="h-2 w-2 rounded-full bg-[#DCD9D1]" />
          <span className="h-2 w-2 rounded-full bg-[#DCD9D1]" />
        </div>
        <img src="/screenshots/ladsonconcrete.webp" srcSet="/screenshots/ladsonconcrete.webp 900w, /screenshots/ladsonconcrete-1920.webp 1920w" sizes="(min-width:1024px) 520px, 90vw" alt="Ladson Concrete website designed by Mago Labs" width={900} height={422} loading="lazy" className="block aspect-[1920/900] w-full object-cover object-top" />
      </div>
    );
  if (index === 1)
    return (
      <div className="rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(10,23,51,0.45)] ring-1 ring-black/5 md:p-6">
        <div className="flex items-center gap-3 rounded-full border border-black/10 px-4 py-2.5 text-[15px] text-ink/70">
          <Search className="h-4 w-4" /> dentist near me
        </div>
        <div className="mt-5 space-y-4">
          <div className="rounded-xl bg-[#EEF8F1] p-4 ring-2 ring-[#3FAE68]">
            <p className="text-[12px] text-[#14482A]/70">drmihirshahsmilecareclinic.com</p>
            <p className="mt-0.5 text-[17px] font-semibold text-[#1A3FB8]">Dr. Mihir Shah Smile Care Clinic</p>
            <p className="mt-1 text-[13px] text-ink/60">Book your visit online. Gentle care, 25 years of experience.</p>
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="space-y-2 px-1 opacity-50">
              <div className="h-2.5 w-40 rounded bg-ink/15" />
              <div className="h-3.5 w-64 rounded bg-[#1A3FB8]/25" />
              <div className="h-2.5 w-56 rounded bg-ink/10" />
            </div>
          ))}
        </div>
      </div>
    );
  if (index === 2)
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(10,23,51,0.45)] ring-1 ring-black/5">
        <div className="relative h-36 bg-[repeating-linear-gradient(45deg,#E8EEF6_0_14px,#F1F5FA_14px_28px)]">
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-[#E5484D] text-white shadow-lg">
            <MapPin className="h-5 w-5" />
          </span>
        </div>
        <div className="p-5">
          <p className="text-[17px] font-semibold text-ink">Your business name</p>
          <div className="mt-1 flex items-center gap-1 text-[#F4A90B]">
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            <span className="ml-1 text-[13px] text-ink/55">Reviews from real customers</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[13px] font-medium text-[#1A3FB8]">
            {['Call', 'Directions', 'Website'].map((b) => <span key={b} className="rounded-full border border-[#1A3FB8]/25 py-2">{b}</span>)}
          </div>
        </div>
      </div>
    );
  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(10,23,51,0.45)] ring-1 ring-black/5 md:p-7">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink/40">Before</p>
      <p className="mt-1 text-[19px] text-ink/45 line-through decoration-[#E5484D]/60">Welcome to our website. We are a leading provider of quality solutions.</p>
      <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5A2709]">After</p>
      <p className="mt-1 text-[24px] font-bold leading-tight tracking-[-0.02em] text-ink">Concrete driveways in Jacksonville, poured right the first time.</p>
      <span className="mt-5 inline-flex rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-white">Get a free estimate</span>
    </div>
  );
}

export default function ServicesPick({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="v3-label">What we do</p>
        <h2 id="services-title" className="v3-h2 mt-4 max-w-[16ch]">Four ways we get you <span className="v3-mark">chosen.</span></h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ul className="border-t border-ink/10">
            {SERVICES.map((svc, i) => {
              const on = i === active;
              return (
                <li key={svc.id} className="border-b border-ink/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
                  >
                    <Shape kind={svc.shape} color={svc.tint} className={`h-6 w-6 shrink-0 transition-transform duration-500 md:h-7 md:w-7 ${on ? 'scale-110' : 'scale-90 opacity-70'}`} />
                    <span className={`v3-row-title flex-1 transition-colors duration-300 ${on ? 'text-ink' : 'text-ink/35 group-hover:text-ink/70'}`}>{svc.name}</span>
                    <span className="text-[13px] font-semibold text-ink/35">0{i + 1}</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-11 md:pl-12">
                        <p className="max-w-[46ch] text-[17px] leading-relaxed text-ink/70">{svc.line}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {svc.points.map((p) => (
                            <li key={p} className="rounded-full px-3 py-1.5 text-[13px] font-medium" style={{ background: svc.tint, color: svc.ink }}>{p}</li>
                          ))}
                        </ul>
                        <PageLink page={svc.id} onNavigate={() => onNavigate(svc.id)} className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink">
                          More on {svc.name.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
                        </PageLink>
                        <div className="mt-8 lg:hidden"><Preview index={i} /></div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative rounded-[28px] p-8 transition-colors duration-500 xl:p-10" style={{ background: s.tint }}>
                <Shape kind={s.shape} color="rgba(255,255,255,0.55)" className="absolute right-7 top-7 h-10 w-10" />
                <div key={active} className="v3-swap">
                  <Preview index={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
