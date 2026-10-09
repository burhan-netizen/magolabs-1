import { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import { XLogo } from './BrandIcons';
import { PageId } from '../types';
import PageLink from './PageLink';

interface FooterProps {
  onPageChange: (page: PageId) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const [logoError, setLogoError] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: PageId) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/burhanuddinkapasi/', label: 'LinkedIn' },
    { icon: XLogo, href: 'https://x.com/bkapasi72', label: 'X (Twitter)' },
    { icon: Instagram, href: 'https://www.instagram.com/magolabs.in/', label: 'Instagram' },
  ];

  return (
    <footer id="main-footer" className="bg-white dark:bg-[#1A1A1A] text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-12 font-sans transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <PageLink page="home"
              onNavigate={() => handleLinkClick('home')}
              className="flex items-center focus:outline-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Mago Labs Logo"
                  width={300}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-auto object-contain dark:invert select-none"
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex items-center bg-neutral-950 dark:bg-black px-4 py-2 rounded-xl border border-neutral-800/80 shadow-md">
                  <span className="font-sans font-extrabold text-white tracking-tight text-lg">
                    Mago
                  </span>
                  <span className="font-sans font-light text-neutral-200/90 tracking-tight text-lg">
                    labs
                  </span>
                </div>
              )}
            </PageLink>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-xs">
              Custom websites, designed and hand-coded to bring you enquiries. No templates.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 dark:hover:border-neutral-700 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-6">Websites</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <PageLink page="service-web-design"
                  onNavigate={() => handleLinkClick('service-web-design')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  Website design &amp; development
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </PageLink>
              </li>
              <li>
                <PageLink page="pricing" onNavigate={() => handleLinkClick('pricing')} className="hover:text-neutral-900 dark:hover:text-white transition-colors text-left">
                  Packages and pricing
                </PageLink>
              </li>
              <li>
                <PageLink page="industry-dentists" onNavigate={() => handleLinkClick('industry-dentists')} className="hover:text-neutral-900 dark:hover:text-white transition-colors text-left">
                  For dentists and clinics
                </PageLink>
              </li>
              <li>
                <PageLink page="industry-ca-firms" onNavigate={() => handleLinkClick('industry-ca-firms')} className="hover:text-neutral-900 dark:hover:text-white transition-colors text-left">
                  For CA firms
                </PageLink>
              </li>
              <li>
                <PageLink page="industry-manufacturers" onNavigate={() => handleLinkClick('industry-manufacturers')} className="hover:text-neutral-900 dark:hover:text-white transition-colors text-left">
                  For manufacturers
                </PageLink>
              </li>
              <li className="pt-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Alongside your website</li>
              <li>
                <PageLink page="service-seo"
                  onNavigate={() => handleLinkClick('service-seo')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  SEO
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </PageLink>
              </li>
              <li>
                <PageLink page="service-gbp"
                  onNavigate={() => handleLinkClick('service-gbp')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  Google Business Profile
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </PageLink>
              </li>
              <li>
                <PageLink page="service-copywriting"
                  onNavigate={() => handleLinkClick('service-copywriting')}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 group text-left"
                >
                  Copywriting
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </PageLink>
              </li>
            </ul>
          </div>

          {/* Agency Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <PageLink page="about" onNavigate={() => handleLinkClick('about')} className="hover:text-neutral-900 dark:hover:text-white transition-colors text-left">
                  About
                </PageLink>
              </li>
              <li>
                <PageLink page="work" onNavigate={() => handleLinkClick('work')} className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 text-left">
                  Work
                </PageLink>
              </li>
              <li>
                <PageLink page="pricing" onNavigate={() => handleLinkClick('pricing')} className="hover:text-neutral-900 dark:hover:text-white transition-colors text-left">
                  Pricing
                </PageLink>
              </li>
              <li>
                <PageLink page="insights" onNavigate={() => handleLinkClick('insights')} className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 text-left">
                  Insights
                </PageLink>
              </li>
              <li>
                <PageLink page="contact" onNavigate={() => handleLinkClick('contact')} className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2 text-left">
                  Contact
                </PageLink>
              </li>
              <li>
                {/* The separate site for trades businesses abroad. A plain link so it
                    also helps search engines find and connect the two sites. */}
                <a href="https://trades.magolabs.in/" className="hover:text-neutral-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
                  Websites for trades
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase font-medium">Call Us Directly</p>
                  <a href="tel:+919099245605" className="text-neutral-800 dark:text-white hover:text-neutral-600 dark:hover:text-brand transition-colors font-medium">
                    +91 9099245605
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase font-medium">Send Email</p>
                  <a href="mailto:burhan@magolabs.in" className="text-neutral-800 dark:text-white hover:text-neutral-600 dark:hover:text-brand transition-colors font-medium">
                    burhan@magolabs.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase font-medium">Surat, Gujarat</p>
                  <a
                    href="https://maps.app.goo.gl/MT8QiwA56T7NtyC18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 dark:text-white hover:text-neutral-600 dark:hover:text-brand transition-colors font-medium"
                  >
                    View on Google Maps
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-neutral-900 shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase font-medium">Business Hours</p>
                  <p className="text-neutral-700 dark:text-neutral-300 font-medium">Mon to Sat: 9:00 AM to 7:00 PM</p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs">Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-500 dark:text-neutral-400">
            &copy; {currentYear} Mago Labs. All rights reserved. Registered in India.
          </p>
          <div className="flex items-center gap-6">
            <PageLink page="privacy" onNavigate={() => handleLinkClick('privacy')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </PageLink>
            <PageLink page="terms" onNavigate={() => handleLinkClick('terms')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Terms of Service
            </PageLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
