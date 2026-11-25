import { Check, X } from 'lucide-react';
import Reveal from '../Reveal';

const ROWS: [string, string][] = [
  ['A design made for your business, from a blank page.', 'A template other clients also get.'],
  ['Loads fast on any phone and any network.', 'Page builders and plug-ins that slow it down.'],
  ['Words written for your buyers by a real person.', 'Generic filler that could describe anyone.'],
  ['You talk to the founder, start to finish.', 'Passed between account managers.'],
  ['Your domain and code in your name, hosting included.', 'Your own domain and code kept out of reach.'],
  ['A fixed quote before any work starts.', 'A scope and a bill that shift after you sign.'],
];

export default function UsVsThem() {
  return (
    <section aria-labelledby="vs-title" className="bg-navy py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="v3-label text-white/55">Why Mago Labs</p>
        <h2 id="vs-title" className="v3-h2 mt-4 max-w-[20ch] text-white">Not another agency. <span className="text-brand">Your partner.</span></h2>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-[28px] ring-1 ring-white/10">
            <div className="grid grid-cols-2 text-[13px] font-bold uppercase tracking-[0.08em] md:text-[14px]">
              <div className="bg-brand px-5 py-4 text-ink md:px-8">With Mago Labs</div>
              <div className="bg-white/[0.06] px-5 py-4 text-white/55 md:px-8">The usual agency</div>
            </div>
            {ROWS.map(([us, them]) => (
              <div key={us} className="grid grid-cols-2 border-t border-white/10">
                <div className="flex gap-3 bg-white/[0.04] px-5 py-5 md:px-8 md:py-6">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={3} />
                  <span className="text-[15px] font-medium leading-snug text-white md:text-[17px]">{us}</span>
                </div>
                <div className="flex gap-3 px-5 py-5 md:px-8 md:py-6">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-white/30" strokeWidth={3} />
                  <span className="text-[15px] leading-snug text-white/45 md:text-[17px]">{them}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
