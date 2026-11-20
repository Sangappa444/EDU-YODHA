import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, IndianRupee, ArrowLeft } from 'lucide-react';
import { internships, getInternshipBySlug } from '@/lib/internships-data';
import InternshipApplyForm from './ApplyForm';

export function generateStaticParams() {
  return internships.map((i) => ({ domain: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const intern = getInternshipBySlug(domain);
  if (!intern) return { title: 'Not Found' };
  return {
    title: `${intern.title} Internship | EDU YODHA LLP`,
    description: intern.description,
  };
}

export default async function InternshipDetailPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const intern = getInternshipBySlug(domain);
  if (!intern) notFound();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/internships" className="hover:text-white transition-colors">Internships</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{intern.title}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
              Internship Program
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{intern.title}</h1>
            <p className="text-blue-100 text-lg mb-8">{intern.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5">
                <IndianRupee className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-semibold">5,000 Program Fee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <section className="bg-slate-50 border-b py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-[#1e40af] mb-1">₹5,000</p>
            <p className="text-sm text-slate-500">Program Fee</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-[#1e40af] mb-1">Practical</p>
            <p className="text-sm text-slate-500">Project-Based Learning</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-[#1e40af] mb-1">Skills</p>
            <p className="text-sm text-slate-500">Industry-Relevant Development</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Program Overview</h2>
              <p className="text-slate-600 leading-relaxed">{intern.overview}</p>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">What You&apos;ll Learn</h2>
              <ul className="space-y-3">
                {intern.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1e40af] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Skills You&apos;ll Gain</h2>
              <div className="flex flex-wrap gap-2">
                {intern.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-[#1e40af] border border-blue-100 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Project Information</h2>
              <p className="text-slate-600 leading-relaxed">{intern.projectInfo}</p>
            </div>

            {/* Eligibility */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Eligibility</h2>
              <ul className="space-y-2">
                {intern.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1e40af] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Process */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Application Process</h2>
              <ol className="space-y-4">
                {intern.applicationProcess.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#1e40af] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-slate-600 mt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Fees */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-3">Fees & Payment</h2>
              <p className="text-3xl font-bold text-[#1e40af] mb-2">₹5,000</p>
              <p className="text-slate-600 mb-3">This is the program participation fee for the {intern.title} internship.</p>
              <p className="text-sm text-slate-500">
                For refund information, please review our{' '}
                <Link href="/refund-policy" className="text-[#1e40af] underline">Refund Policy</Link>.
              </p>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {intern.faqs.map((faq, i) => (
                  <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-[#0f172a] hover:bg-slate-50 transition-colors">
                      {faq.question}
                      <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="px-5 pb-5 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f172a] mb-2">{intern.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{intern.description}</p>
              <div className="border-t pt-4 mb-4">
                <p className="text-slate-500 text-sm">Program Fee</p>
                <p className="text-3xl font-bold text-[#1e40af]">₹5,000</p>
              </div>
              <a
                href="#apply"
                className="w-full block text-center bg-[#0f172a] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1e3a8a] transition-colors mb-3"
              >
                Apply Now
              </a>
              <Link
                href="/internships"
                className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-[#1e40af] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section id="apply" className="bg-slate-50 border-t py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-3">Apply Now</h2>
            <p className="text-slate-500">
              Fill out the form below to apply for the <strong>{intern.title}</strong> internship program.
            </p>
          </div>
          <InternshipApplyForm domain={intern.title} />
        </div>
      </section>
    </div>
  );
}
