import { PageId } from '../types';
import SEO from '../components/SEO';

interface PrivacyProps {
  onPageChange: (page: PageId) => void;
}

export default function Privacy({ onPageChange }: PrivacyProps) {
  void onPageChange;

  return (
    <>
      <SEO path="/privacy" />

      <section id="privacy-content" className="pt-32 pb-24 font-sans">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <span className="eyebrow">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Last updated: October 2026</p>
          </div>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
            <p>
              Mago Labs ("we," "us," or "our") respects your privacy. This policy explains what information we collect when you visit magolabs.in, why we collect it, and how we handle it.
            </p>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">What we collect</h2>
              <p>
                When you submit our contact form, we collect the details you provide directly: your name, your phone number, and, if you add them, your website or business name and your message. We also note which page the form was sent from. The website health check runs in your browser and does not send us your answers. We do not ask for or store payment information on this site.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">How we use it</h2>
              <p>
                We use the information you share to respond to your enquiry, prepare a quote or audit, and follow up about your project. We do not sell or rent your information to third parties. Form enquiries reach us by email through our email delivery provider, and the site is hosted by our hosting provider; both handle this information only to provide those services. We may occasionally reach out with relevant updates about your project or our services, and you can ask us to stop at any time.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Cookies and analytics</h2>
              <p>
                This site does not set cookies and does not use analytics or advertising trackers. It stores one setting in your browser, your choice of light or dark mode, and that never leaves your device. To show prices in the right currency, the site reads your device's time zone; this is not stored or sent to us, except that a form enquiry notes which price list you were shown. If we add analytics in future, we will update this policy first.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Your rights</h2>
              <p>
                You can ask us at any time what information we hold about you, request a correction, or ask us to delete it. Just reach out through the contact details below and we will action it promptly.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Contact us</h2>
              <p>
                For any privacy related questions, email us at{' '}
                <a href="mailto:burhan@magolabs.in" className="text-neutral-900 hover:text-neutral-600 font-medium">
                  burhan@magolabs.in
                </a>{' '}
                or call{' '}
                <a href="tel:+919099245605" className="text-neutral-900 hover:text-neutral-600 font-medium">
                  +91 9099245605
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
