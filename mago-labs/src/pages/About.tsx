import { Target, Eye, ShieldAlert, CheckCircle2, Award, Heart, MessageSquare } from 'lucide-react';
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
        title="About Burhan Kapasi & Mago Labs | ROI-Driven Website Agency"
        description="Meet Burhan Kapasi, founder of Mago Labs. We build high-performing, custom websites for doctors, Manufacturers, CA firms, and local businesses with an obsession for ROI."
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
                  At <strong>Mago Labs</strong>, we elevate the digital standard. We write lightweight code, design from the ground up, and draft compelling, human-centered copywriting that resonates immediately with your target audience.
                </p>
                <p>
                  What sets us apart is our absolute focus on your <strong>Return on Investment (ROI)</strong>. We analyze your commercial goals, study how your customers make decisions, and construct a high-converting web pipeline that translates traffic into tangible revenue.
                </p>
                <p>
                  When you partner with us, you work directly with experts. I personally conduct your business audit, structure your information architecture, and collaborate with you from first concept to final launch. We build more than just websites. We build long-term engines for growth.
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
                To set the benchmark for high-performance design and growth advisory, showing companies globally that technical precision, bespoke visual styling, and dedicated personal service are the true cornerstones of digital dominance.
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
    </>
  );
}
