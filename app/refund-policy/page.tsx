import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy | EDU YODHA LLP',
  description: 'Refund policy for EDU YODHA LLP internship programs.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#0f172a] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Refund Policy</span>
          </nav>
          <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
          <p className="text-sm text-slate-400 mb-8">Last updated: November 2026</p>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            This Refund Policy applies to the internship programs offered by EDU YODHA LLP. Please read this policy carefully before making any payment.
          </p>

          <hr className="my-8 border-slate-200" />

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Internship Program Fee</h2>
          <p className="text-slate-600 leading-relaxed">
            The program participation fee for EDU YODHA internship programs is <strong>₹5,000 per program</strong>. This fee covers access to program materials, assignments, and program support during the internship period.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Refund Eligibility</h2>
          <p className="text-slate-600 leading-relaxed mb-3">A refund may be considered under the following conditions:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>The program was cancelled by EDU YODHA LLP before commencement.</li>
            <li>A refund request is submitted within 48 hours of payment, before program materials are accessed or the program commences.</li>
            <li>A technical error or duplicate payment occurred.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Non-Refundable Scenarios</h2>
          <p className="text-slate-600 leading-relaxed mb-3">Refunds will generally not be provided in the following situations:</p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>The program has commenced and program materials have been shared.</li>
            <li>The refund request is submitted more than 48 hours after payment.</li>
            <li>The applicant voluntarily withdraws from the program after commencement.</li>
            <li>Failure to complete program assignments or participate in the program.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">How to Request a Refund</h2>
          <p className="text-slate-600 leading-relaxed">
            To request a refund, please submit your request through our contact page at{' '}
            <Link href="/contact" className="text-[#1e40af] underline">eduyodha.com/contact</Link>{' '}
            with your full name, registered email address, payment details, and reason for the refund request.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Processing Time</h2>
          <p className="text-slate-600 leading-relaxed">
            Approved refunds will be processed within 7–14 business days to the original payment method. Processing times may vary depending on your bank or payment provider.
          </p>

          <h2 className="text-2xl font-bold text-[#0f172a] mt-8 mb-4">Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For any refund-related queries, please contact us through our contact page at{' '}
            <Link href="/contact" className="text-[#1e40af] underline">eduyodha.com/contact</Link>.
          </p>

          <hr className="my-10 border-slate-200" />
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-slate-600 mb-4">Have questions about this policy?</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1e40af] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
