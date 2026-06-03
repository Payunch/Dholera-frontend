import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
      <p className="mb-4 text-slate-600">Last updated: May 20, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">1. Information We Collect</h2>
        <p className="text-slate-600 leading-relaxed">
          We collect information you provide directly to us when you register, request clearance certificates, or purchase documentation. 
          This includes your name, phone number, and professional details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">2. How We Use Your Information</h2>
        <p className="text-slate-600 leading-relaxed">
          We use your information strictly to provide our services, process manual UPI verifications via UTR, and verify your identity for secure documentation access. Data minimization protocols are strictly enforced.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">3. Data Security</h2>
        <p className="text-slate-600 leading-relaxed">
          We implement industry-standard security measures to protect your data. Payment information is handled securely via manual UPI QR flows. We do not store raw credit/debit card numbers, CVVs, or sensitive banking credentials in our local databases.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">4. Contact Us</h2>
        <p className="text-slate-600 leading-relaxed">
          If you have questions about this Privacy Policy, please contact us at support@dholeraplatform.com.
        </p>
      </section>
    </div>
  );
}
