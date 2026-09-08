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
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Last updated: July 2026</p>
          </div>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
            <p>
              Mago Labs ("we," "us," or "our") respects your privacy. This policy explains what information we collect when you visit magolabs.in, why we collect it, and how we handle it.
            </p>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">What we collect</h2>
              <p>
                When you submit our contact form or the free site health check tool, we collect the details you provide directly, such as your name, phone number, email address, business name, and any message you send us. We do not ask for or store payment information on this site.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">How we use it</h2>
              <p>
                We use the information you share to respond to your enquiry, prepare a quote or audit, and follow up about your project. We do not sell or rent your information to third parties. We may occasionally reach out with relevant updates about your project or our services, and you can ask us to stop at any time.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Cookies and analytics</h2>
              <p>
                Our site may use basic analytics to understand how visitors use it, such as which pages are viewed most. This helps us improve the site. We do not use this data to identify you personally.
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
                <a href="mailto:burhan@magolabs.in" className="text-blue-600 hover:text-blue-500 font-medium">
                  burhan@magolabs.in
                </a>{' '}
                or call{' '}
                <a href="tel:+919099245605" className="text-blue-600 hover:text-blue-500 font-medium">
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
