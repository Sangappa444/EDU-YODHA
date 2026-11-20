import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen, GraduationCap, Lightbulb, Monitor, Users, Video,
  FileText, FlaskConical, Compass, Layers, Code2, ShieldCheck, ExternalLink, ArrowRight,
} from 'lucide-react';

// ─── MAIN SERVICES DATA (11 Tech & Business) ─────────────────────────────────

const mainServices = [
  {
    id: 1,
    title: 'Website Design & Development',
    description: 'Professional, responsive and modern website design and development for businesses, organisations and individuals.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    link: '/contact',
  },
  {
    id: 2,
    title: 'Web Application Development',
    description: 'Development of customised web-based applications, portals, dashboards and digital platforms.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    link: '/contact',
  },
  {
    id: 3,
    title: 'Mobile Application Development',
    description: 'Development of mobile applications for Android and iOS platforms.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    link: '/contact',
  },
  {
    id: 4,
    title: 'Custom Software Development',
    description: 'Tailor-made software solutions designed to meet specific business and organisational requirements.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    link: '/contact',
  },
  {
    id: 5,
    title: 'Cloud-Based Software Solutions',
    description: 'Cloud-enabled software platforms, business applications, digital infrastructure and scalable software solutions.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    link: '/contact',
  },
  {
    id: 6,
    title: 'Digital Marketing',
    description: 'Digital marketing, online promotion, social media marketing and brand growth solutions.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    link: '/contact',
  },
  {
    id: 7,
    title: 'Graphic Designing & Branding',
    description: 'Professional graphic design, brand identity, creative visuals and digital marketing designs.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    link: '/contact',
  },
  {
    id: 8,
    title: 'Content Writing',
    description: 'Professional content writing, website content, educational content and digital communication.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    link: '/contact',
  },
  {
    id: 9,
    title: 'IT Staffing & Recruitment',
    description: 'IT talent sourcing, staffing support and recruitment-related services.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    link: '/contact',
  },
  {
    id: 10,
    title: 'Training & Internships',
    description: 'Technical training, practical learning opportunities, internship programs and skill development.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    link: '/internships',
  },
  {
    id: 11,
    title: 'Research & Development',
    description: 'Research, innovation, technology exploration and development of new digital solutions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    link: '/contact',
  },
];

// ─── OTHER SERVICES DATA (15 Education & Digital Learning) ───────────────────

const otherServices = [
  { id: 1,  icon: Monitor,     title: 'Online Education & E-Learning',               desc: 'Accessible online learning experiences for students across India.' },
  { id: 2,  icon: Layers,      title: 'Digital Learning Content & Courses',           desc: 'Structured digital courses and curated learning content.' },
  { id: 3,  icon: Lightbulb,   title: 'Skill Development & Professional Training',    desc: 'Industry-relevant skill programs for career readiness.' },
  { id: 4,  icon: GraduationCap, title: 'Internship & Student Development Programs', desc: 'Practical internship opportunities for students.' },
  { id: 5,  icon: Compass,     title: 'Admission Guidance & Educational Consultancy', desc: 'Expert guidance for higher education admissions.' },
  { id: 6,  icon: Code2,       title: 'Educational Technology Solutions',             desc: 'Technology platforms built for educational institutions.' },
  { id: 7,  icon: Users,       title: 'Online Tutoring & Academic Support',           desc: 'One-on-one and group academic support sessions.' },
  { id: 8,  icon: BookOpen,    title: 'Educational PDF, E-Books & Study Material',    desc: 'High-quality study materials and digital publications.' },
  { id: 9,  icon: FileText,    title: 'Model Papers & Online Test Series',            desc: 'Exam preparation resources and online test series.' },
  { id: 10, icon: Video,       title: 'Digital Media & Content Creation',             desc: 'Professional educational media and content production.' },
  { id: 11, icon: Video,       title: 'YouTube & Educational Media Activities',       desc: 'Educational video content and YouTube channel management.' },
  { id: 12, icon: Code2,       title: 'Programming & Technical Education',            desc: 'Coding bootcamps and technical education programs.' },
  { id: 13, icon: Compass,     title: 'Career Guidance & Student Support',            desc: 'Personalised career counselling and student mentorship.' },
  { id: 14, icon: FlaskConical, title: 'Educational Research & Development',          desc: 'Research initiatives in education and learning innovation.' },
  { id: 15, icon: Monitor,     title: 'Digital Educational Platforms',                desc: 'Purpose-built digital platforms for modern learners.' },
];

// ─── Credentials ────────────────────────────────────────────────────────────

const credentials = [
  { title: 'LLP Registration', desc: 'Officially incorporated under the Ministry of Corporate Affairs, Government of India.' },
  { title: 'MSME Registration', desc: 'Registered under the MSME scheme, recognised as a micro, small and medium enterprise.' },
  { title: 'Official Brand', desc: 'EDU YODHA operates as a legally registered entity focused on education and technology.' },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="bg-white dark:bg-[#0f172a]">

      {/* ── HERO ── */}
      <section className="bg-[#0f172a] py-20 lg:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Powering Education &amp; Technology
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            EDU YODHA LLP delivers professional technology services and education solutions
            designed to empower students, businesses and institutions across India.
          </p>
        </div>
      </section>

      {/* ── MAIN SERVICES ── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 bg-slate-50 dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3">
              Technology &amp; Business Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-white mb-4">
              OUR SERVICES
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              What We Offer
            </p>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#1e40af] to-[#06b6d4]" />
          </div>

          {/* Main Service Cards — Image-based */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mainServices.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                style={{ minHeight: '280px' }}
              >
                {/* Background image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
                  <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2">
                      {service.title}
                    </h3>
                    {/* Decorative underline */}
                    <div className="w-10 h-0.5 bg-cyan-400 mb-3 group-hover:w-16 transition-all duration-300" />
                    <p className="text-slate-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                      {service.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Get in Touch <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES ── */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 bg-white dark:bg-[#1e293b]">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3">
              Education &amp; Digital Learning
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-white mb-4">
              OTHER SERVICES
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
              More Opportunities. More Possibilities.
            </p>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#1e40af] to-[#06b6d4]" />
          </div>

          {/* Compact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {otherServices.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="group bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#1e40af]/30 dark:hover:border-cyan-500/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center group-hover:bg-[#1e40af] transition-colors duration-200 flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#1e40af] dark:text-blue-300 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#0f172a] dark:text-slate-100 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-auto text-xs font-semibold text-[#1e40af] dark:text-cyan-400 hover:underline underline-offset-2 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                  >
                    Enquire <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50 dark:bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] dark:text-white mb-3">
              Our Official Credentials
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              EDU YODHA LLP is a formally recognised entity with the necessary government registrations in place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map((c) => (
              <div
                key={c.title}
                className="bg-white dark:bg-[#1e293b] rounded-2xl border border-slate-200 dark:border-slate-700 p-7 flex flex-col gap-3 hover:shadow-md transition-all duration-200"
              >
                <div className="p-2.5 w-fit rounded-xl bg-green-50 dark:bg-green-900/30">
                  <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-base font-semibold text-[#0f172a] dark:text-white">{c.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
            Ready to work with us?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed">
            We collaborate with businesses, institutions and educators to deliver professional
            technology and education solutions. Let&apos;s build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm sm:text-base transition-colors"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/partnerships"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm sm:text-base transition-colors"
            >
              Explore Partnerships <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
