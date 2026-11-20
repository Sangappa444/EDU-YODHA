'use client'

import { useState } from 'react'
import { Building2, Globe, MapPin, Mail, AlertCircle, CheckCircle2 } from 'lucide-react'

type ContactFormData = {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (!data.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!data.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateContactForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json() as { success: boolean; error?: string }
      if (data.success) {
        setSubmitted(true)
      } else {
        setErrors({ message: data.error || 'Failed to send. Please try again.' })
      }
    } catch {
      setErrors({ message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0f172a] py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Connect
          </h1>
          <p className="text-slate-300 text-lg">
            We&apos;d love to hear from you. Reach out for partnerships, inquiries, or general questions.
          </p>
        </div>
      </section>

      {/* Two-column section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1e40af]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5 text-[#1e40af]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-0.5">Company</p>
                  <p className="text-slate-600">EDU YODHA LLP</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1e40af]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-5 h-5 text-[#1e40af]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-0.5">Website</p>
                  <a
                    href="https://eduyodha.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1e40af] hover:underline"
                  >
                    https://eduyodha.com
                  </a>
                </div>
              </div>

              {/* Registered Office */}
              <a
                href="https://maps.google.com/?q=Innov8+Prestige+Tech+Platina+Kadubeesanahalli+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group hover:bg-slate-50 rounded-xl p-3 -mx-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-0.5">Registered Office</p>
                  <p className="text-slate-600 leading-relaxed">
                    Innov8, Prestige Tech Platina,<br />
                    Kadubeesanahalli,<br />
                    Bengaluru, Karnataka, India.
                  </p>
                  <p className="text-xs text-[#1e40af] mt-1 group-hover:underline">View on Google Maps →</p>
                </div>
              </a>

              {/* Official Email */}
              <a
                href="mailto:eduyodha1@gmail.com"
                className="flex items-start gap-4 group hover:bg-slate-50 rounded-xl p-3 -mx-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1e40af]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#1e40af]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-0.5">Official Email</p>
                  <p className="text-[#1e40af] group-hover:underline">eduyodha1@gmail.com</p>
                </div>
              </a>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  title="EDU YODHA LLP – Innov8 Prestige Tech Platina Bengaluru"
                  src="https://maps.google.com/maps?q=Innov8+Prestige+Tech+Platina+Kadubeesanahalli+Bengaluru&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Follow Us</p>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-sm text-slate-500">
                    Follow EDU YODHA LLP on social media — links will be listed here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-8">Send Us a Message</h2>

            {submitted ? (
              <div className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center h-fit">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0f172a] mb-2">Message Sent!</h3>
                <p className="text-slate-600 text-sm">
                  Thank you for reaching out. We&apos;ll get back to you as soon as possible.
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

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className={`w-full px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e40af]/50 resize-none ${
                      errors.message ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0f172a] hover:bg-[#1e40af] text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
