"use client";
import React from'react';
import { useLanguage } from'@/providers/LanguageProvider';

export default function TermsAndConditions() {
 const { t } = useLanguage();
 return (
 <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pt-24 pb-32 w-full overflow-x-hidden dark:bg-slate-900">
 <div className="max-w-4xl mx-auto px-4 md:px-8">
 <h1 className="text-4xl font-black mb-6 uppercase tracking-tight text-slate-900 dark:text-white">{t('terms_and_conditions')}</h1>
 <p className="mb-10 text-sm font-bold tracking-widest text-slate-500 uppercase">{t('last_updated')}</p>
 
 <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 space-y-12">
 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 By accessing the Dholera Platform, you agree to be bound by these terms and conditions.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">2. Professional Services</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 Our platform provides professional documentation and clearance assistance for the Dholera Special Investment Region.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">3. Payments, Access and Refunds</h2>
 <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 <p>
 All payments for digital documents are final and non-refundable. 
 </p>
 <p>
 <strong className="text-slate-900 dark:text-white">One-Time View (₹5):</strong> Access to the document is granted for the current browser session only. If the browser is closed or the session expires, access is revoked.
 </p>
 <p>
 <strong className="text-slate-900 dark:text-white">Download Access (₹10):</strong> Access allows for a permanent download of the document to your device.
 </p>
 <p>
 Payments are processed securely via Razorpay.
 </p>
 </div>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">4. Limitation of Liability</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 Dholera Platform is not liable for any direct or indirect damages arising from the use of our services or documentation.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">5. Acceptable Use Policy & Advertising</h2>
 <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 <p>
 Users are prohibited from engaging in any activity that interferes with or disrupts the services.
 </p>
 <p>
 <strong>Invalid Clicks and Impressions:</strong> Users must not click on their own ads or use any means to inflate impressions and/or clicks artificially, including manual methods. Any activity that generates invalid clicks on advertisements displayed on Dholera Platform is strictly prohibited.
 </p>
 <p>
 <strong>Content Guidelines:</strong> Users must not use this platform to promote illicit, illegal, or harmful content. We strictly adhere to Google AdSense Programme policies, and any violation by a user may result in immediate termination of access.
 </p>
 </div>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">6. Notice and Takedown Policy (IT Act 2000, Sec 79)</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 This platform acts as an intermediary for third-party mapping and planning data. If you are a government official, copyright owner, or authorized representative and believe any content on this platform infringes upon your rights or official data policies, please submit a formal takedown request to <a href="mailto:support@dholeraplatform.com" className="text-orange-600 hover:text-orange-500">support@dholeraplatform.com</a>. We will review and remove disputed content within 36 hours of verification.
 </p>
 </section>
  <section>
  <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">7. User-Generated Content & Liability Disclaimer</h2>
  <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
  <p>
  <strong>No Liability for User Actions:</strong> The Dholera Platform acts strictly as a neutral hosting provider and intermediary. Users (including dealers, agents, and the general public) are solely responsible for any content, listings, or information they upload, share, or transmit through our platform.
  </p>
  <p>
  The platform, its creators, and administrators strictly disclaim any and all liability for fraudulent, illegal, or misused information uploaded by third parties. We do not endorse or verify the legal standing of user-generated claims.
  </p>
  </div>
  </section>

  <section>
  <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">8. Indemnification</h2>
  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
  You agree to indemnify, defend, and hold harmless the Dholera Platform, its owners, developers, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the platform, including but not limited to, your User Contributions and any use of the platform's content, services, and products.
  </p>
  </section>
  </div>
  </div>
  </div>
 );
}
