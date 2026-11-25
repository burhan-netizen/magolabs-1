import { WhatsAppLogo } from './BrandIcons';

const WHATSAPP = 'https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20would%20like%20to%20discuss%20my%20website.';

/**
 * One floating contact button, bottom right: WhatsApp, the way most clients reach
 * Burhan. A single button keeps the corner clear of page content.
 */
export default function StickyCTA() {
  return (
    <a
      id="sticky-whatsapp-btn"
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Burhan on WhatsApp"
      className="group fixed bottom-4 right-4 z-50 inline-flex h-13 min-w-13 items-center justify-center gap-2 rounded-full bg-ink px-4 text-paper shadow-[0_14px_30px_-12px_rgba(17,15,12,0.6)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ink sm:bottom-6 sm:right-6 sm:px-5"
    >
      <WhatsAppLogo className="h-5 w-5 flex-none text-[#25D366]" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
