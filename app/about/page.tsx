'use client'

import { useState } from 'react'
import { CheckCircle, Users, Target, Eye, Heart } from 'lucide-react'

const missionVisionValues = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To create meaningful opportunities that help individuals learn, develop practical skills, and grow professionally by connecting students, educators, institutions, and technology through innovative digital platforms.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be a leading education and technology company that makes learning, career development, and digital opportunities accessible to every student and young professional across India.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Integrity, innovation, and inclusivity guide everything we do. We believe in building trust through transparency, fostering creativity through collaboration, and ensuring no learner is left behind.',
  },
]

const teamRoles = [
  { role: 'Founder & CEO', initials: 'SA', name: 'Sangappa A. Angadi', label: 'Team Member' },
  { role: 'Technology Lead', initials: 'TL', name: 'To be announced', label: 'Position Open' },
  { role: 'Full Stack Developer', initials: 'FD', name: 'To be announced', label: 'Position Open' },
  { role: 'Frontend Developer', initials: 'FE', name: 'To be announced', label: 'Position Open' },
  { role: 'Backend Developer', initials: 'BE', name: 'To be announced', label: 'Position Open' },
  { role: 'Digital Marketing Executive', initials: 'DM', name: 'To be announced', label: 'Position Open' },
  { role: 'Content Strategist', initials: 'CS', name: 'To be announced', label: 'Position Open' },
  { role: 'Academic Coordinator', initials: 'AC', name: 'To be announced', label: 'Position Open' },
  { role: 'Internship Coordinator', initials: 'IC', name: 'To be announced', label: 'Position Open' },
  { role: 'Operations Executive', initials: 'OE', name: 'To be announced', label: 'Position Open' },
]

const credentials = [
  {
    title: 'MCA/LLP Registration',
    description:
      'EDU YODHA LLP is officially incorporated under the Ministry of Corporate Affairs, Government of India.',
  },
  {
    title: 'MSME Registration',
    description:
      'Registered under the MSME scheme, recognizing EDU YODHA as a micro, small, and medium enterprise.',
  },
  {
    title: 'Official Company',
    description:
      'EDU YODHA LLP operates as a legally registered limited liability partnership in India.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0f172a] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About EDU YODHA LLP
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            An education and technology company committed to making learning, career development, and digital opportunities more accessible.
          </p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-6">
            Building Opportunities. Empowering Futures.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            EDU YODHA LLP is an education and technology-focused company committed to making learning, career development, and digital opportunities more accessible. We work towards connecting students, educators, institutions, and technology through innovative digital platforms and educational initiatives. Our mission is to create meaningful opportunities that help individuals learn, develop practical skills, and grow professionally.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionVisionValues.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1e40af]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#1e40af]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0f172a] mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-10 text-center">Leadership</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-500">SA</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0f172a]">Sangappa A. Angadi</h3>
              <p className="text-[#1e40af] font-medium mt-1 mb-4">Founder &amp; CEO</p>
              <p className="text-slate-600 leading-relaxed text-lg">
                Leading EDU YODHA with a vision to bridge the gap between education, technology, and career opportunities. Focused on building accessible digital platforms and creating meaningful opportunities for students and young professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-4 text-center">Our Team</h2>
          <p className="text-slate-500 text-center mb-10">
            We are building a passionate team to drive our mission forward.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {teamRoles.map(({ role, initials, name, label }) => (
              <div
                key={role}
                className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-slate-500">{initials}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mb-1 leading-tight">{role}</p>
                <p className="text-xs text-slate-400">{name}</p>
                <span
                  className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                    label === 'Team Member'
                      ? 'bg-[#06b6d4]/10 text-[#06b6d4]'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Credentials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-4 text-center">Our Official Credentials</h2>
          <p className="text-slate-500 text-center mb-10">
            EDU YODHA LLP is a legally registered and compliant entity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credentials.map(({ title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-[#0f172a] mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
