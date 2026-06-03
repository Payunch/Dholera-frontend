import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Terms and Conditions</h1>
      <p className="mb-4 text-slate-600">Last updated: May 20, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">1. Acceptance of Terms</h2>
        <p className="text-slate-600 leading-relaxed">
          By accessing the Dholera Platform, you agree to be bound by these terms and conditions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">2. Professional Services</h2>
        <p className="text-slate-600 leading-relaxed">
          Our platform provides professional documentation and clearance assistance for the Dholera Special Investment Region.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">3. Payments and Refunds</h2>
        <p className="text-slate-600 leading-relaxed">
          All payments for digital documents are final. Please ensure you select the correct document before completing the PhonePe transaction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">4. Limitation of Liability</h2>
        <p className="text-slate-600 leading-relaxed">
          Dholera Platform is not liable for any direct or indirect damages arising from the use of our services or documentation.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">5. Notice and Takedown Policy (IT Act 2000, Sec 79)</h2>
        <p className="text-slate-600 leading-relaxed">
          This platform acts as an intermediary for third-party mapping and planning data. If you are a government official, copyright owner, or authorized representative and believe any content on this platform infringes upon your rights or official data policies, please submit a formal takedown request to <a href="mailto:support@dholeraplatform.com" className="text-orange-600 hover:underline">support@dholeraplatform.com</a>. We will review and remove disputed content within 36 hours of verification.
        </p>
      </section>
    </div>
  );
}
