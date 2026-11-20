import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | EDU YODHA LLP",
  description:
    "Terms and Conditions governing the use of EDU YODHA LLP services, internship programs, and digital platforms.",
};

export default function TermsAndConditionsPage() {
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
            <span className="text-slate-300">Terms and Conditions</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Terms and Conditions
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
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access
          to and use of the services, website, and programs offered by{" "}
          <strong>EDU YODHA LLP</strong>, a Limited Liability Partnership
          registered under the laws of India (&ldquo;EDU YODHA&rdquo;,
          &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By
          accessing our website at{" "}
          <a
            href="https://www.eduyodha.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1e40af] underline"
          >
            eduyodha.com
          </a>{" "}
          or enrolling in any of our programs, you agree to be bound by these
          Terms. If you do not agree to these Terms, please do not use our
          services.
        </p>

        <hr className="border-slate-200 mb-8" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing or using any part of the EDU YODHA LLP website or
            services, you confirm that you are at least 18 years of age, or
            are accessing the services with the consent of a parent or legal
            guardian, and that you have the legal capacity to enter into a
            binding agreement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            EDU YODHA LLP reserves the right to modify these Terms at any time.
            Continued use of our services following notification of changes
            constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            2. Use of Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EDU YODHA LLP provides educational services, digital learning
            resources, internship programs, and technology-based solutions
            aimed at students and young professionals across India. You agree
            to use our services only for lawful purposes and in a manner
            consistent with these Terms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree that you will not:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>
              Use our services in any way that violates applicable Indian laws
              or regulations
            </li>
            <li>
              Reproduce, duplicate, copy, sell, or exploit any portion of our
              services or content without prior written authorisation from EDU
              YODHA LLP
            </li>
            <li>
              Transmit any unsolicited or unauthorised advertising or
              promotional material
            </li>
            <li>
              Attempt to gain unauthorised access to our systems, accounts, or
              data
            </li>
            <li>
              Engage in any conduct that disrupts, damages, or impairs our
              website or services
            </li>
          </ul>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            3. Internship Programs
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EDU YODHA LLP offers internship programs designed to provide
            students with practical exposure, skill development, and
            certificate recognition in relevant domains. By enrolling in an
            internship program, you agree to the following:
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3.1 Eligibility
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Internship programs are open to students currently enrolled in
            recognised educational institutions or recent graduates. EDU YODHA
            LLP reserves the right to verify eligibility and to decline
            enrollment at its discretion.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3.2 Program Conduct
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Participants are expected to complete the program requirements,
            submit assigned tasks on time, and conduct themselves
            professionally. EDU YODHA LLP reserves the right to remove a
            participant from a program for misconduct, plagiarism, or failure
            to meet program requirements without a refund of the program fee.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            3.3 Certificates
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Completion certificates are issued solely upon successful fulfilment
            of all program requirements as determined by EDU YODHA LLP.
            Certificates issued by EDU YODHA LLP are for educational and
            skill-development recognition purposes and do not constitute
            employment letters, government-recognised qualifications, or
            guarantees of employment.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            4. Payment and Fees
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Participation in EDU YODHA LLP&apos;s internship programs requires
            payment of a program fee. The current fee for internship programs
            is:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
            <p className="text-gray-800 font-semibold text-lg">
              Internship Program Fee:{" "}
              <span className="text-[#1e40af]">₹5,000 per program</span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Fees are subject to change. The applicable fee at the time of
              enrollment will be binding.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            All fees are payable in Indian Rupees (INR) through the payment
            methods available on our website. Payment must be completed in full
            prior to commencement of the program. EDU YODHA LLP does not offer
            instalment arrangements unless explicitly stated for a specific
            program.
          </p>
          <p className="text-gray-700 leading-relaxed">
            For information about refunds, please refer to our{" "}
            <Link
              href="/refund-policy"
              className="text-[#1e40af] underline hover:text-[#1e3a8a]"
            >
              Refund Policy
            </Link>
            .
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content published on the EDU YODHA LLP website and distributed
            through our programs — including but not limited to course
            materials, study guides, assignments, branding, logos, design
            elements, and educational resources — is the exclusive intellectual
            property of EDU YODHA LLP or its licensors and is protected under
            applicable Indian copyright and intellectual property laws.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You are granted a limited, non-exclusive, non-transferable licence
            to access and use the materials solely for your personal,
            non-commercial educational purposes. Any reproduction,
            redistribution, public display, or commercial use of our content
            without the prior written consent of EDU YODHA LLP is strictly
            prohibited.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Work submitted by program participants remains the intellectual
            property of the participant; however, by submitting work, you grant
            EDU YODHA LLP a non-exclusive licence to use, reproduce, and
            display such work for the purposes of evaluating program
            performance and promoting the program, unless otherwise agreed in
            writing.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To the fullest extent permitted under applicable law, EDU YODHA LLP
            and its partners, officers, and employees shall not be liable for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
            <li>
              Any indirect, incidental, special, consequential, or punitive
              damages arising from your use of our services
            </li>
            <li>
              Loss of employment, income, or career opportunities as a result
              of participating in or completing our programs
            </li>
            <li>
              Interruptions, errors, or unavailability of our website or
              services due to circumstances beyond our reasonable control
            </li>
            <li>
              Any loss or damage to data, devices, or systems arising from
              your use of our website
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Our total aggregate liability to you for any claim arising under
            these Terms shall not exceed the amount paid by you to EDU YODHA
            LLP for the specific service or program to which the claim relates.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            7. Governing Law and Jurisdiction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of India. Any disputes arising out of or
            in connection with these Terms, including any question regarding
            their existence, validity, or termination, shall be subject to the
            exclusive jurisdiction of the courts located in{" "}
            <strong>Karnataka, India</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            EDU YODHA LLP encourages amicable resolution of disputes in the
            first instance. If you have a concern or complaint, please contact
            us through our website before initiating legal proceedings.
          </p>
        </section>

        <hr className="border-slate-200 mb-8" />

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
            8. Contact Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms and Conditions, please
            contact EDU YODHA LLP through our website contact form at{" "}
            <a
              href="https://www.eduyodha.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1e40af] underline"
            >
              eduyodha.com/contact
            </a>
            .
          </p>
        </section>

        <hr className="border-slate-200 mb-10" />

        {/* CTA */}
        <div className="bg-slate-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-[#0f172a] mb-2">
            Questions About Our Terms?
          </h3>
          <p className="text-gray-600 mb-6">
            Reach out to us and we&apos;ll be happy to clarify anything.
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
