import { motion } from 'motion/react';
import { WhatsAppLogo } from './BrandIcons';
import { WHATSAPP_URL } from '../utils/contactLinks';

/* The person behind Mago Labs: who he is, how he got here, and life off the clock. */
const CHAPTERS = [
  {
    n: '01',
    title: 'Eight years in a box',
    text: 'Banking, fintech, insurance. Good jobs, but full of rules, reports and micromanagement. I knew I was meant to be free and creative, and I was not living up to it.',
    photo: '/founder/stripes.webp',
    w: 739,
    h: 493,
    alt: 'Burhan Kapasi smiling in a striped shirt',
  },
  {
    n: '02',
    title: 'The leap',
    text: 'I freelanced alongside my job for two years. Then I took a leap of faith and made Mago Labs my full-time work.',
    photo: '/founder/mountains.webp',
    w: 900,
    h: 1200,
    alt: 'Burhan Kapasi standing on a balcony in the mountains',
  },
  {
    n: '03',
    title: 'The client who cried',
    text: 'One of my first clients could not afford any agency. I built him far more than he asked for, within his budget. "You took all my worries away," he said. He still sends people my way.',
    photo: '/founder/portrait.webp',
    w: 1100,
    h: 1258,
    alt: 'Burhan Kapasi sitting in an armchair',
  },
];

const POLAROIDS = [
  { src: '/founder/lanterns.webp', caption: 'Lantern streets', rot: -5, w: 900, h: 1351 },
  { src: '/founder/saigon.webp', caption: 'Saigon nights', rot: 4, w: 900, h: 1200 },
  { src: '/founder/beach.webp', caption: 'Beach days', rot: -3, w: 900, h: 1351 },
  { src: '/founder/swing.webp', caption: 'Slow evenings', rot: 5, w: 900, h: 1601 },
  { src: '/founder/horns.webp', caption: 'Never too serious', rot: -4, w: 700, h: 700 },
];

const LOVES = ['Travelling', 'Big foodie', 'Cooking for friends', 'Movies and Netflix', 'Hosting people'];

const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function FounderStory() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="py-24 bg-white font-sans overflow-x-clip">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Meet Burhan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.figure {...rise} transition={{ duration: 0.6 }} className="lg:col-span-5">
            <img
              src="/founder/portrait.webp"
              alt="Burhan Kapasi, founder of Mago Labs"
              width={1100}
              height={1258}
              loading="lazy"
              className="aspect-[4/5] w-full max-w-md mx-auto rounded-3xl object-cover object-[50%_20%] shadow-2xl shadow-neutral-900/15"
            />
          </motion.figure>
          <div className="lg:col-span-7 space-y-5">
            <span className="eyebrow">Meet the founder</span>
            <p className="hand text-3xl text-neutral-500">Hi, I'm Burhan.</p>
            <h2 id="founder-title" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Built by a person, <span className="marker">not a factory.</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Mago Labs is not a big agency. It's me, in Surat, treating every website like it's for my own business. I get attached to every project, big or small. A happy client who sends their friends my way is how I measure a win.
            </p>
          </div>
        </div>

        {/* How I got here */}
        <h3 className="mt-24 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">How I got here</h3>
        <ol className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHAPTERS.map((c, i) => (
            <motion.li key={c.n} {...rise} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
                <img src={c.photo} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="aspect-[4/3] w-full object-cover object-[50%_12%]" />
                <div className="flex flex-1 flex-col p-7">
                  <span className="font-mono text-xs font-bold text-neutral-400">{c.n}</span>
                  <h4 className="mt-2 text-xl font-bold tracking-tight text-neutral-900">{c.title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-neutral-600">{c.text}</p>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>

        {/* Off the clock */}
        <div className="mt-24 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="hand text-3xl text-neutral-500">Off the clock</p>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">Life outside the laptop</h3>
          </div>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-neutral-600">
            The same curiosity that takes me to new cities and new kitchens goes into every website I build.
          </p>
        </div>

        <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-6 pt-5 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {POLAROIDS.map((ph, i) => (
            <motion.div key={ph.src} {...rise} transition={{ duration: 0.6, delay: i * 0.07 }} className="w-[62vw] max-w-[260px] shrink-0 snap-center md:w-auto md:max-w-none">
              <figure className="polaroid relative bg-white p-2.5 pb-1 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200" style={{ ['--r' as string]: `${ph.rot}deg` }}>
                <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-3deg] bg-brand/80" />
                <img src={ph.src} alt={`Burhan, ${ph.caption.toLowerCase()}`} width={ph.w} height={ph.h} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="hand py-1.5 text-center text-2xl text-neutral-700">{ph.caption}</figcaption>
              </figure>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {LOVES.map((l) => (
            <span key={l} className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700">{l}</span>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors lg:ml-auto"
          >
            <WhatsAppLogo className="h-4 w-4 text-emerald-400" /> Say hi on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
