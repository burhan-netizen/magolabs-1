import { Handshake, KeyRound, CalendarCheck, Layers, CreditCard, UserCheck, MessageSquare, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';

interface WhyChooseUsProps {
  onPageChange: (page: PageId) => void;
}

export default function WhyChooseUs({ onPageChange }: WhyChooseUsProps) {
  const commitments = [
    {
      title: 'Straight Answers, Even When It Costs Us',
      desc: "If a feature you're asking for won't actually help your business, we'll tell you honestly instead of quietly billing for it. Our advice is built around your growth, not our invoice.",
      icon: Handshake,
    },
    {
      title: 'You Own Everything, No Lock-In',
      desc: 'Your domain, source code, and content belong to you from day one. No held-hostage hosting, no ransom fees if you ever want to leave.',
      icon: KeyRound,
    },
    {
      title: 'Timelines We Actually Hit',
      desc: 'We agree on a realistic launch date upfront and build to it, no vanishing for weeks or endless "almost done" updates.',
      icon: CalendarCheck,
    },
    {
      title: 'Built to Grow With You',
      desc: 'Your first version is a foundation, not a finish line. As your business expands, we add pages and features without a costly rebuild from scratch.',
      icon: Layers,
    },
    {
      title: 'Flat Upfront Quotes',
      desc: 'No confusing monthly retainers, no hidden setup fees, and zero markup on server hosting. You receive an itemized upfront quote and retain 100% file ownership.',
      icon: CreditCard,
    },
    {
      title: 'Work Directly with Founder',
      desc: 'Speak directly with Burhan Kapasi throughout your project. No clueless junior account managers or endless support ticket pipelines, just fast developer answers.',
      icon: UserCheck,
    },
    {
      title: 'Zero Complicated Tech Jargon',
      desc: 'We communicate in clear, honest business terms. We respond to your WhatsApp messages and phone calls promptly, keeping you fully informed and confident.',
      icon: MessageSquare,
    },
    {
      title: 'Ongoing Growth Support',
      desc: 'We don\'t just launch your site and disappear. We monitor page speeds, ensure Google index requests are successful, and provide help as your business expands.',
      icon: Compass,
    },
  ];

  const whyChooseUsSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://www.magolabs.in/why-choose-us/#webpage',
      'url': 'https://www.magolabs.in/why-choose-us',
      'name': 'Why Choose Mago Labs | Transparent Website Agency',
      'description': 'Discover our agency commitments: 100% custom web design, direct personal support, mobile-first layouts, and absolute pricing transparency.'
    }
  ];

  return (
    <>
      <SEO
        title="Why Choose Mago Labs | Premium Custom Web Agency"
        description="Learn why doctors, CA firms, Manufacturers, and MSMEs trust Mago Labs. 100% custom website designs, mobile-first optimization, transparent pricing, and personal support."
        path="why-choose-us"
        schemas={whyChooseUsSchemas}
      />

      {/* Hero Header */}
      <section id="why-choose-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Commitments</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Honest Engineering. Absolute Transparency.
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              We do not rely on fake marketing claims or artificial awards. We earn client trust by designing websites that help their businesses grow organically.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Commitments */}
      <section id="commitments-grid" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                  whileHover={{ y: -5, scale: 1.01, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                  className="p-8 rounded-2xl border border-neutral-200/60 bg-neutral-50/25 hover:bg-white hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/30 transition-all space-y-4 cursor-default"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 + 0.2, ease: 'easeOut' }}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-neutral-900 leading-tight">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Truth Statement Section */}
      <section id="honest-comparison" className="py-24 bg-neutral-50 border-y border-neutral-200/50 font-sans">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center justify-center gap-1">
                <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />
                Our Honest Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                How We Stand Apart From Mass-Market Agencies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              {/* Cheap Agencies */}
              <div className="space-y-4 bg-red-50/20 p-6 rounded-2xl border border-red-100/40">
                <h3 className="text-base font-bold text-red-600 uppercase tracking-wide">Standard Agencies</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  {[
                    'Use slow, bloated WordPress builders loaded with plug-ins.',
                    'Copy-paste visual templates that make you look generic.',
                    'Write text using generic AI patterns that sound empty.',
                    'Pass your project to junior, non-responsive support reps.',
                    'Hide domain control or demand massive annual maintenance.'
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Mago Labs */}
              <div className="space-y-4 bg-emerald-50/20 p-6 rounded-2xl border border-emerald-100/40">
                <h3 className="text-base font-bold text-emerald-600 uppercase tracking-wide">Mago Labs</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  {[
                    'Write pixel-perfect, custom clean code for maximum speed.',
                    'Create a fully customized sitemap built for your ideal buyer.',
                    'Draft high-converting human copy tailored around real problems.',
                    'Get direct personal WhatsApp & Call support from the founder.',
                    'Deliver complete ownership of domain, code, and servers.'
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Quote */}
      <section id="commitment-quote" className="py-20 bg-white font-sans text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <blockquote className="text-lg sm:text-xl font-medium text-neutral-800 leading-relaxed max-w-2xl mx-auto">
            "A website is not a single transaction. It is an ongoing growth partnership. Our commitment is to ensure your site is secure, fast, and constantly ready to convert search queries into client enquiries."
          </blockquote>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Burhan Kapasi, Founder of Mago Labs</p>
        </div>
      </section>
    </>
  );
}
