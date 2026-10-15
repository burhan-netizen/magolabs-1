import { ArrowRight, Clock, EyeOff, FileCheck, Handshake, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import { spotlight } from '../utils/tilt';

interface AgenciesProps {
  onPageChange: (page: PageId) => void;
}

// What an agency gets when we build under its brand.
const PROMISES = [
  {
    title: 'Your brand, not ours',
    icon: EyeOff,
    desc: 'Everything ships under your agency name. No Mago Labs credit on the site, and an NDA whenever you need one.',
  },
  {
    title: 'Built from scratch',
    icon: FileCheck,
    desc: 'Custom design and hand-written code for every client. No templates, no page builders, nothing your client will spot elsewhere.',
  },
  {
    title: 'A fixed quote per project',
    icon: Handshake,
    desc: 'You know the exact cost before we start, so you can price your client with confidence and keep your margin.',
  },
  {
    title: 'Work moves while you sleep',
    icon: Clock,
    desc: 'We are based in India. Brief us at the end of your day and wake up to progress, not a queue.',
  },
];

// How a white label project runs, start to finish.
const STEPS = [
  { title: 'You send the brief', desc: 'Scope, brand assets and any content you have. If copy is missing, we can write it.' },
  { title: 'We design and build', desc: 'Under your brand, with regular updates to you only. Your client never hears from us.' },
  { title: 'You present it', desc: 'Review the work, pass on your client’s changes, and we turn them around fast.' },
  { title: 'We launch and support', desc: 'We handle the launch and stay on hand for fixes, so you are never left holding it.' },
];

const FAQS = [
  {
    question: 'Will my client know you built it?',
    answer: 'No. We work only with you, the site carries no Mago Labs credit, and we are happy to sign an NDA.',
  },
  {
    question: 'Do you work with agencies outside India?',
    answer: 'Yes. We are set up for agencies in the USA, UK, Canada, Australia and New Zealand, and we schedule calls in your time zone.',
  },
  {
    question: 'What kind of websites do you build?',
    answer: 'Business websites, landing and sales pages, multi-page service sites and online stores, all custom-designed and hand-coded. Timelines run from 5 to 28 days depending on size.',
  },
  {
    question: 'How is pricing handled?',
    answer: 'Each project gets a fixed quote before any work starts. If you send us regular work, we agree partner pricing that leaves room for your margin.',
  },
];

export default function Agencies({ onPageChange }: AgenciesProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const agencySchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.magolabs.in/agencies/#service',
      'name': 'White label website design and development',
      'serviceType': 'White label web development',
      'provider': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'areaServed': ['US', 'GB', 'CA', 'AU', 'NZ', 'IN'],
      'audience': { '@type': 'BusinessAudience', 'audienceType': 'Marketing and digital agencies' },
      'url': 'https://www.magolabs.in/agencies',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer },
      })),
    },
  ];

  return (
    <>
      <SEO path="agencies" schemas={agencySchemas} />

      {/* Hero */}
      <section id="agencies-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="eyebrow">For agencies</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]">
              Your white label <span className="marker">web development partner.</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              We design and build custom websites for agencies, under your brand. You keep the client and the credit. We do the work, quietly and on time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="/contact?package=Agency"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-ink hover:bg-brand-deep transition-colors"
              >
                Talk about a partnership <ArrowRight className="h-4 w-4" />
              </a>
              <PageLink
                page="work"
                onNavigate={() => navigateTo('work')}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                See our work
              </PageLink>
            </div>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section id="agency-promises" className="glow-follow relative overflow-hidden py-24 bg-neutral-950 text-white font-sans">
        <div className="cta-aurora" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="eyebrow eyebrow-on-dark">What you get</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">An extra build team, without the hiring.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMISES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
                  onPointerMove={spotlight}
                  className="spot-card group flex gap-5 sm:gap-6 p-8 rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-sm hover:border-brand/60"
                >
                  <span className="spot-number" aria-hidden="true">0{idx + 1}</span>
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-brand transition-[background-color,color,rotate] duration-300 group-hover:bg-brand group-hover:text-ink group-hover:-rotate-6">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="relative space-y-2">
                    <span className="font-mono text-xs font-bold text-brand">0{idx + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed transition-colors duration-300 group-hover:text-neutral-300">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="agency-process" className="py-24 bg-white font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="eyebrow">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">Four steps. You stay in front of the client.</h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <li key={step.title} className="rounded-2xl border border-neutral-200 p-6 space-y-3">
                <span className="font-mono text-xs font-bold text-neutral-400">0{idx + 1}</span>
                <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="agency-faq" className="py-24 bg-neutral-50 font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-4">
            <span className="eyebrow">Straight answers</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">What agencies ask first.</h2>
          </div>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
            {FAQS.map((faq) => (
              <div key={faq.question} className="py-6 space-y-2">
                <dt className="text-base sm:text-lg font-semibold text-neutral-900">{faq.question}</dt>
                <dd className="text-sm sm:text-base text-neutral-600 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <div className="border-l-4 border-brand pl-5 space-y-3">
            <p className="text-base font-semibold text-neutral-900">
              Have a project in the pipeline? Send the brief and we will reply within one business day.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <a href="/contact?package=Agency" className="inline-flex items-center gap-1.5 text-neutral-900 hover:text-neutral-600 transition-colors">
                Send a brief <ArrowRight className="h-4 w-4" />
              </a>
              <a href="mailto:burhan@magolabs.in" className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 transition-colors">
                burhan@magolabs.in
              </a>
              <a
                href={'https://wa.me/919099245605?text=' + encodeURIComponent('Hi Burhan, I run an agency and would like to talk about white label work.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
