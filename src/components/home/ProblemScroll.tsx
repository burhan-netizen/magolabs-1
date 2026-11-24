import { ArrowRight } from 'lucide-react';
import PageLink from '../PageLink';
import BgVideo from './BgVideo';
import ScrollFillText from './ScrollFillText';

const LINES = [
  'People look you up before they call.',
  'If your website doesn’t earn their trust in ten seconds,',
  'they call someone else.',
  'Nobody tells you. You just never hear from them.',
];

const REASONS = [
  { title: 'People can’t tell what you do.', desc: 'They land, get confused and leave within seconds.' },
  { title: 'Nothing gives them a reason to trust you.', desc: 'No proof, no results, nothing that sets you apart.' },
  { title: 'A competitor looks more established.', desc: 'Side by side, the dated site loses, even when your work is better.' },
  { title: 'Google isn’t showing you.', desc: 'People searching for exactly what you sell find someone else.' },
];

/**
 * The problem, told one big line at a time over a blurred street at night. The
 * video stays pinned behind the lines while they scroll past and light up.
 */
export default function ProblemScroll({ onAudit }: { onAudit: () => void }) {
  return (
    <section id="problem-section" className="relative bg-[#100E0B] text-paper">
      {/* Pinned backdrop */}
      <div className="sticky top-0 h-[100svh] overflow-hidden" aria-hidden="true">
        <BgVideo name="street" className="absolute inset-0 h-full w-full opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,14,11,0.35),rgba(16,14,11,0.92)_75%)]" />
      </div>

      <div className="relative -mt-[100svh] mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex min-h-[34svh] items-end pb-6 pt-28">
          <span className="label-v2 on-dark">The problem</span>
        </div>

        {LINES.map((line, i) => (
          <div key={i} className="flex min-h-[62svh] items-center md:min-h-[70svh]">
            <ScrollFillText
              text={line}
              as={i === 0 ? 'h2' : 'p'}
              className="display-lg max-w-[16ch] text-[clamp(2.4rem,6.6vw,6.2rem)]"
              dim={0.14}
              accentWords={['someone', 'else.']}
              accentClass="font-serif-accent text-brand"
            />
          </div>
        ))}

        <div className="flex min-h-[80svh] flex-col justify-center pb-24">
          <p className="display-xl text-[clamp(3.4rem,10vw,9.5rem)] text-brand">We fix that.</p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <div key={r.title} className="bg-[#16130F]/85 p-6 backdrop-blur-sm md:p-7">
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold leading-snug text-paper">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <PageLink page="contact" onNavigate={onAudit} className="btn-v2 btn-primary">
              Find out what yours is costing you
              <ArrowRight className="arrow h-4 w-4" />
            </PageLink>
            <span className="text-sm text-paper/55">A free review of your website, in plain English.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
