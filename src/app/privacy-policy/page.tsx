import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dholera Platform",
  description: "Privacy Policy for Dholera Platform",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl text-slate-800 dark:text-slate-200">
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">Privacy Policy</h1>
      
      <div className="space-y-6 prose prose-slate dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p>
            Dholera Platform collects information that you provide directly to us, including but not limited to your name, phone number, and email address when you use our services or submit a site visit request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate and improve our platform, to communicate with you about your real estate inquiries, and to send you one-time passwords (OTPs) for authentication purposes via WhatsApp or SMS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Security</h2>
          <p>
            We do not sell your personal data. Your data is stored securely and is only shared with authorized administrators of the Dholera Platform to facilitate your real estate investment tracking and inquiries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact the Dholera Platform owner directly through the contact options provided on our homepage.
          </p>
        </section>
      </div>
    </div>
  );
}
