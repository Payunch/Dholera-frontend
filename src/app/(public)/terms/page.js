import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-orange-500 py-12 px-8">
          <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
          <p className="mt-2 text-orange-100">Please read carefully before using Dholera Platform.</p>
        </div>
        <div className="p-8 prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Dholera Platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
          
          <h2>2. User-Generated Content & Safe Harbor</h2>
          <p>The Dholera Platform operates strictly as an intermediary and hosting provider under applicable Safe Harbor laws. We do not create or endorse user-generated content, including property listings, blogs, or comments.</p>
          <p>You agree that you are solely responsible for any content you upload, post, or transmit through our platform. Dholera Platform claims no liability for inaccurate, offensive, or illegal user-generated content.</p>
          
          <h2>3. No Investment Liability</h2>
          <p>Any information provided on this platform regarding real estate or smart city investments is for informational purposes only. We do not offer financial advice, and we are not liable for any financial losses or damages resulting from your investment decisions based on platform content.</p>
        </div>
      </div>
    </div>
  );
}
