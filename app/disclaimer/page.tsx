import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer | EDU YODHA LLP',
  description: 'Disclaimer for EDU YODHA LLP website and services.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#0f172a] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Disclaimer</span>
          </nav>
          <h1 className="text-4xl font-bold text-white">Disclaimer</h1>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400 mb-8">Last updated: November 2026</p>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            This disclaimer governs the use of the EDU YODHA LLP website (eduyodha.com) and the services offered through it.
          </p>

          <hr className="my-8 border-slate-200" />

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">General Information</h2>
          <p className="text-slate-600 leading-relaxed">
            The information provided on this website is for general informational purposes only. While EDU YODHA LLP makes every effort to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related content contained on the website.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">No Guarantees on Outcomes</h2>
          <p className="text-slate-600 leading-relaxed">
            EDU YODHA LLP provides internship programs and educational resources for skill development and learning purposes. We do not guarantee any specific learning outcomes, employment results, job placements, salary packages, or career advancement as a result of participating in our programs. Results may vary based on individual effort, dedication, and external factors.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Educational Content</h2>
          <p className="text-slate-600 leading-relaxed">
            Content provided through EDU YODHA platforms, including study materials, guides, and resources, is intended for educational and informational purposes. EDU YODHA does not guarantee the accuracy or currency of all educational content. Users are encouraged to verify information from official and authoritative sources.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">External Links</h2>
          <p className="text-slate-600 leading-relaxed">
            This website may contain links to external websites that are not controlled or maintained by EDU YODHA LLP. We have no control over the content of those websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed">
            To the fullest extent permitted by law, EDU YODHA LLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or our services.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For any questions regarding this disclaimer, please contact us through our{' '}
            <Link href="/contact" className="text-[#1e40af] underline">contact page</Link>.
          </p>

          <hr className="my-10 border-slate-200" />
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-600 mb-4">Have questions?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1e40af] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
