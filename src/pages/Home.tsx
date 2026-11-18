import { useEffect, useState, type ReactNode } from 'react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import CountUp from '../components/CountUp';
import Price from '../components/Price';
import { PACKAGES } from '../data/packages';
import { getWorkDetailPath } from '../utils/pageRoutes';

/* ---------------------------------------------------------------------------
   Mago Labs homepage, "Studio Ink" redesign.
   Story order: promise and proof, the problem, the work, the results, who it is
   for, how it works, why us, prices, the founder, reviews, questions, next step.
   House style: short sentences, plain words, written to "you". No em dashes.
--------------------------------------------------------------------------- */

const GOOGLE_PROFILE = 'https://maps.app.goo.gl/fnTiihMdcem2z4fn7';

interface HomeProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

const PROBLEMS = [
  { title: 'Visitors can’t tell what you do', desc: 'So they leave before they call, and you never know they were there.' },
  { title: 'Nothing proves you’re good', desc: 'No reviews, results or real work on the page means no reason to trust you.' },
  { title: 'It looks older than your business', desc: 'Next to a competitor’s new site, a dated one quietly costs you the job.' },
  { title: 'Google can’t find you', desc: 'Or you have no website at all, and customers find the business next door.' },
];

const WORK = [
  { id: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care', tag: 'Dental, Surat', caption: 'A polished site with online booking for a new clinic. Walk-ins went from 25 to 58 patients a day within two months.' },
  { id: 'darshangalani', name: 'Darshan Galani & Co.', tag: 'CA firm', caption: 'A first website for a chartered accountancy practice. 34 new clients signed in the first three months.' },
  { id: 'jaymocivil', name: 'Jaymo Civil', tag: 'Civil, Sydney', caption: 'A website that matches the size of the jobs they take on. Builders see real work and a clear way to get a quote.' },
  { id: 'ladsonconcrete', name: 'Ladson Concrete', tag: 'Concrete, Florida', caption: 'A Jacksonville concrete contractor, with a website and Google Business Profile built to win local quotes.' },
  { id: 'centurion', name: 'Centurion Strategic Ventures', tag: 'Finance', caption: 'A loan advisory firm, presented with the credibility its clients look for before the first call.' },
  { id: 'prabhakarprocessors', name: 'Prabhakar Processors', tag: 'Textile', caption: 'A dyeing and printing mill whose old site undersold its standing, now shown the way buyers expect.' },
  { id: 'solway', name: 'SolWay Energies', tag: 'Solar', caption: 'A solar and B2B energy company, positioned for serious commercial enquiries.' },
];

const INDUSTRIES: { name: string; page?: PageId }[] = [
  { name: 'Dentists & clinics', page: 'industry-dentists' },
  { name: 'Chartered accountants', page: 'industry-ca-firms' },
  { name: 'Textile & processing', page: 'industry-textile' },
  { name: 'Manufacturing', page: 'industry-manufacturers' },
  { name: 'Financial services' },
  { name: 'Contractors & construction' },
  { name: 'Consulting & IT', page: 'industry-consultants' },
  { name: 'Solar & energy' },
  { name: 'Trading & distribution' },
  { name: 'Online stores & brands' },
];

const ALONGSIDE: { name: string; page?: PageId }[] = [
  { name: 'SEO', page: 'service-seo' },
  { name: 'Google Business Profile', page: 'service-gbp' },
  { name: 'Copywriting', page: 'service-copywriting' },
  { name: 'Social media', page: 'service-social-media' },
  { name: 'Paid ads', page: 'service-paid-ads' },
  { name: 'Lead generation', page: 'service-lead-generation' },
  { name: 'Website care' },
];

const STEPS = [
  { title: 'Free audit', desc: 'Send your site, or your business name if you don’t have one. Plain-English findings within one business day.' },
  { title: 'Fixed quote', desc: 'Scope, price and launch date agreed and signed before any work starts. No surprises later.' },
  { title: 'Design & build', desc: 'Designed and hand-coded for you, with copy written to win the call. 5 to 28 days.' },
  { title: 'Launch & support', desc: 'Hosting included, set up for Google, then 90 days of support after you go live.' },
];

const COMPARE = [
  { row: 'Designed for', us: 'Your business, from scratch', template: 'Whoever bought the theme', agency: 'Your business' },
  { row: 'Price', us: 'Fixed quote, from ₹17,999', template: 'Cheap, then add-ons', agency: 'Premium, plus retainers' },
  { row: 'Time to launch', us: '5 to 28 days', template: 'Fast, but looks like everyone', agency: 'Months' },
  { row: 'Who you talk to', us: 'The founder, directly', template: 'A support ticket', agency: 'An account manager' },
  { row: 'After launch', us: '90 days support, hosting included', template: 'You’re on your own', agency: 'Billed by the hour' },
];

const PACKAGE_DESC: Record<string, string> = {
  launch: 'Up to 5 pages. A professional presence, live in 5 days.',
  growth: 'Up to 10 pages with a content editor. Built to generate enquiries, in 14 days.',
  scale: '15+ pages. A premium presence for bigger firms, in 21 days.',
  commerce: 'An online store with up to 50 products to start, in 28 days.',
};

const REVIEWS = [
  { quote: 'It’s been just 40 days and I have already started receiving organic inquiries. Design, taste, speed, execution, everything was up to the mark.', name: 'Laxman Selukar', where: 'Google review' },
  { quote: 'He listened carefully to what we wanted, suggested smart improvements, and turned everything around faster than expected.', name: 'CA Darshan Galani', where: 'Darshan Galani & Co.' },
  { quote: 'The final website turned out even better than we expected. The team made the whole experience completely stress-free.', name: 'Smit Antala', where: 'Antala Metals' },
];

export const FAQS = [
  { q: 'What do I get in the free audit?', a: 'A short, plain-English review of your website, or of your Google presence if you have no site yet: what stops visitors from calling, how you show up on Google, and what we would fix first. It arrives within one business day and there is no obligation.' },
  { q: 'How much does a website cost?', a: 'In India, packages start at ₹17,999 (Launch), ₹29,999 (Growth), ₹49,999 (Scale) and ₹64,999 (Commerce). Overseas prices start at $799 and show in your own currency. You get a fixed quote before any work starts, and hosting is included.' },
  { q: 'How long does it take?', a: '5 days for Launch, 14 for Growth, 21 for Scale and 28 for an online store, counted from when we have your content and your sign-off on the plan.' },
  { q: 'Will my website rank on Google?', a: 'Every site is built with the SEO groundwork done properly: fast pages, clean structure, local search setup and content written around what your customers search for. Rankings still take time, and anyone who promises you the top spot is guessing. We can also run ongoing SEO if you want to push further.' },
  { q: 'Do you use templates or website builders?', a: 'No. Every site is designed for your business and hand-coded by us, so it looks like you, loads fast and is not shared with anyone else.' },
  { q: 'I don’t have a website yet. Where do I start?', a: 'Send us your business name and what you do. We will check how customers find you today and send you a simple plan for your first website, usually the Launch or Growth package.' },
  { q: 'Who writes the content?', a: 'We do, as part of the build. We talk to you about your business, then write copy built to earn trust and enquiries. You approve every word before launch.' },
  { q: 'Can I update the website myself?', a: 'Yes. Growth and the larger packages come with an easy content editor for text, photos and blog posts. On Launch, we handle small updates for you during the support period.' },
  { q: 'What happens after launch?', a: 'You get 90 days of support for fixes and small changes. After that you can move to a website care plan, or simply get in touch when you need something.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes. We work with clients in Australia, the USA, the UK, Canada and the UAE. Prices show in your own currency and calls happen at a time that suits you.' },
  { q: 'Can you help with SEO, ads and social media too?', a: 'Yes, alongside your website: SEO, Google Business Profile, copywriting, social media management, paid ads and lead generation. Ask us for pricing on any of these.' },
];

/** Surat time, shown in the hero status line. Written after mount so the
 *  prerendered HTML and the first browser render always match. */
function useSuratTime(): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date());
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/** Fades sections up as they enter. Content is visible by default; the hidden
 *  start state only applies once this observer is running (html.st-io). */
function useReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.studio .st-reveal'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    els.forEach((el) => {
      // Anything already on screen stays put instead of flashing out and back.
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      io.observe(el);
    });
    document.documentElement.classList.add('st-io');
    return () => {
      io.disconnect();
      document.documentElement.classList.remove('st-io');
    };
  }, []);
}

function SectionHead({ num, label, children, aside }: { num: string; label: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="st-head-row">
      <div className="st-head">
        <div className="st-mono st-label">{num} · {label}</div>
        {children}
      </div>
      {aside}
    </div>
  );
}

export default function Home({ onPageChange, onOpenCaseStudy }: HomeProps) {
  const time = useSuratTime();
  const [active, setActive] = useState(2);
  useReveals();

  const go = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };
  const openCase = (id: string) => {
    onOpenCaseStudy(id);
    window.scrollTo({ top: 0 });
  };
  const activeWork = WORK[active];

  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Mago Labs',
      'description': 'Independent web design studio building custom websites for clinics, CA firms, manufacturers and contractors.',
      'image': 'https://www.magolabs.in/logo.png',
      '@id': 'https://www.magolabs.in/#localbusiness',
      'url': 'https://www.magolabs.in',
      'telephone': '+91 9099245605',
      'email': 'burhan@magolabs.in',
      'priceRange': '₹17,999 to ₹64,999',
      'hasMap': GOOGLE_PROFILE,
      'sameAs': [GOOGLE_PROFILE, 'https://www.instagram.com/magolabs.in/', 'https://www.linkedin.com/in/burhanuddinkapasi/'],
      'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '5.0', 'reviewCount': '8' },
      'areaServed': ['India', 'Australia', 'United States', 'United Kingdom', 'Canada', 'United Arab Emirates'],
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Flat 102, Salute Residency, Central Bank Lane, Nanpura',
        'addressLocality': 'Surat',
        'postalCode': '395001',
        'addressRegion': 'Gujarat',
        'addressCountry': 'IN',
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '09:00',
        'closes': '19:00',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((f) => ({ '@type': 'Question', 'name': f.q, 'acceptedAnswer': { '@type': 'Answer', 'text': f.a } })),
    },
  ];

  return (
    <div className="studio">
      <SEO path="/" schemas={homeSchemas} />

      {/* HERO */}
      <section className="st-wrap" style={{ paddingTop: 'clamp(32px, 5vw, 56px)', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div className="st-mono" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)' }}>
          <span className="st-dot" aria-hidden="true" />
          <span>Taking new projects · Surat, India{time ? ` · ${time} IST` : ''}</span>
        </div>
        <h1 className="st-h1" style={{ maxWidth: 1180 }}>
          <span className="st-line"><span>We design websites</span></span>
          <span className="st-line">
            <span>
              <span className="st-hero-thumb" aria-hidden="true">
                <img src="/screenshots/full/jaymocivil-300.webp" alt="" width={300} height={1219} />
              </span>{' '}
              people trust
            </span>
          </span>
          <span className="st-line"><span className="st-serif" style={{ color: 'var(--accent)' }}>on sight.</span></span>
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
          <p style={{ margin: 0, maxWidth: 540, fontSize: 19, lineHeight: 1.5, color: 'var(--body)' }}>
            Mago Labs is an independent web design studio. We design and build custom websites for clinics, CA firms, manufacturers and contractors in India, Australia, the USA, the UK, Canada and the UAE, and judge every one by the enquiries it brings in.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="#audit" className="st-btn st-btn-primary">Get a free website audit <span className="st-arrow" aria-hidden="true">→</span></a>
            <a href="#work" className="st-btn st-btn-ghost">See the work</a>
          </div>
        </div>
      </section>

      {/* RECENT WORK FRAMES */}
      <section aria-label="Recent websites" className="st-wrap" style={{ paddingBottom: 64 }}>
        <div className="st-frames">
          {[
            { id: 'drmihirshah', src: '/screenshots/drmihirshah.webp', alt: 'Dr. Mihir Shah Smile Care Clinic website by Mago Labs', cap: 'Dental · Surat', cls: 'left' },
            { id: 'jaymocivil', src: '/screenshots/jaymocivil-1920.webp', alt: 'Jaymo Civil website by Mago Labs', cap: 'Excavation & civil · Sydney', cls: '' },
            { id: 'ladsonconcrete', src: '/screenshots/ladsonconcrete.webp', alt: 'Ladson Concrete website by Mago Labs', cap: 'Concrete · Jacksonville, FL', cls: 'right' },
          ].map((f) => (
            <figure key={f.id} className={`st-frame ${f.cls}`}>
              <PageLink href={getWorkDetailPath(f.id)} onNavigate={() => openCase(f.id)} className="st-frame-box" aria-label={`${f.cap} case study`}>
                <div className="st-frame-bar" aria-hidden="true"><i /><i /><i /></div>
                <img src={f.src} alt={f.alt} width={900} height={562} loading={f.cls ? 'lazy' : 'eager'} decoding="async" />
              </PageLink>
              <figcaption className="st-mono" style={{ color: 'var(--muted)' }}>{f.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section aria-label="Studio in numbers" className="st-wrap st-section" style={{ paddingTop: 56 }}>
        <div className="st-g4 st-reveal" style={{ borderTop: '1px solid var(--ink)', paddingTop: 24 }}>
          <div><div className="st-stat-num"><CountUp to={75} />+</div><div className="st-stat-label">Businesses helped across 10 industries</div></div>
          <div><div className="st-stat-num">5 to 28</div><div className="st-stat-label">Days from kickoff to launch</div></div>
          <div><div className="st-stat-num">5.0</div><div className="st-stat-label"><a className="st-link" href={GOOGLE_PROFILE} target="_blank" rel="noopener">On Google, from 8 reviews ↗</a></div></div>
          <div><div className="st-stat-num">6</div><div className="st-stat-label">Countries: India, Australia, USA, UK, Canada, UAE</div></div>
        </div>
      </section>

      {/* PROBLEM */}
      <section aria-labelledby="problem-h" className="st-wrap st-section">
        <div className="st-split">
          <div className="st-head st-reveal">
            <div className="st-mono st-label">01 · The problem</div>
            <h2 id="problem-h" className="st-h2">Your website is the first meeting. Most lose it in <span className="st-serif" style={{ color: 'var(--accent)' }}>five seconds.</span></h2>
          </div>
          <ol className="st-list st-reveal">
            {PROBLEMS.map((p, i) => (
              <li key={p.title}>
                <span className="st-mono" style={{ color: 'var(--muted)' }}>0{i + 1}</span>
                <div><h3>{p.title}</h3><p>{p.desc}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <p className="st-reveal" style={{ margin: '40px 0 0', fontSize: 17, color: 'var(--body)' }}>
          No website yet? <a href="#audit" className="st-link">Get a free plan for your first one →</a>
        </p>
      </section>

      {/* SELECTED WORK */}
      <section id="work" aria-labelledby="work-h" className="st-section">
        <div className="st-panel st-on-dark st-reveal">
          <div className="st-wrap">
            <SectionHead
              num="02"
              label="Selected work"
              aside={<PageLink page="work" onNavigate={() => go('work')} className="st-btn st-btn-primary st-btn-sm">See all 14 projects <span className="st-arrow" aria-hidden="true">→</span></PageLink>}
            >
              <h2 id="work-h" className="st-h2">Work that <span className="st-serif">earns its keep.</span></h2>
            </SectionHead>
            <div className="st-split" style={{ alignItems: 'start' }}>
              <ol className="st-work-list">
                {WORK.map((w, i) => (
                  <li key={w.id}>
                    <PageLink
                      href={getWorkDetailPath(w.id)}
                      onNavigate={() => openCase(w.id)}
                      className={`st-work-item${i === active ? ' active' : ''}`}
                    >
                      <span className="st-mono num" onMouseEnter={() => setActive(i)}>0{i + 1}</span>
                      <span className="name" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>{w.name}</span>
                      <span className="st-mono tag">{w.tag}</span>
                    </PageLink>
                  </li>
                ))}
              </ol>
              <div className="st-work-preview-col">
                <PageLink href={getWorkDetailPath(activeWork.id)} onNavigate={() => openCase(activeWork.id)} className="st-preview" aria-label={`${activeWork.name} case study`}>
                  {WORK.map((w, i) => (
                    <img
                      key={w.id}
                      className={i === active ? 'on' : undefined}
                      src={`/screenshots/full/${w.id}.webp`}
                      alt={i === active ? `${w.name} website, designed by Mago Labs` : ''}
                      width={560}
                      height={2275}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                  <span className="st-pill st-mono">View case study</span>
                </PageLink>
                <div className="st-work-cap" aria-live="polite">
                  <span style={{ maxWidth: 460 }}>{activeWork.caption}</span>
                  <span className="st-mono" style={{ color: 'var(--muted-dark)' }}>{activeWork.tag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section aria-labelledby="results-h" className="st-wrap st-section">
        <SectionHead num="03" label="Results">
          <h2 id="results-h" className="st-h2" style={{ maxWidth: 900 }}>Pretty is the minimum. <span className="st-serif" style={{ color: 'var(--accent)' }}>Enquiries</span> are the point.</h2>
        </SectionHead>
        <div className="st-g3 st-reveal">
          <div className="st-result">
            <div className="st-result-num">25<span style={{ color: 'var(--accent)' }}>→</span><CountUp from={25} to={58} duration={1.6} /></div>
            <p>Patients a day at Dr. Mihir Shah’s new clinic, within two months of launch.</p>
            <PageLink href={getWorkDetailPath('drmihirshah')} onNavigate={() => openCase('drmihirshah')} className="st-link">Read the case study →</PageLink>
          </div>
          <div className="st-result">
            <div className="st-result-num">+<CountUp to={63} />%</div>
            <p>More appointment calls for the same clinic, which also started showing up in Google searches.</p>
            <PageLink href={getWorkDetailPath('drmihirshah')} onNavigate={() => openCase('drmihirshah')} className="st-link">Read the case study →</PageLink>
          </div>
          <div className="st-result">
            <div className="st-result-num"><CountUp to={34} /></div>
            <p>New clients in three months for Darshan Galani &amp; Co., a CA firm that had never had a website.</p>
            <PageLink href={getWorkDetailPath('darshangalani')} onNavigate={() => openCase('darshangalani')} className="st-link">Read the case study →</PageLink>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" aria-labelledby="ind-h" className="st-wrap st-section">
        <SectionHead
          num="04"
          label="Who we build for"
          aside={<p style={{ margin: 0, maxWidth: 420, fontSize: 16, lineHeight: 1.5, color: 'var(--muted)' }}>Each industry wins trust differently. A clinic needs calm and credentials, a contractor needs proof of the work. We design for that.</p>}
        >
          <h2 id="ind-h" className="st-h2">75+ businesses. <span className="st-serif">10 industries.</span></h2>
        </SectionHead>
        <div className="st-g5 st-reveal">
          {INDUSTRIES.map((ind, i) => {
            const inner = (
              <>
                <span className="st-mono n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{ind.name}</span>
              </>
            );
            return ind.page ? (
              <PageLink key={ind.name} page={ind.page} onNavigate={() => go(ind.page as PageId)} className="st-ind">{inner}</PageLink>
            ) : (
              <div key={ind.name} className="st-ind">{inner}</div>
            );
          })}
        </div>
        <div className="st-reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', fontSize: 15, color: 'var(--muted)', marginTop: 32 }}>
          <span>Alongside every website:</span>
          {ALONGSIDE.map((s) =>
            s.page ? (
              <PageLink key={s.name} page={s.page} onNavigate={() => go(s.page as PageId)} className="st-chip">{s.name}</PageLink>
            ) : (
              <span key={s.name} className="st-chip">{s.name}</span>
            )
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section aria-labelledby="proc-h" className="st-wrap st-section">
        <SectionHead num="05" label="How it works">
          <h2 id="proc-h" className="st-h2">From first call to live site in <span className="st-serif" style={{ color: 'var(--accent)' }}>four steps.</span></h2>
        </SectionHead>
        <ol className="st-g4 st-steps st-reveal">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`st-step${i === 3 ? ' dark' : ''}`}>
              <span className="st-mono" style={{ color: i === 3 ? 'var(--accent-on-dark)' : 'var(--muted)' }}>{i + 1}/4</span>
              <div><h3>{s.title}</h3><p>{s.desc}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* COMPARISON */}
      <section aria-labelledby="cmp-h" className="st-wrap st-section">
        <SectionHead num="06" label="Why Mago Labs">
          <h2 id="cmp-h" className="st-h2">Agency craft. <span className="st-serif">Studio attention.</span></h2>
        </SectionHead>
        <div className="st-cmp st-reveal" tabIndex={0} aria-label="Comparison table, scrolls sideways on small screens">
          <table>
            <thead>
              <tr>
                <td />
                <th scope="col" className="us">Mago Labs</th>
                <th scope="col" className="them">Template site</th>
                <th scope="col" className="them">Big agency</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.row}>
                  <th scope="row">{r.row}</th>
                  <td className="us">{r.us}</td>
                  <td className="them">{r.template}</td>
                  <td className="them">{r.agency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" aria-labelledby="price-h" className="st-wrap st-section">
        <SectionHead
          num="07"
          label="Pricing"
          aside={<p style={{ margin: 0, maxWidth: 360, fontSize: 15, lineHeight: 1.5, color: 'var(--muted)' }}>Every package is custom designed and includes hosting. Prices show in your own currency.</p>}
        >
          <h2 id="price-h" className="st-h2">Clear prices. <span className="st-serif">Fixed before we start.</span></h2>
        </SectionHead>
        <div className="st-g4 st-reveal">
          {PACKAGES.map((p) => (
            <PageLink key={p.id} page="pricing" onNavigate={() => go('pricing')} className={`st-price${p.id === 'growth' ? ' featured' : ''}`}>
              <span className="st-mono" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: p.id === 'growth' ? undefined : 'var(--muted)' }}>
                {p.number} · {p.name}
                {p.id === 'growth' && <span className="st-badge">Most picked</span>}
              </span>
              <span>
                <span className="from" style={{ display: 'block' }}>from</span>
                <span className="amt"><Price pkg={p} /></span>
              </span>
              <span className="desc">{PACKAGE_DESC[p.id]}</span>
            </PageLink>
          ))}
        </div>
        <p className="st-reveal" style={{ margin: '28px 0 0', fontSize: 16, color: 'var(--body)' }}>
          Need something specific? <PageLink page="pricing" onNavigate={() => go('pricing')} className="st-link">Compare packages and add-ons →</PageLink>
        </p>
      </section>

      {/* FOUNDER */}
      <section id="about" aria-labelledby="founder-h" className="st-wrap st-section">
        <div className="st-split st-founder st-reveal">
          <img src="/burhan-founder.jpg" alt="Burhan Kapasi, founder of Mago Labs" width={768} height={960} loading="lazy" decoding="async" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div className="st-mono st-label">08 · A note from the founder</div>
            <h2 id="founder-h" style={{ margin: 0, fontSize: 'clamp(30px, 3.4vw, 48px)', lineHeight: 1.05 }}>Most good businesses are better than they <span className="st-serif" style={{ color: 'var(--accent)' }}>look online.</span></h2>
            <p>I spent eight years in banking, fintech and insurance before starting Mago Labs. I saw strong businesses lose deals because their website made them look small. That’s what we fix.</p>
            <p>The studio stays small on purpose. You talk to me from the first call to launch, and every site is designed for one job: make the right people trust you enough to get in touch.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
              <span className="st-serif" style={{ fontSize: 34 }} aria-hidden="true">Burhan</span>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.4 }}>Burhan Kapasi<br />Founder, Mago Labs</span>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section aria-labelledby="rev-h" className="st-wrap st-section">
        <SectionHead
          num="09"
          label="Clients"
          aside={<a href={GOOGLE_PROFILE} target="_blank" rel="noopener" className="st-link" style={{ fontSize: 15 }}>Read all 8 Google reviews ↗</a>}
        >
          <h2 id="rev-h" className="st-h2">5.0 on Google. <span className="st-serif">In their words.</span></h2>
        </SectionHead>
        <div className="st-g3 st-reveal">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="st-review">
              <div>
                <div className="st-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote style={{ marginTop: 14 }}>“{r.quote}”</blockquote>
              </div>
              <figcaption><b>{r.name}</b> · {r.where}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-h" className="st-wrap st-section">
        <div className="st-split">
          <div className="st-head st-reveal" style={{ alignSelf: 'start' }}>
            <div className="st-mono st-label">10 · Questions</div>
            <h2 id="faq-h" className="st-h2">Straight <span className="st-serif">answers.</span></h2>
          </div>
          <div className="st-faq st-reveal">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}<span className="pm" aria-hidden="true">+</span></summary>
                <p className="ans">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
