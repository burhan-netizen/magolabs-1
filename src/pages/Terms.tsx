import { PageId } from '../types';
import SEO from '../components/SEO';

interface TermsProps {
  onPageChange: (page: PageId) => void;
}

export default function Terms({ onPageChange }: TermsProps) {
  void onPageChange;

  return (
    <>
      <SEO path="/terms" />

      <section id="terms-content" className="pt-32 pb-24 font-sans">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Legal</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Last updated: July 2026</p>
          </div>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
            <p>
              These terms apply to your use of magolabs.in and to any project you engage Mago Labs for. By using this site or hiring us, you agree to the terms below.
            </p>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Using this website</h2>
              <p>
                This site and its content are provided for general information about Mago Labs and our services. You are welcome to browse it, but the content, design, and code of this site itself are our own work and should not be copied or reused without permission.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Project engagements</h2>
              <p>
                Any actual project we take on is governed by the specific quote, scope, and payment terms agreed directly with you before work begins, not by this page alone. If anything here ever conflicts with what we agreed in writing for your project, the project agreement takes priority.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Ownership</h2>
              <p>
                Once a project is paid for in full, you own the final website, its source code, and its content, as outlined in our commitments on the About page. We do not hold your domain or hosting hostage after completion.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Limitation of liability</h2>
              <p>
                We build every site with care and test it before launch, but we cannot guarantee specific business outcomes such as a set number of leads or a particular search ranking, since these depend on many factors outside our direct control.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Changes to these terms</h2>
              <p>
                We may update these terms occasionally as our business grows. The version posted here is always the current one.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Contact us</h2>
              <p>
                Questions about these terms can be sent to{' '}
                <a href="mailto:burhan@magolabs.in" className="text-blue-600 hover:text-blue-500 font-medium">
                  burhan@magolabs.in
                </a>{' '}
                or{' '}
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
