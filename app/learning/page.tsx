import Link from 'next/link'
import { BookOpen, FileText, Rocket, Code2, ExternalLink, ArrowRight } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface LearningCategory {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const categories: LearningCategory[] = [
  {
    icon: BookOpen,
    title: 'Academic Resources',
    description:
      'Study materials, notes, and reference content for engineering and professional courses.',
  },
  {
    icon: FileText,
    title: 'Examination Preparation',
    description:
      'Guidance and resources for competitive examinations, university exams, and entrance tests.',
  },
  {
    icon: Rocket,
    title: 'Career Development',
    description:
      'Resources to help students prepare for careers, interviews, and professional growth.',
  },
  {
    icon: Code2,
    title: 'Technology Tutorials',
    description:
      'Practical technology learning content covering programming, development, and digital skills.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LearningPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="bg-[#0f172a] py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Learning Resources
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Learn.&nbsp;Grow.&nbsp;Excel.
          </h1>
          <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            EDU YODHA provides access to educational content, study materials,
            and learning resources designed to support students in their
            academic and professional journey.
          </p>
        </div>
      </section>

      {/* ── Description strip ── */}
      <section className="py-16 px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Whether you are preparing for university examinations, building
            technology skills, or planning your next career move, EDU YODHA's
            learning resources are curated to meet you at every stage of your
            educational journey.
          </p>
        </div>
      </section>

      {/* ── Learning Categories ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              What You Can Learn
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Structured learning categories covering everything from academics
              to professional skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div
                  key={cat.title}
                  className="group bg-white rounded-2xl border border-slate-200 p-7 flex flex-col gap-5 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                >
                  <div className="p-3 w-fit rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-[#1e40af]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#0f172a] mb-2 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Platforms Section ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
              Access Learning on Vidyari
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
              Our dedicated educational platform where students can explore
              study content and academic resources.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Logo badge */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#0f172a] flex items-center justify-center">
              <span className="text-white font-black text-2xl">V</span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
                Vidyari
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                An educational platform providing students with access to
                academic resources and study materials. Vidyari brings together
                course content, notes, and subject-specific resources in one
                accessible place, designed to make learning simple and
                effective.
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://www.vidyari.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1e40af] text-white font-medium text-sm hover:bg-[#1d3faa] transition-colors whitespace-nowrap"
              >
                Visit Vidyari
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Take the Next Step
          </h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            Combine your learning with real-world experience. EDU YODHA's
            internship programs give students the opportunity to apply skills
            in a professional setting.
          </p>
          <Link
            href="/internships"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 text-white font-semibold text-base hover:bg-cyan-400 transition-colors"
          >
            Explore Internship Programs
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
