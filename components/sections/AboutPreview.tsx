import Link from 'next/link';
import { Target, Eye, Heart, ArrowRight } from 'lucide-react';

const cards = [
  {
    icon: Target,
    color: '#0f172a',
    label: 'Mission',
    title: 'Our Mission',
    description:
      'To empower students and professionals by providing access to quality education, meaningful internship experiences, and technology-driven learning platforms that bridge the gap between education and industry.',
  },
  {
    icon: Eye,
    color: '#1e40af',
    label: 'Vision',
    title: 'Our Vision',
    description:
      'To be a leading education and technology company that transforms how India learns, grows, and builds careers — making opportunities accessible to every aspiring individual regardless of geography or background.',
  },
  {
    icon: Heart,
    color: '#06b6d4',
    label: 'Values',
    title: 'Our Values',
    description:
      'Integrity, innovation, and impact define everything we do. We believe in transparent practices, continuous improvement, and building genuine value for students, partners, and the communities we serve.',
  },
];

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4] mb-3">
            About EDU YODHA
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-5">
            Building Opportunities.{' '}
            <span className="text-[#1e40af]">Empowering Futures.</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            EDU YODHA LLP is an officially registered education and technology
            company committed to creating meaningful opportunities for students
            and professionals. Through internship programs, digital learning
            platforms, skill development initiatives, and technology solutions,
            we are shaping a more capable and opportunity-rich generation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map(({ icon: Icon, color, label, title, description }) => (
            <div
              key={label}
              className="group bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: `${color}12` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color }}>
                {label}
              </p>
              <h3 className="text-lg font-semibold text-[#0f172a] mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[#1e40af] font-semibold text-sm hover:gap-3 transition-all duration-200"
        >
          Learn More About Us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
