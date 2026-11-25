import { MessageCircle } from 'lucide-react';
import Reveal from '../Reveal';
import BgVideo from '../BgVideo';
import ScrollFillText from '../ScrollFillText';
import { WHATSAPP_URL } from '../../../utils/contactLinks';

/* The person behind the lights: who he is, how he got here, and life off the clock. */
const CHAPTERS = [
  {
    n: '01',
    title: 'Eight years in a box',
    text: 'Banking, fintech, insurance. Good jobs, but full of rules, reports and micromanagement. I knew I was meant to be free, creative, thinking out of the box, and I was not living up to it.',
    photo: '/founder/stripes.webp',
    w: 739,
    h: 493,
    alt: 'Burhan Kapasi smiling in a striped shirt',
  },
  {
    n: '02',
    title: 'The leap',
    text: 'I started freelancing and building side projects alongside my job. Two years later I took a leap of faith and made Mago Labs my full-time work.',
    photo: '/founder/mountains.webp',
    w: 900,
    h: 1200,
    alt: 'Burhan Kapasi standing on a balcony in the mountains',
  },
  {
    n: '03',
    title: 'The client who cried',
    text: "One of my first clients had been to agency after agency and couldn't afford any of them. When I told him my price, his face dropped. I built him far more than he asked for, within his budget. He was close to tears. \"You took all my worries away,\" he said. He still sends people my way.",
    photo: '/founder/portrait.webp',
    w: 1100,
    h: 1258,
    alt: 'Burhan Kapasi sitting in an armchair',
  },
];

const POLAROIDS = [
  { src: '/founder/lanterns.webp', caption: 'Lantern streets', rot: -6, w: 900, h: 1351 },
  { src: '/founder/saigon.webp', caption: 'Saigon nights', rot: 4, w: 900, h: 1200 },
  { src: '/founder/beach.webp', caption: 'Beach days', rot: -3, w: 900, h: 1351 },
  { src: '/founder/swing.webp', caption: 'Slow evenings', rot: 5, w: 900, h: 1601 },
  { src: '/founder/horns.webp', caption: 'Never too serious', rot: -4, w: 700, h: 700 },
];

const LOVES = ['Travelling anywhere new', 'A big foodie, every cuisine', 'Cooking for friends', 'Movies and Netflix binges', 'A full house of guests'];

export default function Dawn() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="relative overflow-x-clip text-white">
      <BgVideo name="dust" className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-screen invert" />

      {/* Meet Burhan */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-28 md:px-8 md:pt-36 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <figure className="relative">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgba(255,197,61,0.3),transparent)] blur-2xl" />
            <img src="/founder/portrait.webp" alt="Burhan Kapasi, founder of Mago Labs" width={1100} height={1258} loading="lazy" className="relative aspect-[4/5] w-full rounded-[28px] object-cover object-[50%_20%]" />
          </figure>
        </Reveal>
        <div>
          <p className="v3-hand text-[32px] text-brand">Hi, I'm Burhan.</p>
          <h2 id="founder-title" className="n-h2 mt-3">Built by a person, not a factory.</h2>
          <ScrollFillText
            as="p"
            dim={0.22}
            className="mt-8 text-[clamp(1.3rem,2vw,1.75rem)] font-medium leading-[1.45] tracking-[-0.01em]"
            text="Mago Labs is not a big agency. It's me, in Surat, treating every website like it's for my own business. I get attached to every project, big or small. A happy client who sends their friends my way is how I measure a win."
          />
        </div>
      </div>

      {/* How I got here */}
      <div className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <h3 className="n-h3 text-white/90">How I got here</h3>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {CHAPTERS.map((c, i) => (
            <li key={c.n}>
              <Reveal delay={i * 0.1} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white text-ink">
                  <img src={c.photo} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="aspect-[4/3] w-full object-cover object-[50%_12%]" />
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[13px] font-bold text-ink/40">{c.n}</span>
                    <h4 className="mt-2 text-[22px] font-extrabold tracking-[-0.02em]">{c.title}</h4>
                    <p className="mt-3 text-[16px] leading-relaxed text-ink/70">{c.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Off the clock */}
      <div className="relative mx-auto max-w-7xl px-5 pb-28 md:px-8 md:pb-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="v3-hand text-[30px] text-brand">Off the clock</p>
            <h3 className="n-h3 mt-1">Life outside the laptop</h3>
          </div>
          <p className="max-w-[40ch] text-[17px] leading-relaxed text-white/70">The same curiosity that takes me to new cities and new kitchens goes into every website I build.</p>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-4 md:grid md:grid-cols-5 md:overflow-visible">
          {POLAROIDS.map((ph, i) => (
            <Reveal key={ph.src} delay={i * 0.07} className="w-[62vw] max-w-[260px] shrink-0 snap-center md:w-auto md:max-w-none">
              <figure className="v3-polaroid relative bg-white p-2.5 pb-1 shadow-[0_24px_40px_-22px_rgba(0,0,0,0.8)]" style={{ ['--r' as string]: `${ph.rot}deg` }}>
                <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-3deg] bg-brand/85" />
                <img src={ph.src} alt={`Burhan, ${ph.caption.toLowerCase()}`} width={ph.w} height={ph.h} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="v3-hand py-1.5 text-center text-[22px] text-ink/80">{ph.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {LOVES.map((l) => (
            <span key={l} className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[15px] text-white/85">{l}</span>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[15px] font-bold text-ink hover:bg-white lg:ml-auto">
            <MessageCircle className="h-4 w-4" /> Say hi on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
