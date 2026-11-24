import { useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import PageLink from '../PageLink';
import BgVideo from './BgVideo';
import { WhatsAppLogo } from '../BrandIcons';
import { WHATSAPP_URL } from '../../utils/contactLinks';
import { getWorkDetailPath } from '../../utils/pageRoutes';

export const GOOGLE_PROFILE_URL = 'https://maps.app.goo.gl/fnTiihMdcem2z4fn7';

/* Real client sites that float around the headline. `depth` sets how far each one
   leans toward the pointer and drifts on scroll. Positions are for wide screens. */
const FLOATING = [
  { id: 'drmihirshah', alt: 'Dr. Mihir Shah Smile Care Clinic website', pos: 'left-[2.5%] top-[17%] w-[clamp(170px,15vw,250px)] -rotate-[7deg]', depth: 1.2, drift: -1, float: 'float-a' },
  { id: 'jaymocivil', alt: 'Jaymo Civil website', pos: 'right-[3%] top-[14%] w-[clamp(180px,16vw,270px)] rotate-[6deg]', depth: 0.9, drift: 1, float: 'float-b' },
  { id: 'ladsonconcrete', alt: 'Ladson Concrete website', pos: 'left-[5%] bottom-[9%] w-[clamp(160px,14vw,230px)] rotate-[5deg]', depth: 0.7, drift: -1, float: 'float-b' },
  { id: 'darshangalani', alt: 'Darshan Galani & Co. website', pos: 'right-[6%] bottom-[10%] w-[clamp(160px,14vw,235px)] -rotate-[5deg]', depth: 1.1, drift: 1, float: 'float-a' },
  { id: 'santoshtimbers', alt: 'Santosh Timbers website', pos: 'left-[19%] top-[12%] w-[clamp(120px,10vw,170px)] rotate-[3deg] opacity-90', depth: 0.5, drift: -0.6, float: 'float-a' },
  { id: 'centurion', alt: 'Centurion Strategic Ventures website', pos: 'right-[21%] bottom-[4%] w-[clamp(120px,10vw,170px)] -rotate-[3deg] opacity-90', depth: 0.6, drift: 0.6, float: 'float-b' },
];

const STRIP = ['drmihirshah', 'jaymocivil', 'darshangalani', 'ladsonconcrete', 'santoshtimbers', 'centurion', 'solway', 'prabhakarprocessors'];

function FloatingCard({ card, mx, my, scrollY }: { key?: string; card: (typeof FLOATING)[number]; mx: MotionValue<number>; my: MotionValue<number>; scrollY: MotionValue<number> }) {
  const x = useTransform([mx, scrollY], ([m, s]: number[]) => m * 26 * card.depth + s * 0.22 * card.drift);
  const y = useTransform([my, scrollY], ([m, s]: number[]) => m * 20 * card.depth - s * 0.28 * card.depth);
  return (
    <motion.a
      href={getWorkDetailPath(card.id)}
      style={{ x, y }}
      className={`group absolute z-0 hidden xl:block ${card.pos}`}
      aria-label={`Case study: ${card.alt}`}
    >
      <div className={`${card.float} overflow-hidden rounded-[14px] bg-white shadow-[0_24px_60px_-24px_rgba(22,19,15,0.45)] ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-[1.06]`}>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-black/5 bg-[#FBFAF7]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4E1D9]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4E1D9]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4E1D9]" />
        </div>
        <img src={`/screenshots/${card.id}.webp`} alt={card.alt} width={900} height={430} loading="eager" decoding="async" className="block w-full h-auto" />
      </div>
    </motion.a>
  );
}

interface HeroV2Props {
  onAudit: () => void;
  onNoWebsite: () => void;
}

export default function HeroV2({ onAudit, onNoWebsite }: HeroV2Props) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });
  const { scrollY } = useScroll();
  const calmScroll = useTransform(scrollY, (v) => (reduce ? 0 : Math.min(v, 900)));

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, rawX, rawY]);

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-paper pt-32 pb-16 md:pt-36 xl:min-h-[100svh] xl:flex xl:flex-col xl:justify-center">
      {/* Slow dust drifting through warm light, kept faint behind everything */}
      <BgVideo name="dust" className="absolute inset-0 -z-10 h-full w-full opacity-40 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-paper" />

      {FLOATING.map((card) => (
        <FloatingCard key={card.id} card={card} mx={mx} my={my} scrollY={calmScroll} />
      ))}

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 text-center sm:px-8">
        <div className="fade-late mb-7 inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-ink/80 backdrop-blur">
          <span className="live-dot" aria-hidden="true" />
          Taking new projects
        </div>

        <h1 className="text-ink">
          <span className="label-v2 fade-late mb-6 !flex justify-center">Website design &amp; development company in Surat</span>
          <span className="display-xl block text-[clamp(3.1rem,9.2vw,9.4rem)]">
            <span className="rise-line"><span>Websites that</span></span>
            <span className="rise-line"><span>turn visitors into</span></span>
            <span className="rise-line"><span><span className="marker-draw">customers.</span></span></span>
          </span>
        </h1>

        <p className="fade-late mx-auto mt-8 max-w-[38rem] text-lg leading-relaxed text-ink/70 md:text-xl">
          People look you up before they call. We build websites that earn their trust in ten seconds, so they call <em className="font-serif-accent text-[1.15em] text-ink not-italic">you</em>, not the next name on the list.
        </p>

        <div className="fade-late mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PageLink page="contact" onNavigate={onAudit} className="btn-v2 btn-primary w-full sm:w-auto">
            Get a free website audit
            <ArrowRight className="arrow h-4 w-4" />
          </PageLink>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-ghost w-full text-ink sm:w-auto">
            <WhatsAppLogo className="h-5 w-5 text-[#1FA855]" />
            WhatsApp Burhan
          </a>
        </div>
        <button type="button" onClick={onNoWebsite} className="fade-late link-grow mt-5 text-sm font-semibold text-ink/80 cursor-pointer">
          No website yet? Start here
        </button>

        <ul className="fade-late mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/70">
          <li>
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 link-grow">
              <span className="font-bold text-ink">5.0</span>
              <span className="inline-flex text-[#E8A317]" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </span>
              on Google
            </a>
          </li>
          <li><span className="font-bold text-ink">75+</span> businesses helped</li>
          <li><span className="font-bold text-ink">5 to 28</span> days to launch</li>
        </ul>
      </div>

      {/* Phones and tablets: the same client sites, sliding past under the hero */}
      <div className="mask-x relative mt-14 overflow-hidden xl:hidden" aria-hidden="true">
        <div className="strip-track">
          {[...STRIP, ...STRIP].map((id, i) => (
            <div key={i} className="w-[220px] shrink-0 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5 sm:w-[280px]">
              <img src={`/screenshots/${id}-480.webp`} alt="" width={480} height={229} loading="lazy" decoding="async" className="block h-auto w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
