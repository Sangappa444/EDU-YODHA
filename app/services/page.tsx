import Link from 'next/link'
import {
  Cpu,
  Monitor,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Globe,
  BookOpen,
  Lightbulb,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceVertical {
  number: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  link?: string
}

interface Platform {
  name: string
  description: string
  url?: string
}

interface Credential {
  title: string
  description: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const verticals: ServiceVertical[] = [
  {
    number: '01',
    icon: Cpu,
    title: 'Education Technology',
    description:
      'Digital platforms and technology-driven educational solutions for modern learners.',
  },
  {
    number: '02',
    icon: Monitor,
    title: 'Online Learning',
    description:
      'Learning resources, educational content, and digital learning experiences accessible to all.',
  },
  {
    number: '03',
    icon: Briefcase,
    title: 'Internship Programs',
    description:
      'Structured internship opportunities designed to help students gain practical exposure and develop industry-relevant skills.',
    link: '/internships',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Skill Development',
    description:
      'Technical training, practical learning, and professional development initiatives for career growth.',
  },
  {
    number: '05',
    icon: GraduationCap,
    title: 'Admission Guidance',
    description:
      'Educational admission guidance, counselling, and student support services for higher education.',
  },
  {
    number: '06',
    icon: Globe,
    title: 'Digital Platforms',
    description:
      'Development and management of digital products, websites, and online services.',
  },
  {
    number: '07',
    icon: BookOpen,
    title: 'Educational Content',
    description:
      'Study materials, examination preparation resources, and academic content for students.',
  },
  {
    number: '08',
    icon: Lightbulb,
    title: 'Technology Solutions',
    description:
      'Technology-based products, web development, and innovative digital solutions.',
  },
]

const platforms: Platform[] = [
  {
    name: 'Vidyari',
    description:
      'An educational platform providing students with access to academic resources and study materials.',
    url: 'https://www.vidyari.com',
  },
  {
    name: 'Engineering in Karnataka',
    description:
      'An educational initiative sharing engineering admission information, VTU updates, and student-focused content.',
  },
  {
    name: 'EDU YODHA',
    description:
      'Our official brand for education, learning, technology, and career development initiatives.',
    url: 'https://eduyodha.com',
  },
]

const credentials: Credential[] = [
  {
    title: 'LLP Registration',
    description:
      'EDU YODHA LLP is officially incorporated under the Ministry of Corporate Affairs, Government of India.',
  },
  {
    title: 'MSME Registration',
    description:
      'Registered under the MSME scheme, recognizing EDU YODHA as a micro, small, and medium enterprise.',
  },
  {
    title: 'Official Brand',
    description:
      'EDU YODHA operates as a legally registered entity focused on education and technology.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-[#0f172a] py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
            What We Do
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Powering Education&nbsp;&amp;&nbsp;Technology
          </h1>
          <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            EDU YODHA LLP operates across multiple verticals — from online
            learning platforms and internship programs to skill development and
            technology solutions — with a single mission: creating meaningful
            opportunities for students and learners across India.
          </p>
        </div>
      </section>

      {/* ── Business Verticals ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              Our Business Verticals
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              A diversified portfolio of services designed to serve students,
              educators, and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verticals.map((v) => {
              const Icon = v.icon
              const card = (
                <div
                  key={v.number}
                  className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-default"
                >
                  {/* Number + Icon row */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-[#0f172a] opacity-20 leading-none select-none">
                      {v.number}
                    </span>
                    <span className="p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-5 h-5 text-[#1e40af]" />
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#0f172a] leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {v.description}
                  </p>
                  {v.link && (
                    <span className="text-sm font-medium text-[#1e40af] group-hover:underline underline-offset-2 inline-flex items-center gap-1">
                      Learn more →
                    </span>
                  )}
                </div>
              )

              return v.link ? (
                <Link href={v.link} key={v.number} className="block">
                  {card}
                </Link>
              ) : (
                <div key={v.number}>{card}</div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Digital Platforms ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              Our Digital Platforms
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Purpose-built platforms serving students and learners with
              curated educational experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-slate-200 p-8 flex flex-col gap-5 hover:shadow-md hover:border-blue-200 transition-all duration-200"
              >
                {/* Platform initial badge */}
                <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {p.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
                    {p.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="mt-auto">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e40af] text-white text-sm font-medium hover:bg-[#1d3faa] transition-colors"
                    >
                      Visit Platform
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-5 py-2.5 rounded-lg bg-slate-100 text-slate-400 text-sm font-medium cursor-not-allowed">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Official Credentials ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              Our Official Credentials
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              EDU YODHA LLP is a formally recognised entity with the necessary
              government registrations in place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {credentials.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col gap-4 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 w-fit rounded-xl bg-green-50">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a]">
                  {c.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Interested in partnering?
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            We collaborate with institutions, educators, and organisations
            that share our commitment to education and technology.
          </p>
          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-white font-semibold text-base hover:bg-cyan-400 transition-colors"
          >
            Explore Partnerships →
          </Link>
        </div>
      </section>
    </main>
  )
}
