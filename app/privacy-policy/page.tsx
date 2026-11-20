import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | EDU YODHA LLP",
  description:
    "Privacy Policy of EDU YODHA LLP — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Bar */}
      <div className="bg-[#0f172a] py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Last Updated */}
        <p className="text-sm text-slate-500 mb-8 italic">
          Last updated: November 2026
        </p>

        {/* Intro */}
        <p className="text-gray-700 leading-relaxed mb-8">
          EDU YODHA LLP (&ldquo;EDU YODHA&rdquo;, &ldquo;we&rdquo;,
          &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting
          the privacy and personal information of all individuals who interact
          with our website, services, and programs. This Privacy Policy
          describes how we collect, use, store, and protect your information
          when you visit{" "}
          <a
            href="https://www.eduyodha.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1e40af] underline"
          >
            eduyodha.com
          </a>{" "}
          or use our services. By accessing or using our website and services,
          you agree to the terms of this Privacy Policy.
        </p>

        <hr className="border-slate-200 mb-8" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EDU YODHA LLP collects information to provide and improve our
            educational services, internship programs, and digital learning
            offerings. We collect information in the following ways:
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1.1 Information You Provide Directly
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you register for an internship program, fill out a contact
            form, subscribe to our communications, or engage with any of our
            services, you may provide us with personal information including
            but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>Full name, email address, and phone number</li>
            <li>Educational institution name, course, and year of study</li>
            <li>City, state, and country of residence</li>
            <li>Resume or CV (for internship applications)</li>
            <li>Payment information processed through secure third-party gateways</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            1.2 Information Collected Automatically
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you visit our website, we may automatically collect certain
            technical information, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>IP address and browser type</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Device type and operating system</li>
            <li>Referring URLs and search terms</li>
          </ul>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            2. Use of Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EDU YODHA LLP uses the information we collect for the following
            purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>
              To process your registration for internship programs and issue
              certificates upon successful completion
            </li>
            <li>
              To communicate with you about your enrollment, program updates,
              and relevant educational opportunities
            </li>
            <li>
              To process payments and issue receipts for program fees
            </li>
            <li>
              To respond to your enquiries submitted through our contact form
            </li>
            <li>
              To improve the quality and relevance of our educational content
              and services
            </li>
            <li>
              To send periodic newsletters or program announcements, with the
              option to unsubscribe at any time
            </li>
            <li>
              To comply with applicable laws, regulations, and legal obligations
              under Indian law
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We will not sell, rent, or trade your personal information to third
            parties for their marketing purposes without your explicit consent.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our website uses cookies and similar tracking technologies to
            enhance your browsing experience and to understand how visitors
            interact with our content. Cookies are small text files stored on
            your device.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3.1 Types of Cookies We Use
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>
              <strong>Essential Cookies:</strong> Necessary for the website to
              function correctly, such as maintaining session state
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Used to understand visitor
              behaviour on our website (e.g., Google Analytics), collected in
              anonymised form
            </li>
            <li>
              <strong>Preference Cookies:</strong> Used to remember your
              settings and preferences for future visits
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            You may configure your browser to refuse all cookies or to alert
            you when cookies are being sent. However, some parts of our website
            may not function properly without cookies. By continuing to use our
            website, you consent to our use of cookies in accordance with this
            Policy.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            4. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EDU YODHA LLP takes the security of your personal information
            seriously. We implement appropriate technical and organisational
            measures to protect your data against unauthorised access,
            disclosure, alteration, or destruction.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Payment transactions are processed exclusively through reputable
            third-party payment gateways that employ industry-standard
            encryption (SSL/TLS). EDU YODHA LLP does not store your full
            payment card details on our servers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            While we strive to use commercially acceptable means to protect
            your personal information, no method of internet transmission or
            electronic storage is completely secure. We cannot guarantee
            absolute security, and you provide your information at your own
            risk.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            5. Third-Party Links and Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our website may contain links to third-party websites and platforms,
            including our educational platform{" "}
            <a
              href="https://www.vidyari.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1e40af] underline"
            >
              Vidyari
            </a>
            , external learning resources, and partner organisations. These
            external sites are governed by their own privacy policies, and EDU
            YODHA LLP does not accept responsibility for their content, privacy
            practices, or data handling.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We encourage you to review the privacy policies of any third-party
            websites you visit through links on our platform.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            6. Your Rights and Choices
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            As a user of EDU YODHA LLP&apos;s services, you have the following
            rights with respect to your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>
              <strong>Access:</strong> You may request a copy of the personal
              information we hold about you
            </li>
            <li>
              <strong>Correction:</strong> You may request correction of
              inaccurate or incomplete information
            </li>
            <li>
              <strong>Deletion:</strong> You may request deletion of your
              personal data, subject to our legal and contractual obligations
            </li>
            <li>
              <strong>Opt-Out:</strong> You may unsubscribe from our
              communications at any time by using the unsubscribe link in our
              emails or by contacting us directly
            </li>
            <li>
              <strong>Data Portability:</strong> Where applicable, you may
              request a portable copy of data you have provided to us
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            To exercise any of these rights, please reach out to us through the
            contact method described below.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            7. Data Retention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            EDU YODHA LLP retains your personal information for as long as
            necessary to fulfil the purposes described in this Policy, to
            maintain accurate business records, and to comply with applicable
            Indian laws and regulations. When your information is no longer
            required, we will securely delete or anonymise it.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            EDU YODHA LLP reserves the right to update or modify this Privacy
            Policy at any time. Any changes will be effective immediately upon
            posting on this page with a revised &ldquo;Last updated&rdquo;
            date. We encourage you to review this Policy periodically to stay
            informed about how we protect your information.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 9 — Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            9. Contact for Privacy Concerns
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or how EDU YODHA LLP handles your personal
            information, please contact us:
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Contact:</strong> For privacy concerns, contact us through
            our website contact form at{" "}
            <a
              href="https://www.eduyodha.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1e40af] underline"
            >
              eduyodha.com
            </a>
            .
          </p>
        </section>

        <hr className="border-slate-200 mb-10" />

        {/* CTA */}
        <div className="bg-slate-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
            Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is happy to assist you with any privacy-related queries.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0f172a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1e293b] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
