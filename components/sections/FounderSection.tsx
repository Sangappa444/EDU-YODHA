import { ExternalLink } from 'lucide-react';

export default function FounderSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4] mb-12">
          Leadership
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Photo placeholder */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
              <span className="text-5xl font-bold text-slate-400 tracking-tight select-none">
                SA
              </span>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs text-slate-400 font-medium">Founder &amp; CEO</p>
              <p className="text-sm text-slate-500 mt-0.5">EDU YODHA LLP</p>
            </div>
          </div>

          {/* Right: Bio */}
          <div>
            <div className="mb-6 pb-6 border-b border-slate-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-1">
                Sangappa A. Angadi
              </h2>
              <p className="text-[#1e40af] font-semibold text-sm">
                Founder &amp; CEO, EDU YODHA LLP
              </p>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
              <p>
                Sangappa A. Angadi is the Founder and CEO of EDU YODHA LLP, an
                officially registered education and technology company committed
                to creating meaningful opportunities for students and
                professionals across India.
              </p>
              <p>
                With a deep understanding of the challenges students face in
                bridging the gap between academic learning and industry
                readiness, Sangappa founded EDU YODHA to build practical
                pathways through internship programs, skill development
                initiatives, and digital learning platforms.
              </p>
              <p>
                Under his leadership, EDU YODHA has grown to encompass eight
                business verticals spanning education technology, online
                learning, admission guidance, digital platforms, and technology
                solutions — all with a singular focus on empowering the next
                generation.
              </p>
              <p>
                His vision is to make quality education and professional
                opportunities accessible to every aspiring individual, regardless
                of geography or background — building a more capable, opportunity-rich
                India.
              </p>
            </div>

            {/* LinkedIn placeholder */}
            <div className="mt-8 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition-colors duration-200 cursor-default">
                <ExternalLink className="w-4 h-4" />
                LinkedIn Profile
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
