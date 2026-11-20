import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="bg-[#1e40af] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Ready to Build Your Future?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Explore internship programs, learning resources, and career opportunities at EDU YODHA.
        </p>
        <Link
          href="/internships"
          className="inline-flex items-center gap-2 bg-white text-[#1e40af] font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
        >
          Get Started Today
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
