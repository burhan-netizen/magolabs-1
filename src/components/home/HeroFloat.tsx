import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import PageLink from '../PageLink';
import { getWorkDetailPath } from '../../utils/pageRoutes';

/* Real wins only. The Google rating line is added once Burhan sends the numbers. */
const TICKER = [
  "Dr. Mihir Shah's clinic: 25 to 58 patients a day after launch",
  'Darshan Galani CA: 34 new clients in 3 months',
  'Ladson Concrete, Jacksonville FL: new website live',
  'Jaymo Civil, Sydney: new website live',
  'Centurion Strategic Ventures: new website live',
  'Prabhakar Processors, Surat: new website live',
  'Websites for clients in India, Australia, USA, UK, Canada and UAE',
];

/* The client sites that float around the headline. depth: how strongly a card
   reacts to the mouse and to scroll (bigger = closer to the viewer). */
const FLOATERS = [
  { id: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care', tag: 'Dental clinic, Surat', pos: 'left-[1%] top-[25%]', w: 'w-[clamp(190px,17vw,270px)]', rot: -6, depth: 1.2, delay: 0.25 },
  { id: 'ladsonconcrete', name: 'Ladson Concrete', tag: 'Concrete, Florida', pos: 'right-[3%] top-[16%]', w: 'w-[clamp(200px,18vw,285px)]', rot: 5, depth: 1, delay: 0.35 },
  { id: 'jaymocivil', name: 'Jaymo Civil', tag: 'Civil contractor, Sydney', pos: 'left-[6%] bottom-[9%]', w: 'w-[clamp(180px,15.5vw,245px)]', rot: 4, depth: 0.7, delay: 0.45 },
  { id: 'centurion', name: 'Centurion Strategic Ventures', tag: 'Loan advisory, India', pos: 'right-[7%] bottom-[8%]', w: 'w-[clamp(185px,16vw,255px)]', rot: -4, depth: 0.85, delay: 0.55 },
  { id: 'prabhakarprocessors', name: 'Prabhakar Processors', tag: 'Textile mill, Surat', pos: 'left-[17%] top-[3%] hidden xl:block', w: 'w-[clamp(130px,10vw,165px)]', rot: -9, depth: 0.45, delay: 0.65 },
];

function Floater({
  f,
  mx,
  my,
  scrollY,
  onOpenCaseStudy,
}: {
  f: (typeof FLOATERS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
  scrollY: MotionValue<number>;
  onOpenCaseStudy: (id: string) => void;
  key?: string;
}) {
  const x = useTransform(mx, (v) => v * 26 * f.depth);
  const yMouse = useTransform(my, (v) => v * 18 * f.depth);
  const yScroll = useTransform(scrollY, (v) => v * -0.18 * f.depth);
  const y = useTransform([yMouse, yScroll], ([a, b]: number[]) => a + b);

  return (
    <div className={`hf-float absolute z-0 ${f.pos}`} style={{ animationDelay: `${f.delay}s` }}>
      <motion.div style={{ x, y }}>
        <div className="hf-tilt" style={{ ['--r' as string]: `${f.rot}deg` }}>
          <PageLink
            href={getWorkDetailPath(f.id)}
            onNavigate={() => onOpenCaseStudy(f.id)}
            aria-label={`${f.name}, ${f.tag}. Open case study`}
            className={`group block ${f.w}`}
          >
            <span className="block overflow-hidden rounded-[14px] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
              <span className="flex items-center gap-1 border-b border-black/5 bg-[#F7F6F2] px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#DCD9D1]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#DCD9D1]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#DCD9D1]" />
              </span>
              <img
                src={`/screenshots/${f.id}-480.webp`}
                alt={`${f.name} website by Mago Labs`}
                width={480}
                height={300}
                loading="eager"
                decoding="async"
                className="block aspect-[16/10] w-full object-cover object-top"
              />
            </span>
            <span className="hf-chip mt-2.5 inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1.5 text-[12px] font-semibold text-ink">
              {f.name}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </PageLink>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroFloat({ onAudit, onOpenCaseStudy, onSeeWork }: { onAudit: () => void; onOpenCaseStudy: (id: string) => void; onSeeWork: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const { scrollY } = useScroll();
  const still = useMotionValue(0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      rawX.set((e.clientX - r.left) / r.width - 0.5);
      rawY.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, [reduce, rawX, rawY]);

  return (
    <section ref={ref} id="hero" className="hf-hero relative flex min-h-[100svh] flex-col overflow-hidden bg-navy pt-[72px] text-white md:pt-[84px]">
      {/* Ticker of real wins */}
      <div className="hf-ticker relative z-20 overflow-hidden bg-brand py-2.5 text-ink" aria-label="Recent results">
        <div className="hf-ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 ? true : undefined}>
              {TICKER.map((t) => (
                <li key={t} className="flex items-center whitespace-nowrap text-[13px] font-semibold tracking-[-0.005em] text-ink">
                  <span className="mx-5 h-1.5 w-1.5 rotate-45 bg-ink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        {/* Floating client sites (desktop) */}
        <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block [&_a]:pointer-events-auto">
          {FLOATERS.map((f) => (
            <Floater key={f.id} f={f} mx={reduce ? still : mx} my={reduce ? still : my} scrollY={reduce ? still : scrollY} onOpenCaseStudy={onOpenCaseStudy} />
          ))}
        </div>

        {/* The words */}
        <div className="relative z-10 mx-auto w-full max-w-[1000px] px-5 py-14 text-center lg:py-0">
          <p className="hf-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[13px] text-white/80" style={{ animationDelay: '0.05s' }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Website studio in Surat. Taking new projects.
          </p>

          <h1 className="mt-7 text-white">
            <span className="hf-line"><span className="hf-cond" style={{ animationDelay: '0.12s' }}>Your business is great.</span></span>
            <span className="hf-line"><span className="hf-cond" style={{ animationDelay: '0.26s' }}>Your website should <span className="text-brand">say so.</span></span></span>
          </h1>

          <p className="hf-in mx-auto mt-7 max-w-[34rem] text-[17px] leading-relaxed text-white/70 md:text-lg" style={{ animationDelay: '0.4s' }}>
            We design and build websites, SEO and Google profiles that make clients pick you over the business next door. Made from a blank page, never a template.
          </p>

          <div className="hf-in mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '0.5s' }}>
            <PageLink page="contact" onNavigate={onAudit} className="group inline-flex items-center gap-3 rounded-full bg-brand py-3 pl-6 pr-3 text-[15px] font-semibold text-ink transition-colors hover:bg-white">
              Get a free website audit
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-brand transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </PageLink>
            <PageLink page="work" onNavigate={onSeeWork} className="inline-flex items-center rounded-full px-5 py-3 text-[15px] font-medium text-white underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white">
              See our work
            </PageLink>
          </div>

          {/* Client sites on phones and tablets: a simple swipe row */}
          <div className="hf-in -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:hidden" style={{ animationDelay: '0.6s' }}>
            {FLOATERS.map((f) => (
              <PageLink key={f.id} href={getWorkDetailPath(f.id)} onNavigate={() => onOpenCaseStudy(f.id)} className="w-[62vw] max-w-[260px] shrink-0 snap-center text-left">
                <span className="block overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                  <img src={`/screenshots/${f.id}-480.webp`} alt={`${f.name} website by Mago Labs`} width={480} height={300} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
                </span>
                <span className="mt-2 block text-[13px] font-medium text-white">{f.name}</span>
                <span className="block text-[12px] text-white/55">{f.tag}</span>
              </PageLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
