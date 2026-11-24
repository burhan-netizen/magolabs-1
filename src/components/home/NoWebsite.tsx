import { useRef } from 'react';
import { useInView } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';

/** For businesses with no website at all: what a customer finds today, and the way out. */
export default function NoWebsite({ onStart }: { onStart: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const seen = useInView(boxRef, { once: true, margin: '-120px' });
  return (
    <section id="no-website" className="relative overflow-hidden bg-brand text-ink">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="label-v2 !text-ink/70 before:!bg-ink">No website yet?</span>
          <h2 className="display-lg mt-5 text-[clamp(2.4rem,5.4vw,4.6rem)]">
            Then customers find <span className="font-serif-accent">nothing</span> when they look for you.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            People search for a business before they call it. When nothing comes up, many assume you are small, new or no longer around, and they call the next name on the list.
          </p>
          <button type="button" onClick={onStart} className="btn-v2 btn-ink mt-9 cursor-pointer">
            Get a free website plan
            <ArrowRight className="arrow h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div ref={boxRef} data-play={seen ? 'on' : undefined} className="search-demo rounded-[28px] bg-paper p-5 shadow-[0_30px_80px_-30px_rgba(22,19,15,0.55)] md:p-7" aria-hidden="true">
            <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3.5">
              <Search className="h-4 w-4 text-ink/50" />
              <span className="text-ink/80"><span className="type-in">your business name</span></span>
            </div>
            <div className="after-type px-2 pt-6 pb-2">
              <p className="text-sm text-ink/50">About 0 results</p>
              <p className="mt-2 text-xl font-semibold">No results found.</p>
              <div className="mt-5 space-y-2.5">
                <div className="h-3 w-4/5 rounded-full bg-ink/10" />
                <div className="h-3 w-3/5 rounded-full bg-ink/10" />
                <div className="h-3 w-2/3 rounded-full bg-ink/10" />
              </div>
            </div>
          </div>
          <div className="rounded-[28px] bg-ink p-7 text-paper">
            <p className="display-lg text-5xl text-brand">34 new clients</p>
            <p className="mt-3 leading-relaxed text-paper/75">
              Darshan Galani &amp; Co. had never had a website. Three months after their first one launched, enquiries from Google had turned into 34 new clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
