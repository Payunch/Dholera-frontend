import React from'react';

export default function PrivacyPolicy() {
 return (
 <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen pt-24 pb-32 w-full overflow-x-hidden dark:bg-slate-900">
 <div className="max-w-4xl mx-auto px-4 md:px-8">
 <h1 className="text-4xl font-black mb-6 uppercase tracking-tight text-slate-900 dark:text-white">Privacy Policy</h1>
 <p className="mb-10 text-sm font-bold tracking-widest text-slate-500 uppercase">Last updated: May 20, 2026</p>
 
 <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 space-y-12">
 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">1. Information We Collect</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 We collect minimal information to provide you with instant access to planning documents. This includes your name and mobile number. No permanent account registration or passwords are required.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">2. How We Use Your Information</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 We use your name and phone number to verify document access and process automated payments via Razorpay. We may use your contact details to provide project updates or critical alerts regarding Dholera SIR.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">3. Data Security & Payments</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 Payments are handled securely by Razorpay. We do not store your banking credentials or card details. Your document access is tied to your mobile number and verified via a secure session token.
 </p>
 </section>

 <section>
 <h2 className="text-2xl font-black uppercase mb-4 text-slate-900 dark:text-white">4. Contact Us</h2>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
 If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@dholeraplatform.com" className="text-orange-600 hover:text-orange-500">support@dholeraplatform.com</a>.
 </p>
 </section>
 </div>
 </div>
 </div>
 );
}
