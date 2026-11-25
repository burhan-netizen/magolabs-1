import { useState } from 'react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import { LeadMode } from '../components/LeadForm';
import Sky from '../components/home/v4/Sky';
import NightHero from '../components/home/v4/NightHero';
import LightsOn from '../components/home/v4/LightsOn';
import Switches from '../components/home/v4/Switches';
import Dawn from '../components/home/v4/Dawn';
import Morning from '../components/home/v4/Morning';
import Daylight from '../components/home/v4/Daylight';

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


export default function Home({ onPageChange, onOpenCaseStudy }: HomeProps) {

  const navigateTo = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goToAudit = () => navigateTo('contact');

  // Which starting point the form on this page shows. The "no website yet" buttons
  // switch it and bring the form into view, so the visitor never leaves the page.
  const [leadMode, setLeadMode] = useState<LeadMode>('audit');

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
    }
  ];

  return (
    <>
      <SEO path="/" schemas={homeSchemas} />

      <Sky>
        <NightHero onAudit={goToAudit} />
        <LightsOn onOpenCaseStudy={onOpenCaseStudy} onSeeWork={() => navigateTo('work')} />
        <Switches onNavigate={navigateTo} />
        <Dawn />
        <Morning />
        <Daylight mode={leadMode} onModeChange={setLeadMode} />
      </Sky>
    </>
  );
}
