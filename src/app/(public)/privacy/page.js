import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-orange-500 py-12 px-8">
          <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="mt-2 text-orange-100">How we protect your data at Dholera Platform.</p>
        </div>
        <div className="p-8 prose dark:prose-invert max-w-none">
          <h2>1. Information Collection</h2>
          <p>We collect personal data (such as your name, mobile number, and email) when you register on the Dholera Platform to provide you with a personalized experience and grant access to investment resources. By using this platform, you consent to the collection and use of this information.</p>
          
          <h2>2. User-Generated Content & Safe Harbor</h2>
          <p>The Dholera Platform allows users to post, upload, or share content. We act strictly as a hosting provider (Safe Harbor provision) and do not manually review all content before it goes live. Users are solely responsible for the legality, accuracy, and appropriateness of the content they upload.</p>
          <p>We reserve the right to remove any content that violates applicable laws or our guidelines, either through automated systems or admin moderation.</p>
          
          <h2>3. Data Security</h2>
          <p>We implement strict security measures to protect your data, including JWT authentication and rate limiting on our servers to prevent unauthorized access.</p>
        </div>
      </div>
    </div>
  );
}
