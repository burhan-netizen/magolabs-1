import { Target, Eye, ShieldAlert, CheckCircle2, Award, Heart, MessageSquare, ShieldCheck, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';

interface AboutProps {
  onPageChange: (page: PageId) => void;
}

export default function About({ onPageChange }: AboutProps) {
  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    {
      title: 'Obsessive ROI Focus',
      desc: 'We do not define a website simply by its aesthetics, but by its performance: the calls, bookings, or WhatsApp queries it generates for your business.',
      icon: Target,
    },
    {
      title: 'Human-to-Human Clarity',
      desc: 'Bespoke copywriting with authentic messaging. We speak directly, respond promptly, and keep you deeply involved in every design phase.',
      icon: Heart,
    },
    {
      title: 'Bespoke Engineering',
      desc: 'We start each project from a clean slate. No restrictive pre-made frameworks or slow page builders, just pristine design tailored specifically to your brand.',
      icon: ShieldAlert,
    },
    {
      title: 'Clean Performance & Speed',
      desc: 'We write lightweight, highly optimized code for lightning-fast load times across all mobile networks, ensuring zero customer drop-offs.',
      icon: Award,
    },
  ];

  const aboutSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://www.magolabs.in/about/#webpage',
      'url': 'https://www.magolabs.in/about',
      'name': 'About Mago Labs and Founder Burhan Kapasi',
      'description': 'Learn more about Burhan Kapasi, founder of Mago Labs website design agency, and our mission to build ROI-focused websites.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Burhan Kapasi',
      'jobTitle': 'Founder',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Mago Labs',
        'url': 'https://www.magolabs.in'
      },
      'image': 'https://www.magolabs.in/burhan-founder.jpg'
    }
  ];

  return (
    <>
      <SEO
        title="About Mago Labs | Why Businesses in Surat Choose Us"
        description="Meet Burhan Kapasi, founder of Mago Labs. See why doctors, CA firms, manufacturers, and MSMEs trust us: 100% custom websites, transparent pricing, and direct personal support."
        path="about"
        schemas={aboutSchemas}
      />

      {/* Hero Header */}
      <section id="about-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none opacity-60" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Story</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              We Help Businesses Grow Online. No Gimmicks. No Clichés.
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Based in India, Mago Labs was built around a single, simple idea: Local businesses deserve top-tier, premium web engineering that actually generates revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Bio */}
      <section id="founder-bio" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-32">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
                <img
                  src="/burhan-founder.jpg"
                  alt="Burhan Kapasi - Founder of Mago Labs"
                  width={768}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-5 py-4 rounded-xl border border-neutral-100 shadow-sm">
                  <h3 className="text-base font-bold text-neutral-900">Burhan Kapasi</h3>
                  <p className="text-xs text-neutral-500 font-medium">Founder & Web Consultant</p>
                  <p className="text-[11px] text-blue-600 font-semibold mt-1">Direct: +91 9099245605</p>
                  <a
                    href="https://www.linkedin.com/in/burhanuddinkapasi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-blue-600 font-semibold mt-1.5 transition-colors"
                  >
                    View on LinkedIn <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Biography Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Founder's Passion</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
                  "Every growing business deserves a bespoke digital presence engineered for real commercial success."
                </h2>
              </div>

              <div className="space-y-6 text-neutral-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Hi, I'm <strong>Burhan Kapasi</strong>. My journey started with a deep love for digital problem-solving and a realization: ambitious doctors, manufacturing enterprises, real estate consultants, and CA firms need more than just standard layouts. They need custom-built digital assets engineered to command authority and capture real enquiries.
                </p>
                <p>
                  At <strong>Mago Labs</strong>, we hold ourselves to a higher standard. We write lightweight code, design from the ground up, and draft compelling, human-centered copywriting that resonates immediately with your target audience.
                </p>
                <p>
                  What sets us apart is our absolute focus on your <strong>Return on Investment (ROI)</strong>. We analyze your commercial goals, study how your customers make decisions, and construct a high-converting web pipeline that translates traffic into tangible revenue.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/50 space-y-1.5">
                <p className="text-sm font-bold text-neutral-900">
                  No account manager. No sales handoff. You work directly with the founder.
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  From the first conversation to the final launch, your project stays close to the person responsible for the strategy, design, and technical direction.
                </p>
              </div>

              {/* Belief Checklist */}
              <div className="pt-4 border-t border-neutral-100 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700 font-medium">
                    <strong>Technical Excellence</strong>: We let our superior load speeds, pixel-perfect layouts, and actual client conversions speak for themselves.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700 font-medium">
                    <strong>Direct, High-Touch Advisory</strong>: You have direct access to our core strategists via call or WhatsApp. No support ticket queues or runarounds.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700 font-medium">
                    <strong>Genuine Growth Partner</strong>: We deeply align our designs with your broader commercial model, prioritizing what actually drives client acquisition.
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
                >
                  Let's Discuss Your Project
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section id="values" className="py-24 bg-neutral-50 font-sans border-y border-neutral-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Mission */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              className="p-8 rounded-2xl bg-white border border-neutral-200/60 shadow-sm space-y-4 cursor-default"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                To empower professional service providers, clinical practices, and growing enterprises with custom-built digital assets that cultivate instant authority, maximize engagement, and convert interest into valuable client relationships.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              className="p-8 rounded-2xl bg-white border border-neutral-200/60 shadow-sm space-y-4 cursor-default"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Our Vision</h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
To set the benchmark for high-performance design and growth advisory, showing businesses that technical precision, thoughtful visual design, and dedicated personal service are what actually drive long-term digital success.
              </p>
            </motion.div>

            {/* Commitment */}
            <motion.div
              whileHover={{ scale: 1.025, y: -2 }}
              className="p-8 rounded-2xl bg-white border border-neutral-200/60 shadow-sm space-y-4 cursor-default"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Our Values</h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                We believe in uncompromising strategic transparency, hand-crafted engineering, high-converting copy, and cultivating enduring partnerships founded on verifiable business growth.
              </p>
            </motion.div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-4 pt-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">How We Stand Apart</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              We do not treat you like a number. We act as an extension of your business. If a feature does not help you get client enquiries, we will openly advise you against paying for it.
            </p>
          </div>
        </div>
      </section>

      {/* Reusable Core Values Grid */}
      <section id="values-grid" className="py-24 bg-white font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Core Beliefs</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">What Drives Every Line of Code</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.025, y: -2 }}
                  className="flex gap-6 p-8 rounded-2xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 transition-all cursor-default"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-neutral-900">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Honest Comparison, merged in from the former standalone Why Choose Us page */}
      <section id="honest-comparison" className="py-24 bg-neutral-50 border-y border-neutral-200/50 font-sans">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center justify-center gap-1">
                <ShieldCheck className="h-4.5 w-4.5 text-blue-600" />
                Our Honest Code
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                How We Work Differently
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              {/* Standard Agencies */}
              <div className="space-y-4 bg-red-50/20 p-6 rounded-2xl border border-red-100/40">
                <h3 className="text-base font-bold text-red-600 uppercase tracking-wide">Typical Agencies</h3>
                <ul className="space-y-3 text-sm text-neutral-600">
                  {[
                    'Rely on slow, plug-in-heavy website builders.',
                    'Use visual templates that make every client look similar.',
                    'Fill pages with generic, AI-sounding copy.',
                    'Hand your project off to a rotating support queue.',
                    'Restrict your access to your own domain and code.'
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="text-red-500 font-bold shrink-0">&times;</span>
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
                      <span className="text-emerald-600 font-bold shrink-0">&#10003;</span>
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
