'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe, Layers, Code2, Coffee, Brain, Cpu, BarChart3,
  TrendingUp, Shield, Cloud, Palette, Megaphone, ArrowRight, Info
} from 'lucide-react';
import { internships } from '@/lib/internships-data';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Coffee: <Coffee className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Megaphone: <Megaphone className="w-6 h-6" />,
};

export default function InternshipsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e40af] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-4">
            Internship Programs
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Build Skills. Gain Experience.{' '}
            <span className="text-cyan-400">Shape Your Future.</span>
          </h1>
          <p className="text-blue-100 text-lg lg:text-xl max-w-3xl mx-auto mb-8">
            Explore practical learning opportunities through EDU YODHA internship programs. Develop relevant skills,
            work on practical assignments, and strengthen your professional journey.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white font-semibold">
            <span className="text-cyan-400 text-lg">₹5,000</span>
            <span className="text-white/70">per internship program</span>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-blue-50 border-b border-blue-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Program details, timeline, and project assignments are shared after enrollment. 
            The ₹5,000 fee is the program participation fee.
          </p>
        </div>
      </section>

      {/* Internship Cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-4">
              Choose Your Internship Domain
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              12 specialized internship programs designed to develop practical, industry-relevant skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((intern) => (
              <div
                key={intern.slug}
                onMouseEnter={() => setHoveredCard(intern.slug)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-white border rounded-2xl p-6 transition-all duration-300 flex flex-col ${
                  hoveredCard === intern.slug
                    ? 'border-[#1e40af] shadow-lg shadow-blue-50 -translate-y-1'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#1e40af] mb-4">
                  {iconMap[intern.icon]}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#0f172a] mb-2">{intern.title}</h3>

                {/* Description */}
                <p className="text-slate-500 text-sm mb-4 flex-1">{intern.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {intern.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {intern.skills.length > 4 && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                      +{intern.skills.length - 4} more
                    </span>
                  )}
                </div>

                {/* Fee badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-semibold text-[#1e40af] bg-blue-50 px-3 py-1 rounded-full">
                    ₹5,000
                  </span>
                  <span className="text-xs text-slate-400">Program Fee</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/internships/${intern.slug}`}
                    className="flex-1 text-center border border-[#1e40af] text-[#1e40af] text-sm font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/internships/${intern.slug}#apply`}
                    className="flex-1 text-center bg-[#0f172a] text-white text-sm font-medium py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 border-t py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Have Questions?</h3>
          <p className="text-slate-500 mb-6">
            Reach out to us for any queries regarding our internship programs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1e40af] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1e3a8a] transition-colors"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
