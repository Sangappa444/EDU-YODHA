'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(30,64,175,0.08),transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              An Officially Registered LLP | MSME Registered
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[#0f172a]"
          >
            Empowering the Next Generation Through{' '}
            <span className="text-[#1e40af]">Education</span> &amp;{' '}
            <span className="text-[#06b6d4]">Technology</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg text-slate-600 leading-relaxed max-w-xl"
          >
            EDU YODHA is an education and technology company focused on building
            opportunities through digital learning, skill development,
            internships, and innovative technology solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0f172a] text-white text-sm font-semibold hover:bg-[#1e293b] transition-colors duration-200"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-[#0f172a] text-[#0f172a] text-sm font-semibold hover:bg-slate-50 transition-colors duration-200"
            >
              Partner With Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Abstract geometric SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="hidden lg:flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 520 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-lg"
          >
            {/* Background circle */}
            <circle cx="260" cy="240" r="210" fill="url(#bgGrad)" opacity="0.08" />

            {/* Grid dots */}
            {[60, 120, 180, 240, 300, 360, 420].map((x) =>
              [60, 120, 180, 240, 300, 360, 420].map((y) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="#94a3b8"
                  opacity="0.4"
                />
              ))
            )}

            {/* Network lines */}
            <line x1="140" y1="160" x2="260" y2="120" stroke="#1e40af" strokeWidth="1.5" opacity="0.3" />
            <line x1="260" y1="120" x2="380" y2="180" stroke="#1e40af" strokeWidth="1.5" opacity="0.3" />
            <line x1="380" y1="180" x2="360" y2="300" stroke="#06b6d4" strokeWidth="1.5" opacity="0.3" />
            <line x1="360" y1="300" x2="220" y2="340" stroke="#06b6d4" strokeWidth="1.5" opacity="0.3" />
            <line x1="220" y1="340" x2="140" y2="280" stroke="#1e40af" strokeWidth="1.5" opacity="0.3" />
            <line x1="140" y1="280" x2="140" y2="160" stroke="#1e40af" strokeWidth="1.5" opacity="0.3" />
            <line x1="260" y1="120" x2="220" y2="340" stroke="#0f172a" strokeWidth="1" opacity="0.15" />
            <line x1="140" y1="160" x2="360" y2="300" stroke="#0f172a" strokeWidth="1" opacity="0.15" />

            {/* Node circles */}
            <circle cx="260" cy="120" r="18" fill="#1e40af" opacity="0.9" />
            <circle cx="380" cy="180" r="14" fill="#06b6d4" opacity="0.85" />
            <circle cx="360" cy="300" r="16" fill="#1e40af" opacity="0.75" />
            <circle cx="220" cy="340" r="12" fill="#06b6d4" opacity="0.7" />
            <circle cx="140" cy="280" r="14" fill="#1e40af" opacity="0.8" />
            <circle cx="140" cy="160" r="10" fill="#06b6d4" opacity="0.75" />

            {/* Center hub */}
            <circle cx="260" cy="240" r="40" fill="white" stroke="#1e40af" strokeWidth="2" />
            <circle cx="260" cy="240" r="32" fill="url(#centerGrad)" opacity="0.15" />
            {/* Book icon in center */}
            <rect x="244" y="228" width="32" height="24" rx="2" fill="#1e40af" opacity="0.9" />
            <line x1="260" y1="228" x2="260" y2="252" stroke="white" strokeWidth="1.5" />
            <line x1="248" y1="234" x2="258" y2="234" stroke="white" strokeWidth="1" opacity="0.7" />
            <line x1="248" y1="239" x2="258" y2="239" stroke="white" strokeWidth="1" opacity="0.7" />
            <line x1="262" y1="234" x2="272" y2="234" stroke="white" strokeWidth="1" opacity="0.7" />
            <line x1="262" y1="239" x2="272" y2="239" stroke="white" strokeWidth="1" opacity="0.7" />

            {/* Small icons in nodes */}
            {/* Graduation cap in top node */}
            <rect x="253" y="114" width="14" height="10" rx="1" fill="white" opacity="0.9" />
            <polygon points="260,109 268,114 260,119 252,114" fill="white" opacity="0.7" />

            {/* Floating accent shapes */}
            <rect x="420" y="100" width="40" height="40" rx="8" fill="#1e40af" opacity="0.08" transform="rotate(15 440 120)" />
            <rect x="60" y="360" width="30" height="30" rx="6" fill="#06b6d4" opacity="0.1" transform="rotate(-10 75 375)" />
            <circle cx="460" cy="360" r="20" fill="#1e40af" opacity="0.06" />
            <circle cx="80" cy="120" r="15" fill="#06b6d4" opacity="0.08" />

            {/* Orbital rings */}
            <circle cx="260" cy="240" r="80" stroke="#1e40af" strokeWidth="1" strokeDasharray="4 6" opacity="0.2" />
            <circle cx="260" cy="240" r="140" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 8" opacity="0.12" />

            <defs>
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#06b6d4" />
              </radialGradient>
              <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#06b6d4" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
