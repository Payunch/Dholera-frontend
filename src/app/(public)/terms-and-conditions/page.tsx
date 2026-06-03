"use client";
import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';

export default function TermsAndConditions() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">{t('terms_and_conditions')}</h1>
      <p className="mb-4 text-slate-600">{t('last_updated')}</p>
      
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
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">3. Payments, Access and Refunds</h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            All payments for digital documents are final and non-refundable. 
          </p>
          <p>
            <strong>One-Time View (₹5):</strong> Access to the document is granted for the current browser session only. If the browser is closed or the session expires, access is revoked.
          </p>
          <p>
            <strong>Download Access (₹10):</strong> Access allows for a permanent download of the document to your device.
          </p>
          <p>
            Payments are processed securely via Razorpay.
          </p>
        </div>
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
          This platform acts as an intermediary for third-party mapping and planning data. If you are a government official, copyright owner, or authorized representative and believe any content on this platform infringes upon your rights or official data policies, please submit a formal takedown request to <a href="mailto:support@dholeraplatform.com" className="text-orange-600 hover:underline">{t('support_email')}</a>. We will review and remove disputed content within 36 hours of verification.
        </p>
      </section>
    </div>
  );
}
