import { ArrowUpRight, ArrowRight, MessageCircle, PencilRuler, Target, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import { spotlight } from '../utils/tilt';

interface AboutProps {
  onPageChange: (page: PageId) => void;
}

// The four things we hold to on every project.
const PRINCIPLES = [
  {
    title: 'Results over looks',
    icon: Target,
    desc: 'A website is measured by the calls, bookings and WhatsApp messages it brings in, not by how it looks in a portfolio.',
  },
  {
    title: 'Plain speaking',
    icon: MessageCircle,
    desc: 'We reply quickly, explain things without jargon, and tell you when something is not worth paying for.',
  },
  {
    title: 'Built from scratch',
    icon: PencilRuler,
    desc: 'Every project starts from a blank canvas. No templates, no page builders, nothing recycled from the last client.',
  },
  {
    title: 'Fast by default',
    icon: Zap,
    desc: 'Lightweight, hand-written code that loads quickly on any phone and any network.',
  },
];

export default function About({ onPageChange }: AboutProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const aboutSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://www.magolabs.in/about/#webpage',
      'url': 'https://www.magolabs.in/about',
      'name': 'About Mago Labs and Founder Burhan Kapasi',
      'description': 'Mago Labs is a founder-led website design and development studio in Surat, run by Burhan Kapasi.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.magolabs.in/#founder',
      'name': 'Burhan Kapasi',
      'jobTitle': 'Founder',
      'worksFor': { '@id': 'https://www.magolabs.in/#localbusiness' },
      'image': 'https://www.magolabs.in/burhan-founder.jpg',
      'sameAs': ['https://www.linkedin.com/in/burhanuddinkapasi/']
    }
  ];

  return (
    <>
      <SEO path="about" schemas={aboutSchemas} />

      {/* Hero Header */}
      <section id="about-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="eyebrow">About</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12]">
              A small studio that treats your website like <span className="marker">its own.</span>
            </h1>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Mago Labs is a founder-led website design and development studio in Surat. We build websites that earn trust and bring enquiries, for businesses in India and abroad.
            </p>
          </div>
        </div>
      </section>

      {/* Founder letter */}
      <section id="founder-bio" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-32">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-neutral-200">
                <img
                  src="/burhan-founder.jpg"
                  alt="Burhan Kapasi, founder of Mago Labs"
                  width={768}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-5 py-4 rounded-xl border border-neutral-100">
                  <h3 className="text-base font-semibold text-neutral-900">Burhan Kapasi</h3>
                  <p className="text-xs text-neutral-500 font-medium">Founder, Mago Labs</p>
                  <a href="tel:+919099245605" className="block text-xs text-neutral-900 font-semibold mt-1.5">+91 9099245605</a>
                  <a
                    href="https://www.linkedin.com/in/burhanuddinkapasi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 font-semibold mt-1.5 transition-colors"
                  >
                    View on LinkedIn <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Letter */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="eyebrow">From the founder</span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                  I&rsquo;ll be straight with you.
                </h2>
              </div>

              <div className="space-y-5 text-neutral-600 text-base leading-relaxed">
                <p>
                  Hi, I&rsquo;m <strong className="text-neutral-900">Burhan Kapasi</strong>. Before Mago Labs I spent eight years in banking, fintech and insurance, working with business owners every day. For the last two of those years I built websites on the side, because I could not stop noticing how many good businesses looked worse online than they were in person.
                </p>
                <p>
                  The pattern was always the same. A doctor with 25 years of experience and no way for a new patient to see it. A manufacturer trusted across the industry, with a website that looked abandoned. A CA firm that prospective clients had no way to check before calling.
                </p>
                <p>
                  People buy from businesses they trust, and today that trust is decided online, often within seconds. So in 2026 I made this my full-time work.
                </p>
                <p>
                  I get attached to the projects I take on, and I give each one everything, whatever its size. When a client is happy enough to send someone else our way, that is the win I care about.
                </p>
              </div>

              <div className="border-l-4 border-brand pl-5 space-y-1.5">
                <p className="text-base font-semibold text-neutral-900">
                  No account manager. No sales handoff. You work directly with the founder.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  From the first conversation to launch, your project stays with the person responsible for the strategy, the design and the code.
                </p>
              </div>

              <div className="pt-2">
                <PageLink
                  page="contact"
                  onNavigate={() => navigateTo('contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-ink hover:bg-brand-deep transition-colors cursor-pointer"
                >
                  Get a free website audit
                  <ArrowRight className="h-4 w-4" />
                </PageLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="values-grid" className="glow-follow relative overflow-hidden py-24 bg-neutral-950 text-white font-sans">
        <div className="cta-aurora" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-4">
            <span className="eyebrow eyebrow-on-dark">How we work</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">Four things we do not compromise on.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
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
                    <h3 className="text-lg font-semibold text-white">{val.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed transition-colors duration-300 group-hover:text-neutral-300">{val.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The standard we hold ourselves to */}
      <section id="commitment-quote" className="py-24 bg-neutral-50 font-sans border-b border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="eyebrow">Our promise</span>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-[1.2]">
            If a feature will not help you win enquiries, we will tell you not to pay for it.
          </blockquote>
          <p className="text-base text-neutral-600 leading-relaxed max-w-2xl">
            We work as an extension of your business, not as a vendor chasing a bigger invoice. A website is the start of a working relationship, not a one-off transaction.
          </p>
          <p className="text-sm font-semibold text-neutral-900">Burhan Kapasi, Founder of Mago Labs</p>
        </div>
      </section>
    </>
  );
}
