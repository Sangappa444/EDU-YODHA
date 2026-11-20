'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Briefcase, FileText, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'

type FormData = {
  fullName: string
  email: string
  phone: string
  linkedin: string
  areaOfInterest: string
  resume: File | null
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const areaOptions = [
  'Technology',
  'Education',
  'Marketing',
  'Operations',
  'Content',
  'Other',
]

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!data.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

export default function CareersPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    areaOfInterest: '',
    resume: null,
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setFormData((prev) => ({ ...prev, resume: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0f172a] py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Grow Your Career With EDU YODHA
          </h1>
          <p className="text-slate-300 text-lg md:text-xl">
            We believe in innovation, collaboration, and continuous learning. Explore opportunities to work with our growing team.
          </p>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#1e40af]" />
            Current Openings
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-500 text-lg mb-2">No openings currently listed. Check back soon.</p>
            <p className="text-slate-400 text-sm">
              Interested in joining us? You can submit your resume anytime using the form below — we keep all profiles on file.
            </p>
          </div>
        </div>
      </section>

      {/* Internship Opportunities */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#1e40af]/5 border border-[#1e40af]/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#0f172a] mb-1">Internship Opportunities</h3>
              <p className="text-slate-600 text-sm">
                We offer structured internship programs for students and fresh graduates. Gain real-world experience with EDU YODHA.
              </p>
            </div>
            <Link
              href="/internships"
              className="inline-flex items-center gap-1 bg-[#0f172a] text-white px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-[#1e40af] transition-colors"
            >
              View Internships <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Submit Your Resume */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#1e40af]" />
            Submit Your Resume
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            Share your profile with us. We&apos;ll reach out when a suitable opportunity arises.
          </p>

          {submitted ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#0f172a] mb-2">Application Received!</h3>
              <p className="text-slate-600">
                Thank you! We&apos;ll keep your profile on file and reach out when opportunities align.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50 ${
                    errors.fullName ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50 ${
                    errors.email ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-1">
                  LinkedIn Profile URL <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50"
                />
              </div>

              {/* Area of Interest */}
              <div>
                <label htmlFor="areaOfInterest" className="block text-sm font-medium text-slate-700 mb-1">
                  Area of Interest
                </label>
                <select
                  id="areaOfInterest"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50"
                >
                  <option value="">Select an area</option>
                  {areaOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-slate-700 mb-1">
                  Upload Resume
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#0f172a] file:text-white hover:file:bg-[#1e40af] file:cursor-pointer file:transition-colors border border-slate-300 rounded-lg py-2 px-3 bg-white"
                />
                <p className="mt-1 text-xs text-slate-400">Accepted formats: PDF, DOC, DOCX</p>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message / Cover Note
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself and your interests..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0f172a] hover:bg-[#1e40af] text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
