import { ArrowRight, Check, Minus, Phone, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import LeadForm, { LeadMode } from '../components/LeadForm';
import { WhatsAppLogo } from '../components/BrandIcons';
import { WHATSAPP_URL, CALL_URL, PHONE_DISPLAY } from '../utils/contactLinks';
import HeroV2 from '../components/home/HeroV2';
import CurveMarquee from '../components/home/CurveMarquee';
import ProblemScroll from '../components/home/ProblemScroll';
import NoWebsite from '../components/home/NoWebsite';
import ServicesTilt from '../components/home/ServicesTilt';
import WorkFlyover from '../components/home/WorkFlyover';
import ResultsBig from '../components/home/ResultsBig';
import TestimonialColumns from '../components/home/TestimonialColumns';
import FounderStory from '../components/home/FounderStory';
import Reveal from '../components/home/Reveal';

interface HomeProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

/* ---------------------------------------------------------------------------
   Homepage, November 2026 revamp.
   The page tells one story in the customer's order: the promise, their problem,
   what we do, the work, the results, what clients say, who is behind it, then
   their next step. Copy lives here or in the section components as plain data.
--------------------------------------------------------------------------- */

const WITH_MAGO = [
  'A design made for your business, from a blank canvas.',
  'A site that loads fast on any phone and any network.',
  'Copy written by a human who has studied your buyers.',
  'One person to talk to, the founder, from start to finish.',
  'Your domain and code in your name, with hosting included.',
  'A fixed quote before any work starts.',
];

const THE_USUAL = [
  'A template that other clients also get.',
  'Page builders and plug-ins that slow everything down.',
  'Generic filler text that could describe anyone.',
  'Your project passed between account managers.',
  'Your own domain and code kept out of your reach.',
  'A scope and a bill that shift after you sign.',
];

// The first step differs by starting point; the rest is the same for everyone.
const FIRST_STEP: Record<LeadMode, { heading: string; intro: string; title: string; desc: string }> = {
  audit: {
    heading: 'Start with a free audit.',
    intro: 'It takes a minute to ask, and you will know exactly where your website stands.',
    title: 'Send us your website address.',
    desc: 'We review it for free and tell you plainly what is costing you enquiries.',
  },
  new: {
    heading: 'Start with a free website plan.',
    intro: 'It takes a minute to ask, and you will know exactly what your first website needs.',
    title: 'Tell us what your business does.',
    desc: 'We send you a free plan: the pages you need, what they should say, and how customers will find you.',
  },
};

const NEXT_STEPS = [
  {
    title: 'Get a fixed quote.',
    desc: 'You see exactly what we would build and what it costs. No obligation to go ahead.',
  },
  {
    title: 'Launch in 5 to 28 days.',
    desc: 'You approve the design before we build it, and you own everything at the end.',
  },
];

const FAQS = [
  {
    question: 'What does the free audit include?',
    answer: 'Burhan reviews your website himself: how it looks, how fast it loads, how easy it is to contact you, and how you show up on Google. You get a short, plain-English summary of what to fix first. There is no charge and no obligation.',
  },
  {
    question: 'I don’t have a website yet. Where do I start?',
    answer: 'Ask for a free website plan. Tell us what your business does, and Burhan will send you a short plan: the pages you need, what they should say, and how customers will find you. Several of our clients, including a CA firm that went on to sign 34 new clients, started with no website at all.',
  },
  {
    question: 'How long does a website take to build?',
    answer: 'It depends on the package. A Launch website is live in 5 days, Growth in 14 days, Scale in 21 days, and an online store in 28 days.',
  },
  {
    question: 'How much does a custom website cost?',
    answer: 'There are four packages, and the pricing page lists what each one includes and its starting price. You get a clear, fixed quote before any work starts. No hidden fees: hosting is included, and you keep full ownership of your domain and code.',
  },
  {
    question: 'Will my website rank on Google?',
    answer: 'Every site we build is set up to rank: clean structure, proper headings, local schema markup and fast load times. Pair that with a well-run Google Business Profile and you give yourself the best chance. Nobody can honestly promise a specific position.',
  },
  {
    question: 'Can I edit the website myself later?',
    answer: 'Yes. We set up simple content controls so you can change text, prices and photos in a couple of minutes, without touching code.',
  },
  {
    question: 'What happens after launch?',
    answer: 'We don’t disappear. Content changes, security updates and new features are a WhatsApp message or a call away.',
  },
];

export default function Home({ onPageChange, onOpenCaseStudy }: HomeProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToAudit = () => navigateTo('contact');

  // Which starting point the form on this page shows. The "no website yet" buttons
  // switch it and bring the form into view, so the visitor never leaves the page.
  const [leadMode, setLeadMode] = useState<LeadMode>('audit');
  const startWithoutWebsite = () => {
    setLeadMode('new');
    document.getElementById('next-step')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const firstStep = FIRST_STEP[leadMode];
  const steps = [{ title: firstStep.title, desc: firstStep.desc }, ...NEXT_STEPS];

  // Structured data: the business, the organisation, and the FAQ on this page.
  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      'name': 'Mago Labs',
      'description': 'Website design and development company in Surat, Gujarat. Custom, hand-coded websites, local SEO and Google Business Profile optimisation for small and mid-sized businesses.',
      'image': 'https://www.magolabs.in/logo.png',
      'logo': 'https://www.magolabs.in/logo.png',
      '@id': 'https://www.magolabs.in/#localbusiness',
      'url': 'https://www.magolabs.in',
      'telephone': '+91 9099245605',
      'email': 'burhan@magolabs.in',
      'priceRange': '₹₹',
      'foundingDate': '2024',
      'founder': {
        '@type': 'Person',
        'name': 'Burhan Kapasi',
        'url': 'https://www.magolabs.in/about',
        'sameAs': ['https://www.linkedin.com/in/burhanuddinkapasi/']
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Surat' },
        { '@type': 'State', 'name': 'Gujarat' },
        { '@type': 'Country', 'name': 'India' }
      ],
      'knowsAbout': ['Website design', 'Website development', 'Local SEO', 'Google Business Profile optimisation', 'Conversion copywriting'],
      'hasMap': 'https://maps.app.goo.gl/fnTiihMdcem2z4fn7',
      // Every profile that is this business, so search engines can join them up.
      'sameAs': [
        'https://maps.app.goo.gl/fnTiihMdcem2z4fn7',
        'https://www.instagram.com/magolabs.in/',
        'https://www.threads.com/@magolabs.in',
        'https://www.facebook.com/profile.php?id=61591983492179',
        'https://clutch.co/profile/mago-labs',
        'https://themanifest.com/company/mago-labs',
        'https://themagolabs.com/'
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Surat',
        'addressRegion': 'Gujarat',
        'addressCountry': 'IN'
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.magolabs.in/#website',
      'name': 'Mago Labs',
      'url': 'https://www.magolabs.in',
      'inLanguage': 'en-IN',
      'publisher': { '@id': 'https://www.magolabs.in/#localbusiness' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
      }))
    }
  ];

  return (
    <>
      <SEO path="/" schemas={homeSchemas} />

      <HeroV2 onAudit={goToAudit} onNoWebsite={startWithoutWebsite} />
      <CurveMarquee />
      <ProblemScroll onAudit={goToAudit} />
      <ServicesTilt onNavigate={navigateTo} onAudit={goToAudit} />
      <WorkFlyover onOpenCaseStudy={onOpenCaseStudy} onSeeAll={() => navigateTo('work')} />
      <ResultsBig onOpenCaseStudy={onOpenCaseStudy} />
      <NoWebsite onStart={startWithoutWebsite} />
      <TestimonialColumns onOpenCaseStudy={onOpenCaseStudy} />

      {/* Why us: against the usual agency */}
      <section id="why-choose-us-overview" className="bg-paper py-24 md:py-36">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <span className="label-v2">Why Mago Labs</span>
          <h2 className="display-lg mt-5 max-w-[18ch] text-[clamp(2.4rem,5.2vw,4.6rem)] text-ink">
            Most agencies hand you a template. You deserve a <span className="font-serif-accent">website.</span>
          </h2>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[32px] bg-ink p-8 text-paper md:p-10">
              <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand">
                <img src="/logo.png" alt="Mago Labs" width={300} height={200} className="h-10 w-auto invert" loading="lazy" />
              </p>
              <ul className="mt-6 space-y-4">
                {WITH_MAGO.map((item) => (
                  <li key={item} className="flex gap-3 text-paper/85">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand text-ink">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-[32px] border border-ink/10 bg-white/50 p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/50 py-2.5">The usual agency</p>
              <ul className="mt-6 space-y-4">
                {THE_USUAL.map((item) => (
                  <li key={item} className="flex gap-3 text-ink/55">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ink/8 text-ink/45">
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <FounderStory />

      {/* Next step: how it works, and the form */}
      <section id="next-step" className="scroll-mt-20 bg-[#EDE7DA] py-24 md:py-36">
        <div className="mx-auto grid max-w-[1180px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="label-v2">Your next step</span>
            <h2 className="display-lg mt-5 text-[clamp(2.4rem,5.2vw,4.6rem)] text-ink">{firstStep.heading}</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{firstStep.intro}</p>
            <ol className="mt-12 space-y-8">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="display-lg flex h-12 w-12 flex-none items-center justify-center rounded-full bg-ink text-lg text-brand">{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink/65">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-12 text-ink/70">
              Would you rather talk?{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link-grow font-semibold text-ink">
                Message Burhan on WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="rounded-[32px] bg-paper p-6 shadow-[0_40px_80px_-40px_rgba(22,19,15,0.45)] md:p-9">
            <LeadForm idPrefix="home" source="Homepage" mode={leadMode} onModeChange={setLeadMode} />
          </div>
        </div>
      </section>

      {/* FAQ. Every answer stays in the page markup (collapsed with CSS, not
          removed), so search engines can read all of them. */}
      <section id="faq-section" className="bg-paper py-24 md:py-36">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="label-v2">Questions</span>
            <h2 className="display-lg mt-5 text-[clamp(2.4rem,5.2vw,4.6rem)] text-ink">
              Straight <span className="font-serif-accent">answers.</span>
            </h2>
          </div>
          <div className="divide-y divide-ink/12 border-y border-ink/12">
            {FAQS.map((faq, idx) => {
              const open = openFaq === idx;
              return (
                <div key={faq.question}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={open}
                      aria-controls={`home-faq-panel-${idx}`}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-lg font-semibold text-ink sm:text-xl">{faq.question}</span>
                      <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-colors duration-300 ${open ? 'bg-brand text-ink' : 'bg-ink/6 text-ink'}`}>
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`home-faq-panel-${idx}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 leading-relaxed text-ink/70">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final call to action, in the accent colour */}
      <section id="final-cta" className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="relative overflow-hidden rounded-[36px] bg-brand px-5 py-24 text-ink sm:px-10 md:py-32">
          <div className="mx-auto max-w-[1100px]">
            <span className="label-v2 !text-ink/70 before:!bg-ink">Let’s talk</span>
            <h2 className="display-xl mt-6 text-[clamp(3rem,8.6vw,8.2rem)]">
              Make your website your best <span className="font-serif-accent">salesperson.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75">
              Send us your website address. We will tell you plainly what is stopping visitors from calling. You talk directly to Burhan, the founder.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PageLink page="contact" onNavigate={goToAudit} className="btn-v2 btn-ink">
                Get a free website audit
                <ArrowRight className="arrow h-4 w-4" />
              </PageLink>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-v2 btn-ghost text-ink">
                <WhatsAppLogo className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <a href={CALL_URL} className="btn-v2 btn-ghost text-ink">
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
            <button type="button" onClick={startWithoutWebsite} className="link-grow mt-8 text-sm font-semibold text-ink cursor-pointer">
              No website yet? Get a free website plan
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
