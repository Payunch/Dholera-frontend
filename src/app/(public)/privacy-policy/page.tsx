import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
      <p className="mb-4 text-slate-600">Last updated: May 20, 2026</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">1. Information We Collect</h2>
        <p className="text-slate-600 leading-relaxed">
          We collect minimal information to provide you with instant access to planning documents. This includes your name and mobile number. No permanent account registration or passwords are required.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">2. How We Use Your Information</h2>
        <p className="text-slate-600 leading-relaxed">
          We use your name and phone number to verify document access and process automated payments via Razorpay. We may use your contact details to provide project updates or critical alerts regarding Dholera SIR.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">3. Data Security & Payments</h2>
        <p className="text-slate-600 leading-relaxed">
          Payments are handled securely by Razorpay. We do not store your banking credentials or card details. Your document access is tied to your mobile number and verified via a secure session token.
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
