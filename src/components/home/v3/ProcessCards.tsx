import Reveal from '../Reveal';

/* Hand-drawn style doodles: one stroke colour, round ends, slightly wobbly. */
const Doodle = {
  look: (
    <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M52 22c17-1 31 12 31 29s-13 31-30 31-30-13-30-30 12-29 29-30z" />
      <path d="M75 76l24 25" strokeWidth="7" />
      <path d="M40 44c3-6 9-9 15-9" />
      <path d="M100 18l4-8M108 28l9-3M93 12l-1-9" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M30 20h56c3 0 5 2 5 5v76c0 3-2 5-5 5H30c-3 0-5-2-5-5V25c0-3 2-5 5-5z" />
      <path d="M46 14h24v12H46z" />
      <path d="M38 48l6 6 11-12M62 50h18M38 72l6 6 11-12M62 74h18" />
      <path d="M100 92c4 2 8 6 9 11" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 30h92v58H14z" />
      <path d="M14 42h92" />
      <path d="M22 36h1M30 36h1M38 36h1" strokeWidth="5" />
      <path d="M26 56h40M26 66h28M76 54h20v24H76z" />
      <path d="M44 100h32M60 88v12" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M60 12c16 12 22 32 18 54H42c-4-22 2-42 18-54z" />
      <circle cx="60" cy="40" r="8" />
      <path d="M42 62l-14 14 4 14 14-10M78 62l14 14-4 14-14-10" />
      <path d="M52 76c0 12 4 22 8 28 4-6 8-16 8-28" />
    </svg>
  ),
};

const STEPS = [
  { n: '01', title: 'Free audit', text: 'Burhan reviews your current website, or your plans if you have none, and tells you plainly what is costing you enquiries.', bg: '#BFE6C9', ink: '#14482A', doodle: Doodle.look },
  { n: '02', title: 'Plan and fixed quote', text: 'You see the pages, the words and the price before anything starts. No surprises later.', bg: '#F9C6DB', ink: '#5E1736', doodle: Doodle.plan },
  { n: '03', title: 'Design and build', text: 'You approve the design first. Then we build it, fast on every phone and ready for Google.', bg: '#FFCBA6', ink: '#5A2709', doodle: Doodle.build },
  { n: '04', title: 'Launch in 5 to 28 days', text: 'Your site goes live, you own everything, and we stay one WhatsApp away after launch.', bg: '#FFD95C', ink: '#3D2A00', doodle: Doodle.launch },
];

export default function ProcessCards() {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="v3-label">How it works</p>
            <h2 id="process-title" className="v3-h2 mt-4 max-w-[18ch]">Four simple steps. <span className="text-ink/40">No jargon.</span></h2>
          </div>
          <p className="max-w-[34ch] text-[17px] leading-relaxed text-ink/65">You always know what is happening, what it costs and when it goes live.</p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="v3-card group flex h-full flex-col rounded-[28px] p-7 transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-1deg]" style={{ background: s.bg, color: s.ink }}>
                  <div className="flex items-start justify-between">
                    <span className="text-[14px] font-bold opacity-60">{s.n}</span>
                    <span className="transition-transform duration-700 group-hover:rotate-[8deg] group-hover:scale-110">{s.doodle}</span>
                  </div>
                  <h3 className="mt-8 text-[24px] font-extrabold leading-tight tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed opacity-80">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
