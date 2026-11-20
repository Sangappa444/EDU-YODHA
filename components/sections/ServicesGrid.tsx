import Link from 'next/link';
import {
  Monitor,
  BookOpen,
  Briefcase,
  Zap,
  GraduationCap,
  Globe,
  FileText,
  Code2,
  ArrowRight,
} from 'lucide-react';

interface Service {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: '01',
    icon: Monitor,
    title: 'Education Technology',
    description: 'Building tech-driven platforms and tools that modernize how education is delivered and accessed.',
  },
  {
    number: '02',
    icon: BookOpen,
    title: 'Online Learning',
    description: 'Digital learning environments with structured content, resources, and guided programs.',
  },
  {
    number: '03',
    icon: Briefcase,
    title: 'Internship Programs',
    description: 'Structured internship experiences connecting students with real-world industry projects.',
  },
  {
    number: '04',
    icon: Zap,
    title: 'Skill Development',
    description: 'Targeted programs that equip learners with job-ready technical and professional skills.',
  },
  {
    number: '05',
    icon: GraduationCap,
    title: 'Admission Guidance',
    description: 'Expert counseling and support for students navigating academic admissions and career paths.',
  },
  {
    number: '06',
    icon: Globe,
    title: 'Digital Platforms',
    description: 'Developing and operating digital platforms that serve students, educators, and institutions.',
  },
  {
    number: '07',
    icon: FileText,
    title: 'Educational Content',
    description: 'Creating high-quality educational content, study materials, and reference resources.',
  },
  {
    number: '08',
    icon: Code2,
    title: 'Technology Solutions',
    description: 'Custom technology solutions and software development for education-focused organizations.',
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4] mb-3">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-4">
            Our Business Verticals
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            EDU YODHA operates across eight interconnected domains, each
            contributing to our mission of making education more accessible,
            practical, and impactful.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {services.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-bold tracking-widest text-[#1e40af] opacity-70">
                  {number}
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-200">
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-[#1e40af] transition-colors duration-200" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-[#0f172a] mb-2 leading-snug">{title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[#1e40af] font-semibold text-sm hover:gap-3 transition-all duration-200"
        >
          Explore All Services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
