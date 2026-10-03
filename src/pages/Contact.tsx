import { useEffect, useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import { WhatsAppLogo } from '../components/BrandIcons';
import { PageId } from '../types';
import SEO from '../components/SEO';
import LeadForm, { LeadMode } from '../components/LeadForm';
import { CALL_URL, EMAIL, EMAIL_URL, PHONE_DISPLAY, WHATSAPP_URL } from '../utils/contactLinks';

interface ContactProps {
  onPageChange: (page: PageId) => void;
}

// The page speaks to two starting points: a website that needs fixing, or none yet.
const PAGE_COPY: Record<LeadMode, { eyebrow: string; headline: string; highlight: string; intro: string; points: string[] }> = {
  audit: {
    eyebrow: 'Free website audit',
    headline: 'Find out what your website is',
    highlight: 'costing you.',
    intro: 'Send us your website address. Burhan will review it himself and tell you plainly what is stopping visitors from calling.',
    points: [
      'A plain-English review of your website, not a jargon report.',
      'The fixes that would bring you the most enquiries.',
      'A fixed quote, only if you ask for one.',
    ],
  },
  new: {
    eyebrow: 'Free website plan',
    headline: 'No website yet? Start with',
    highlight: 'a clear plan.',
    intro: 'Tell us what your business does. Burhan will send you a short plan for your first website, written for your kind of business.',
    points: [
      'The pages your business needs, and what each should say.',
      'How customers will find you on Google and Google Maps.',
      'A fixed quote, only if you ask for one.',
    ],
  },
};

export default function Contact(_props: ContactProps) {
  // Links elsewhere on the site can open this page on the "no website yet" option
  // with /contact?start=new. Read after mount so the prerendered page still matches.
  const [mode, setMode] = useState<LeadMode>('audit');
  const [preset, setPreset] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('start') === 'new') setMode('new');
    // The pricing page links here with ?package=Growth, so the message starts filled in.
    const pkg = params.get('package');
    if (pkg === 'Extras') setPreset('I would like to talk about pricing for: ');
    else if (pkg === 'Custom') setPreset('I have a specific requirement I would like to discuss: ');
    else if (pkg && ['Launch', 'Growth', 'Scale', 'Commerce'].includes(pkg)) setPreset(`I am interested in the ${pkg} package.`);
  }, []);
  const copy = PAGE_COPY[mode];

  const contactSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': 'https://www.magolabs.in/contact/#webpage',
      'url': 'https://www.magolabs.in/contact',
      'name': 'Contact Burhan Kapasi & Mago Labs',
      'description': 'Ask Mago Labs for a free website audit, or call, WhatsApp or email Burhan Kapasi directly.'
    }
  ];

  return (
    <>
      <SEO path="contact" schemas={contactSchemas} />

      {/* The form is the page. Everything a visitor needs is visible without scrolling far. */}
      <section id="contact-hero" className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-neutral-50 font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Why, and the direct routes */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-5">
                <span className="eyebrow">{copy.eyebrow}</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                  {copy.headline} <span className="marker">{copy.highlight}</span>
                </h1>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                  {copy.intro}
                </p>
              </div>

              <ul className="space-y-3">
                {copy.points.map((line) => (
                  <li key={line} className="flex gap-3 text-base text-neutral-800 leading-relaxed">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-brand" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {mode === 'audit' ? 'No website yet?' : 'Already have a website?'}{' '}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'audit' ? 'new' : 'audit')}
                  className="font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4 cursor-pointer"
                >
                  {mode === 'audit' ? 'Get a free website plan' : 'Get a free audit'}
                </button>
              </p>

              {/* Prefer to talk */}
              <div className="pt-8 border-t border-neutral-200 space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900">Prefer to talk? You will reach Burhan directly.</h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-5 py-3.5 text-sm font-semibold text-white transition-colors"
                  >
                    <WhatsAppLogo className="h-4 w-4" />
                    WhatsApp us
                  </a>
                  <a
                    href={CALL_URL}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 px-5 py-3.5 text-sm font-semibold text-white transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={EMAIL_URL}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white hover:border-neutral-900 px-5 py-3.5 text-sm font-semibold text-neutral-900 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {EMAIL}
                  </a>
                </div>
                <p className="text-sm text-neutral-600">
                  Monday to Saturday, 9:00 AM to 7:00 PM. Surat, Gujarat.{' '}
                  <a
                    href="https://maps.app.goo.gl/MT8QiwA56T7NtyC18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4"
                  >
                    See our Google reviews
                  </a>
                </p>
              </div>
            </div>

            {/* The form */}
            <div className="lg:col-span-7">
              <LeadForm idPrefix="contact" source="Contact page" mode={mode} onModeChange={setMode} presetMessage={preset} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
