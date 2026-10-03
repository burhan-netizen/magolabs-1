import { ArrowRight, Search, MapPin, PenTool, Palette, Wrench } from 'lucide-react';
import { PageId } from '../types';
import PageLink from './PageLink';
import { WhatsAppLogo } from './BrandIcons';

interface AddOnServicesProps {
  onPageChange: (page: PageId) => void;
}

// The services that sit alongside a website. Deliberately quiet: no prices, no
// feature lists. Websites are the main service; these support them.
const ADD_ONS: { name: string; desc: string; icon: typeof Search; page?: PageId }[] = [
  { name: 'SEO', desc: 'Get found on Google by people already searching for what you sell.', icon: Search, page: 'service-seo' },
  { name: 'Google Business Profile', desc: 'Show up on Maps when someone nearby needs you.', icon: MapPin, page: 'service-gbp' },
  { name: 'Copywriting', desc: 'Words that make a visitor trust you and get in touch.', icon: PenTool, page: 'service-copywriting' },
  { name: 'Branding', desc: 'A logo, colours and a look people remember.', icon: Palette },
  { name: 'Website care', desc: 'Updates, changes and fixes after your support period ends.', icon: Wrench },
];

const EXTRAS_HREF = '/contact?package=Extras';
const EXTRAS_WHATSAPP =
  'https://wa.me/919099245605?text=' +
  encodeURIComponent('Hi Mago Labs, I would like to talk about pricing for: ');

/** A quiet row of the supporting services, with one way to ask about pricing. */
export default function AddOnServices({ onPageChange }: AddOnServicesProps) {
  const goTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToExtras = () => {
    window.history.pushState({}, '', EXTRAS_HREF);
    goTo('contact');
  };

  return (
    <section id="alongside-your-website" className="py-20 bg-white font-sans border-t border-neutral-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 space-y-3">
          <span className="eyebrow">Alongside your website</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
            A good website goes further with the right support.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Optional, and never bundled in by default. Add what your business needs, when it needs it.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ADD_ONS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="group flex flex-col rounded-2xl border border-neutral-200 p-5 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_22px_44px_-28px_rgba(13,13,13,0.4)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-neutral-900">{item.name}</h3>
                <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                {item.page && (
                  <PageLink
                    page={item.page}
                    onNavigate={() => goTo(item.page as PageId)}
                    aria-label={`Learn more about ${item.name}`}
                    className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    Learn more <ArrowRight className="h-3 w-3" />
                  </PageLink>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="text-sm text-neutral-600">Priced on what you need, so there is no fixed package.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <PageLink
              href={EXTRAS_HREF}
              onNavigate={goToExtras}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-900 dark:border-neutral-400 px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-[#ffffff] transition-colors cursor-pointer"
            >
              Let&rsquo;s talk pricing
              <ArrowRight className="h-4 w-4" />
            </PageLink>
            <a
              href={EXTRAS_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <WhatsAppLogo className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
